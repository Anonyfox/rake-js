/**
 * This module can be used to remove non-word characters and non-content words
 * from strings. It is able to detect the natural language on its own.
 */

import { map } from 'lodash'

export default class Preprocessor {
  private splitter: RegExp

  constructor(private delimiters: string[]) {
    this.buildDelimiterRegexp()
  }

  public process(corpus: string): string[] {
    return corpus.replace(/\\[nrt]/g, '. ').split(this.splitter).filter(Boolean)
  }

  private buildDelimiterRegexp() {
    const patterns = map(this.delimiters, d => '(' + d + ')')
    const expression = '[' + patterns.join('') + ']'
    this.splitter = new RegExp(expression, 'g')
  }
}
