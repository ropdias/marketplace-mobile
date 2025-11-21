export function currencyApplyMask(value: string): string {
  const numeric = value.replace(/\D/g, '')

  const cents = numeric.padStart(3, '0')
  const integer = cents.slice(0, -2)
  const decimal = cents.slice(-2)

  // Add thousands separator (Brazilian format: 1.234.567,89)
  const formattedInteger = Number(integer).toLocaleString('pt-BR')

  return `${formattedInteger},${decimal}`
}
