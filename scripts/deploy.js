#!/usr/bin/env node

const {spawnSync} = require('node:child_process');

function run(command, args) {
  console.log(`\n$ ${[command, ...args].join(' ')}`);
  const result = spawnSync(command, args, {stdio: 'inherit', shell: false});
  if (result.status !== 0) process.exit(result.status || 1);
}

run('npm', ['run', 'build']);
run('node', ['scripts/check-links.js', 'dist']);
run('npx', ['wrangler', 'pages', 'deploy', 'dist', '--project-name', 'desenhando-confianca']);

console.log('\nDeploy concluído.');