import { merge } from 'lodash'
import { IOptions, rake } from './rake'
import guessLanguage from './tools/guess_language'

const defaults: IOptions = {
  delimiters: ['\\s+'],
  language: 'english',
  stopWords: [],
}

export default function process(text: string, opts?: IOptions): string[] {
  const options: IOptions = merge({}, defaults, opts)
  if (!opts || !opts.language) {
    options.language = guessLanguage(text)
  }
  const params = merge(options, { corpus: text })
  const keywords = rake(params)
  return keywords
}
