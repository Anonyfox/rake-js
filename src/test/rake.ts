import { expect } from 'chai'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { IParameters, rake } from '../lib/rake'

@suite(timeout(1000), slow(100))
class RAKE {
  @test
  public worksWithSimpleTexts() {
    const input: IParameters = {
      corpus: `For decades, video games have been criticized for
                purportedly wasting time, stifling creativity, and even
                influencing violent behaviors. Now, it seems that video games
                have become an unlikely tool for AI researchers to improve
                their systems.`,
      delimiters: ['\\s+'],
      language: 'english',
    }
    const expected = [
      'video games',
      'purportedly wasting time',
      'influencing violent behaviors',
      'stifling creativity',
    ]

    const result = rake(input)
    // tslint:disable-next-line
    // console.log(result)
    expect(result).to.have.same.members(expected)
  }

  @test
  public worksWithNewsContent() {
    const file = join(__dirname, '..', '..', 'examples', 'venturebeat.txt')
    const input: IParameters = {
      corpus: readFileSync(file, 'utf-8'),
      delimiters: ['\\s+'],
      language: 'english',
    }
    const result = rake(input)
    // tslint:disable-next-line
    // console.log(result)
    expect(result).to.include('latest game dev tools')
    expect(result).to.include('video games')
    expect(result).to.include('machine learning')
  }

  @test
  public worksWithGermanNewsContent() {
    const file = join(__dirname, '..', '..', 'examples', 'spiegel.txt')
    const input: IParameters = {
      corpus: readFileSync(file, 'utf-8'),
      delimiters: ['\\s+'],
      language: 'german',
    }
    const result = rake(input)
    // tslint:disable-next-line
    // console.log(result);
    expect(result).to.include('mietpreisbremse')
    expect(result).to.include('vermieter')
    expect(result).to.include('deutschland')
  }

  @test
  public worksWithGermanPressContent() {
    const file = join(__dirname, '..', '..', 'examples', 'ntv.txt')
    const input: IParameters = {
      corpus: readFileSync(file, 'utf-8'),
      delimiters: ['\\s+'],
      language: 'german',
    }
    const result = rake(input)
    // tslint:disable-next-line
    // console.log(result)
    expect(result).to.include('teleskop')
    expect(result).to.include('california institute of technology caltech')
    expect(result).to.include('de zeeuw')
  }

  @test
  public worksWithLongFormContent() {
    const file = join(__dirname, '..', '..', 'examples', 'waitbutwhy.txt')
    const input: IParameters = {
      corpus: readFileSync(file, 'utf-8'),
      delimiters: ['\\s+'],
      language: 'english',
    }
    const result = rake(input)
    // tslint:disable-next-line
    // console.log(result);
    expect(result).to.include('artificial intelligence')
    expect(result).to.include('brain emulation')
    expect(result).to.include('computers')
    expect(result).to.include('evolution')
  }
}
