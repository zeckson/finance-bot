import { Currency, Rate } from "./finance.type.ts"

export const rate = (given: Currency, received: Currency): Rate =>
  given / received;
