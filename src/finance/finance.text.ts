import { rate as exchangeRate } from "./finance.math.ts";
import { Currency } from "./finance.type.ts";
import { rate } from "../formatters/rate.ts";
import { roubles } from "../formatters/rouble.ts";
import { usdt } from "../formatters/usdt.ts";

export const printChangeRate = (
  given: Currency,
  received: Currency,
): string => {
  const result = exchangeRate(given, received);
  return `Поменял: ${roubles(given)} (${usdt(received)}). Курс: ${
    rate(result)
  }`;
};

export const printSentUSDT = (sent: Currency, commission: Currency = 1) =>
  `Отправил: ${usdt(sent)} (+${usdt(commission)} commission) = ${
    usdt(sent + commission)
  }`;
