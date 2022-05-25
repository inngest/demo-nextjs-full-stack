import type { Args } from "./types"

export async function run({ event }: any) {
  // Your logic goes here.
  return {
    status: 200,
    body: "Send SMS Dispatch!",
  }
}
