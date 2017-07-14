import { map } from 'lodash'
import Stemmer from '../tools/stemmer'

/**
 * This is a container holding a bag of words and their stems. All words
 * together carry a combined meaning, and can be
 */
export default class Phrase {
  public text: string
  public words: string[] = []
  public stems: string[] = []
  public score: number = 0.0

  public isEmpty() {
    return this.words.length === 0
  }

  public pushWord(word: string) {
    if (word && word.length > 1) {
      this.words.push(word)
    }
  }

  public createText() {
    this.text = this.words.join(' ')
  }

  public calculateStems(stemmer: Stemmer) {
    this.stems = map(this.words, word => stemmer.stem(word))
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
