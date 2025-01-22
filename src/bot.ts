import { Bot, Context, InlineKeyboard } from 'grammy'
import { Markdown } from './finance/finance.md.ts'
import { DenoStore } from "./store/denostore.ts"
import { escapeMarkdownV2 } from './util/markdownv2.ts'

const { BOT_TOKEN, DENO_KV_URL } = Deno.env.toObject()
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!')
const bot = new Bot(BOT_TOKEN)

const openStore = () => {
	if (DENO_KV_URL) return Deno.openKv(DENO_KV_URL)
	else return Deno.openKv()
}
const store = new DenoStore(await openStore())

const users = await store.list({ prefix: ['user'] })

console.log(`Records in DB: ${users.length}`)

bot.use(async (ctx: Context, next: () => Promise<void>) => {
	const user = ctx.from
	if (user) {
		const userkey = [`user`, user.id]
		const entry = await store.load(userkey)
		if (!entry.value) {
			await store.save(userkey, user)
			console.debug(`Saved user: ${JSON.stringify(user)}`)
		} else {
			console.debug(`Existing entry: ${JSON.stringify(entry)}`)
		}
	}
	return await next()
})

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
bot.on('message', (ctx) => ctx.copyMessage(ctx.message.chat.id, {reply_markup: keyboard}))
bot.callbackQuery('delete', (ctx) => ctx.deleteMessage())

export { bot }
