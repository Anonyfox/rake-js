import { groupBy, invert, map, sortBy, sum, take } from 'lodash'
import { clean, languageName } from './clean'
import { Matrix } from './matrix'
import { Phrases } from './phrases'
import { load } from './stoplist'
import Stemmer from './tools/stemmer'
import strip from './tools/strip'

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
  const splitter = buildDelimiterRegexp(params.delimiters)
  const wordArray = params.corpus.replace(/\\[nrt]/g, '. ').split(splitter)

  // step 2: loop through all words, generate ngrams/stems/phrases/metrics
  const stemmer = new Stemmer(params.language)
  const stopwords = load(params.language)
  const phrases = new Phrases(stemmer, stopwords)
  phrases.process(wordArray)

  // step 3: build a co-occurence matrix for all words (-> stems)
  const stemList = stemmer.getStems()
  const matrix = new Matrix(stemList)
  for (const phrase of phrases.phrases) {
    matrix.process(phrase.stems)
  }
  const stemScores = matrix.calculateScores()

  // step 4: examine the phrases with the best combined scores
  for (const phrase of phrases.phrases) {
    phrase.calculateScore(stemScores)
  }
  phrases.joinDuplicates()
  const results = phrases.bestPhrases()
  return results
}

// build a single splitter regexp from the given delimiter characters
export function buildDelimiterRegexp(delimiters: string[]): RegExp {
  const patterns = map(delimiters, d => '(' + d + ')')
  const expression = '[' + patterns.join('') + ']'
  return new RegExp(expression, 'g')
}
