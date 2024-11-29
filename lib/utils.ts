import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getExplorerUrl(hash: string, type: "tx" | "address" = "tx") {
  return `https://explorer.solana.com/${type}/${hash}?cluster=custom&customUrl=https%3A%2F%2Frpc.test.honeycombprotocol.com`;
}
