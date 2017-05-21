export class Matrix {
    public matrix: number[][];
    private scores: { [key: string]: number } = {};
    private size: number;
    private index: { [key: string]: number } = {};

    constructor(private keys: string[]) {
        this.size = keys.length;
        this.createIndex();
        this.createZeroMatrix();
    }

    public incField(row: number, col: number) {
        this.matrix[row][col] += 1;
    }

    public getRow(row: number): number[] {
        return this.matrix[row];
    }

    public process(values: string[]) {
        const indexes = values.map((key) => this.index[key]);
        for (const row of indexes) {
            for (const col of indexes) {
                this.matrix[row][col] += 1;
            }
        }
    }

    public calculateScores() {
        for (const key of this.keys) {
            const row = this.getRow(this.index[key]);
            let deg = 0.0;
            let freq = 0.0;
            for (const col of row) {
                if (col !== 0) {
                    deg += col;
                    freq += 1;
                }
            }
            this.scores[key] = deg / freq;
        }
        return this.scores;
    }

    private createIndex() {
        const index = {};
        this.keys.forEach((key, i) => index[key] = i);
        this.index = index;
    }

    private createZeroMatrix() {
        const matrix = [];
        for (let i = 0; i < this.size; i++) {
            matrix.push(Array(this.size).fill(0));
        }
        this.matrix = matrix;
    }
}
