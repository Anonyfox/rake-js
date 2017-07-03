import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import Preprocessor from '../../lib/tools/preprocessor'

@suite(timeout(100), slow(10))
class Index {
  @test
  public cleanStringEnglish() {
    const pp = new Preprocessor(['. '])
    const result = pp.process('Hello. World')
    const expected = ['Hello', 'World']
    expect(result).to.have.same.members(expected)
  }
}
