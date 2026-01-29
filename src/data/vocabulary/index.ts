import { a1Words } from './a1';
import { a2Words } from './a2';
import { b1Words } from './b1';
import { b2Words } from './b2';
import { Word, Level } from '@/types';

export const allWords: Word[] = [...a1Words, ...a2Words, ...b1Words, ...b2Words];

export { a1Words, a2Words, b1Words, b2Words };

export const getWordsByLevel = (level: Level): Word[] => {
    switch (level) {
        case 'a1': return a1Words;
        case 'a2': return a2Words;
        case 'b1': return b1Words;
        case 'b2': return b2Words;
        default: return [];
    }
};

export const getWordsByCategory = (category: string): Word[] => {
    return allWords.filter(word => word.category === category);
};

export const searchWords = (query: string): Word[] => {
    const q = query.toLowerCase();
    return allWords.filter(word =>
        word.german.toLowerCase().includes(q) ||
        word.english.toLowerCase().includes(q) ||
        word.bangla.includes(query)
    );
};

export const getAllCategories = (): string[] => {
    return [...new Set(allWords.map(w => w.category))];
};
