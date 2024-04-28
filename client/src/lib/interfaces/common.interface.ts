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
