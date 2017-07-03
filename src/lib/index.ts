import { merge } from 'lodash'
import { IAlgorithmOptions, IAlgorithmParameters, rake } from './rake'
import guessLanguage from './tools/guess_language'

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
