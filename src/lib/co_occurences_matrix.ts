import { countBy, map, sortBy, sum, take } from 'lodash';

export interface IWordDict { [word: string]: number; }

export class CoOccurencesMatrix {
    private words: string[];
    private wordIndex: IWordDict;
    private matrix: number[][];

    private wordFreqScores: IWordDict = {};
    private wordDegreeScores: IWordDict = {};
    private wordRatioOfDegreeToFreq: IWordDict = {};

    private phraseScores: IWordDict = {};

    constructor(private phrases: string[], private occurences: IWordDict) {
        this.words = Object.keys(occurences).sort();
        this.createWordIndex();
        this.createZeroMatrix();
        this.countCoOccurences();
        this.calculateWordScores();
        this.calculatePhraseScores();
    }

    public get() {
        return this.matrix;
    }

    public getBestPhrases(): string[] {
        const list = [];
        for (const word in this.phraseScores) {
            if (word) {
                list.push({ word, score: this.phraseScores[word] });
            }
        }
        const sorted = sortBy(list, ['score', 'word']).reverse();
        const resultSize = Math.ceil(sorted.length / 3.0);
        return map(take(sorted, resultSize), 'word');
    }

    private createZeroMatrix() {
        const len = this.words.length;
        const matrix = [];
        for (let y = 0; y < len; y++) {
            const line = [];
            for (let x = 0; x < len; x++) {
                line.push(0);
            }
            matrix.push(line);
        }
        this.matrix = matrix;
    }

    private createWordIndex() {
        const index: IWordDict = {};
        const words = this.words; // tight loop optimization
        const len = words.length;
        for (let i = 0; i < len; i++) {
            index[words[i]] = i;
        }
        this.wordIndex = index;
    }

    private countCoOccurences() {
        for (const phrase of this.phrases) {
            const words = phrase.split(' ');
            for (const word of words) {
                for (const otherWord of words) {
                    const otherWordIndex = this.wordIndex[otherWord];
                    const wordIndex = this.wordIndex[word];
                    if (wordIndex && otherWordIndex) {
                        this.matrix[otherWordIndex][wordIndex]++;
                    }
                }
            }
        }
    }

    private calculateWordScores() {
        for (let i = 0; i < this.words.length; i++) {
            const word = this.words[i];
            const row = this.matrix[i];
            const deg = sum(row);
            const freq = countBy(row, (num) => num > 0).true;
            this.wordDegreeScores[word] = deg;
            this.wordFreqScores[word] = freq;
            this.wordRatioOfDegreeToFreq[word] = parseFloat(deg) / parseFloat(freq);
        }
    }

    private calculatePhraseScores() {
        for (const phrase of this.phrases) {
            let sum = 0;
            for (const word of phrase.split(' ')) {
                sum += this.wordRatioOfDegreeToFreq[word];
            }
            this.phraseScores[phrase] = sum;
        }
    }

}
