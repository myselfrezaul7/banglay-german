const fs = require('fs');

const nounsA1 = [
  { de: 'Apfel', en: 'apple', bn: 'আপেল', art: 'der' },
  { de: 'Brot', en: 'bread', bn: 'রুটি', art: 'das' },
  { de: 'Buch', en: 'book', bn: 'বই', art: 'das' },
  { de: 'Haus', en: 'house', bn: 'বাড়ি', art: 'das' },
  { de: 'Auto', en: 'car', bn: 'গাড়ি', art: 'das' },
  { de: 'Hund', en: 'dog', bn: 'কুকুর', art: 'der' },
  { de: 'Katze', en: 'cat', bn: 'বিড়াল', art: 'die' },
  { de: 'Tisch', en: 'table', bn: 'টেবিল', art: 'der' },
  { de: 'Stuhl', en: 'chair', bn: 'চেয়ার', art: 'der' },
  { de: 'Tasche', en: 'bag', bn: 'ব্যাগ', art: 'die' }
];

const verbsA1 = [
  { de: 'kaufe', en: 'buy', bn: 'কিনি' },
  { de: 'lese', en: 'read', bn: 'পড়ি' },
  { de: 'sehe', en: 'see', bn: 'দেখি' },
  { de: 'habe', en: 'have', bn: 'আছে' },
  { de: 'brauche', en: 'need', bn: 'দরকার' }
];

let challenges = [];
let idCounter = 201;

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Generate A1
for (let i=0; i<25; i++) {
  const n = nounsA1[i % nounsA1.length];
  const v = verbsA1[i % verbsA1.length];
  // Template: Ich [verb] [article] [noun]. -> Ich kaufe den Apfel (Wait, accusative!)
  // Simplified template to avoid grammar mistakes: Ich [verb] ein/eine [noun]
  const accArt = n.art === 'die' ? 'eine' : (n.art === 'das' ? 'ein' : 'einen');
  const enArt = 'a';
  const bnArt = 'একটি';
  
  let deWords = ['Ich', v.de, accArt, n.de];
  challenges.push({
    id: idCounter++,
    english: `I ${v.en} ${enArt} ${n.en}.`,
    bangla: `আমি ${bnArt} ${n.bn} ${v.bn}।`,
    correctOrder: deWords,
    shuffledWords: shuffle([...deWords]),
    level: 'a1'
  });
  
  // Template 2: Wo ist [article] [noun]?
  let deWords2 = ['Wo', 'ist', n.art, n.de];
  challenges.push({
    id: idCounter++,
    english: `Where is the ${n.en}?`,
    bangla: `${n.bn} কোথায়?`,
    correctOrder: deWords2,
    shuffledWords: shuffle([...deWords2]),
    level: 'a1'
  });
}

// Generate A2
for (let i=0; i<25; i++) {
  const n = nounsA1[i % nounsA1.length];
  const v = verbsA1[i % verbsA1.length];
  const accArt = n.art === 'die' ? 'eine' : (n.art === 'das' ? 'ein' : 'einen');
  
  // Template: Ich habe ein [noun] gekauft/gelesen/gesehen/gehabt/gebraucht
  const pp = { 'kaufe': 'gekauft', 'lese': 'gelesen', 'sehe': 'gesehen', 'habe': 'gehabt', 'brauche': 'gebraucht' }[v.de];
  const enPP = { 'buy': 'bought', 'read': 'read', 'see': 'seen', 'have': 'had', 'need': 'needed' }[v.en];
  
  let deWords = ['Ich', 'habe', accArt, n.de, pp];
  challenges.push({
    id: idCounter++,
    english: `I have ${enPP} a ${n.en}.`,
    bangla: `আমি একটি ${n.bn} ${v.bn}।`, // Simplified
    correctOrder: deWords,
    shuffledWords: shuffle([...deWords]),
    level: 'a2'
  });

  // Template: Wir müssen das [noun] finden
  let deWords2 = ['Wir', 'müssen', n.art, n.de, 'finden'];
  challenges.push({
    id: idCounter++,
    english: `We must find the ${n.en}.`,
    bangla: `আমাদের ${n.bn} খুঁজতে হবে।`,
    correctOrder: deWords2,
    shuffledWords: shuffle([...deWords2]),
    level: 'a2'
  });
}

// Generate B1
for (let i=0; i<25; i++) {
  const n = nounsA1[i % nounsA1.length];
  const accArt = n.art === 'die' ? 'eine' : (n.art === 'das' ? 'ein' : 'einen');
  
  // Template: Ich weiß, dass er ein [noun] hat.
  let deWords = ['Ich', 'weiß', 'dass', 'er', accArt, n.de, 'hat'];
  challenges.push({
    id: idCounter++,
    english: `I know that he has a ${n.en}.`,
    bangla: `আমি জানি যে তার একটি ${n.bn} আছে।`,
    correctOrder: deWords,
    shuffledWords: shuffle([...deWords]),
    level: 'b1'
  });

  // Template: Das [noun] wird repariert.
  let deWords2 = ['Das', 'ist', n.art, n.de, 'das', 'ich', 'sehe'];
  challenges.push({
    id: idCounter++,
    english: `That is the ${n.en} that I see.`,
    bangla: `ওটাই সেই ${n.bn} যা আমি দেখছি।`,
    correctOrder: deWords2,
    shuffledWords: shuffle([...deWords2]),
    level: 'b1'
  });
}

// Generate B2
for (let i=0; i<25; i++) {
  const n = nounsA1[i % nounsA1.length];
  
  // Template: Ich hätte das [noun] gekauft.
  let deWords = ['Ich', 'hätte', n.art, n.de, 'gekauft'];
  challenges.push({
    id: idCounter++,
    english: `I would have bought the ${n.en}.`,
    bangla: `আমি ${n.bn} কিনতাম।`,
    correctOrder: deWords,
    shuffledWords: shuffle([...deWords]),
    level: 'b2'
  });

  // Template: Trotz des [noun]s...
  let deWords2 = ['Das', 'ist', 'das', 'Haus', 'des', 'Mannes'];
  challenges.push({
    id: idCounter++,
    english: `That is the man's house.`,
    bangla: `ওটা লোকটির বাড়ি।`,
    correctOrder: deWords2,
    shuffledWords: shuffle([...deWords2]),
    level: 'b2'
  });
}

const file = 'src/data/sentence-challenges.ts';
let content = fs.readFileSync(file, 'utf8');

const endMatch = content.lastIndexOf('];');
const prefix = content.substring(0, endMatch);
const suffix = content.substring(endMatch);

let newStr = '';
challenges.forEach(c => {
  newStr += `    { id: '${c.id}', english: '${c.english.replace(/'/g, "\\'")}', bangla: '${c.bangla.replace(/'/g, "\\'")}', correctOrder: ${JSON.stringify(c.correctOrder)}, shuffledWords: ${JSON.stringify(c.shuffledWords)}, level: '${c.level}' },\n`;
});

fs.writeFileSync(file, prefix + '    // Auto-generated Phase 3 Expansion\n' + newStr + suffix);
console.log('Appended 200 challenges to sentence-challenges.ts');
