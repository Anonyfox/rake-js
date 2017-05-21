import { strip } from './clean';

// tslint:disable-next-line
const stopwords = require('../../data/stopwords.json');

// see https://www.npmjs.com/package/stopwords-json for overview
const languageMappings = {
    dutch: 'nl',
    english: 'en',
    german: 'de',
    italian: 'it',
    portuguese: 'pt',
    spanish: 'es',
    swedish: 'sv',
};

export function load(language: string): Set<string> {
    const list: string[] = stopwords[languageMappings[language]];
    return new Set(list);
}

// export class Stoplist {
//     private termFrequency: { [word: string]: number } = {};

//     constructor(private wordArray: string[]) {
//         for (const word of wordArray) {
//             this.push(word);
//         }
//     }

//     private push(word) {
//         const wordCleaned = strip(word.toLowerCase());
//         if (/\s+/.test(wordCleaned)) {
//             for (const fragment of wordCleaned.split(/\s+/)) {
//                 this.push(fragment);
//             }
//         } else {
//             if (this.termFrequency[word]) {
//                 this.termFrequency[word]++;
//             } else {
//                 this.termFrequency[word] = 1;
//             }
//         }
//     }
// }
