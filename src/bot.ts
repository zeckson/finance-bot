import { Markup, Telegraf } from "telegraf";
import { Markdown } from "./finance/finance.md.ts"
import { escapeMarkdownV2 } from "./util/markdownv2.ts"

const { BOT_TOKEN } = Deno.env.toObject();
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
const bot = new Telegraf(BOT_TOKEN);

const keyboard = Markup.inlineKeyboard([
  Markup.button.url("❤️", "http://telegraf.js.org"),
  Markup.button.callback("Delete", "delete"),
]);

bot.start((ctx) => ctx.reply("Hello"));
bot.command(`exchange`, (ctx) => {
  const [_, sent, received] = ctx.message.text.split(` `);
  const reply = Markdown.roubles2usdt(Number(sent), Number(received))
  return ctx.reply(escapeMarkdownV2(reply), {
    parse_mode: `MarkdownV2`,
  });
});
bot.help((ctx) => ctx.reply("Help message"));
bot.on("message", (ctx) => ctx.copyMessage(ctx.message.chat.id, keyboard));
bot.action("delete", (ctx) => ctx.deleteMessage());

export { bot };
