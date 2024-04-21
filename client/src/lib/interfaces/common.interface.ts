export interface User {
  id: number;
  email: string;
}

export interface IApp {
  id: number;
  appId: string;
  appName: string;
  description?: string;
  allowedOrigins: string;
  password: string;
  apiKey: string;
}
