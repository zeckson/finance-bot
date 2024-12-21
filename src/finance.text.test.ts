import { assertEquals } from "@std/assert";
import { printChangeRate } from "./finance.text.ts";

Deno.test(function testChangeRatePrint() {
      assertEquals(
          printChangeRate(4711, 45.38),
          `Поменял:  4711RUB (45,38USDT). Курс: 103,8`,
      );
    }
);

