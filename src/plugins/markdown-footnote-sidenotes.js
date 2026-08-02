const markdownItFootnote = require('markdown-it-footnote');

// Converte footnotes ([^1]) em sidenotes Tufte inline, no formato de
// livro-v02.html: <label> + <input checkbox> + <span class="sidenote">.
// A nota precisa ficar dentro do próprio parágrafo para o float:right
// posicioná-la na margem direita.
module.exports = function (md) {
  md.use(markdownItFootnote);

  // O conteúdo das notas não fica em env.footnotes.list (que só tem
  // label/count) — fica em tokens no bloco de rodapé montado pelo
  // footnote_tail. Este core rule extrai esse conteúdo para env e
  // remove o bloco do documento.
  md.core.ruler.after('footnote_tail', 'sidenotes_extract', function (state) {
    const tokens = state.tokens;
    const start = tokens.findIndex((t) => t.type === 'footnote_block_open');
    if (start === -1) return true;
    let end = tokens.findIndex((t) => t.type === 'footnote_block_close');
    if (end === -1) end = tokens.length - 1;

    const stash = {};
    let currentId = null;
    for (let i = start + 1; i < end; i++) {
      const t = tokens[i];
      if (t.type === 'footnote_open') {
        currentId = t.meta.id;
        stash[currentId] = [];
      } else if (t.type === 'footnote_close') {
        currentId = null;
      } else if (t.type === 'inline' && currentId !== null) {
        stash[currentId].push(t.children);
      }
    }

    state.env._sidenotes = stash;
    tokens.splice(start, end - start + 1);
    return true;
  });

  md.renderer.rules.footnote_ref = function (tokens, idx, options, env) {
    const id = tokens[idx].meta.id;
    const n = id + 1;

    let content = '';
    const paragraphs = env._sidenotes && env._sidenotes[id];
    if (paragraphs) {
      // Renderiza só o conteúdo inline: um <p> dentro do <span> fecharia
      // o parágrafo pai no browser e quebraria o float.
      content = paragraphs
        .map((children) => md.renderer.renderInline(children, options, env))
        .join(' ');
    }

    return (
      `<label for="sn-${n}" class="sn-label">${n}</label>` +
      `<input type="checkbox" id="sn-${n}" class="sn-input"/>` +
      `<span class="sidenote"><span class="sn-num">${n}</span>${content}</span>`
    );
  };
};
