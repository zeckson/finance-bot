import '@std/dotenv/load'

import { bot } from './src/bot.ts'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	try {
		await bot.launch(() => {
			console.log(
				`Telegram bot started: https://t.me/${bot.botInfo?.username}`,
			)
		})
	} catch (err) {
		console.error(err)
	}
}
