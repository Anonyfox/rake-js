/**
 * This module can be used to remove non-word characters and non-content words
 * from strings. It is able to detect the natural language on its own.
 */

// used packages
import * as condenseWhitespace from 'condense-whitespace';
import * as franc from 'franc';
import { isString } from 'lodash';
import * as stopwords from 'nltk-stopwords';

// currently supported natural languages
export type languageName =
  | 'german'
  | 'english'
  | 'italian'
  | 'dutch'
  | 'portugese'
  | 'spanish'
  | 'swedish';

// replace all non-word characters from string
export function strip(text: string): string {
  const txt = text
    .replace(/[^a-zäöüß']/gi, ' ')
    .replace(/(^|\s)+\w($|\s)+/g, ' ');
  return condenseWhitespace(txt);
}

// just a few language codes of 'franc' mapped to 'nltk-stopwords'-keys for now
const languageNameMapping = {
  deu: 'german',
  eng: 'english',
  ita: 'italian',
  nld: 'dutch',
  por: 'portuguese',
  spa: 'spanish',
  swh: 'swedish',
};

// remove all stopwords from a given string or array of words.
export function clean(
  text: string | string[],
  language?: languageName
): string {
  if (!language) {
    language = guessLanguage(text);
  }
  return stopwords.remove(text, language);
}

// detect the language of a given string or word array
function guessLanguage(text: string | string[]): languageName {
  if (isString(text as string)) {
    return languageNameMapping[franc(text)] || 'english';
  } else if ((text as string[]).join) {
    const corpus = (text as string[]).join(' ');
    return languageNameMapping[franc(corpus)] || 'english';
  }
}
