import { strip } from './clean';

// tslint:disable-next-line
const stopwords = require('../../data/stopwords.json');

// see https://www.npmjs.com/package/stopwords-json for overview
const languageMappings = {
  dutch: 'nl',
  english: 'en',
  german: 'de',
  italian: 'it',
  portuguese: 'pt',
  spanish: 'es',
  swedish: 'sv',
};

export function load(language: string): Set<string> {
  const list: string[] = stopwords[languageMappings[language]];
  return new Set(list);
}
