#!/usr/bin/env node

const {spawnSync} = require('node:child_process');

function run(command, args, options = {}) {
  console.log(`\n$ ${[command, ...args].join(' ')}`);
  const result = spawnSync(command, args, {stdio: 'inherit', shell: false, ...options});
  if (result.status !== 0) process.exit(result.status || 1);
}

run('npm', ['test']);
run('npm', ['run', 'build']);
run('node', ['scripts/check-links.js', 'dist']);
run('npm', ['run', 'build:internal']);
run('node', ['scripts/check-links.js', 'dist-internal']);

console.log('\nVerificação completa OK.');