"use strict";

function bench(name) {
  console.time(name);
  const ucd = require(name);
  console.timeEnd(name);
  ucd.name("A");
}

bench("./unicharadata");
bench("./unicharadata-raw");
bench("./trial/unicharadata-load");
bench("./trial/unicharadata-embed");
bench("./trial/unicharadata-embed-raw");
