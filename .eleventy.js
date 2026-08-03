const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const svgContents = require('eleventy-plugin-svg-contents');
const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownFootnoteSidenotes = require('./src/plugins/markdown-footnote-sidenotes');
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
}).use(markdownFootnoteSidenotes).use(markdownItAnchor, {
  permalink: true,
  permalinkClass: 'tdbc-anchor',
  permalinkSymbol: '#',
  permalinkAttrs: () => ({'aria-label': 'link para esta seção'}),
  permalinkSpace: true,
  permalinkBefore: false,
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

// Import transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addFilter('livroDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj)
      .setZone('America/Sao_Paulo')
      .setLocale('pt-BR')
      .toFormat("d 'de' MMMM 'de' yyyy · HH:mm");
  });

  // Filters
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

  // Layout aliases
  eleventyConfig.addLayoutAlias('livro', 'layouts/livro.njk');

  // Transforms
  eleventyConfig.addTransform('htmlmin', htmlMinTransform);

  // Passthrough copy
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/robots.txt');

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(svgContents);

  // 404
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    passthroughFileCopy: true,
  };
};
