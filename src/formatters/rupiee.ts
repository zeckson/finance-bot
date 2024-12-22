import { Currency } from "../finance.type.ts"

const FORMATTER = new Intl.NumberFormat("si-LK", {
  style: "currency",
  currency: "LKR",
})

export const rupees = (value: Currency): string => FORMATTER.format(value);
