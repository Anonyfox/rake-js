import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import Stemmer from '../../lib/tools/stemmer'

@suite(timeout(100), slow(10))
class StemmerTest {
  @test
  public worksWithEnglishDefaults() {
    const stemmer = new Stemmer()
    stemmer.stem('working')
    const result = stemmer.getStems()
    const expected = ['work']
    expect(result).to.have.same.members(expected)
  }
}
