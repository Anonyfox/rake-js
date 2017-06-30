/**
 * This Stemmer is a class and not a function because it must be able to track
 * all processed words and stems for later usage. You can initialize one for
 * a given language and then use its `stem` method repeatedly. It keeps track
 * of both: words and their stems, simultanously.
 */

import * as Snowball from 'snowball'
import StringCounter from '../data_structures/string_counter'

export default class Stemmer {
  // cache mapping 'word' -> 'stem'
  public wordStems: { [word: string]: string } = {}

  // cache occurences of stems and words
  private wordCounts = new StringCounter()
  private stemCounts = new StringCounter()

  // external stemming library
  private stemmer: any

  // for a list of available languages, see
  // https://github.com/fortnightlabs/snowball-js/tree/master/stemmer/src/ext
  constructor(private language: string = 'english') {
    this.stemmer = new Snowball(language)
  }

  // process a given word, return the stem, and track metrics
  public stem(word: string): string {
    let stem = this.wordStems[word]
    if (!stem) {
      this.stemmer.setCurrent(word)
      this.stemmer.stem()
      stem = this.stemmer.getCurrent()
      this.wordStems[word] = stem
    }
    this.stemCounts.count(stem)
    // this.wordCounts.count(word);
    return stem
  }

  public getStems(): string[] {
    return this.stemCounts.strings()
  }
}
