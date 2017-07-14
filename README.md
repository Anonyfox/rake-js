# RAKE.js

A pure JS implementation of the Rapid Automated Keyword Extraction (RAKE) algorithm. Put in any text corpus, get back a bunch of keyphrases and keywords.

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Build Status](https://travis-ci.org/Anonyfox/rake-js.svg?branch=master)](https://travis-ci.org/Anonyfox/rake-js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)

## Currently supported languages:

- english
- german
- spanish
- italian
- dutch
- portugese
- swedish

More languages are fairly easy to add, see the stoplist module for details.

## How to use

Without any further options:

````javascript
  import rake from 'rake-js'

  const myKeywords = rake(someTextContent) // ['keyword1, ...]
````

When the language is known in advance (faster execution):

````javascript
  import rake from 'rake-js'

  const myKeywords = rake(someTextContent, { language: 'english' })
````

When the corpus is divided by something other than whitespace (eg: `;`):

````javascript
  import rake from 'rake-js'

  const myKeywords = rake(someTextContent, { delimiters: [';+'] })
````

## Implementation Details

This algorithm is *fast*, compared with other approaches like TextRank. The results are surprisingly good for a cross-language algorithm, and the truly relevant keywords / phrases are included in the result in most cases. For more details about the RAKE algorithm, read [the original paper](https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents).

There are still rough edges in the code, but I tried to translate the abstract algorithm into a solid software package, tested and typesafe. Actually I wrote this thing because I was very disappointed with all the existing solutions on NPM, and I hope this repository is easier to contribute to in the future.

## Roadmap:

- [ ] support more languages (only handful are whitelisted for now)
- [ ] duplicate keyword filtering
- [ ] check browser compatibility

## LICENSE:

LGPL-3.0.

You can use this package in all your free or commercial products without any issues, but I want bugfixes and improvements to this algorithm to flow back into the public code repository.