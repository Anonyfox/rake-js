import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import strip from '../../lib/tools/strip'

@suite(timeout(100), slow(10))
class StripTest {
  @test
  public removesNonAsciiCharacters() {
    const corpus = 'Hello +*# World'
    const result = strip(corpus)
    const expected = 'Hello World'
    expect(result).to.be.equal(expected)
  }

  @test
  public stripPunctuation() {
    expect(strip('test.')).to.be.equal('test')
  }

  @test
  public stripNoUmlauts() {
    expect(strip('täst')).to.be.equal('täst')
  }

  @test
  public stripBadWhitespace() {
    expect(strip(' aa  \t \r \n \r\n bb ')).to.be.equal('aa bb')
  }
}
