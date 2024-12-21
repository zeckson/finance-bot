import { printChangeRate, printSentUSDT } from "./src/finance.text.ts"

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(printChangeRate(42_499.35, 404.915734));
  console.log(printSentUSDT(404, 1));
}
