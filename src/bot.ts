import { Bot, Context, InlineKeyboard } from 'grammy'
import { Markdown } from './finance/finance.md.ts'
import { log } from "./middleware/log.ts"
import store from "./middleware/store.ts"
import { escapeMarkdownV2 } from './util/markdownv2.ts'

const { BOT_TOKEN } = Deno.env.toObject()
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!')
const bot = new Bot(BOT_TOKEN)

bot.use(log)
bot.use(store)

const keyboard = InlineKeyboard.from([[
	InlineKeyboard.url('❤️', 'https://zeckson.com'),
	InlineKeyboard.text('Delete', 'delete'),
]])
const split = (ctx: Context) => ctx.message?.text?.split(` `) ?? []

bot.command(`start`, (ctx) => ctx.reply('Hello'))

bot.command(`exchange`, (ctx) => {
	const [_, sent, received] = split(ctx)
	const reply = Markdown.roubles2usdt(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.command(`send`, (ctx) => {
	const [_, sent] = split(ctx)
	const reply = Markdown.sent(Number(sent))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.command(`received`, (ctx) => {
	const [_, sent, received] = split(ctx)
	const reply = Markdown.usdt2lkr(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.command(`final`, (ctx) => {
	const [_, sent, received] = split(ctx)
	const reply = Markdown.roubles2lkr(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.command(`help`, (ctx) => ctx.reply('Help message'))
bot.on(
	'message',
	(ctx) => ctx.copyMessage(ctx.message.chat.id, { reply_markup: keyboard }),
)
bot.callbackQuery('delete', (ctx) => ctx.deleteMessage())

export { bot }
