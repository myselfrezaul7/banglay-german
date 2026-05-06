const fs = require('fs');

const newGrammar = [
    // A1
    {
        id: 'a1-4',
        level: 'a1',
        title: 'Nominative Case',
        titleBn: 'নমিনেটিভ (কর্তৃকারক)',
        description: 'Used for the subject of a sentence (the one doing the action).',
        structure: 'Subject + Verb',
        points: [
            'Answers the question "Who or What?"',
            'Der (M), Die (F), Das (N), Die (Pl).'
        ],
        examples: [
            { german: 'Der Hund bellt.', english: 'The dog barks.', bangla: 'কুকুরটি ডাকছে।' }
        ]
    },
    {
        id: 'a1-5',
        level: 'a1',
        title: 'Negation (nicht/kein)',
        titleBn: 'না-বোধক শব্দ',
        description: 'How to say "not" or "no/none" in German.',
        structure: 'Nicht (verbs/adjectives) | Kein (nouns)',
        points: [
            'Use "kein" to negate nouns with an indefinite article (ein/eine) or no article.',
            'Use "nicht" to negate verbs, adjectives, and specific nouns.'
        ],
        examples: [
            { german: 'Ich bin nicht müde.', english: 'I am not tired.', bangla: 'আমি ক্লান্ত নই।' },
            { german: 'Ich habe kein Auto.', english: 'I have no car.', bangla: 'আমার কোনো গাড়ি নেই।' }
        ]
    },
    {
        id: 'a1-6',
        level: 'a1',
        title: 'Imperative (Commands)',
        titleBn: 'আদেশসূচক বাক্য',
        description: 'Used to give commands or make requests.',
        structure: 'Verb + (Object/Subject)',
        points: [
            'Du-form: drop the "st" and "du" (Komm!).',
            'Ihr-form: same as normal conjugation, drop "ihr" (Kommt!).',
            'Sie-form: Verb + Sie (Kommen Sie!).'
        ],
        examples: [
            { german: 'Komm her!', english: 'Come here!', bangla: 'এখানে এসো!' }
        ]
    },
    // A2
    {
        id: 'a2-3',
        level: 'a2',
        title: 'Dative Case',
        titleBn: 'ডেটিভ (সম্প্রদান কারক)',
        description: 'Used for the indirect object (to/for whom the action is done).',
        structure: 'dem (M/N) | der (F) | den +n (Pl)',
        points: [
            'Answers the question "To whom?".',
            'Always used after prepositions like: aus, bei, mit, nach, seit, von, zu.'
        ],
        examples: [
            { german: 'Ich helfe dem Mann.', english: 'I help the man.', bangla: 'আমি লোকটিকে সাহায্য করছি।' }
        ]
    },
    {
        id: 'a2-4',
        level: 'a2',
        title: 'Accusative Case',
        titleBn: 'আকুজ্যাটিভ (কর্মকারক)',
        description: 'Used for the direct object.',
        structure: 'den (M) | die (F) | das (N) | die (Pl)',
        points: [
            'Answers the question "Whom or What?".',
            'Only Masculine changes from "der" to "den".'
        ],
        examples: [
            { german: 'Ich habe den Apfel.', english: 'I have the apple.', bangla: 'আমার আপেলটি আছে।' }
        ]
    },
    {
        id: 'a2-5',
        level: 'a2',
        title: 'Separable Verbs',
        titleBn: 'বিভাজ্য ক্রিয়া',
        description: 'Verbs where the prefix detaches and moves to the end of the sentence.',
        structure: 'Prefix... Verb (Pos 2) ... Prefix (End)',
        points: [
            'Prefixes like auf-, an-, ein-, mit-, vor- split off.',
            'In present and simple past tense, the prefix goes to the absolute end.'
        ],
        examples: [
            { german: 'Ich wache um 7 Uhr auf.', english: 'I wake up at 7.', bangla: 'আমি ৭টায় ঘুম থেকে উঠি।' }
        ]
    },
    {
        id: 'a2-6',
        level: 'a2',
        title: 'Comparative & Superlative',
        titleBn: 'তুলনামূলক এবং সর্বোচ্চ মাত্রা',
        description: 'Comparing things in German.',
        structure: '-er als (Comparative) | am -sten (Superlative)',
        points: [
            'Add "-er" and use "als" (than) for comparative.',
            'Use "am" + "-sten" for superlative.'
        ],
        examples: [
            { german: 'Er ist schneller als ich.', english: 'He is faster than me.', bangla: 'সে আমার চেয়ে দ্রুত।' },
            { german: 'Er ist am schnellsten.', english: 'He is the fastest.', bangla: 'সে সবচেয়ে দ্রুত।' }
        ]
    },
    // B1
    {
        id: 'b1-3',
        level: 'b1',
        title: 'Reflexive Verbs',
        titleBn: 'রিফ্লেক্সিভ ক্রিয়া (আত্মবাচক)',
        description: 'Verbs where the subject and object are the same.',
        structure: 'Subject + Reflexive Pronoun (sich, mich, dich)',
        points: [
            'Common verbs: sich waschen, sich freuen, sich ärgern.',
            'The reflexive pronoun can be Accusative or Dative.'
        ],
        examples: [
            { german: 'Ich freue mich.', english: 'I am happy/looking forward.', bangla: 'আমি আনন্দিত।' }
        ]
    },
    {
        id: 'b1-4',
        level: 'b1',
        title: 'Konjunktiv II',
        titleBn: 'কনজাঙ্কটিভ ২ (সম্ভাবনা)',
        description: 'Used for hypothetical situations, wishes, or polite requests.',
        structure: 'würde/hätte/wäre + Infinitive/Noun',
        points: [
            '"würde" + Infinitive is the most common form.',
            'Use "hätte" (would have) and "wäre" (would be).'
        ],
        examples: [
            { german: 'Ich würde das kaufen.', english: 'I would buy that.', bangla: 'আমি ওটা কিনতাম।' }
        ]
    },
    {
        id: 'b1-5',
        level: 'b1',
        title: 'Future Tense (Futur I)',
        titleBn: 'ভবিষ্যৎ কাল',
        description: 'Used to express future events or assumptions.',
        structure: 'werden (Pos 2) + ... + Infinitive (End)',
        points: [
            'Often Germans use Present Tense + Time word for the future.',
            'Futur I is used for predictions or promises.'
        ],
        examples: [
            { german: 'Es wird regnen.', english: 'It will rain.', bangla: 'বৃষ্টি হবে।' }
        ]
    },
    {
        id: 'b1-6',
        level: 'b1',
        title: 'Adjective Endings',
        titleBn: 'বিশেষণের বিভক্তি',
        description: 'Adjectives change their ending based on gender, case, and article.',
        structure: 'Article + Adj(-e/en/er/es) + Noun',
        points: [
            'Endings depend on whether you use definite (der), indefinite (ein), or no article.',
            'Plural dative ALWAYS adds "-en" to adjective and "-n" to noun.'
        ],
        examples: [
            { german: 'Das ist ein schönes Haus.', english: 'That is a beautiful house.', bangla: 'ওটা একটি সুন্দর বাড়ি।' }
        ]
    },
    // B2
    {
        id: 'b2-3',
        level: 'b2',
        title: 'Two-Way Prepositions',
        titleBn: 'উভয়মুখী অব্যয়',
        description: 'Prepositions that take either Accusative (motion) or Dative (location).',
        structure: 'Preposition + Akkusativ/Dativ',
        points: [
            'Accusative for motion towards a goal (Where to? / Wohin?).',
            'Dative for fixed location (Where? / Wo?).',
            'Prepositions: in, an, auf, neben, hinter, über, unter, vor, zwischen.'
        ],
        examples: [
            { german: 'Ich gehe in die Schule (Akk).', english: 'I go to school.', bangla: 'আমি স্কুলে যাচ্ছি।' },
            { german: 'Ich bin in der Schule (Dat).', english: 'I am in school.', bangla: 'আমি স্কুলে আছি।' }
        ]
    },
    {
        id: 'b2-4',
        level: 'b2',
        title: 'Past Perfect (Plusquamperfekt)',
        titleBn: 'পুরাঘটিত অতীত',
        description: 'Used when an action in the past happened before another action in the past.',
        structure: 'hatte/war + Participle (End)',
        points: [
            'Often used with "nachdem" (after).',
            'Like Perfekt, but helper verb is in Präteritum.'
        ],
        examples: [
            { german: 'Nachdem ich gegessen hatte, ging ich schlafen.', english: 'After I had eaten, I went to sleep.', bangla: 'খাওয়ার পর আমি ঘুমাতে গিয়েছিলাম।' }
        ]
    },
    {
        id: 'b2-5',
        level: 'b2',
        title: 'Indirect Speech (Konjunktiv I)',
        titleBn: 'পরোক্ষ উক্তি',
        description: 'Used primarily in news/reporting to repeat what someone said neutrally.',
        structure: 'Subject + sei/habe/werde + ...',
        points: [
            'Formed from the Infinitive stem.',
            'Used mostly in formal writing.'
        ],
        examples: [
            { german: 'Er sagt, er habe keine Zeit.', english: 'He says he has no time.', bangla: 'সে বলে তার সময় নেই।' }
        ]
    },
    {
        id: 'b2-6',
        level: 'b2',
        title: 'Participles as Adjectives',
        titleBn: 'বিশেষণ হিসেবে পার্টিসিবল',
        description: 'Using present or past participles directly before a noun.',
        structure: 'Participle + Adjective Ending + Noun',
        points: [
            'Present (Infinitive + d): actively happening (der lachende Mann).',
            'Past (ge-..-t/en): completed action (das gekochte Ei).'
        ],
        examples: [
            { german: 'Der schlafende Hund.', english: 'The sleeping dog.', bangla: 'ঘুমন্ত কুকুর।' }
        ]
    }
];

const file = 'src/app/grammar/page.tsx';
let content = fs.readFileSync(file, 'utf8');

let newStr = '';
newGrammar.forEach(g => {
    newStr += `    ,\n    {\n        id: '${g.id}',\n        level: '${g.level}',\n        title: '${g.title}',\n        titleBn: '${g.titleBn}',\n        description: '${g.description}',\n        structure: '${g.structure}',\n        points: ${JSON.stringify(g.points)},\n        examples: ${JSON.stringify(g.examples)}\n    }`;
});

content = content.replace('    }\n];', '    }' + newStr + '\n];');
fs.writeFileSync(file, content);
console.log('Added grammar topics.');
