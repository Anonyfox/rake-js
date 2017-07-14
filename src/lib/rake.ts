import { map } from 'lodash'
import { Matrix } from './matrix'
import { load } from './stoplist'
import { languageName } from './tools/guess_language'
import Parser from './tools/parser'
import Preprocessor from './tools/preprocessor'
import Stemmer from './tools/stemmer'

// can be used to tweak the algorithm or to use it without the defaults
export interface IAlgorithmOptions {
  delimiters: string[]
  language: languageName
}

// the actual parameters for the RAKE algorithm
export interface IAlgorithmParameters extends IAlgorithmOptions {
  corpus: string
}

export function rake(params: IAlgorithmParameters): string[] {
  // step 1: split the corpus text into a word array on `delimiters`
  const preprocessor = new Preprocessor(params.delimiters)
  const wordArray = preprocessor.process(params.corpus)

  // step 2: loop through all words, generate ngrams/stems/phrases/metrics
  const stemmer = new Stemmer(params.language)
  const stopwords = load(params.language)
  const parser = new Parser(stemmer, stopwords).process(wordArray)

  // step 3: build a co-occurence matrix for all words (-> stems)
  const stemList = stemmer.getStems()
  const matrix = new Matrix(stemList)
  for (const phrase of parser.phrases) {
    matrix.process(phrase.stems)
  }
  const stemScores = matrix.calculateScores()

  // step 4: examine the phrases with the best combined scores
  for (const phrase of parser.phrases) {
    phrase.calculateScore(stemScores)
  }
  parser.joinDuplicates()
  return parser.bestPhrases()
}
