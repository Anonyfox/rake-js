import { clean, strip } from './clean';
import { IAlgorithmParameters } from './rake';

export class CandidatesDictionary {
    private candidates: string[] = [];
    private stoplist: Set<string>;
    private lastPhrase: string = '';
    private wordOccurences: { [word: string]: number} = {};

    constructor(wordArray: string[], stoplist: Set<string>) {
        this.stoplist = stoplist;
        for (const phrase of wordArray) {
            this.push(phrase);
        }
        this.pop(); // possible leftover phrase!
    }

    // return the internal result value
    public values(): string[] {
        return this.candidates;
    }

    // return the wordOccurences metrics
    public occurences(): { [word: string]: number} {
        return this.wordOccurences;
    }

    // core logic: analyze and add another phrase to the dict
    private push(phrase: string) {
        const phraseCleaned = strip(phrase.toLowerCase());
        if (/\s+/.test(phraseCleaned)) {
            // throw new Error(`whitespace phrase: ${phrase} -> ${phraseCleaned}`);
            this.pop();
        } else if (this.stoplist.has(phraseCleaned)) { // discard stopwords
            this.pop();
        } else if (phrase === phraseCleaned) { // stash clean phrases
            this.stash(phrase);
        } else { // pop phrase from cache and move to result list
            this.stash(phraseCleaned);
            this.pop();
        }
    }

    // add the phrase to the current `lastPhrase` cache
    private stash(phrase: string) {
        this.count(phrase);
        if (this.lastPhrase === '') {
            this.lastPhrase = phrase;
        } else {
            this.lastPhrase = this.lastPhrase + ' ' + phrase;
        }
    }

    // take the value out of the `lastPhrase` cache and into the candidatess list
    private pop() {
        if (this.lastPhrase !== '') {
            this.candidates.push(this.lastPhrase);
            this.lastPhrase = '';
        }
    }

    // count occurences of individual words
    private count(word: string) {
        if (this.wordOccurences[word]) {
            this.wordOccurences[word]++;
        } else {
            this.wordOccurences[word] = 1;
        }
    }
}
