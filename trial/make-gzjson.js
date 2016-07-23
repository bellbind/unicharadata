"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const json = require("../UnicodeData.json");
const raw = json.join("\n");
const cmp = zlib.gzipSync(raw).toString("base64");
const chunks = Array.from(
  Array(Math.ceil(cmp.length / 72)),
  (_, i) => cmp.slice(i * 72, (i + 1) * 72));

const file = fs.createWriteStream(path.join(__dirname, "UnicodeData.gz.json"));
file.write("[\n");
chunks.slice(0, -1).forEach(
  chunk => file.write(`    ${JSON.stringify(chunk)},\n`));
file.end(`    ${JSON.stringify(chunks[chunks.length - 1])}]`);
