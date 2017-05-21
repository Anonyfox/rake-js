import { expect } from 'chai';
import { readFileSync } from 'fs';
import { skip, slow, suite, test, timeout } from 'mocha-typescript';
import { join } from 'path';
import * as Snowball from 'snowball';
import { load } from '../lib/stoplist';

import { buildDelimiterRegexp, IAlgorithmParameters, rake } from '../lib/rake_2';

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
            stemmer: new Snowball('English'),
            stopwords: load('english'),
        };
        const expected = [ 'video games',
            'purportedly wasting time',
            'influencing violent behaviors',
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
            stemmer: new Snowball('English'),
            stopwords: load('english'),
        };
        const result = rake(input);
        // tslint:disable-next-line
        // console.log(result);
        expect(result).to.include('latest game dev tools');
        expect(result).to.include('video games');
        expect(result).to.include('machine learning');
    }

    @test public worksWithGermanNewsContent() {
        const file = join(__dirname, '..', '..', 'examples', 'spiegel.txt');
        const input: IAlgorithmParameters = {
            corpus: readFileSync(file, 'utf-8'),
            delimiters: ['\\s+'],
            language: 'german',
            stemmer: new Snowball('german'),
            stopwords: load('german'),
        };
        const result = rake(input);
        // tslint:disable-next-line
        // console.log(result);
        expect(result).to.include('mietpreisbremse');
        expect(result).to.include('vermieter');
        expect(result).to.include('deutschland');
    }

    @test public worksWithLongFormContent() {
        const file = join(__dirname, '..', '..', 'examples', 'waitbutwhy.txt');
        const input: IAlgorithmParameters = {
            corpus: readFileSync(file, 'utf-8'),
            delimiters: ['\\s+'],
            language: 'english',
            stemmer: new Snowball('English'),
            stopwords: load('english'),
        };
        const result = rake(input);
        // tslint:disable-next-line
        // console.log(result);
        expect(result).to.include('artificial intelligence');
        expect(result).to.include('brain emulation');
        expect(result).to.include('computers');
        expect(result).to.include('evolution');
    }

}
