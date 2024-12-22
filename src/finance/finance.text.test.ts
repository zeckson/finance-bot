import { assertEquals } from "@std/assert";
import { printChangeRate, printSentUSDT } from "./finance.text.ts";

const nbsp = `\u00A0`;

Deno.test(function testChangeRatePrint() {
  assertEquals(
    printChangeRate(4711, 45.38),
    `Поменял: 4${nbsp}711,00${nbsp}₽ (USDT${nbsp}45.38). Курс: 103,81`,
  );
});
Deno.test(function testSentUDSTPrint() {
  assertEquals(
    printSentUSDT(45, 1),
    `Отправил: USDT${nbsp}45.00 (+USDT${nbsp}1.00 commission) = USDT${nbsp}46.00`,
  );
});
