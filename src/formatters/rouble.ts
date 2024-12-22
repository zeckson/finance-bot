import { Currency } from "../finance/finance.type.ts"

const FORMATTER = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
})

export const roubles = (value: Currency): string => FORMATTER.format(value);
