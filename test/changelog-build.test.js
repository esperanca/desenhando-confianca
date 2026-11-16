const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {copyFileSync, mkdtempSync, readFileSync, rmSync} = require('node:fs');
const {tmpdir} = require('node:os');
const path = require('node:path');
const test = require('node:test');
const dateFilter = require('../src/filters/date-filter');

test('renderiza o log global em clone raso', {timeout: 120_000}, () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'desenhando-confianca-shallow-'));
  const repository = execFileSync('git', ['remote', 'get-url', 'origin'], {encoding: 'utf8'}).trim();

  try {
    execFileSync('git', [
      'clone',
      '--depth=1',
      repository,
      directory,
    ], {stdio: 'ignore'});
    copyFileSync(
      path.join(process.cwd(), 'src', '_data', 'changelog.js'),
      path.join(directory, 'src', '_data', 'changelog.js')
    );
    execFileSync('npm', ['ci', '--ignore-scripts'], {cwd: directory, stdio: 'ignore'});
    execFileSync('npm', ['run', 'build'], {cwd: directory, stdio: 'ignore'});

    const home = readFileSync(path.join(directory, 'dist', 'index.html'), 'utf8');
    assert.match(home, /id="log-de-alteracoes"/);
    assert.match(home, /Timestamp do build exibido no rodapé\./);
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});

test('usa o último commit da página no cabeçalho editorial', {timeout: 120_000}, () => {
  execFileSync('npm', ['run', 'build'], {stdio: 'ignore'});

  const inputPath = 'src/pages/sobre-o-livro.md';
  const lastCommitDate = execFileSync(
    'git',
    ['log', '-1', '--format=%cI', '--', inputPath],
    {encoding: 'utf8'}
  ).trim();
  const page = readFileSync(path.join(process.cwd(), 'dist', 'sobre-o-livro', 'index.html'), 'utf8');

  assert.match(page, new RegExp(`atualizado em ${dateFilter(lastCommitDate).replace('.', '\\.')}`));
});