const test = require('node:test');
const assert = require('node:assert/strict');
const markdownIt = require('markdown-it');
const bookNotes = require('../src/plugins/markdown-book-notes');

function render(source) {
  return markdownIt().use(bookNotes).render(source, {documentId: 'capitulo-teste'});
}

test('renderiza identificadores sn- como sidenotes', () => {
  const html = render('Texto.[^sn-contexto]\n\n[^sn-contexto]: Nota lateral.');

  assert.match(html, /class="sidenote-ref"/);
  assert.match(html, /class="sidenote"/);
  assert.match(html, /Nota lateral\./);
  assert.doesNotMatch(html, /class="footnotes/);
});

test('preserva notas comuns como footnotes', () => {
  const html = render('Texto.[^fonte]\n\n[^fonte]: Nota final.');

  assert.match(html, /class="footnote-ref"/);
  assert.match(html, /class="footnotes/);
  assert.match(html, /Nota final\./);
  assert.doesNotMatch(html, /class="sidenote"/);
});

test('renderiza sidenotes e footnotes no mesmo documento', () => {
  const html = render(
    'Lateral.[^sn-contexto] Final.[^fonte]\n\n[^sn-contexto]: Nota lateral.\n\n[^fonte]: Nota final.'
  );

  assert.match(html, /Nota lateral\./);
  assert.match(html, /Nota final\./);
  assert.match(html, /sn-capitulo-teste-contexto/);
  assert.match(html, /class="footnotes/);
});