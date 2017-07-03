import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import guessLanguage from '../../lib/tools/guess_language'

@suite(timeout(3000), slow(1000))
class GuessLanguage {
  @test
  public guessesEnglish() {
    const result = guessLanguage('Hello World')
    const expected = 'english'
    expect(result).be.equal(expected)
  }
}
