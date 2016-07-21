"use strict";

const unicharadata = require(".");

// API
console.assert(unicharadata.name("A") === "LATIN CAPITAL LETTER A");
console.assert(unicharadata.lookup("LATIN CAPITAL LETTER A") === "A");
console.assert(unicharadata.category("A") === "Lu");
console.assert(unicharadata.combining("A") === 0);
console.assert(unicharadata.bidirectional("A") === "L");
console.assert(unicharadata.decomposition("A") === "A");
console.assert(unicharadata.decompositionTag("A") === "");
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
console.assert(unicharadata.decompositionTag("㍍") === "<square>");

console.assert(unicharadata.decimal("１") === 1);
console.assert(unicharadata.digit("１") === 1);
console.assert(unicharadata.numeric("⅛") === 1 / 8);

console.assert(unicharadata.unicode1name("\n") === "LINE FEED (LF)");
console.assert(unicharadata.lookupname("\n") === "LINE FEED (LF)");
