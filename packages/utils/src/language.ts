/**
 * Normalizes the prioritisedLanguages array to ensure it's in the correct format.
 * If it's a flat array, converts it to a nested array where each language gets its own group
 * to maintain individual priority levels. This ensures backward compatibility with configs
 * that use the old format.
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

  // If it's a flat array, convert each language to its own group to maintain priority order
  if (!isNestedArray) {
    // Convert each language to its own group to maintain individual priority
    return (languages as string[]).map((lang) => [lang]);
  }

  // Already in correct format
  return languages as string[][];
}
