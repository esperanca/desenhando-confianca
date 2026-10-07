#!/usr/bin/env node

const {spawnSync} = require('node:child_process');

const version = process.argv[2];
const message = process.argv.slice(3).join(' ') || `Release ${version}`;

if (!version || !/^v\d+\.\d+\.\d+$/.test(version)) {
  console.error('Uso: npm run release -- vX.Y.Z "Mensagem da release"');
  process.exit(1);
}

function run(command, args) {
  console.log(`\n$ ${[command, ...args].join(' ')}`);
  const result = spawnSync(command, args, {stdio: 'inherit', shell: false});
  if (result.status !== 0) process.exit(result.status || 1);
}

run('git', ['diff', '--quiet']);
run('git', ['diff', '--cached', '--quiet']);
run('git', ['tag', '-a', version, '-m', message]);
run('npm', ['run', 'verify']);
run('npx', ['wrangler', 'pages', 'deploy', 'dist', '--project-name', 'desenhando-confianca']);
run('git', ['push', 'origin', 'main', '--follow-tags']);

console.log(`\nRelease ${version} concluída.`);