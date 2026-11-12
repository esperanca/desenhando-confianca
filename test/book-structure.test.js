const test = require('node:test');
const assert = require('node:assert/strict');
const {bookPosition, bookNeighbors, readingTime, latestRelease} = require('../src/plugins/book-structure');

const sumario = {
  intro: [{title: 'Introdução', url: '/livro/introducao/'}],
  parts: [
    {title: 'Parte I — Primeira', items: [{title: 'A', url: '/livro/a/'}, {title: 'B', url: '/livro/b/'}]},
    {title: 'Parte II — Segunda', items: [{title: 'C', url: '/livro/c/'}]},
  ],
  additional: {title: 'Extras', items: [{title: 'Glossário', url: '/livro/glossario/'}]},
};

test('numera capítulos de forma contínua entre as partes', () => {
  assert.deepEqual(bookPosition('/livro/a/', sumario), {part: 'Parte I', chapter: 1});
  assert.deepEqual(bookPosition('/livro/c/', sumario), {part: 'Parte II', chapter: 3});
});

test('páginas fora das partes não têm posição', () => {
  assert.equal(bookPosition('/livro/introducao/', sumario), null);
  assert.equal(bookPosition('/livro/glossario/', sumario), null);
  assert.equal(bookPosition('/nao-existe/', sumario), null);
});

test('encontra anterior e próximo na ordem do sumário', () => {
  const neighbors = bookNeighbors('/livro/a/', sumario);
  assert.equal(neighbors.previous.url, '/livro/introducao/');
  assert.equal(neighbors.next.url, '/livro/b/');
  assert.equal(bookNeighbors('/livro/introducao/', sumario).previous, null);
  assert.equal(bookNeighbors('/livro/glossario/', sumario).next, null);
  assert.equal(bookNeighbors('/nao-existe/', sumario), null);
});

test('calcula tempo de leitura a 200 palavras por minuto', () => {
  assert.equal(readingTime(''), 0);
  assert.equal(readingTime('<p>uma frase curta</p>'), 1);
  assert.equal(readingTime('<p>' + 'palavra '.repeat(900) + '</p>'), 5);
  assert.equal(readingTime('<style>a b c d</style><p>duas palavras</p>'), 1);
});

test('devolve a versão mais recente já lançada', () => {
  assert.equal(latestRelease({commits: [{release: ''}, {release: 'v0.6.1'}, {release: 'v0.5.0'}]}), 'v0.6.1');
  assert.equal(latestRelease({commits: [{release: ''}]}), '');
  assert.equal(latestRelease({commits: [{release: 'Ainda não lançada'}, {release: 'v0.6.1'}]}), 'v0.6.1');
  assert.equal(latestRelease(null), '');
});
