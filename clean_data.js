const fs = require('fs');
const path = require('path');

const levels = ['a1', 'a2', 'b1', 'b2'];
const basePath = path.join(__dirname, 'src', 'data', 'vocabulary');

levels.forEach(level => {
  const filePath = path.join(basePath, `${level}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // We need to parse the exported array.
  // It looks like: export const a1Words: Word[] = [ ... ];
  
  // A safer approach than full JS eval is to use regex or split, 
  // but since it's valid TS, we can try to extract the array content, parse it (or evaluate it safely), 
  // clean it, and rewrite it.
  // Alternatively, we can use a simpler approach since we know the structure.
  
  // Let's extract the array part.
  const arrayStart = content.indexOf('[');
  const arrayEnd = content.lastIndexOf(']');
  
  if (arrayStart === -1 || arrayEnd === -1) {
    console.error(`Could not find array in ${level}.ts`);
    return;
  }

  const prefix = content.substring(0, arrayStart);
  let arrayContent = content.substring(arrayStart, arrayEnd + 1);

  // Use eval to parse the array. We need to define any undefined variables if present.
  // But wait, it's just an array of objects.
  let parsedArray;
  try {
    parsedArray = eval(`(${arrayContent})`);
  } catch (e) {
    console.error(`Error parsing ${level}.ts:`, e);
    return;
  }

  let originalCount = parsedArray.length;
  let seenGerman = new Set();
  
  let cleanedArray = parsedArray.filter(word => {
    // Check untranslated
    if (word.bangla.trim() === word.english.trim()) return false;
    
    // Check literal newlines or escaped newlines in strings
    if (word.bangla.includes('\\n') || word.bangla.includes('\n') ||
        word.german.includes('\\n') || word.german.includes('\n') ||
        word.english.includes('\\n') || word.english.includes('\n')) {
      return false;
    }
    
    // Check duplicates
    if (seenGerman.has(word.german.toLowerCase())) return false;
    seenGerman.add(word.german.toLowerCase());
    
    return true;
  });

  let removedCount = originalCount - cleanedArray.length;
  console.log(`[${level.toUpperCase()}] Removed ${removedCount} entries. Remaining: ${cleanedArray.length}`);

  // Re-serialize
  let newArrayString = '[\n';
  cleanedArray.forEach(word => {
    // Construct the object string carefully
    const id = word.id;
    const german = word.german.replace(/'/g, "\\'");
    const english = word.english.replace(/'/g, "\\'");
    const bangla = word.bangla.replace(/'/g, "\\'");
    const levelVal = word.level;
    const category = word.category;
    
    newArrayString += `  { id: '${id}', german: '${german}', english: '${english}', bangla: '${bangla}', level: '${levelVal}', category: '${category}' },\n`;
  });
  newArrayString += ']';

  fs.writeFileSync(filePath, prefix + newArrayString + ';\n');
});
