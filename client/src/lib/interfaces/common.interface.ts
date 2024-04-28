export interface User {
  id: number;
  email: string;
}

export interface IApp {
  id: number;
  appName: string;
  description?: string;
  allowedOrigins: string;
  password: string;
  isProd: boolean;
  accountNumber: number;
}

export interface ITransaction {
  id: number;
  transDate: string;
  transAmount: number;
  isSuccessful: boolean;
  log: string;
  userId: number;
  accountNumber: number;
  appName: string;
}
