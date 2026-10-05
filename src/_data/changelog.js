const {execSync} = require('node:child_process');

function git(args) {
  try {
    return execSync(`git ${args}`, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();
  } catch {
    return '';
  }
}

function parseLine(line) {
  const [hash, date, author, ...subject] = line.split('|');
  return {hash, date, author, subject: subject.join('|')};
}

module.exports = function () {
  const lastRaw = git("log -1 --format='%H|%cI|%an|%s'");
  const tagsRaw = git('tag --list --sort=-creatordate');

  const last = lastRaw ? parseLine(lastRaw) : null;

  const releases = tagsRaw
    ? tagsRaw
        .split('\n')
        .map((tag) => tag.trim())
        .filter(Boolean)
        .map((tag) => {
          const line = git(`log -1 --format='%H|%cI|%an|%s' ${tag}`);
          if (!line) return {tag};
          return {tag, ...parseLine(line)};
        })
    : [];

  return {last, releases};
};
