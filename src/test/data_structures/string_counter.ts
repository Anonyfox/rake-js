import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import StringCounter from '../../lib/data_structures/string_counter'

@suite(timeout(100), slow(10))
class StringCounterTest {
  @test
  public countsNewWords() {
    const sc = new StringCounter()
    sc.count('lorem')
    sc.count('ipsum')
    const result = sc.strings()
    const expected = ['lorem', 'ipsum']
    expect(result).to.have.same.members(expected)
  }

  @test
  public countsExistingWords() {
    const sc = new StringCounter()
    sc.count('lorem')
    sc.count('lorem')
    const result = sc.strings()
    const expected = ['lorem']
    expect(result).to.have.same.members(expected)
  }

  @test
  public ignoresEmptyInput() {
    const sc = new StringCounter()
    sc.count('')
    sc.count(null)
    const result = sc.strings()
    const expected = []
    expect(result).to.have.same.members(expected)
  }
}
