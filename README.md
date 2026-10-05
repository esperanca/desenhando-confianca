# Desenhando Confiança

Site e manuscrito do livro "Desenhando Confiança", sobre design, IA e confiança em interfaces generativas e agentes.

Endereço: https://desenhando-confianca.danielsouza.com

O conteúdo principal vive em arquivos Markdown portáteis. Eles podem ser lidos diretamente no GitHub, Obsidian ou qualquer editor de texto, e publicados com Eleventy.

## Estrutura

```text
src/livro/   capítulos
src/notas/   notas complementares
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
```
