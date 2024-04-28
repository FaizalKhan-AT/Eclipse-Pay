import { ITransaction } from "@/lib/interfaces/common.interface";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CircleCheck, CircleX } from "lucide-react";

interface Props {
  transactions: Array<ITransaction>;
}
const TransactionTable: FC<Props> = ({ transactions }) => {
  return (
    <Table>
      <TableCaption>
        Ledger showing transactions across different apps.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fill">App name</TableHead>
          <TableHead>Transaction Date</TableHead>
          <TableHead>Transaction Amount</TableHead>
          <TableHead>Log</TableHead>
          <TableHead>Account No.</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((trans) => (
          <TableRow key={trans.id}>
            <TableCell className="font-medium">{trans.appName}</TableCell>
            <TableCell>{new Date(trans.transDate).toLocaleString()}</TableCell>
            <TableCell className="text-wrap">{trans.transAmount}</TableCell>
            <TableCell className="w-[350px] text-wrap">{trans.log}</TableCell>
            <TableCell className=" text-wrap">{trans.accountNumber}</TableCell>
            <TableCell className="text-right flex items-center justify-around">
              {trans.isSuccessful ? (
                <span className="flex items-center gap-2 text-lime-500">
                  <CircleCheck className="" />
                  <span>Success</span>
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-600">
                  <CircleX className="" />
                  <span>Failed</span>
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
