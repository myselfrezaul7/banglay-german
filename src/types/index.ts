export type Level = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';

export type Category =
    | 'greetings' | 'numbers' | 'food' | 'family' | 'shopping' | 'transport'
    | 'time' | 'colors' | 'work' | 'home' | 'health' | 'travel' | 'weather'
    | 'animals' | 'clothing' | 'academic' | 'abstract' | 'verbs' | 'adjectives'
    | 'society' | 'technology' | 'media' | 'connectors';

export interface Word {
    id: string;
    german: string;
    english: string;
    bangla: string;
    level: Level;
    category: Category | string;
    article?: 'der' | 'die' | 'das';
    plural?: string;
    example?: string;
    audioUrl?: string;
    isFavorite?: boolean;
    isLearned?: boolean;
}

export interface WordBreakdown {
    german: string;
    english: string;
    bangla: string;
}

export interface Sentence {
    id: string;
    german: string;
    english: string;
    bangla: string;
    level: Level;
    wordBreakdown?: WordBreakdown[];
    audioUrl?: string;
}

export interface QuizQuestion {
    id: string;
    type: 'multiple-choice' | 'fill-blank' | 'matching' | 'listening';
    question: string;
    options: string[];
    correctAnswer: string;
    level: Level;
}

export interface UserProgress {
    odId: string;
    lessonId: string;
    completed: boolean;
    score: number;
    date: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    xp: number;
    streak: number;
    level: number;
    achievements: string[];
    learnedWords: string[];
    favorites: string[];
    joinedAt: string;
}

export interface UserSettings {
    theme: 'light' | 'dark';
    preferredLevel: Level;
    dailyGoal: number;
    notifications: boolean;
}
