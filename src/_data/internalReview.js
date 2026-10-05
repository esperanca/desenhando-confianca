const fs = require('node:fs');
const path = require('node:path');

const contentRoot = path.join(__dirname, '..');

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function getField(frontMatter, field) {
  const match = frontMatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
}

module.exports = function () {
  return walk(contentRoot)
    .filter((filePath) => /\.(md|njk)$/.test(filePath))
    .map((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8');
      const frontMatter = source.match(/^---\n([\s\S]*?)\n---/);
      if (!frontMatter || getField(frontMatter[1], 'reviewCategory') !== 'internal') {
        return null;
      }

      return {
        title: getField(frontMatter[1], 'title'),
        summary: getField(frontMatter[1], 'summary'),
        status: getField(frontMatter[1], 'status'),
        url: getField(frontMatter[1], 'permalink'),
        order: Number(getField(frontMatter[1], 'order')) || 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
};