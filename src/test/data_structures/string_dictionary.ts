import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import StringDictionary from '../../lib/data_structures/string_dictionary'

@suite(timeout(100), slow(10))
class StringDictionaryTest {
  @test
  public addsNewWords() {
    const sd = new StringDictionary()
    sd.add('lorem', 'ipsum')
    const result = sd.get('lorem')
    const expected = 'ipsum'
    expect(result).to.be.equal(expected)
  }
}
