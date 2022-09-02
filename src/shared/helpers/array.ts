export function append<T extends unknown[]>(array: T, item: T[keyof T]): T {
  return [...array, item] as T
}

export function removeIndex<T extends unknown[]>(
  array: T,
  indexItem: number
): T {
  return array.filter((_, index) => {
    return indexItem !== index
  }) as T
}
