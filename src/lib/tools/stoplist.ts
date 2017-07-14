/**
 * This module loads a big list of stopwords for various languages from the
 * json file in the `data` folder, and returns the specific list for a given
 * language as a `Set`.
 * This module loads a language's stopwords array from predefined typescript
 * files. For more languages, ensure that the `guess_language` function can
 * recognize them, add their name mapping there, and create a new file with
 * that name in the 'stopwords'-folder. There is a vast amount of source-data
 * available for many languages in the top-level 'data'-folder.
 */

export default function load(language: string): Set<string> {
  const list: string[] = require('../stopwords/' + language).default
  return new Set(list)
}
