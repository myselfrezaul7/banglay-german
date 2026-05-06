const fs = require('fs');
const path = require('path');

async function translateChunk(texts, targetLang) {
  // Use google translate's batch ability if possible, but single is safer.
  // We'll do Promise.all for a chunk.
  return Promise.all(texts.map(async text => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) return text;
      const data = await res.json();
      return data[0][0][0];
    } catch (e) {
      return text;
    }
  }));
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  const commonWords = fs.readFileSync('common-words.txt', 'utf8').split('\n').filter(w => w.trim().length > 0);
  let wordIndex = 0;

  const levels = [
    { id: 'a1', count: 572, category: 'daily', minLen: 1, maxLen: 5 },
    { id: 'a2', count: 532, category: 'work', minLen: 4, maxLen: 7 },
    { id: 'b1', count: 562, category: 'media', minLen: 6, maxLen: 10 },
    { id: 'b2', count: 599, category: 'academic', minLen: 8, maxLen: 20 },
  ];

  const basePath = path.join(__dirname, 'src', 'data', 'vocabulary');

  for (const level of levels) {
    const filePath = path.join(basePath, `${level.id}.ts`);
    let content = fs.readFileSync(filePath, 'utf8');

    let seenEnglish = new Set();
    const matches = content.match(/english:\s*'([^']+)'/g);
    if (matches) {
      matches.forEach(m => {
        const w = m.replace(/english:\s*'([^']+)'/, '$1');
        seenEnglish.add(w.toLowerCase());
      });
    }

    const arrayEnd = content.lastIndexOf(']');
    if (arrayEnd === -1) continue;
    
    let prefix = content.substring(0, arrayEnd);
    let suffix = content.substring(arrayEnd);
    
    let generatedCount = 0;
    let newEntries = '';

    console.log(`Starting ${level.id}, need ${level.count} words...`);

    while (generatedCount < level.count && wordIndex < commonWords.length) {
      let chunkEng = [];
      while(chunkEng.length < 50 && wordIndex < commonWords.length) {
        const engWord = commonWords[wordIndex++];
        if (engWord.length < level.minLen || engWord.length > level.maxLen) continue;
        if (seenEnglish.has(engWord.toLowerCase())) continue;
        chunkEng.push(engWord);
      }

      if (chunkEng.length === 0) break;

      const chunkDe = await translateChunk(chunkEng, 'de');
      const chunkBn = await translateChunk(chunkEng, 'bn');

      for (let i = 0; i < chunkEng.length; i++) {
        const engWord = chunkEng[i];
        const deWord = chunkDe[i];
        const bnWord = chunkBn[i];

        if (deWord.toLowerCase() === engWord.toLowerCase() || bnWord === engWord || deWord.includes('\n') || bnWord.includes('\n')) continue;
        if (generatedCount >= level.count) break;

        const safeDe = deWord.replace(/'/g, "\\'");
        const safeEn = engWord.replace(/'/g, "\\'");
        const safeBn = bnWord.replace(/'/g, "\\'");
        
        const newId = `${level.id}-gen2-${generatedCount}`;
        newEntries += `  { id: '${newId}', german: '${safeDe}', english: '${safeEn}', bangla: '${safeBn}', level: '${level.id}', category: '${level.category}' },\n`;
        
        seenEnglish.add(engWord.toLowerCase());
        generatedCount++;
      }
      console.log(`  ${level.id}: ${generatedCount}/${level.count}`);
      await delay(1000); // 1 second delay between chunks to avoid rate limiting
    }
    
    fs.writeFileSync(filePath, prefix + newEntries + suffix);
    console.log(`Completed ${level.id}. Wrote ${generatedCount} words.`);
  }
}

run().catch(console.error);
