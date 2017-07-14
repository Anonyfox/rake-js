import { groupBy, map, sortBy, take } from 'lodash'
import Phrase from '../data_structures/phrase'
import Stemmer from './stemmer'
import strip from './strip'

/**
 * This Parser is able to take a bag of words (from a preprocessed text corpus)
 * and collect them into an array of Phrases. Phrases are n-grams of
 * subsequent words which may describe the corpus better than the individual
 * words standalone.
 */
export default class Parser {
  // hold all results
  public phrases: Phrase[] = []

  // cache the last words until a phrase is completed
  private cache: Phrase

  // initialize with external plugins for word processing
  constructor(private stemmer: Stemmer, private stopwords: Set<string>) {
    this.setNewPhraseCache()
  }

  // execute a given word array and add the results to the internal corpora
  public process(wordArray: string[]): Parser {
    for (const phrase of wordArray) {
      this.push(phrase.toLowerCase())
    }
    this.stemAll()
    return this
  }

  public joinDuplicates() {
    const groups = groupBy(this.phrases, 'text')
    const resultList = []
    for (const text in groups) {
      if (text) {
        const group = groups[text]
        const amount = group.length
        group[0].multiplyWith(amount)
        resultList.push(group[0])
      }
    }
    this.phrases = resultList
  }

  public bestPhrases(): string[] {
    const phrases = sortBy(this.phrases, ['score', 'text']).reverse()
    const optimalAmount = Math.ceil(this.phrases.length / 3.0)
    return map(take(phrases, optimalAmount), 'text')
  }

  // add words to the internal phrase cache, or move on with the next phrase
  private push(phrase: string) {
    for (const word of phrase.split(/\s+/)) {
      const strippedWord = strip(word)
      const hasPunctuation = strippedWord !== word
      const isStopWord = this.stopwords.has(word)
      if (isStopWord || word.length < 2) {
        this.finalizePhraseCache()
      } else if (hasPunctuation) {
        this.cache.pushWord(strippedWord)
        this.finalizePhraseCache()
      } else {
        this.cache.pushWord(strippedWord)
      }
    }
  }

  // reset the internal cache to a new blank object
  private setNewPhraseCache() {
    this.cache = new Phrase()
  }

  // move the internal cache into the result list, reset the cache
  private finalizePhraseCache() {
    if (!this.cache.isEmpty()) {
      this.cache.createText()
      this.phrases.push(this.cache)
      this.setNewPhraseCache()
    }
  }

  // stemm all words in all phrases
  private stemAll() {
    for (const phrase of this.phrases) {
      phrase.calculateStems(this.stemmer)
    }
  }
}
