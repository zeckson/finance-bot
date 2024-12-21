import { rate } from "./finance.math.ts";
import { Currency } from "./finance.type.ts";

const rubles = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: `code`,
});

const usdt = (value: Currency): string => usd.format(value)
    .replace("USD", "USDT")
    .trim()

const rateFormat = new Intl.NumberFormat("ru-RU", {
  style: "decimal",
  maximumFractionDigits: 2,
});

export const printChangeRate = (
  given: Currency,
  received: Currency,
): string => {
  const result = rate(given, received);
  return `Поменял:  ${rubles.format(given)} (${usdt(received)}). Курс: ${
    rateFormat.format(result)
  }`;
};
