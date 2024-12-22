import { Markup, Telegraf } from "telegraf";

const { BOT_TOKEN } = Deno.env.toObject();
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
const bot = new Telegraf(BOT_TOKEN);

const keyboard = Markup.inlineKeyboard([
  Markup.button.url("❤️", "http://telegraf.js.org"),
  Markup.button.callback("Delete", "delete"),
]);

bot.start((ctx) => ctx.reply("Hello"));
bot.help((ctx) => ctx.reply("Help message"));
bot.on("message", (ctx) => ctx.copyMessage(ctx.message.chat.id, keyboard));
bot.action("delete", (ctx) => ctx.deleteMessage());

export { bot };
