// Funções puras sobre a estrutura do livro (src/_data/sumario.json) e o texto dos capítulos.

function flattenSumario(sumario) {
  if (!sumario) return [];
  const items = [];
  (sumario.intro || []).forEach((item) => items.push({...item, part: null, chapter: null}));
  let chapter = 0;
  (sumario.parts || []).forEach((part) => {
    const partLabel = String(part.title || '').split('—')[0].trim();
    (part.items || []).forEach((item) => {
      chapter += 1;
      items.push({...item, part: partLabel, chapter});
    });
  });
  ((sumario.additional && sumario.additional.items) || []).forEach((item) =>
    items.push({...item, part: null, chapter: null})
  );
  return items;
}

// Posição de um capítulo no livro: {part: 'Parte I', chapter: 3}. Numeração contínua entre as partes.
function bookPosition(url, sumario) {
  const entry = flattenSumario(sumario).find((item) => item.url === url);
  return entry && entry.chapter ? {part: entry.part, chapter: entry.chapter} : null;
}

// Itens anterior e próximo na ordem do sumário.
function bookNeighbors(url, sumario) {
  const items = flattenSumario(sumario);
  const index = items.findIndex((item) => item.url === url);
  if (index === -1) return null;
  return {previous: items[index - 1] || null, next: items[index + 1] || null};
}

// Tempo de leitura em minutos, a 200 palavras por minuto, a partir do HTML renderizado.
function readingTime(html) {
  const text = String(html || '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return words ? Math.max(1, Math.round(words / 200)) : 0;
}

// Versão mais recente em que a página mudou, a partir do resultado de pageChanges.
function latestRelease(changes) {
  const commits = (changes && changes.commits) || [];
  const released = commits.find((commit) => /^v\d/.test(commit.release || ''));
  return released ? released.release : '';
}

module.exports = {flattenSumario, bookPosition, bookNeighbors, readingTime, latestRelease};
