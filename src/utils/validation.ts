export function validatePlayerName(name: string, existingnames: string[] = []): string | null {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Player name cannot be empty";
  }

  const isDuplicate = existingnames.some((existingName) => existingName.trim().toLowerCase() === trimmedName.toLowerCase());

  if (isDuplicate) {
    return "That player name is already taken";
  }

  return null;
}

export function validatePlayerCount(count: number): string | null {
  if (!Number.isInteger(count)) {
    return "Player count must be a whole number";
  }

  if (count < 3) {
    return "At least 3 players are required";
  }

  if (count > 12) {
    return "A maximum of 12 players is allowed";
  }

  return null;
}
