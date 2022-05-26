import { Prisma } from "@prisma/client";
import { Response } from "express";

export function handleSync(fn: () => any) {
  try {
    const data = fn();
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

export function handle(fn: () => Promise<any>) {
  return fn()
    .then((data) => [data, null])
    .catch((error: Error) => [null, error]);
}
