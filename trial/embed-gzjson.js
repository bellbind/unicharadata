"use strict";

const fs = require("fs");

const src = fs.readFileSync("unicharadata-embed-raw.js", "utf8");
const unicodedata = fs.readFileSync("UnicodeData.gz.json", "utf8");
const replace = `require("./UnicodeData.gz.json")`;
const head = `/* eslint max-lines: 0 */
`;
const result = `${head}${src.replace(replace, unicodedata)}`;
fs.writeFileSync("unicharadata-embed.js", result);
