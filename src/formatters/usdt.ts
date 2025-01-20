import { Currency } from '../finance/finance.type.ts'

const FORMATTER = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: `code`,
})

export const usdt = (value: Currency): string =>
	FORMATTER.format(value).replace('USD', 'USDT')
		.trim()
