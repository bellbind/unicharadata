(function build(global) {
  "use strict";

  function init() {
    const fs = require("fs");
    const path = require("path");
    const zlib = require("zlib");
    const gz = fs.readFileSync(path.join(__dirname, "database.json.gz"));
    const buf = zlib.gunzipSync(gz, {chunkSize: 1 << 20});
    const database = JSON.parse(buf);

    return {
      lookup(name, defaultch = "") {
        return database.lookup[name] || defaultch;
      },
      name(ch, defaultname = "") {
        return database.name[ch] || defaultname;
      },
      category(ch) {
        return database.category[ch];
      },
      combining(ch) {
        return database.combining[ch];
      },
      bidirectional(ch) {
        return database.bidirectional[ch];
      },
      decomposition(ch) {
        return database.decomposition[ch] || ch;
      },
      decompositionTag(ch) {
        return database.decompositionTag[ch] || "";
      },
      decimal(ch, defaultval = NaN) {
        const r = database.decimal[ch];
        return typeof r === "number" ? r : defaultval;
      },
      digit(ch, defaultval = NaN) {
        const r = database.digit[ch];
        return typeof r === "number" ? r : defaultval;
      },
      numeric(ch, defaultval = NaN) {
        const r = database.numeric[ch];
        return typeof r === "number" ? r : defaultval;
      },
      mirrored(ch) {
        return database.mirrored[ch];
      },
      unicode1name(ch, defaultname = "") {
        return database.unicode1name[ch] || defaultname;
      },
      lookupname(ch, defaultname = "") {
        const name = database.name[ch] || "";
        if (name && name[0] !== "<") return name;
        return database.unicode1name[ch] || defaultname;
      },
      isocomment(ch, defaultcomment = "") {
        return database.isocomment[ch] || defaultcomment;
      },
      upper(ch, defaultch = "") {
        return database.upper[ch] || defaultch;
      },
      lower(ch, defaultch = "") {
        return database.lower[ch] || defaultch;
      },
      title(ch, defaultch = "") {
        return database.title[ch] || defaultch;
      },
      splitCombined(text) {
        const chars = Array.from(text);
        const bases = chars.map((ch, i) => ({ch, i})).filter(
          ({ch}) => database.combining[ch] === 0
        ).map(({ch, i}) => i);
        return bases.map(
          (start, i) => chars.slice(start, bases[i + 1]).join(""));
      }
    };
  }

  if ("process" in global) module.exports = init();
  else global.unicharadata = init();
})((this || 0).self || global);
