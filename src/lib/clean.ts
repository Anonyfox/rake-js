import * as franc from 'franc';
import * as stopwords from 'nltk-stopwords';
import { isString } from 'lodash';

// just a few language codes of 'franc' mapped to 'nltk-stopwords'-keys for now
const languageNameMapping = {
    deu: 'german',
    eng: 'english',
    spa: 'spanish',
    ita: 'italian',
    por: 'portuguese',
    nld: 'dutch',
    swh: 'swedish'
}

// remove all stopwords from a given string or array of words.
export function clean (text : string | string[], language?: string) : string {
    if (!language) {
        language = guessLanguage(text);
    }
    return stopwords.remove(text, language);
}

function guessLanguage (text : string | string[]) : string {
    if (isString(<string>text)) {
        return languageNameMapping[franc(text)] || 'english';
    } else if ((<string[]>text).join) {
        const corpus = (<string[]>text).join(' ');
        return languageNameMapping[franc(corpus)] || 'english';
    }
}