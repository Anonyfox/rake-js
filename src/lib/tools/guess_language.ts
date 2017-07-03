/**
 * This module can be used to remove non-word characters and non-content words
 * from strings. It is able to detect the natural language on its own.
 */

import * as franc from 'franc'

// currently supported natural languages
export type languageName =
  | 'german'
  | 'english'
  | 'italian'
  | 'dutch'
  | 'portugese'
  | 'spanish'
  | 'swedish'

// just a few language codes of 'franc' mapped to 'nltk-stopwords'-keys for now
const languageNameMapping = {
  deu: 'german',
  eng: 'english',
  ita: 'italian',
  nld: 'dutch',
  por: 'portuguese',
  spa: 'spanish',
  swh: 'swedish',
}

// detect the language of a given string or word array
export default function guessLanguage(text: string): languageName {
  return languageNameMapping[franc(text)] || 'english'
}
