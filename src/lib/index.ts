import * as franc from 'franc'
import { merge } from 'lodash'
import { IAlgorithmOptions, IAlgorithmParameters, rake } from './rake'

const defaults: IAlgorithmOptions = {
  delimiters: ['\\s+'],
  language: 'english',
}

export default function process(
  text: string,
  opts?: IAlgorithmOptions
): string[] {
  const options: IAlgorithmOptions = merge({}, defaults, opts)
  if (!opts || !opts.language) {
    options.language = guessLanguage(text)
  }
  const params = merge(options, { corpus: text })
  const keywords = rake(params)
  return keywords
}

// currently supported natural languages
type languageName =
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

// detect the language of a given string
function guessLanguage(text: string): languageName {
  return languageNameMapping[franc(text)] || 'english'
}
