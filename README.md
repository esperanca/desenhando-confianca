# Desenhando Confiança

Site e manuscrito do livro "Desenhando Confiança", sobre design, IA e confiança em interfaces generativas e agentes.

Site público: https://desenhando-confianca.pages.dev
Repositório: https://github.com/esperanca/desenhando-confianca

O conteúdo principal vive em arquivos Markdown portáteis. Eles podem ser lidos diretamente no GitHub, Obsidian ou qualquer editor de texto, e publicados com Eleventy.

## Estrutura

```text
src/livro/   capítulos
src/notas/   notas complementares
src/design/  log do projeto de design (interno, fora do build público)
src/pages/   páginas institucionais (sobre)
src/plugins/ plugin markdown-it para sidenotes e footnotes
```

## Sidenotes e footnotes

Use a sintaxe normal de notas de rodapé do Markdown. Identificadores iniciados por `sn-` viram sidenotes no site:

```md
Texto com uma nota lateral.[^sn-contexto]

[^sn-contexto]: Esta nota aparece na margem em telas largas.
```

Qualquer outro identificador continua sendo uma footnote convencional:

```md
Texto sustentado por uma referência.[^fonte]

[^fonte]: Autor. Título. Ano.
```

No Obsidian, ambas continuam aparecendo como notas de rodapé normais.

## Estados editoriais e drafts

O campo `status` é editorial e aparece visivelmente nas páginas. O campo `draft` controla a publicação no Eleventy.

| status | draft | publicação |
|---|---:|---|
| `published` | `false` ou ausente | edição pública |
| `review` | `false` ou ausente | edição pública com etiqueta “Em revisão” |
| `internal-review` | `true` | somente servidor local e build interno |
| `draft` | `true` | somente servidor local e build interno |

Exemplo de capítulo público em revisão:

```yaml
status: review
```

Exemplo de capítulo em revisão interna:

```yaml
status: internal-review
draft: true
reviewCategory: internal
tags:
  - chapter
  - internal-review
```

O build público segue o padrão recomendado pelo Eleventy Base Blog e exclui documentos com `draft: true` por meio de um preprocessor. Combinações inválidas entre `status` e `draft` interrompem o build.

A página `/revisao-interna/` usa `internalOnly: true`: ela não é um conteúdo editorial do livro, mas um índice operacional. O mesmo preprocessor a remove do build público.

## Uso local

```bash
# 1. Clone the repository
git clone https://github.com/esperanca/desenhando-confianca

# 2. Navigate into repository
cd desenhando-confianca

# 3. Install the dependencies
npm install

# 4. Inicie o servidor de desenvolvimento
npm run start

# 5. Gere o HTML estático em dist/
npm run build

# 6. Gere a prévia interna, incluindo drafts, em dist-internal/
npm run build:internal

# 7. Rode os testes do plugin de notas
npm test

# 8. Rode a verificação completa usada antes de publicar
npm run verify
```

## Deploy (Cloudflare Pages)

```bash
# Verifica, gera o build público e publica via upload direto
npm run deploy
```

Projeto: `desenhando-confianca` · URL: https://desenhando-confianca.pages.dev

O deploy é manual via `wrangler pages deploy`. Não há integração
Pages↔GitHub configurada, e nenhum domínio próprio apontado.

## Rotina para agentes

Use estes comandos para padronizar a atualização do site:

```bash
# Verifica tudo antes de commit/deploy:
# - npm test
# - build público
# - links internos do build público
# - build interno
# - links internos do build interno
npm run verify

# Publica o build público no Cloudflare Pages
npm run deploy

# Fecha uma rodada com tag, rebuild, deploy e push de main+tags
npm run release -- v0.6.0 "Resumo da rodada"
```

Regras operacionais:

- Faça commits pequenos e coerentes antes de fechar uma rodada.
- Só rode `npm run release -- vX.Y.Z` com a árvore git limpa.
- Depois de cada commit+push, informe o link do commit.
- Depois de cada release, informe também a tag criada.
- A tag precisa existir antes do build final para os logs mostrarem a versão em vez de `Ainda não lançada`.

## Design e logs

A página `/design/` é pública e funciona como referência central do projeto
editorial e visual do livro. Os arquivos filhos em `src/design/` seguem como
itens de revisão interna (`status: internal-review`, `draft: true`) e aparecem
no build interno.

Capítulos e páginas exibem "Log de mudanças" específico do arquivo, agrupado
por dia, com autor, link para commit e versão. A home exibe o log global do
projeto, com a frase `Mudanças de [tipo(s)] em [página(s)/área(s)]`, sempre
linkando páginas públicas citadas.
