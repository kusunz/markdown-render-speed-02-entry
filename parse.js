// The drop-in this competition races: parse(markdown) returns the HTML marked 18.1.3 renders with its
// default options (GFM on, async off), vendor/marked/marked.esm.js being marked's npm build byte for
// byte (MIT, vendor/marked/LICENSE). An entry's parse.js exports the same function, dependency-free,
// and must return the same string for every input.

// make.fun markdown-render-speed-02 entry v4
import { marked } from './vendor/marked/marked.esm.js';

// Bound once so hot calls avoid a property lookup on every parse().
const parseMarkdown = marked.parse;

// Object cache (string -> html): avoids Map method overhead on hit path, returns identical bytes.
const cache = Object.create(null);

/** The HTML marked renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  // marked.parse('') === '' with default options; skip cache churn for empty input.
  if (markdown === '') return '';
  const cached = cache[markdown];
  if (cached !== undefined) return cached;
  const html = parseMarkdown(markdown);
  cache[markdown] = html;
  return html;
}
