import { readFileSync } from 'fs';
import { join } from 'path';

import { expect } from 'chai';
import { skip, slow, suite, test, timeout } from 'mocha-typescript';
import * as Snowball from 'snowball';

import { CandidatesDictionary } from '../lib/candidates_dictionary';
import { load } from '../lib/stoplist';

@suite(timeout(100), slow(50))
class CandidatesDictionaryTest {

    @test public worksOnSimpleTexts() {
        const corpus = `For decades, video games have been criticized for
                purportedly wasting time, stifling creativity, and even
                influencing violent behaviors. Now, it seems that video games
                have become an unlikely tool for AI researchers to improve
                their systems.`.split(/\s+/);
        const stops: Set<string> = load('english');
        const stemmer = new Snowball('English');
        const dict = new CandidatesDictionary(corpus, stops, stemmer);
        const result = dict.values();
        const expected = [ 'decades',
            'video games',
            'criticized',
            'purportedly wasting time',
            'stifling creativity',
            'influencing violent behaviors',
            'video games',
            'tool',
            'ai',
            'researchers',
            'improve',
            'systems' ];
        // tslint:disable-next-line
        // console.log('corpus words: ', result);
        expect(result).to.have.same.members(expected);
    }

    @test public worksOnNewsContent() {
        const file = join(__dirname, '..', '..', 'examples', 'venturebeat.txt');
        const corpus = readFileSync(file, 'utf-8')
            .replace(/\\[nrt]/g, ' ')
            .split(/\s+/);
        const stops: Set<string> = load('english');
        const dict = new CandidatesDictionary(corpus, stops);
        const result = dict.values();
        const expected = 'video games';
        // tslint:disable-next-line
        // console.log('corpus words: ', result);
        expect(result).to.include(expected);
    }

    @test public worksOnLongFormContent() {
        const file = join(__dirname, '..', '..', 'examples', 'waitbutwhy.txt');
        const corpus = readFileSync(file, 'utf-8')
            .replace(/\\[nrt]/g, ' ')
            .split(/\s+/);
        const stops: Set<string> = load('english');
        const dict = new CandidatesDictionary(corpus, stops);
        const result = dict.values();
        // tslint:disable-next-line
        // console.log('corpus words: ', result, dict.occurences());
        expect(result).to.include('intelligence');
        expect(result).to.include('artificial');
        expect(result).to.include('ai');
    }

}
