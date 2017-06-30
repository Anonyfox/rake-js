/**
 * Helper Class to keep track of strings (words, stems, ) and their occurences
 */
export default class StringCounter {
  // the actual data store implemented with a plain object
  private counter: { [word: string]: number } = {};

  // increase the counter for a given string
  public count(str: string): void {
    if (this.counter[str]) {
      this.counter[str]++;
    } else {
      this.counter[str] = 1;
    }
  }

  // return a list of all strings counted yet
  public strings(): string[] {
    return Object.keys(this.counter);
  }
}
