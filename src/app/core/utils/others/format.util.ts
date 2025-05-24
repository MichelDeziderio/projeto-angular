export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}