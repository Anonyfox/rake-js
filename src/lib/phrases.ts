import { groupBy, map, sortBy, take } from 'lodash'
import Stemmer from './tools/stemmer'
import strip from './tools/strip'

export class Phrases {
  // hold all results
  public phrases: Phrase[] = []

  // cache the last words until a phrase is completed
  private cache: Phrase

  // initialize with external plugins for word processing
  constructor(private stemmer: Stemmer, private stopwords: Set<string>) {
    this.setNewPhraseCache()
  }

  // execute a given word array and add the results to the internal corpora
  public process(wordArray: string[]) {
    for (const phrase of wordArray) {
      this.push(phrase.toLowerCase())
    }
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
    return map(take(phrases, Math.ceil(this.phrases.length / 3.0)), 'text')
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
    this.cache = new Phrase(this.stemmer)
  }

  // move the internal cache into the result list, reset the cache
  private finalizePhraseCache() {
    if (!this.cache.isEmpty()) {
      this.cache.createText()
      this.phrases.push(this.cache)
      this.setNewPhraseCache()
    }
  }
}

// tslint:disable-next-line
export class Phrase {
  public text: string
  public words: string[] = []
  public stems: string[] = []
  public score: number = 0.0

  constructor(private stemmer: Stemmer) {}

  public isEmpty() {
    return this.words.length === 0
  }

  public pushWord(word: string) {
    if (word && word.length > 1) {
      this.words.push(word)
      this.stems.push(this.stemmer.stem(word))
    }
  }

  public createText() {
    this.text = this.words.join(' ')
  }

  public calculateScore(stemIndex: { [stem: string]: number }) {
    let sum = 0.0
    for (const stem of this.stems) {
      sum += stemIndex[stem]
    }
    this.score = sum
  }

  public multiplyWith(amount: number) {
    this.score *= amount
  }
}
