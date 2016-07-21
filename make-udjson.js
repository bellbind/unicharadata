"use strict";

const fs = require("fs");
const http = require("http");
const readline = require("readline");

// it has sparsed code points: e.g. next line of D800 is D87F
const url = "http://unicode.org/Public/UCD/latest/ucd/UnicodeData.txt";
http.get(url, res => {
  const lines = [];
  const input = res;
  const reader = readline.createInterface({input});
  reader.on("line", line => {
    //lines.push(line.split(";"));
    lines.push(line);
  }).on("close", _ => {
    // properties: http://www.unicode.org/reports/tr44/#UnicodeData.txt
    //  0: Code Point (hex)
    //  1: Name
    //  2: General Coategory
    //  3: Canonical Combining Class
    //  4: Bidi Class
    //  5: Decomposition Mapping
    //  6: Numeric Value (decimal 0-9)
    //  7: Numeric Value (digit 0-9)
    //  8: Numeric Value (any numeric)
    //  9: Bidi Mirrored
    // 10: Unicode 1 Name
    // 11: ISO Comment
    // 12: Simple Uppercase Mapping
    // 13: Simple Lowercase Mapping
    // 14: Simple Titlecase Mapping
    fs.writeFileSync("UnicodeData.json", JSON.stringify(lines));
  });
  reader.resume();
});
