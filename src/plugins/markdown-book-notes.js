const markdownItFootnote = require('markdown-it-footnote');

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function safeId(value) {
  return String(value || 'document')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'document';
}

function documentId(env) {
  return safeId(
    env.documentId ||
      (env.page && (env.page.fileSlug || env.page.filePathStem)) ||
      'document'
  );
}

module.exports = function markdownBookNotes(md, options = {}) {
  const sidenotePrefix = options.sidenotePrefix || 'sn-';

  md.use(markdownItFootnote);

  md.core.ruler.after('footnote_tail', 'book_notes_extract', (state) => {
    const tokens = state.tokens;
    const blockStart = tokens.findIndex((token) => token.type === 'footnote_block_open');

    if (blockStart === -1) return true;

    const blockEnd = tokens.findIndex(
      (token, index) => index > blockStart && token.type === 'footnote_block_close'
    );

    if (blockEnd === -1) return true;

    const sidenotes = {};
    const rangesToRemove = [];
    let footnoteStart = -1;
    let currentLabel = '';
    let currentId = -1;

    for (let index = blockStart + 1; index < blockEnd; index += 1) {
      const token = tokens[index];

      if (token.type === 'footnote_open') {
        footnoteStart = index;
        currentLabel = token.meta.label || '';
        currentId = token.meta.id;

        if (currentLabel.startsWith(sidenotePrefix)) {
          sidenotes[currentId] = [];
        }
      } else if (
        token.type === 'inline' &&
        currentId !== -1 &&
        currentLabel.startsWith(sidenotePrefix)
      ) {
        sidenotes[currentId].push(token.children || []);
      } else if (token.type === 'footnote_close') {
        if (currentLabel.startsWith(sidenotePrefix)) {
          rangesToRemove.push([footnoteStart, index]);
        }

        footnoteStart = -1;
        currentLabel = '';
        currentId = -1;
      }
    }

    state.env.bookSidenotes = sidenotes;

    for (let index = rangesToRemove.length - 1; index >= 0; index -= 1) {
      const [start, end] = rangesToRemove[index];
      tokens.splice(start, end - start + 1);
    }

    const hasFootnotes = tokens
      .slice(blockStart + 1, tokens.findIndex((token) => token.type === 'footnote_block_close'))
      .some((token) => token.type === 'footnote_open');

    if (!hasFootnotes) {
      const newBlockEnd = tokens.findIndex(
        (token, index) => index >= blockStart && token.type === 'footnote_block_close'
      );
      tokens.splice(blockStart, newBlockEnd - blockStart + 1);
    }

    return true;
  });

  const defaultFootnoteRef = md.renderer.rules.footnote_ref;

  md.renderer.rules.footnote_ref = (tokens, index, renderOptions, env, self) => {
    const token = tokens[index];
    const label = token.meta.label || '';

    if (!label.startsWith(sidenotePrefix)) {
      return defaultFootnoteRef(tokens, index, renderOptions, env, self);
    }

    const number = token.meta.id + 1;
    const namespace = documentId(env);
    const noteId = `sn-${namespace}-${safeId(label.slice(sidenotePrefix.length))}`;
    const referenceId = `snref-${namespace}-${safeId(label.slice(sidenotePrefix.length))}`;
    const paragraphs = env.bookSidenotes && env.bookSidenotes[token.meta.id];
    const content = (paragraphs || [])
      .map((children) => md.renderer.renderInline(children, renderOptions, env))
      .join(' ');

    return (
      `<sup class="sidenote-ref" id="${escapeAttribute(referenceId)}">` +
      `<a href="#${escapeAttribute(noteId)}" role="doc-noteref" aria-label="Nota lateral ${number}">${number}</a>` +
      `</sup>` +
      `<span class="sidenote" id="${escapeAttribute(noteId)}" role="note" aria-labelledby="${escapeAttribute(referenceId)}">` +
      `<span class="sidenote-number" aria-hidden="true">${number}</span>` +
      `<span class="sidenote-content">${content}</span>` +
      `<a class="sidenote-backref" href="#${escapeAttribute(referenceId)}" aria-label="Voltar ao texto">↩</a>` +
      `</span>`
    );
  };
};