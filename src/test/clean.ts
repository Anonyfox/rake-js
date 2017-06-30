import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { clean, strip } from '../lib/clean'

@suite(timeout(3000), slow(1000))
class Index {
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

  @test
  public cleanStringEnglish() {
    const input = clean(
      'I know that I can use some second expectation.',
      'english'
    )
    const result = 'I know I use second expectation.'
    expect(input).to.be.equal(result)
  }

  @test
  public cleanStringEnglishUnknown() {
    const input = clean('I know that I can use some second expectation.')
    const result = 'I know I use second expectation.'
    expect(input).to.be.equal(result)
  }

  @test
  public cleanArrayEnglish() {
    const input = clean(
      'I know I use second expectation.'.split(' '),
      'english'
    )
    const result = ['I', 'know', 'I', 'use', 'second', 'expectation.']
    expect(input).to.have.same.members(result)
  }

  @test
  public cleanArrayEnglishUnknown() {
    const input = clean('I know I use second expectation.'.split(' '))
    const result = ['I', 'know', 'I', 'use', 'second', 'expectation.']
    expect(input).to.have.same.members(result)
  }

  @test
  public cleanStringGerman() {
    const input = clean('Die eine Sache von damals.', 'german')
    const result = 'Die Sache damals.'
    expect(input).to.be.equal(result)
  }

  @test
  public cleanStringGermanUnknown() {
    const input = clean('Die eine Sache von damals.')
    const result = 'Die Sache damals.'
    expect(input).to.be.equal(result)
  }

  @test
  public cleanArrayGerman() {
    const input = clean(['Die', 'eine', 'Sache', 'von', 'damals'], 'german')
    const result = ['Die', 'Sache', 'damals']
    expect(input).to.have.same.members(result)
  }

  @test
  public cleanArrayGermanUnknown() {
    const input = clean(['Die', 'eine', 'Sache', 'von', 'damals'])
    const result = ['Die', 'Sache', 'damals']
    expect(input).to.have.same.members(result)
  }
}
