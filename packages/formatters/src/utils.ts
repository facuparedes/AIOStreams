import { normalizePrioritisedLanguages } from '@aiostreams/utils';

export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDuration(durationInMs: number): string {
  const seconds = Math.floor(durationInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedSeconds = seconds % 60;
  const formattedMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h:${formattedMinutes}m:${formattedSeconds}s`;
  } else if (formattedSeconds > 0) {
    return `${formattedMinutes}m:${formattedSeconds}s`;
  } else {
    return `${formattedMinutes}m`;
  }
}

export function languageToEmoji(language: string): string | undefined {
  return languageEmojiMap[language.toLowerCase()];
}

export function emojiToLanguage(emoji: string): string | undefined {
  return Object.entries(languageEmojiMap).find(
    ([_, value]) => value === emoji
  )?.[0];
}

export function codeToLanguage(code: string): string | undefined {
  return codeLanguageMap[code];
}

export function sortPrioritisedLanguages(
  languages: string[],
  prioritisedLanguages?: string[] | string[][] | null | undefined
): string[] {
  if (!prioritisedLanguages || prioritisedLanguages.length === 0) {
    return languages;
  }

  // Normalize prioritisedLanguages to ensure it's always an array of arrays
  const normalizedPrioritisedLanguages =
    normalizePrioritisedLanguages(prioritisedLanguages) || [];

  // Create a map of language names to their priority index (group index)
  const priorityMap = new Map<string, number>();

  normalizedPrioritisedLanguages.forEach((group, groupIndex) => {
    group.forEach((lang) => {
      const normalized =
        Object.keys(languageEmojiMap).find(
          (key) => key.toLowerCase() === lang.toLowerCase()
        ) || lang;
      priorityMap.set(normalized, groupIndex);
    });
  });

  // Sort languages based on their priority index
  return [...languages].sort((a, b) => {
    // Convert emojis to language names if needed
    const langA = emojiToLanguage(a) || a;
    const langB = emojiToLanguage(b) || b;

    // Normalize language names
    const normalizedA =
      Object.keys(languageEmojiMap).find(
        (key) => key.toLowerCase() === langA.toLowerCase()
      ) || langA;
    const normalizedB =
      Object.keys(languageEmojiMap).find(
        (key) => key.toLowerCase() === langB.toLowerCase()
      ) || langB;

    const priorityA = priorityMap.get(normalizedA) ?? Infinity;
    const priorityB = priorityMap.get(normalizedB) ?? Infinity;

    if (priorityA === priorityB) {
      // If priority is the same, maintain the original order
      return languages.indexOf(a) - languages.indexOf(b);
    }

    return priorityA - priorityB;
  });
}

/**
 * A mapping of language names to their corresponding emoji flags.
 *
 * This mapping was adapted from the g0ldy/comet project.
 * https://github.com/g0ldyy/comet/blob/de5413425ac30a9d88bc7176862a7ff02027eb7f/comet/utils/general.py#L19C1-L19C18
 */
const languageEmojiMap: Record<string, string> = {
  multi: '🌎',
  english: '🇺🇸',
  japanese: '🇯🇵',
  chinese: '🇨🇳',
  russian: '🇷🇺',
  arabic: '🇸🇦',
  portuguese: '🇵🇹',
  spanish: '🇪🇸',
  french: '🇫🇷',
  german: '🇩🇪',
  italian: '🇮🇹',
  korean: '🇰🇷',
  hindi: '🇮🇳',
  bengali: '🇧🇩',
  punjabi: '🇵🇰',
  marathi: '🇮🇳',
  gujarati: '🇮🇳',
  tamil: '🇮🇳',
  telugu: '🇮🇳',
  kannada: '🇮🇳',
  malayalam: '🇮🇳',
  thai: '🇹🇭',
  vietnamese: '🇻🇳',
  indonesian: '🇮🇩',
  turkish: '🇹🇷',
  hebrew: '🇮🇱',
  persian: '🇮🇷',
  ukrainian: '🇺🇦',
  greek: '🇬🇷',
  lithuanian: '🇱🇹',
  latvian: '🇱🇻',
  estonian: '🇪🇪',
  polish: '🇵🇱',
  czech: '🇨🇿',
  slovak: '🇸🇰',
  hungarian: '🇭🇺',
  romanian: '🇷🇴',
  bulgarian: '🇧🇬',
  serbian: '🇷🇸',
  croatian: '🇭🇷',
  slovenian: '🇸🇮',
  dutch: '🇳🇱',
  danish: '🇩🇰',
  finnish: '🇫🇮',
  swedish: '🇸🇪',
  norwegian: '🇳🇴',
  malay: '🇲🇾',
  latino: '🇲🇽',
  Latino: '🇲🇽',
};

const codeLanguageMap: Record<string, string> = {
  EN: 'english',
  JA: 'japanese',
  ZH: 'chinese',
  RU: 'russian',
  AR: 'arabic',
  PT: 'portuguese',
  ES: 'spanish',
  FR: 'french',
  DE: 'german',
  IT: 'italian',
  KO: 'korean',
  HI: 'hindi',
  BN: 'bengali',
  PA: 'punjabi',
  MR: 'marathi',
  GU: 'gujarati',
  TA: 'tamil',
  TE: 'telugu',
  KN: 'kannada',
  ML: 'malayalam',
  TH: 'thai',
  VI: 'vietnamese',
  ID: 'indonesian',
  TR: 'turkish',
  HE: 'hebrew',
  FA: 'persian',
  UK: 'ukrainian',
  EL: 'greek',
  LT: 'lithuanian',
  LV: 'latvian',
  ET: 'estonian',
  PL: 'polish',
  CS: 'czech',
  SK: 'slovak',
  HU: 'hungarian',
  RO: 'romanian',
  BG: 'bulgarian',
  SR: 'serbian',
  HR: 'croatian',
  SL: 'slovenian',
  NL: 'dutch',
  DA: 'danish',
  FI: 'finnish',
  SV: 'swedish',
  NO: 'norwegian',
  MS: 'malay',
  LA: 'latino',
  MX: 'Latino',
};
