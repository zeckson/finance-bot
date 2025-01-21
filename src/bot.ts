import { Context, Markup, Telegraf } from 'telegraf'
import { Update } from "telegraf/types"
import { Markdown } from './finance/finance.md.ts'
import { DenoStore } from "./store/denostore.ts"
import { escapeMarkdownV2 } from './util/markdownv2.ts'

const { BOT_TOKEN, DENO_KV_URL } = Deno.env.toObject()
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!')
const bot = new Telegraf(BOT_TOKEN)

const openStore = () => {
	if (DENO_KV_URL) return Deno.openKv(DENO_KV_URL)
	else return Deno.openKv()
}
const store = new DenoStore(await openStore())

const users = await store.list({prefix: ["user"]})

console.log(`Records in DB: ${users.length}`)

bot.use(async (ctx: Context<Update>, next: () => Promise<void>) => {
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

const keyboard = Markup.inlineKeyboard([
	Markup.button.url('❤️', 'http://telegraf.js.org'),
	Markup.button.callback('Delete', 'delete'),
])

bot.start((ctx) => ctx.reply('Hello'))
bot.command(`exchange`, (ctx) => {
	const [_, sent, received] = ctx.message.text.split(` `)
	const reply = Markdown.roubles2usdt(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.command(`send`, (ctx) => {
	const [_, sent] = ctx.message.text.split(` `)
	const reply = Markdown.sent(Number(sent))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.command(`received`, (ctx) => {
	const [_, sent, received] = ctx.message.text.split(` `)
	const reply = Markdown.usdt2lkr(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.command(`final`, (ctx) => {
	const [_, sent, received] = ctx.message.text.split(` `)
	const reply = Markdown.roubles2lkr(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
bot.help((ctx) => ctx.reply('Help message'))
bot.on('message', (ctx) => ctx.copyMessage(ctx.message.chat.id, keyboard))
bot.action('delete', (ctx) => ctx.deleteMessage())

export { bot }
