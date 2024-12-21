import { rate } from "./finance.math.ts";
import { Currency } from "./finance.type.ts";

const rubles = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});
const usdt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: `code`,
});

const rateFormat = new Intl.NumberFormat("ru-RU", {
  style: "decimal",
  maximumFractionDigits: 2,
});

export const printChangeRate = (
  given: Currency,
  received: Currency,
): string => {
  const result = rate(given, received);
  return `Поменял:  ${rubles.format(given)} (${usdt.format(received)}). Курс: ${
    rateFormat.format(result)
  }`;
};
