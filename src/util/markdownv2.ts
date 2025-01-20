export const escapeMarkdownV2 = (text: string) =>
	text.replace(/([_[\]()~`>#+\-=|{}.!])/g, '\\$1')
