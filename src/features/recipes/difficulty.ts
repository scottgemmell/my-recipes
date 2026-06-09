type Level = 'easy' | 'medium' | 'hard'

function difficultyLevel(difficulty: string): Level {
  const value = difficulty.trim().toLowerCase()
  if (value.startsWith('hard') || value.startsWith('advanced') || value.startsWith('difficult')) {
    return 'hard'
  }
  if (value.startsWith('medium') || value.startsWith('intermediate')) {
    return 'medium'
  }
  return 'easy'
}

/**
 * Material Symbols signal-bar icon for a difficulty level:
 * Easy = 2 bars, Medium and Hard = 3 bars (the full icon).
 */
export function iconForDifficulty(difficulty: string): string {
  return difficultyLevel(difficulty) === 'easy'
    ? 'signal_cellular_alt_2_bar'
    : 'signal_cellular_alt'
}

/** Hard recipes are emphasised in the error/red colour. */
export function isHardDifficulty(difficulty: string): boolean {
  return difficultyLevel(difficulty) === 'hard'
}
