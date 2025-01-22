import { Composer, Context } from "grammy"
import { Markdown } from "../finance/finance.md.ts"
import { escapeMarkdownV2 } from "../util/markdownv2.ts"

const split = (ctx: Context) => ctx.message?.text?.split(` `) ?? []

const router = new Composer()

router.command(`exchange`, (ctx) => {
	const [_, sent, received] = split(ctx)
	const reply = Markdown.roubles2usdt(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
router.command(`send`, (ctx) => {
	const [_, sent] = split(ctx)
	const reply = Markdown.sent(Number(sent))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
router.command(`received`, (ctx) => {
	const [_, sent, received] = split(ctx)
	const reply = Markdown.usdt2lkr(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})
router.command(`final`, (ctx) => {
	const [_, sent, received] = split(ctx)
	const reply = Markdown.roubles2lkr(Number(sent), Number(received))
	return ctx.reply(escapeMarkdownV2(reply), {
		parse_mode: `MarkdownV2`,
	})
})

export default router
