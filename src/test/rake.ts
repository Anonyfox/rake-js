import { expect } from 'chai';
import { readFileSync } from 'fs';
import { skip, slow, suite, test, timeout } from 'mocha-typescript';
import * as stopwords from 'nltk-stopwords';
import { join } from 'path';

import { buildDelimiterRegexp, IAlgorithmParameters, rake } from '../lib/rake';

@suite(timeout(1000), slow(100))
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
        const expected = [ 'purportedly wasting time',
            'influencing violent behaviors',
            'video games',
            'unlikely tool',
            'stifling creativity' ];
        const result = rake(input);
        // tslint:disable-next-line
        // console.log(result);
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
        expect(result).to.include('video game developers');
        expect(result).to.include('video games');
        expect(result).to.include('machine learning');
    }

    @test public worksWithGermanNewsContent() {
        const file = join(__dirname, '..', '..', 'examples', 'spiegel.txt');
        const input: IAlgorithmParameters = {
            corpus: readFileSync(file, 'utf-8'),
            delimiters: ['\\s+'],
            language: 'german',
            stopwords: stopwords.load('german'),
        };
        const result = rake(input);
        // tslint:disable-next-line
        // console.log(result);
        expect(result).to.include('verteuerungen');
        expect(result).to.include('viele vermieter');
        expect(result).to.include('widerstand');
    }

    @test public worksWithLongFormContent() {
        const file = join(__dirname, '..', '..', 'examples', 'waitbutwhy.txt');
        const input: IAlgorithmParameters = {
            corpus: readFileSync(file, 'utf-8'),
            delimiters: ['\\s+'],
            language: 'english',
            stopwords: stopwords.load('english'),
        };
        const result = rake(input);
        // tslint:disable-next-line
        // console.log(result);
        expect(result).to.include('artificial neural network');
        expect(result).to.include('world chess champion');
        expect(result).to.include('exceeds human intelligence');
    }

}
