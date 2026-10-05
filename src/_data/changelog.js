const {execSync} = require('node:child_process');
const {DateTime} = require('luxon');

const repositoryUrl = 'https://github.com/esperanca/desenhando-confianca';

const pages = {
  design: {label: 'Design', url: '/design/'},
  introducao: {label: 'Introdução', url: '/livro/introducao/'},
  prefacio: {label: 'Prefácio', url: '/livro/prefacio/'},
  verificabilidade: {label: 'Verificabilidade', url: '/livro/verificabilidade/'},
  autores: {label: 'Autores', url: '/autores/'},
  sobre: {label: 'Sobre o livro', url: '/sobre-o-livro/'},
  hci: {label: 'Princípios de HCI', url: '/notas/principios-de-hci/'},
  memoria: {label: 'Tipos de memória', url: '/notas/tipos-de-memoria/'},
  notas: {label: 'Notas', url: '/notas/'},
  home: {label: 'Home', url: '/'},
};

const metadata = new Map([
  ['e93a2711a49506208b6f5a2e4da2c6920bcd4bd1', {
    label: 'Logs das páginas do livro.',
    kinds: ['estrutura editorial'],
    targets: [pages.introducao, pages.prefacio, pages.verificabilidade, pages.hci, pages.memoria],
  }],
  ['502dc2977df6949ab656630ba6e5381190ac1eab', {
    label: 'Versão nos logs por página.',
    kinds: ['técnica', 'estrutura editorial'],
    targets: [pages.design, pages.introducao, pages.prefacio, pages.verificabilidade, pages.autores, pages.sobre, pages.hci, pages.memoria],
  }],
  ['c177920394e6d39f3b355fb4ca75b3c63a298214', {
    label: 'Novo formato dos logs por página.',
    kinds: ['estrutura editorial', 'técnica'],
    targets: [pages.introducao, pages.prefacio, pages.verificabilidade, pages.autores, pages.sobre, pages.notas],
  }],
  ['5894cad98d671731854a8e4efad76efe383cc5ba', {
    label: 'Página central de design.',
    kinds: ['design', 'estrutura do site'],
    targets: [pages.design, pages.sobre],
  }],
  ['576cba6574196309902a5f9493f7b98894665e41', {
    label: 'Definição de confiança em verificabilidade.',
    kinds: ['conteúdo'],
    targets: [pages.verificabilidade],
  }],
  ['37c2f7b823327c587514e16b9d11bed7b0e6f312', {
    label: 'Referência sobre dependência epistêmica.',
    kinds: ['conteúdo', 'referências'],
    targets: [pages.verificabilidade],
  }],
  ['5e18224b8b5540003661362c99d0c36bf0e08f1c', {
    label: 'Trecho sobre dependência epistêmica.',
    kinds: ['conteúdo'],
    targets: [pages.verificabilidade],
  }],
  ['d8445cc9677437d123e1b82794dcf20da29caf79', {
    label: 'Parágrafos iniciais de verificabilidade.',
    kinds: ['conteúdo'],
    targets: [pages.verificabilidade],
  }],
  ['fdb8794dbdcb9de07c2d81a154ddcfa5108411e9', {
    label: 'Página central de design e abertura de verificabilidade.',
    kinds: ['design', 'conteúdo'],
    targets: [pages.design, pages.verificabilidade],
  }],
  ['0a3551342f9c427939b74026ed1c4499194e2cb4', {
    label: 'Rodapé do site.',
    kinds: ['estrutura do site'],
    targets: [{label: 'Rodapé'}],
  }],
  ['28e2fd2d3b8ea03d8f7b21f458d3ac3d206ae666', {
    label: 'Página de autores.',
    kinds: ['conteúdo'],
    targets: [pages.autores],
  }],
  ['65a7ec56c8a903ec9486008f47e6e41193cf23fd', {
    label: 'Tipografia Timeless.',
    kinds: ['design'],
    targets: [pages.home, pages.design],
  }],
  ['66a8563af2b3e12264bf40a2532ac36f600404b2', {
    label: 'Autores, design e sidenote no prefácio.',
    kinds: ['conteúdo', 'design', 'estrutura do site'],
    targets: [pages.prefacio, pages.autores, pages.sobre, {label: 'Navegação'}, {label: 'Rodapé'}],
  }],
  ['53dcc40b12846d4a6e65b2a3ce1a26292f6f5033', {
    label: 'Log de design e documentação do projeto.',
    kinds: ['design', 'documentação'],
    targets: [pages.design, {label: 'README'}],
  }],
  ['0307d28a5bb58526611f210010a66cb9d66a10f9', {
    label: 'Introdução e logs por página.',
    kinds: ['conteúdo', 'estrutura editorial'],
    targets: [pages.introducao, pages.home],
  }],
  ['2fd2a01114564b2375c47842c2781acca447b6b4', {
    label: 'Referências de verificabilidade e reorganização do livro.',
    kinds: ['conteúdo', 'referências', 'estrutura editorial'],
    targets: [pages.verificabilidade, pages.home],
  }],
  ['ef1d3899bb9fbb82ebd1c85a7e10ce8c6a5dfdeb', {
    label: 'Publicação inicial de verificabilidade.',
    kinds: ['conteúdo', 'estrutura editorial'],
    targets: [pages.verificabilidade, pages.home],
  }],
]);

function git(args) {
  try {
    return execSync(`git ${args}`, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();
  } catch {
    return '';
  }
}

function parseLine(line) {
  const [hash, date, author, ...subject] = line.split('|');
  if (!hash) return null;
  return {hash, date, author, subject: subject.join('|')};
}

function fallbackLabel(subject) {
  const value = String(subject || '').trim();
  if (!value) return 'Alteração no projeto.';
  return value.endsWith('.') ? value : `${value}.`;
}

function releaseFor(hash) {
  const tag = git(`tag --contains ${hash} --sort=v:refname`).split('\n').filter(Boolean)[0];
  return tag || 'Ainda não lançada';
}

function groupByDay(commits) {
  return commits.reduce((groups, commit) => {
    const key = DateTime.fromJSDate(new Date(commit.date)).setZone('America/Sao_Paulo').toISODate();
    const group = groups.find((item) => item.key === key);
    if (group) {
      group.commits.push(commit);
    } else {
      groups.push({key, date: commit.date, commits: [commit]});
    }
    return groups;
  }, []);
}

module.exports = function () {
  const raw = git("log -14 --format='%H|%cI|%an|%s' -- src .eleventy.js README.md");
  const commits = raw
    ? raw
        .split('\n')
        .map(parseLine)
        .filter(Boolean)
        .map((commit) => {
          const meta = metadata.get(commit.hash) || {};
          return {
            ...commit,
            label: meta.label || fallbackLabel(commit.subject),
            kinds: meta.kinds || ['projeto'],
            targets: meta.targets || [],
            release: releaseFor(commit.hash),
            url: `${repositoryUrl}/commit/${commit.hash}`,
          };
        })
    : [];

  return {commits, groups: groupByDay(commits)};
};