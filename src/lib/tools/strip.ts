import * as condenseWhitespace from 'condense-whitespace'

// replace all non-word characters from string
export default function strip(text: string): string {
  const txt = text
    .replace(/[^a-zäöüß']/gi, ' ')
    .replace(/(^|\s)+\w($|\s)+/g, ' ')
  return condenseWhitespace(txt)
}
