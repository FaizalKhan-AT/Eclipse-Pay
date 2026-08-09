# Eclipse-Pay

A payment API and merchant dashboard built as a college project in early 2024. Merchants register an application, receive an API key, and can charge a card through a REST endpoint backed by a simulated bank.

> **Status: archived college project. Not maintained, not deployed, not safe to run against anything real.**
> I've left it public deliberately. The section on [what I'd do differently](#what-id-do-differently-now) is the interesting part.

---

## What it does

- Email/password auth for merchants, JWT sessions
- Create and manage "apps" (merchant integrations), each with an API key and secret
- A charge endpoint that validates card details and debits a balance
- A transaction history view per merchant
- A React dashboard covering all of the above

The bank is simulated inside the same service — `BankAccount` and `CardDetails` tables stand in for an issuer, so the whole flow runs locally with no external dependency.

## Stack

**Server** — Node.js, Express, Prisma, MySQL, bcrypt, JWT
**Client** — React, TypeScript, Vite, Tailwind, shadcn/ui

## Structure

```
server/
  routes/        thin HTTP layer
  controllers/   request orchestration
  models/        Prisma data access
  middlewares/   async wrapper, error handler, JWT guard
  utils/         API key generation
  prisma/        schema + migrations

client/
  src/components/ui/     primitives
  src/components/        feature components
  src/pages/             routes
  src/context/           auth state
```

## Running it

```bash
# server
cd server
npm install
cp .env.example .env        # DATABASE_URL, JWT_SECRET, PORT, SALT, SIZE, FORMAT
npx prisma migrate dev
npm run dev

# client
cd client
npm install
npm run dev                 # set VITE_BASE_URL to the server origin
```

You'll need a local MySQL instance and to seed `BankAccount` and `CardDetails` rows by hand before a charge will succeed.

---

## What I'd do differently now

I've since spent time on production payments — a Stripe Connect integration and a double-entry ledger module in a healthcare billing product. Rereading this code, here's what I got wrong and what I'd change.

**1. Authentication is missing on most routes.**
Only `GET /api/v1/auth/` uses the JWT guard. The app and transaction routes are unauthenticated, and authorization is read from `req.headers.id` — a value the client controls. That means one merchant can read or delete another's apps by changing a header. The fix is the guard on every non-public route and the user ID taken from the verified token, never from a header.

**2. The balance update is a read-modify-write race.**
`debitMoney` reads the balance, subtracts in application code, then writes the result — with no transaction and no lock. Two concurrent charges against the same account both read the old balance and one write is lost. It needs a single atomic decrement with a conditional guard on sufficient funds, inside a transaction that also writes the transaction record. As written, a crash between the two writes leaves a debit with no audit row.

**3. Money is debited but never credited anywhere.**
Funds leave the buyer's account and vanish. There's no merchant balance, no platform fee, no clearing account. A payment system needs a double-entry journal where every transaction balances to zero and balances are derived from the journal rather than stored as a mutable column. This is the largest conceptual gap in the project.

**4. Card data is stored in plaintext, including CVV.**
`CardDetails` holds the full PAN and CVV as strings, and validation compares them directly. Storing CVV after authorization is prohibited under PCI DSS regardless of encryption. The correct shape is a tokenization service with its own datastore and keys, holding only ciphertext plus last four digits, brand, and expiry — with the payment service never seeing a card number at all.

**5. Amounts are floats.**
`transAmount` and `balance` are both `Float`. Currency should be an integer count of minor units with an explicit currency code, and arithmetic should live in a value type that refuses to mix currencies.

**6. There's no idempotency.**
The same charge request sent twice charges twice. Since a client retrying after a network timeout is the normal case in payments, an idempotency key is not optional — the server needs to store the key with a hash of the request, replay the original response on a repeat, and reject the same key used with a different payload.

**7. A boolean is not a payment lifecycle.**
`isSuccessful` collapses everything into succeeded or failed. Real payments need authorized, captured, refunded, partially refunded, and — most importantly — a state for *we sent the request and never learned the outcome*. Without that state there's no way to reconcile a payment that succeeded at the bank but timed out on the wire.

**Smaller things:** CORS is fully open while the `allowedOrigins` field on the App model is stored and never used; the client sets `Access-Control-Allow-Origin` as a request header, which does nothing; each model class instantiates its own `PrismaClient`, creating several connection pools; card validation compares objects via `JSON.stringify`, which is key-order dependent and will falsely decline a valid card; expiry dates are stored but never checked.

---

## Where this went next

I'm rebuilding this properly as a payments orchestration core — guarded state machine, idempotency keys, append-only double-entry ledger, transactional outbox, signed webhooks with retry and replay, settlement reconciliation, and a separate token vault, with a mock acquirer I can inject faults into.

*(Link to follow.)*

## License

MIT
