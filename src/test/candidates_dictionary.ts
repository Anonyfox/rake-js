import { readFileSync } from 'fs';
import { join } from 'path';

import { expect } from 'chai';
import { skip, slow, suite, test, timeout } from 'mocha-typescript';
import * as stopwords from 'nltk-stopwords';

import { CandidatesDictionary } from '../lib/candidates_dictionary';

@suite(timeout(100), slow(50))
class CandidatesDictionaryTest {

    @test public worksOnSimpleTexts() {
        const corpus = `For decades, video games have been criticized for
                purportedly wasting time, stifling creativity, and even
                influencing violent behaviors. Now, it seems that video games
                have become an unlikely tool for AI researchers to improve
                their systems.`.split(/\s+/);
        const stops: Set<string> = stopwords.load('english');
        const dict = new CandidatesDictionary(corpus, stops);
        const result = dict.values();
        const expected = [ 'decades',
            'video games',
            'criticized',
            'purportedly wasting time',
            'stifling creativity',
            'even influencing violent behaviors',
            'seems',
            'video games',
            'become',
            'unlikely tool',
            'ai',
            'researchers',
            'improve',
            'systems' ];
        expect(result).to.have.same.members(expected);
    }

    @test public worksOnNewsContent() {
        const file = join(__dirname, '..', '..', 'examples', 'venturebeat.txt');
        const corpus = readFileSync(file, 'utf-8')
            .replace(/\\[nrt]/g, ' ')
            .split(/\s+/);
        // tslint:disable-next-line
        // console.log('corpus words: ', corpus);
        const stops: Set<string> = stopwords.load('english');
        const dict = new CandidatesDictionary(corpus, stops);
        const result = dict.values();
        const expected = 'video games';
        expect(result).to.include(expected);
    }

    @test public worksOnLongFormContent() {
        const file = join(__dirname, '..', '..', 'examples', 'waitbutwhy.txt');
        const corpus = readFileSync(file, 'utf-8')
            .replace(/\\[nrt]/g, ' ')
            .split(/\s+/);
        const stops: Set<string> = stopwords.load('english');
        const dict = new CandidatesDictionary(corpus, stops);
        const result = dict.values();
        // tslint:disable-next-line
        // console.log('corpus words: ', result, dict.occurences());
        expect(result).to.include('intelligence');
        expect(result).to.include('artificial');
        expect(result).to.include('ai');
    }

}
