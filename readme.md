# `unicharadata` module

Module for accessing Unicode character data from
[UnicodeData.txt](http://unicode.org/Public/UCD/latest/ucd/UnicodeData.txt).

## Use on nodejs

```
npm install unicharadata
```

[npm pages](https://www.npmjs.com/package/unicharadata)

## Use on browsers

see: [browser-example.html](browser-example.html)

CDNs

- https://raw.githack.com/bellbind/unicharadata/master/unicharadata.js
- https://rawgit.com/bellbind/unicharadata/master/unicharadata.js

## API

Detail of the propeties are in
http://www.unicode.org/reports/tr44/#UnicodeData.txt

- `unicharadata.lookup(name, defaultch = "")`: search character from its name
    - use "Name" otherwise "Unicode 1 Name" property
- `unicharadata.lookupname(ch, defaultname = "")`: get the name used `lookup(name)`
- `unicharadata.name(ch, defaultname = "")`: get "Name" string
- `unicharadata.category(ch)`: get "General Category" string
    - see [value table](http://www.unicode.org/reports/tr44/#General_Category_Values)
- `unicharadata.combining(ch)`: get "Canonical Combining Class" number
    - see [value table](http://www.unicode.org/reports/tr44/#Canonical_Combining_Class_Values)
- `unicharadata.bidirectional(ch)`: get "Bidi Class" string
    - see [value table](http://www.unicode.org/reports/tr44/#Bidi_Class_Values)
- `unicharadata.decomposition(ch)`: get "Decomposition Mapping" text
    - return `ch` itself when no decomposition mapping
- `unicharadata.decompositionTag(ch)`: get "Decomposition Type" tag string
    - see [value table](http://www.unicode.org/reports/tr44/#Character_Decomposition_Mappings)
- `unicharadata.decimal(ch, defaultval = NaN)`: get "Numeric Value" integer as single decimal type
- `unicharadata.digit(ch, defaultval = NaN)`: get "Numeric Value" integer as single digit type
    - overwrapped `decimal(ch)`. this includes as superscript (e.g. U+00B9)
- `unicharadata.numeric(ch, defaultval = NaN)`: get "Numeric Value" float number as numeric type
    - overwrapped `digit(ch)`, this includes non single digit numbers.
- `unicharadata.mirrored(ch)`: get "Bidi Mirrored" string
    - `"Y"` or `"N"`
- `unicharadata.unicode1name(ch, defaultname = "")`: get "Unicode 1 Name" string
- `unicharadata.isocomment(ch, defaultcomment = "")`: get "ISO Comment" string
- `unicharadata.upper(ch, defaultch = "")`: get "Simple Uppercase Mapping" character
- `unicharadata.lower(ch, defaultch = "")`: get "Simple Lowercase Mapping" character
- `unicharadata.title(ch, defaultch = "")`: get "Simple Titlecase Mapping" character
- `unicharadata.splitCombined(text)`: split a text to an array of strings that contains a character and following combining characters.

## Example

```js
"use strict";

const unicharadata = require("unicharadata");

// API
console.assert(unicharadata.name("A") === "LATIN CAPITAL LETTER A");
console.assert(unicharadata.lookup("LATIN CAPITAL LETTER A") === "A");
console.assert(unicharadata.category("A") === "Lu");
console.assert(unicharadata.combining("A") === 0);
console.assert(unicharadata.bidirectional("A") === "L");
console.assert(unicharadata.decomposition("A") === "A");
console.assert(unicharadata.decompositionGroup("A") === "");
console.assert(isNaN(unicharadata.decimal("A")));
console.assert(isNaN(unicharadata.digit("A")));
console.assert(isNaN(unicharadata.numeric("A")));
console.assert(unicharadata.mirrored("A") === "N");
console.assert(unicharadata.unicode1name("A") === "");
console.assert(unicharadata.lookupname("A") === "LATIN CAPITAL LETTER A");
console.assert(unicharadata.isocomment("A") === "");
console.assert(unicharadata.upper("A") === "");
console.assert(unicharadata.lower("A") === "a");
console.assert(unicharadata.title("A") === "");

const splitted = unicharadata.splitCombined("これが🔑です".normalize("NFD"));
console.assert(splitted[0] === "こ");
console.assert(splitted[1] === "れ");
console.assert(splitted[2] === "が".normalize("NFD"));
console.assert(splitted[3] === "🔑");
console.assert(splitted[4] === "で".normalize("NFD"));
console.assert(splitted[5] === "す");

// specific
console.assert(unicharadata.decomposition("㍍") === "メートル");
console.assert(unicharadata.decompositionGroup("㍍") === "<square>");

console.assert(unicharadata.decimal("１") === 1);
console.assert(unicharadata.digit("１") === 1);
console.assert(unicharadata.numeric("⅛") === 1 / 8);
console.assert(unicharadata.unicode1name("\n") === "LINE FEED (LF)");
console.assert(unicharadata.lookupname("\n") === "LINE FEED (LF)");
```


## Development

1. `npm run download`: update `UnicodeData.json` from `UnicodeData.txt` on the web
2. `npm run build`: update `unicharadata.js` from `unicharadata-raw.js` and
   `UnicodeData.json`
3. `npm test`: run tests
4. `npm run eslint`: check coding style with [eslint](http://eslint.org/)
    - setup with `npm install` required

The package version is based on the
Unicode ["Version"](http://www.unicode.org/reports/tr44/) of `UnicodeData.txt`.

- e.g. `9.0.0-alpha.2`: the Unicode version is `9.0.0`

## License

[ISC License](https://opensource.org/licenses/isc-license.txt)
