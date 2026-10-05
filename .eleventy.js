const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownBookNotes = require('./src/plugins/markdown-book-notes');
const {DateTime} = require('luxon');

// Remove o sufixo literal "{#custom-id}" do texto visível dos headings,
// depois que o anchor plugin já o usou (via slugify) para calcular o id.
function stripCustomIdSyntax(md) {
  md.core.ruler.push('strip_custom_id_syntax', (state) => {
    state.tokens.forEach((token, idx) => {
      const prev = state.tokens[idx - 1];
      if (token.type === 'inline' && prev && prev.type === 'heading_open') {
        token.children.forEach((child) => {
          if (child.type === 'text') {
            child.content = child.content.replace(/\s*\{#[\w-]+\}\s*$/, '');
          }
        });
      }
    });
    return true;
  });
}

const markdownLibrary = markdownIt({
  html: true,
}).use(markdownBookNotes).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.linkInsideHeader({
    class: 'tdbc-anchor',
    symbol: '<span class="visually-hidden">Link para esta seção</span><span aria-hidden="true">#</span>',
    placement: 'after',
    space: true,
  }),
  level: [1, 2, 3],
  slugify: (s) => {
    const text = s.replace(/{#[\w-]+}/g, '').trim();
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s+~\/]/g, '-')
      .replace(/[().`,%·'"!?¿:@*]/g, '');
  },
}).use(stripCustomIdSyntax);

// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const editorialStatuses = {
  published: {
    label: 'Publicado',
    description: 'Conteúdo publicado e disponível na edição pública.',
    requiresDraft: false,
  },
  review: {
    label: 'Em revisão',
    description: 'Conteúdo público que ainda pode receber alterações editoriais.',
    requiresDraft: false,
  },
  'internal-review': {
    label: 'Revisão interna',
    description: 'Conteúdo disponível somente na prévia local e no build interno.',
    requiresDraft: true,
  },
  draft: {
    label: 'Rascunho',
    description: 'Conteúdo em elaboração, ainda fora da edição pública.',
    requiresDraft: true,
  },
};

function toIndexEntry(item) {
  return {
    url: item.url,
    data: item.data,
  };
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Eleventy não trata `draft` como uma chave especial por padrão. Esta
  // implementação segue o padrão oficial do Eleventy Base Blog: rascunhos
  // aparecem no `--serve`, mas são removidos do build público.
  eleventyConfig.addPreprocessor('editorial-drafts', '*', (data) => {
    const status = data.status;

    const isPublicBuild =
      process.env.ELEVENTY_RUN_MODE === 'build' &&
      process.env.INCLUDE_DRAFTS !== 'true';

    if (data.internalOnly === true && isPublicBuild) {
      return false;
    }

    const where = data.page?.inputPath || data.title;
    const validTypes = ['chapter', 'note', 'page'];

    if (data.type !== undefined && !validTypes.includes(data.type)) {
      throw new Error(
        `type inválido em ${where}: "${data.type}" (use ${validTypes.join(', ')}).`
      );
    }

    if (data.type === 'chapter') {
      if (typeof data.order !== 'number' || Number.isNaN(data.order)) {
        throw new Error(`type: chapter exige order numérico em ${where}.`);
      }
      if (typeof data.summary !== 'string' || data.summary.trim().length === 0) {
        throw new Error(`type: chapter exige summary em ${where}.`);
      }
    }

    if (!status) return;

    const definition = editorialStatuses[status];
    if (!definition) {
      throw new Error(
        `Status editorial desconhecido em ${data.page?.inputPath || data.title}: ${status}`
      );
    }

    const isDraft = data.draft === true;
    if (definition.requiresDraft !== isDraft) {
      throw new Error(
        `Combinação inválida em ${data.page?.inputPath || data.title}: ` +
        `status "${status}" ${definition.requiresDraft ? 'exige' : 'não permite'} draft: true.`
      );
    }

    if (data.reviewCategory === 'internal' && status !== 'internal-review') {
      throw new Error(
        `reviewCategory: internal exige status: internal-review em ${data.page?.inputPath || data.title}.`
      );
    }

    if (isDraft && isPublicBuild) {
      return false;
    }

  });

  eleventyConfig.addCollection('chapters', (collection) =>
    collection
      .getFilteredByTag('chapter')
      .filter((item) => item.data.draft !== true)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
      .map(toIndexEntry)
  );

  eleventyConfig.addCollection('notes', (collection) =>
    collection
      .getFilteredByTag('note')
      .sort((a, b) => a.data.title.localeCompare(b.data.title, 'pt-BR'))
      .map(toIndexEntry)
  );

  eleventyConfig.addFilter('livroDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj)
      .setZone('America/Sao_Paulo')
      .setLocale('pt-BR')
      .toFormat("d 'de' MMMM 'de' yyyy · HH:mm");
  });

  // Filters
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);
  eleventyConfig.addFilter('githubEditUrl', (inputPath, repositoryUrl, branch) => {
    if (typeof inputPath !== 'string' || inputPath.length === 0) {
      return '';
    }
    if (typeof repositoryUrl !== 'string' || repositoryUrl.length === 0) {
      return '';
    }
    const repo = repositoryUrl.replace(/\/$/, '');
    const ref = typeof branch === 'string' && branch.length > 0 ? branch : 'main';
    const normalized = inputPath.replace(/\\/g, '/');
    const srcIndex = normalized.indexOf('src/');
    const sourcePath = (srcIndex >= 0 ? normalized.slice(srcIndex) : normalized)
      .replace(/^\.\//, '')
      .replace(/^\/+/, '');

    return `${repo}/edit/${ref}/${sourcePath}`;
  });
  eleventyConfig.addFilter('findByUrl', (entries, url) =>
    Array.isArray(entries) && url ? entries.find((entry) => entry.url === url) || null : null
  );
  eleventyConfig.addFilter('statusLabel', (status) =>
    editorialStatuses[status]?.label || status
  );
  eleventyConfig.addFilter('statusDescription', (status) =>
    editorialStatuses[status]?.description || ''
  );

  // Layout aliases
  eleventyConfig.addLayoutAlias('livro', 'layouts/livro.njk');

  // Passthrough copy
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/robots.txt');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    passthroughFileCopy: true,
  };
};
