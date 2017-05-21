/**
 * This Stemmer is a class and not a function because it must be able to track
 * all processed words and stems for later usage. You can initialize one for
 * a given language and then use its `stem` method repeatedly.
 */

import * as Snowball from 'snowball';

export class Stemmer {
    // cache mapping 'word' -> 'stem'
    public wordStems: {[word: string]: string} = {};

    // cache occurences of stems and words
    public wordCounts: {[word: string]: number} = {};
    public stemCounts: {[stem: string]: number} = {};

    // external stemming library
    private stemmer: any;

    // for a list of available languages, see https://github.com/fortnightlabs/snowball-js/tree/master/stemmer/src/ext
    constructor(private language: string = 'english') {
        this.stemmer = new Snowball(language);
    }

    // process a given word, return the stem, and track metrics
    public stem(word: string): string {
        let stem = this.wordStems[word];
        if (!stem) {
            this.stemmer.setCurrent(word);
            this.stemmer.stem();
            stem = this.stemmer.getCurrent();
            this.wordStems[word] = stem;
        }
        this.trackStem(stem);
        this.trackWord(word);
        return stem;
    }

    public getStems() {
        return Object.keys(this.stemCounts);
    }

    // just '+1' the given word
    private trackWord(word: string) {
        if (this.wordCounts[word]) {
            this.wordCounts[word]++;
        } else {
            this.wordCounts[word] = 1;
        }
    }

    // just '+1' the given stem
    private trackStem(stem: string) {
        if (this.stemCounts[stem]) {
            this.stemCounts[stem]++;
        } else {
            this.stemCounts[stem] = 1;
        }
    }
}
