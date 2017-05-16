import * as condenseWhitespace from "condense-whitespace";
import * as franc from "franc";
import { isString } from "lodash";
import * as stopwords from "nltk-stopwords";

export function strip(text: string): string {
    return condenseWhitespace(text.replace(/\W/ug, " "));
}

// just a few language codes of 'franc' mapped to 'nltk-stopwords'-keys for now
const languageNameMapping = {
    deu: "german",
    eng: "english",
    ita: "italian",
    nld: "dutch",
    por: "portuguese",
    spa: "spanish",
    swh: "swedish",
};

// remove all stopwords from a given string or array of words.
export function clean(text: string | string[], language?: string): string {
    if (!language) {
        language = guessLanguage(text);
    }
    return stopwords.remove(text, language);
}

function guessLanguage(text: string | string[]): string {
    if (isString(text as string)) {
        return languageNameMapping[franc(text)] || "english";
    } else if ((text as string[]).join) {
        const corpus = (text as string[]).join(" ");
        return languageNameMapping[franc(corpus)] || "english";
    }
}
