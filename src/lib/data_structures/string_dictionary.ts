/**
 * Helper Class to keep references between strings
 */
export default class StringDictionary {
  // the actual data store implemented with a plain object
  private dict: { [word: string]: string } = {}

  // increase the counter for a given string
  public add(key: string, value: string): void {
    if (!key || !value) {
      return
    }
    this.dict[key] = value
  }

  // return a list of all strings counted yet
  public get(key: string): string {
    return this.dict[key]
  }
}
