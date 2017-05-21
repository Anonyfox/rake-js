import { expect } from 'chai';
import { readFileSync } from 'fs';
import { skip, slow, suite, test, timeout } from 'mocha-typescript';
import * as stopwords from 'nltk-stopwords';
import { join } from 'path';

import { buildDelimiterRegexp, IAlgorithmParameters, rake } from '../lib/rake';

@suite(timeout(3000), slow(1000))
class RAKE {

    @test public buildSplitterFromDelimiterArray() {
        const input = ['\\s', '\\.', '\\?', '!'];
        const result = /[(\s)(\.)(\?)(!)]/g.toString();
        expect(buildDelimiterRegexp(input).toString()).to.be.equal(result);
    }

    @test public worksWithSimpleTexts() {
        const input: IAlgorithmParameters = {
            corpus: `For decades, video games have been criticized for
                purportedly wasting time, stifling creativity, and even
                influencing violent behaviors. Now, it seems that video games
                have become an unlikely tool for AI researchers to improve
                their systems.`,
            delimiters: ['\\s+'],
            language: 'english',
            stopwords: stopwords.load('english'),
        };
        const expected = [ 'ai',
            'video games',
            'purportedly wasting time',
            'influencing violent behaviors',
            'unlikely tool' ];
        const result = rake(input);
        expect(result).to.have.same.members(expected);
    }

    @test public worksWithNewsContent() {
        const file = join(__dirname, '..', '..', 'examples', 'venturebeat.txt');
        const input: IAlgorithmParameters = {
            corpus: readFileSync(file, 'utf-8'),
            delimiters: ['\\s+'],
            language: 'english',
            stopwords: stopwords.load('english'),
        };
        const result = rake(input);
        // tslint:disable-next-line
        // console.log(result);
        expect(result).to.include('ai');
        expect(result).to.include('video games');
    }

}
