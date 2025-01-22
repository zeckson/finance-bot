import { Composer, InlineKeyboard } from "grammy"

const demo = new Composer()

const keyboard = InlineKeyboard.from([[
    InlineKeyboard.url('❤️', 'https://zeckson.com'),
    InlineKeyboard.text('Delete', 'delete'),
]])

demo.command(`start`, (ctx) => ctx.reply('Hello'))

demo.command(`help`, (ctx) => ctx.reply('Help message'))
demo.on(
    'message',
    (ctx) => ctx.copyMessage(ctx.message.chat.id, { reply_markup: keyboard }),
)
demo.callbackQuery('delete', (ctx) => ctx.deleteMessage())

export default demo
