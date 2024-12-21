import { Rate } from "../finance.type.ts";

const FORMATTER = new Intl.NumberFormat("ru-RU", {
  style: "decimal",
  maximumFractionDigits: 2,
});

export const rate = (value: Rate): string => FORMATTER.format(value);
