export const USD_TRY_RATE = 34.09;

const tryFormatter = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 0,
});

const usdcFormatter = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
});

export function formatTRY(amount: number): string {
  return tryFormatter.format(Math.round(amount));
}

export function formatUSDC(amount: number): string {
  return usdcFormatter.format(amount);
}

export function formatDateShort(date: Date): string {
  return dateFormatter.format(date);
}

export function tryToUsdc(amountTRY: number): number {
  return amountTRY / USD_TRY_RATE;
}

export function usdcToTry(amountUSDC: number): number {
  return amountUSDC * USD_TRY_RATE;
}
