import { includes, isNumber, map } from 'lodash';
import * as stopwords from 'nltk-stopwords';
import { CandidatesDictionary } from './candidates_dictionary';
import { languageName, strip } from './clean';
import { CoOccurencesMatrix } from './co_occurences_matrix';

// can be used to tweak the algorithm or to use it without the defaults
export interface IAlgorithmOptions {
    delimiters: string[];
    language: languageName;
    stopwords: Set<string>;
}

// the actual parameters for the RAKE algorithm
export interface IAlgorithmParameters extends IAlgorithmOptions {
    corpus: string;
}

export function rake(params: IAlgorithmParameters): string[] {
    // step 1: split the corpus text into a word array on `delimiters`
    const splitter = buildDelimiterRegexp(params.delimiters);
    const wordArray = params.corpus.replace(/\\[nrt]/g, '. ').split(splitter);

    // step 2: find possible candidate phrases
    const dict = new CandidatesDictionary(wordArray, params.stopwords);

    // step 3: build a matrix of co-occurences of all words
    const matrix = new CoOccurencesMatrix(dict.values(), dict.occurences());

    // step 4: return the phrases with the best scoring phrases
    return matrix.getBestPhrases();
}

// build a single splitter regexp from the given delimiter characters
export function buildDelimiterRegexp(delimiters: string[]): RegExp {
    const patterns = map(delimiters, (d) => '(' + d + ')');
    const expression = '[' + patterns.join('') + ']';
    return new RegExp(expression, 'g');
}
