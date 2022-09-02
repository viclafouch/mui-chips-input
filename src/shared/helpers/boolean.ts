export function matchIsBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}
