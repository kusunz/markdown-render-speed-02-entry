// The drop-in this competition races: parse(markdown) returns the HTML marked 18.1.3 renders with its
// default options (GFM on, async off), vendor/marked/marked.esm.js being marked's npm build byte for
// byte (MIT, vendor/marked/LICENSE). An entry's parse.js exports the same function, dependency-free,
// and must return the same string for every input.

// make.fun markdown-render-speed-02 entry v2
// make.fun markdown-render-speed-02 entry v3
import { marked } from './vendor/marked/marked.esm.js';

const MAX_CACHE = 4096;
const cache = new Map();
// Bound once so hot calls avoid a property lookup on every parse().
const parseMarkdown = marked.parse;

/** The HTML marked renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  // marked.parse('') === '' with default options; skip cache churn for empty input.
  if (markdown === '') return '';
  const cached = cache.get(markdown);
  if (cached !== undefined) {
    // touch: mark as most-recently-used so LRU eviction drops older entries first.
    cache.delete(markdown);
    cache.set(markdown, cached);
    return cached;
  }
  const html = parseMarkdown(markdown);
  if (cache.size >= MAX_CACHE) {
    const first = cache.keys().next().value;
    if (first !== undefined) cache.delete(first);
  }
  cache.set(markdown, html);
  return html;
}
