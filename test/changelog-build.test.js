const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {copyFileSync, mkdtempSync, readFileSync, rmSync} = require('node:fs');
const {tmpdir} = require('node:os');
const path = require('node:path');
const test = require('node:test');

test('renderiza o log global em clone raso', {timeout: 120_000}, () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'desenhando-confianca-shallow-'));
  const repository = execFileSync('git', ['remote', 'get-url', 'origin'], {encoding: 'utf8'}).trim();

  try {
    execFileSync('npm', ['run', 'build'], {cwd: process.cwd(), stdio: 'ignore'});
    const currentHome = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
    assert.match(currentHome, /id="log-de-alteracoes"/);
    assert.match(currentHome, /Timestamp do build exibido no rodapé\./);
    assert.match(currentHome, /class="changelog__meta"/);
    assert.match(currentHome, /class="changelog__byline"/);
    assert.match(currentHome, /aria-label="Ver alteração: Timestamp do build exibido no rodapé\."/);

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