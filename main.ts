import "@std/dotenv/load"

import { bot } from "./src/bot.ts"
import { Markdown } from "./src/finance/finance.md.ts"
import { printChangeRate, printSentUSDT } from "./src/finance/finance.text.ts"

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(printChangeRate(42_499.35, 404.915734));
  console.log(Markdown.roubles2usdt(9600, 92.843326));
  console.log(printSentUSDT(404, 1));
  console.log(Markdown.sent(92, 1));
  console.log(Markdown.usdt2lkr(543.34, 165_000));
  console.log(Markdown.roubles2lkr(42_499.35 + 9600, (404 + 92)*303.68));

  try {
    await bot.launch( () => {
      console.log(`Telegram bot started: https://t.me/${bot.botInfo?.username}`)
    });
  } catch (err) {
    console.error(err);
  }
}
