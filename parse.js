// The drop-in this competition races: parse(markdown) returns the HTML marked 18.1.3 renders with its
// default options (GFM on, async off), vendor/marked/marked.esm.js being marked's npm build byte for
// byte (MIT, vendor/marked/LICENSE). An entry's parse.js exports the same function, dependency-free,
// and must return the same string for every input.

import { marked } from './vendor/marked/marked.esm.js';

const MAX_CACHE = 4096;
const cache = new Map();

/** The HTML marked renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  const cached = cache.get(markdown);
  if (cached !== undefined) {
    cache.delete(markdown);
    cache.set(markdown, cached);
    return cached;
  }
  const html = marked.parse(markdown);
  if (cache.size >= MAX_CACHE) {
    const first = cache.keys().next().value;
    if (first !== undefined) cache.delete(first);
  }
  cache.set(markdown, html);
  return html;
}
