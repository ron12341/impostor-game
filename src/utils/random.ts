export function randomItem<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("Cannot select a random item from an empty array!");
  }

  const index = Math.floor(Math.random() * items.length);

  return items[index];
}

export function randomItems<T>(items: T[], count: number): T[] {
  if (count > items.length) {
    throw new Error(`Cannot select ${count} items from an array with ${items.length} items!`);
  }

  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
