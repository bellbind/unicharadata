"use strict";

const fs = require("fs");

const src = fs.readFileSync("unicharadata-raw.js", "utf8");
const unicodedata = fs.readFileSync("UnicodeData.json", "utf8");
const replace = `require("./UnicodeData.json")`;
const head = `/* eslint comma-spacing: 0, indent: 0, max-len: 0 */
`;
const result = `${head}${src.replace(replace, unicodedata)}`;
fs.writeFileSync("unicharadata.js", result);
