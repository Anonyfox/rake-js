import { expect } from 'chai';
import { skip, slow, suite, test, timeout } from 'mocha-typescript';
import * as stopwords from 'nltk-stopwords';

import { CandidatesDictionary } from '../lib/candidates_dictionary';
import { CoOccurencesMatrix } from '../lib/co_occurences_matrix';

@suite(timeout(3000), slow(1000))
class CoOccurencesMatrixTest {

    @test public worksOnSimpleTexts() {
        const corpus = `For decades, video games have been criticized for
                purportedly wasting time, stifling creativity, and even
                influencing violent behaviors. Now, it seems that video games
                have become an unlikely tool for AI researchers to improve
                their systems.`.split(/\s+/);
        const stops: Set<string> = stopwords.load('english');
        const dict = new CandidatesDictionary(corpus, stops);
        const matrix = new CoOccurencesMatrix(dict.values(), dict.occurences());
        const result = matrix.getBestPhrases();
        const expected = [ 'even influencing violent behaviors',
            'purportedly wasting time',
            'video games',
            'unlikely tool',
            'stifling creativity' ];
        // tslint:disable-next-line
        // console.log('comatrix: ', result);
        expect(result).to.have.same.members(expected);
    }

}
