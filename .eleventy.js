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

const editorialChangeLabels = new Map([
  ['0307d28a5bb58526611f210010a66cb9d66a10f9', 'Padronização da Introdução e inclusão do log de mudanças.'],
  ['a0ca71d6a2d82c38a2ecc6e57b8b9cbfc24e05dd', 'Sincronização da Introdução com o texto publicado.'],
  ['66a8563af2b3e12264bf40a2532ac36f600404b2', 'Sidenote de tarifa de luto e links de autores.'],
  ['e21b2a95a56ba189edd2ae6ff8fa52d3a7c0e521', 'Ajuste no resumo do Prefácio.'],
  ['478d63f34f8f1096d7bb8d4c08e78b89c0e6e719', 'Sincronização do Prefácio com o texto publicado.'],
  ['576cba6574196309902a5f9493f7b98894665e41', 'Definição de confiança em verificabilidade.'],
  ['37c2f7b823327c587514e16b9d11bed7b0e6f312', 'Referência sobre dependência epistêmica.'],
  ['5e18224b8b5540003661362c99d0c36bf0e08f1c', 'Trecho sobre dependência epistêmica.'],
  ['d8445cc9677437d123e1b82794dcf20da29caf79', 'Parágrafos iniciais da seção.'],
  ['fdb8794dbdcb9de07c2d81a154ddcfa5108411e9', 'Abertura da página e página central de design.'],
  ['2fd2a01114564b2375c47842c2781acca447b6b4', 'Referências bibliográficas e sidenotes do capítulo.'],
  ['ef1d3899bb9fbb82ebd1c85a7e10ce8c6a5dfdeb', 'Publicação inicial do capítulo Verificabilidade.'],
  ['d008c5213fbf7877ab2d184a82e3fbd3fd1821b3', 'Entrada inicial no modelo editorial do livro.'],
]);

const authorUrls = new Map([
  ['Daniel Souza', '/autores/#daniel-souza'],
  ['Daniel Vieira Souza', '/autores/#daniel-souza'],
  ['Pedro Albuquerque', '/autores/#pedro-albuquerque'],
  ['Leiliane Fagundes', '/autores/#leiliane-fagundes'],
]);

function toIndexEntry(item) {
  return {
    url: item.url,
    data: item.data,
  };
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addGlobalData('build', () => ({
    internal: process.env.INCLUDE_DRAFTS === 'true',
  }));

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
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(date)
      .setZone('America/Sao_Paulo')
      .setLocale('pt-BR')
      .toFormat("d 'de' MMMM 'de' yyyy · HH:mm");
  });
  eleventyConfig.addFilter('changeDateGroup', (dateObj) => {
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(date)
      .setZone('America/Sao_Paulo')
      .setLocale('pt-BR')
      .toFormat('d LLL yyyy');
  });
  eleventyConfig.addFilter('changeTime', (dateObj) => {
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(date)
      .setZone('America/Sao_Paulo')
      .setLocale('pt-BR')
      .toFormat('HH:mm');
  });
  eleventyConfig.addFilter('editorialChangeLabel', (change) => {
    if (!change) return '';
    if (editorialChangeLabels.has(change.hash)) return editorialChangeLabels.get(change.hash);
    const subject = String(change.subject || '').trim();
    if (!subject) return 'Alteração editorial.';
    return subject.endsWith('.') ? subject : `${subject}.`;
  });
  eleventyConfig.addFilter('authorUrl', (author) => authorUrls.get(author) || '');
  eleventyConfig.addFilter('commitUrl', (hash, repositoryUrl) => {
    if (!hash || !repositoryUrl) return '';
    return `${String(repositoryUrl).replace(/\/$/, '')}/commit/${hash}`;
  });
  eleventyConfig.addFilter('readableList', (items) => {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (values.length === 0) return '';
    if (values.length === 1) return values[0];
    if (values.length === 2) return `${values[0]} e ${values[1]}`;
    return `${values.slice(0, -1).join(', ')} e ${values[values.length - 1]}`;
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
  const pageChangesCache = new Map();
  eleventyConfig.addFilter('pageChanges', (inputPath) => {
    if (typeof inputPath !== 'string' || inputPath.length === 0) return null;
    if (pageChangesCache.has(inputPath)) return pageChangesCache.get(inputPath);
    const {execSync} = require('node:child_process');
    const run = (args) => {
      try {
        return execSync(`git ${args}`, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();
      } catch {
        return '';
      }
    };
    const parse = (line) => {
      const [hash, date, author, ...subject] = line.split('|');
      if (!hash) return null;
      return {hash, date, author, subject: subject.join('|')};
    };
    const releaseFor = (hash) => {
      const containingTagsRaw = run(`tag --contains ${hash} --sort=v:refname`);
      const release = containingTagsRaw
        ? containingTagsRaw
            .split('\n')
            .map((tag) => tag.trim())
            .filter(Boolean)[0]
        : '';
      return release || 'Ainda não lançada';
    };
    const normalized = inputPath.replace(/\\/g, '/');
    const srcIndex = normalized.indexOf('src/');
    const rel = srcIndex >= 0 ? normalized.slice(srcIndex) : normalized.replace(/^\.\//, '');
    const raw = run(`log -10 --format='%H|%cI|%an|%s' -- ${JSON.stringify(rel)}`);
    const commits = raw
      ? raw
          .split('\n')
          .map(parse)
          .filter(Boolean)
          .map((commit) => ({...commit, release: releaseFor(commit.hash)}))
      : [];
    if (!commits.length) return null;
    const groups = commits.reduce((acc, commit) => {
      const key = DateTime.fromJSDate(new Date(commit.date))
        .setZone('America/Sao_Paulo')
        .toISODate();
      const group = acc.find((item) => item.key === key);
      if (group) {
        group.commits.push(commit);
      } else {
        acc.push({key, date: commit.date, commits: [commit]});
      }
      return acc;
    }, []);
    const result = {last: commits[0], commits, groups};
    pageChangesCache.set(inputPath, result);
    return result;
  });
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
