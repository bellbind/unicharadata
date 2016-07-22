(function build(global) {
  "use strict";

  function extractRanges(UnicodeData) {
    const fpost = ", First>", lpost = ", Last>";
    const fnamestart = 1, fnameend = -fpost.length;
    const rangePair = UnicodeData.filter(
      line => line[1].endsWith(fpost) || line[1].endsWith(lpost));
    const ranges = Array.from(
      Array(rangePair.length >> 1),
      (_, i) => rangePair.slice(i * 2, (i + 1) * 2));
    const extslist = ranges.map(([first, last]) => {
      const props = first.slice(2);
      const prefix = first[1].slice(fnamestart, fnameend).toUpperCase();
      const start = parseInt(first[0], 16), end = parseInt(last[0], 16);
      return Array.from(Array(end - start + 1), (_, i) => {
        const hex = (start + i).toString(16).toUpperCase();
        const name = `${prefix}-${hex}`;
        return [hex, name].concat(props);
      });
    });
    return UnicodeData.filter(
      line => !(line[1].endsWith(fpost) || line[1].endsWith(lpost))
    ).concat(...extslist);
  }

  function makeDatabase(UnicodeData) {
    const database = {
      lookup: {},
      name: {},
      category: {},
      combining: {},
      bidirectional: {},
      decomposition: {},
      decompositionTag: {},
      decimal: {},
      digit: {},
      numeric: {},
      mirrored: {},
      unicode1name: {},
      isocomment: {},
      upper: {},
      lower: {},
      title: {},
    };

    function hex2str(hex) {
      return String.fromCodePoint(parseInt(hex, 16));
    }

    UnicodeData.forEach(line => {
      const char = String.fromCodePoint(parseInt(line[0], 16));
      database.name[char] = line[1];
      if (line[1][0] !== "<") database.lookup[line[1]] = char;

      database.category[char] = line[2];
      database.combining[char] = parseInt(line[3]);
      database.bidirectional[char] = line[4];

      if (line[5]) {
        const decompSeq = line[5].split(/ /);
        const tag = decompSeq[0].startsWith("<") ? decompSeq[0] : "";
        const decomp = decompSeq.slice(tag ? 1 : 0);
        database.decomposition[char] = decomp.map(hex2str).join("");
        database.decompositionTag[char] = tag;
      }

      if (line[6]) database.decimal[char] = parseInt(line[6]);
      if (line[7]) database.digit[char] = parseInt(line[7]);
      if (line[8]) {
        database.numeric[char] = Function("", `return ${line[8]};`)();
      }

      database.mirrored[char] = line[9];

      if (line[10]) {
        database.unicode1name[char] = line[10];
        if (!database.lookup[line[10]]) database.lookup[line[10]] = char;
      }
      if (line[11]) database.isocomment[char] = line[11];
      if (line[12]) database.upper[char] = hex2str(line[12]);
      if (line[13]) database.lower[char] = hex2str(line[13]);
      if (line[14]) database.title[char] = hex2str(line[14]);
    });
    return database;
  }

  function init() {
    const fs = require("fs");
    const path = require("path");

    const database = makeDatabase(extractRanges(unicodeData()));
    const raw = JSON.stringify(database);
    fs.writeFileSync(path.join(__dirname, "database.json"), raw);
  }

  function unicodeData() {
    const json = require("../UnicodeData.json");
    return json.map(line => line.split(/;/));
  }

  init();
})((this || 0).self || global);
