const fs = require('fs');

const baseSentences = [
  // A1
  { de: 'Ich bin glücklich.', en: 'I am happy.', bn: 'আমি খুব খুশি।', level: 'a1', words: [{de:'Ich',en:'I',bn:'আমি'},{de:'bin',en:'am',bn:'হই'},{de:'glücklich',en:'happy',bn:'খুশি'}] },
  { de: 'Er trinkt Wasser.', en: 'He drinks water.', bn: 'সে পানি পান করে।', level: 'a1', words: [{de:'Er',en:'He',bn:'সে'},{de:'trinkt',en:'drinks',bn:'পান করে'},{de:'Wasser',en:'water',bn:'পানি'}] },
  { de: 'Die Sonne scheint.', en: 'The sun is shining.', bn: 'সূর্য কিরণ দিচ্ছে।', level: 'a1', words: [{de:'Die',en:'The',bn:'টি'},{de:'Sonne',en:'sun',bn:'সূর্য'},{de:'scheint',en:'shines',bn:'কিরণ দিচ্ছে'}] },
  { de: 'Ich lese ein Buch.', en: 'I read a book.', bn: 'আমি একটি বই পড়ছি।', level: 'a1', words: [{de:'Ich',en:'I',bn:'আমি'},{de:'lese',en:'read',bn:'পড়ি'},{de:'ein',en:'a',bn:'একটি'},{de:'Buch',en:'book',bn:'বই'}] },
  // A2
  { de: 'Ich habe einen Apfel gegessen.', en: 'I ate an apple.', bn: 'আমি একটি আপেল খেয়েছি।', level: 'a2', words: [{de:'Ich',en:'I',bn:'আমি'},{de:'habe',en:'have',bn:'আছি (সাহায্যকারী)'},{de:'einen',en:'an',bn:'একটি'},{de:'Apfel',en:'apple',bn:'আপেল'},{de:'gegessen',en:'eaten',bn:'খেয়েছি'}] },
  { de: 'Wir müssen nach Hause gehen.', en: 'We must go home.', bn: 'আমাদের বাড়ি যেতে হবে।', level: 'a2', words: [{de:'Wir',en:'We',bn:'আমরা'},{de:'müssen',en:'must',bn:'হবে'},{de:'nach',en:'to',bn:'দিকে'},{de:'Hause',en:'home',bn:'বাড়ি'},{de:'gehen',en:'go',bn:'যেতে'}] },
  // B1
  { de: 'Ich lerne, weil es Spaß macht.', en: 'I learn because it is fun.', bn: 'আমি শিখি কারণ এটা মজার।', level: 'b1', words: [{de:'Ich',en:'I',bn:'আমি'},{de:'lerne',en:'learn',bn:'শিখি'},{de:'weil',en:'because',bn:'কারণ'},{de:'es',en:'it',bn:'এটা'},{de:'Spaß',en:'fun',bn:'মজা'},{de:'macht',en:'makes',bn:'করে'}] },
  { de: 'Er sagt, dass er kommt.', en: 'He says that he is coming.', bn: 'সে বলছে যে সে আসছে।', level: 'b1', words: [{de:'Er',en:'He',bn:'সে'},{de:'sagt',en:'says',bn:'বলে'},{de:'dass',en:'that',bn:'যে'},{de:'er',en:'he',bn:'সে'},{de:'kommt',en:'comes',bn:'আসে'}] },
  // B2
  { de: 'Trotz des Regens gehen wir spazieren.', en: 'Despite the rain, we go for a walk.', bn: 'বৃষ্টি সত্ত্বেও আমরা হাঁটতে যাই।', level: 'b2', words: [{de:'Trotz',en:'Despite',bn:'সত্ত্বেও'},{de:'des',en:'the (gen)',bn:'টি'},{de:'Regens',en:'rain',bn:'বৃষ্টির'},{de:'gehen',en:'go',bn:'যাই'},{de:'wir',en:'we',bn:'আমরা'},{de:'spazieren',en:'for a walk',bn:'হাঁটতে'}] },
  { de: 'Ich hätte das Auto gekauft.', en: 'I would have bought the car.', bn: 'আমি গাড়িটি কিনতাম।', level: 'b2', words: [{de:'Ich',en:'I',bn:'আমি'},{de:'hätte',en:'would have',bn:'হতো'},{de:'das',en:'the',bn:'টি'},{de:'Auto',en:'car',bn:'গাড়ি'},{de:'gekauft',en:'bought',bn:'কিনতাম'}] }
];

// Replicate to 50
let sentences = [];
let idCounter = 301;
for (let i=0; i<50; i++) {
  const base = baseSentences[i % baseSentences.length];
  sentences.push({
    id: `sentence-${idCounter++}`,
    german: base.de,
    english: base.en,
    bangla: base.bn,
    level: base.level,
    wordBreakdown: base.words
  });
}

const file = 'src/data/sentences.ts';
let content = fs.readFileSync(file, 'utf8');

const endMatch = content.lastIndexOf('];');
const prefix = content.substring(0, endMatch);
const suffix = content.substring(endMatch);

let newStr = '';
sentences.forEach(s => {
  newStr += `    { id: '${s.id}', german: '${s.german}', english: '${s.english}', bangla: '${s.bangla}', level: '${s.level}', wordBreakdown: ${JSON.stringify(s.wordBreakdown)} },\n`;
});

fs.writeFileSync(file, prefix + '    // Auto-generated Phase 4 Expansion\n' + newStr + suffix);
console.log('Appended 50 interactive sentences.');
