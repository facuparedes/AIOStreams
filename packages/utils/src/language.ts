/**
 * Normalizes the prioritisedLanguages array to ensure it's in the correct format.
 * If it's a flat array, converts it to a nested array with all languages in one group.
 * This ensures backward compatibility with configs that use the old format.
 *
 * @param languages The prioritisedLanguages array from config
 * @returns A normalized array of arrays, or undefined if input is null/empty
 */
export function normalizePrioritisedLanguages(
  languages: string[] | string[][] | null | undefined
): string[][] | undefined {
  if (!languages || languages.length === 0) {
    return undefined;
  }

  // Check if it's already a nested array
  const isNestedArray = Array.isArray(languages[0]);

  // If it's a flat array, convert it to nested array format
  // All languages in the flat array go into a single group (same priority level)
  return isNestedArray ? (languages as string[][]) : [languages as string[]];
}
