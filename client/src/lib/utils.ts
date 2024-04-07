import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function saveToSession(data: {
  id: number;
  token: string;
  email: string;
}) {
  const { token, id, email } = data;
  sessionStorage.setItem("user", JSON.stringify({ id, email }));
  sessionStorage.setItem("token", token);
}
