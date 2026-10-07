#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = process.argv[2] || 'dist';
const rootPath = path.resolve(root);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && full.endsWith('.html')) files.push(full);
  }
  return files;
}

function targetFor(href) {
  const clean = href.split('#')[0];
  if (!clean || !clean.startsWith('/') || clean.startsWith('//')) return null;
  let target = path.join(rootPath, clean.replace(/^\/+/, ''));
  if (clean.endsWith('/') || !path.extname(target)) target = path.join(target, 'index.html');
  return target;
}

const missing = [];
const hrefPattern = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;

for (const file of walk(rootPath)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(hrefPattern)) {
    const target = targetFor(match[1]);
    if (target && !fs.existsSync(target)) {
      missing.push({file: path.relative(rootPath, file), href: match[1]});
    }
  }
}

if (missing.length) {
  console.error(`Links internos quebrados em ${root}: ${missing.length}`);
  for (const item of missing) console.error(`- ${item.file} -> ${item.href}`);
  process.exit(1);
}

console.log(`Links internos OK em ${root}.`);