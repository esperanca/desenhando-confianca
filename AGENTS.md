# Instruções para agentes

Este repositório é mantido com apoio de agentes. Antes de editar, leia este arquivo e o `README.md`.

## Objetivo do projeto

`Desenhando Confiança` é o site e manuscrito de um livro sobre design, IA e confiança em interfaces generativas e agentes.

Arquitetura editorial atual:

- Home `/`: capa, sumário público, notas públicas e log global.
- `/sobre-o-livro/`: apresentação única do livro.
- `/design/`: referência pública central de design editorial e visual.
- `/autores/`: autores e colaboradores.
- `/notas/`: índice público de notas complementares.
- `/livro/.../`: capítulos. Não recrie `/livro/` como página índice; o sumário vive na home.

## Rotina padrão

1. Entenda o pedido e identifique arquivos afetados.
2. Verifique o estado do Git antes de editar:

   ```bash
   git status --short
   ```

3. Leia os arquivos relevantes antes de alterar.
4. Faça mudanças pequenas e coerentes.
5. Rode a verificação completa:

   ```bash
   npm run verify
   ```

6. Se o usuário pediu commit, faça um commit claro e pequeno.
7. Se o usuário pediu deploy, rode:

   ```bash
   npm run deploy
   ```

8. Se houver push, informe o link do commit no GitHub.

## Comandos disponíveis

```bash
npm run verify
```

Executa testes, build público, checagem de links do build público, build interno e checagem de links do build interno.

```bash
npm run deploy
```

Gera o build público, checa links e publica `dist/` no Cloudflare Pages.

```bash
npm run release -- vX.Y.Z "Resumo da rodada"
```

Com a árvore Git limpa, cria uma tag anotada, valida tudo, publica e faz push de `main` com tags.

Use release apenas quando o usuário pedir fechamento de versão. A tag precisa existir antes do build final para os logs mostrarem a versão em vez de `Ainda não lançada`.

## Logs editoriais

O projeto tem dois níveis de log.

### Log por página

Capítulos e páginas exibem `Log de mudanças` específico do arquivo, agrupado por dia:

```text
HH:mm — Descrição editorial. Autor · Ver alteração · versão
```

Regras:

- O autor deve linkar para `/autores/#...` quando houver perfil correspondente.
- `Ver alteração` deve apontar para o commit no GitHub.
- A versão vem da primeira tag que contém o commit.
- Se o commit ainda não estiver em tag, mostrar `Ainda não lançada`.

### Log global da home

A home exibe o log geral do projeto. O resumo deve seguir o padrão:

```text
Mudanças de [tipo(s)] em [página(s)/área(s)].
```

Exemplos:

```text
Mudanças de conteúdo em Verificabilidade.
Mudanças de estrutura editorial em Home, Notas e Design.
Mudanças de design e conteúdo em Sobre o livro.
```

Páginas citadas no log global devem apontar para páginas públicas existentes. Não crie links para páginas removidas ou internas.

## Regras editoriais importantes

- `/livro/` não deve existir como página índice. O sumário está na home.
- Links para capítulos como `/livro/introducao/`, `/livro/prefacio/` e `/livro/verificabilidade/` são válidos.
- `/sobre-o-livro/` é a apresentação principal do livro.
- Mantenha seções curtas de `Design` e `Autores` em `/sobre-o-livro/`.
- Não reintroduza bloco longo `Sobre o autor` em `/sobre-o-livro/`.
- Se uma página pública for removida, revise navegação, README e changelog para evitar links quebrados.
- Preserve a sintaxe de sidenotes: identificadores de nota iniciados por `sn-` viram sidenotes; outras notas continuam como footnotes.

## Estados editoriais

Use os campos de front matter conforme o README:

- `status: published`: público.
- `status: review`: público com etiqueta de revisão.
- `status: internal-review` + `draft: true`: somente build interno.
- `status: draft` + `draft: true`: somente build interno.

Combinações inválidas interrompem o build.

## Antes de responder ao usuário

Inclua um resumo objetivo do que mudou e das validações executadas.

Quando houver commit+push, informe:

- link do commit;
- se houve deploy, a URL gerada pelo Cloudflare Pages;
- comandos de validação executados.

Não diga que fez deploy, push, release ou validação sem ter executado o comando correspondente.