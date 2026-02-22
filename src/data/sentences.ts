import { Sentence } from '@/types';

export const sentences: Sentence[] = [
    // A1 Level Sentences
    {
        id: 's1', german: 'Guten Tag! Wie geht es Ihnen?', english: 'Good day! How are you?', bangla: 'শুভ দিন! আপনি কেমন আছেন?', level: 'a1', wordBreakdown: [
            { german: 'Guten', english: 'Good', bangla: 'শুভ' },
            { german: 'Tag', english: 'day', bangla: 'দিন' },
            { german: 'Wie', english: 'How', bangla: 'কেমন' },
            { german: 'geht', english: 'goes', bangla: 'যায়' },
            { german: 'es', english: 'it', bangla: 'এটা' },
            { german: 'Ihnen', english: 'you (formal)', bangla: 'আপনি' },
        ]
    },
    {
        id: 's2', german: 'Ich möchte einen Kaffee, bitte.', english: 'I would like a coffee, please.', bangla: 'আমি একটা কফি চাই, প্লিজ।', level: 'a1', wordBreakdown: [
            { german: 'Ich', english: 'I', bangla: 'আমি' },
            { german: 'möchte', english: 'would like', bangla: 'চাই' },
            { german: 'einen', english: 'a (masc.)', bangla: 'একটা' },
            { german: 'Kaffee', english: 'coffee', bangla: 'কফি' },
            { german: 'bitte', english: 'please', bangla: 'প্লিজ' },
        ]
    },
    {
        id: 's3', german: 'Wo ist der Bahnhof?', english: 'Where is the train station?', bangla: 'রেলস্টেশন কোথায়?', level: 'a1', wordBreakdown: [
            { german: 'Wo', english: 'Where', bangla: 'কোথায়' },
            { german: 'ist', english: 'is', bangla: 'আছে' },
            { german: 'der', english: 'the (masc.)', bangla: '' },
            { german: 'Bahnhof', english: 'train station', bangla: 'রেলস্টেশন' },
        ]
    },
    {
        id: 's4', german: 'Wie viel kostet das?', english: 'How much does it cost?', bangla: 'এটার দাম কত?', level: 'a1', wordBreakdown: [
            { german: 'Wie viel', english: 'How much', bangla: 'কত' },
            { german: 'kostet', english: 'costs', bangla: 'দাম' },
            { german: 'das', english: 'that', bangla: 'এটা' },
        ]
    },
    // A2 Level Sentences
    {
        id: 's5', german: 'Ich arbeite bei einer großen Firma.', english: 'I work at a large company.', bangla: 'আমি একটা বড় কোম্পানিতে কাজ করি।', level: 'a2', wordBreakdown: [
            { german: 'Ich', english: 'I', bangla: 'আমি' },
            { german: 'arbeite', english: 'work', bangla: 'কাজ করি' },
            { german: 'bei', english: 'at', bangla: '-তে' },
            { german: 'einer', english: 'a (fem.)', bangla: 'একটা' },
            { german: 'großen', english: 'large', bangla: 'বড়' },
            { german: 'Firma', english: 'company', bangla: 'কোম্পানি' },
        ]
    },
    {
        id: 's6', german: 'Wann fährt der nächste Zug nach Berlin?', english: 'When does the next train to Berlin leave?', bangla: 'বার্লিনে পরের ট্রেন কখন ছাড়বে?', level: 'a2', wordBreakdown: [
            { german: 'Wann', english: 'When', bangla: 'কখন' },
            { german: 'fährt', english: 'leaves/drives', bangla: 'ছাড়বে' },
            { german: 'der nächste', english: 'the next', bangla: 'পরের' },
            { german: 'Zug', english: 'train', bangla: 'ট্রেন' },
            { german: 'nach', english: 'to', bangla: '-তে' },
            { german: 'Berlin', english: 'Berlin', bangla: 'বার্লিন' },
        ]
    },
    {
        id: 's7', german: 'Ich habe Kopfschmerzen. Haben Sie Tabletten?', english: 'I have a headache. Do you have tablets?', bangla: 'আমার মাথা ব্যথা করছে। আপনার কাছে ট্যাবলেট আছে?', level: 'a2', wordBreakdown: [
            { german: 'Ich habe', english: 'I have', bangla: 'আমার' },
            { german: 'Kopfschmerzen', english: 'headache', bangla: 'মাথা ব্যথা' },
            { german: 'Haben Sie', english: 'Do you have', bangla: 'আপনার কাছে আছে' },
            { german: 'Tabletten', english: 'tablets', bangla: 'ট্যাবলেট' },
        ]
    },
    // B1 Level Sentences
    {
        id: 's8', german: 'Ich würde gerne ein Zimmer für zwei Nächte reservieren.', english: 'I would like to book a room for two nights.', bangla: 'আমি দুই রাতের জন্য একটা রুম বুক করতে চাই।', level: 'b1', wordBreakdown: [
            { german: 'Ich würde', english: 'I would', bangla: 'আমি চাই' },
            { german: 'gerne', english: 'like to', bangla: '' },
            { german: 'ein Zimmer', english: 'a room', bangla: 'একটা রুম' },
            { german: 'für', english: 'for', bangla: 'জন্য' },
            { german: 'zwei Nächte', english: 'two nights', bangla: 'দুই রাত' },
            { german: 'reservieren', english: 'to book', bangla: 'বুক করতে' },
        ]
    },
    {
        id: 's9', german: 'Könnten Sie mir bitte den Weg zum Museum erklären?', english: 'Could you please explain the way to the museum?', bangla: 'আপনি কি প্লিজ জাদুঘরে যাওয়ার পথ বলতে পারবেন?', level: 'b1', wordBreakdown: [
            { german: 'Könnten Sie', english: 'Could you', bangla: 'আপনি কি পারবেন' },
            { german: 'mir', english: 'me', bangla: 'আমাকে' },
            { german: 'bitte', english: 'please', bangla: 'প্লিজ' },
            { german: 'den Weg', english: 'the way', bangla: 'পথ' },
            { german: 'zum Museum', english: 'to the museum', bangla: 'জাদুঘরে' },
            { german: 'erklären', english: 'explain', bangla: 'বলতে' },
        ]
    },
    {
        id: 's10', german: 'Ich möchte mich für die Stelle als Praktikant bewerben.', english: 'I would like to apply for the position as an intern.', bangla: 'আমি ইন্টার্ন পদের জন্য আবেদন করতে চাই।', level: 'b1', wordBreakdown: [
            { german: 'Ich möchte', english: 'I would like', bangla: 'আমি চাই' },
            { german: 'mich bewerben', english: 'to apply', bangla: 'আবেদন করতে' },
            { german: 'für', english: 'for', bangla: 'জন্য' },
            { german: 'die Stelle', english: 'the position', bangla: 'পদ' },
            { german: 'als', english: 'as', bangla: 'হিসেবে' },
            { german: 'Praktikant', english: 'intern', bangla: 'ইন্টার্ন' },
        ]
    },

    // ======== NEW SENTENCES ========

    // More A1
    {
        id: 's11', german: 'Das Wetter ist heute sehr schön.', english: 'The weather is very beautiful today.', bangla: 'আজকের আবহাওয়া খুব সুন্দর।', level: 'a1', wordBreakdown: [
            { german: 'Das Wetter', english: 'The weather', bangla: 'আবহাওয়া' },
            { german: 'ist', english: 'is', bangla: 'হয়' },
            { german: 'heute', english: 'today', bangla: 'আজ' },
            { german: 'sehr', english: 'very', bangla: 'খুব' },
            { german: 'schön', english: 'beautiful', bangla: 'সুন্দর' },
        ]
    },
    {
        id: 's12', german: 'Ich lerne jeden Tag Deutsch.', english: 'I learn German every day.', bangla: 'আমি প্রতিদিন জার্মান শিখি।', level: 'a1', wordBreakdown: [
            { german: 'Ich lerne', english: 'I learn', bangla: 'আমি শিখি' },
            { german: 'jeden Tag', english: 'every day', bangla: 'প্রতিদিন' },
            { german: 'Deutsch', english: 'German', bangla: 'জার্মান' },
        ]
    },
    {
        id: 's13', german: 'Meine Lieblingsfarbe ist Blau.', english: 'My favorite color is blue.', bangla: 'আমার প্রিয় রঙ নীল।', level: 'a1', wordBreakdown: [
            { german: 'Meine', english: 'My', bangla: 'আমার' },
            { german: 'Lieblingsfarbe', english: 'favorite color', bangla: 'প্রিয় রঙ' },
            { german: 'ist', english: 'is', bangla: 'হয়' },
            { german: 'Blau', english: 'blue', bangla: 'নীল' },
        ]
    },
    {
        id: 's14', german: 'Entschuldigung, wo ist die Toilette?', english: 'Excuse me, where is the toilet?', bangla: 'মাফ করবেন, টয়লেট কোথায়?', level: 'a1', wordBreakdown: [
            { german: 'Entschuldigung', english: 'Excuse me', bangla: 'মাফ করবেন' },
            { german: 'wo ist', english: 'where is', bangla: 'কোথায়' },
            { german: 'die Toilette', english: 'the toilet', bangla: 'টয়লেট' },
        ]
    },

    // More A2
    {
        id: 's15', german: 'Ich habe am Wochenende meine Freunde besucht.', english: 'I visited my friends on the weekend.', bangla: 'আমি সাপ্তাহিক ছুটির দিনে আমার বন্ধুদের সাথে দেখা করেছি।', level: 'a2', wordBreakdown: [
            { german: 'Ich habe ... besucht', english: 'I visited', bangla: 'আমি দেখা করেছি' },
            { german: 'am Wochenende', english: 'on the weekend', bangla: 'সাপ্তাহিক ছুটির দিনে' },
            { german: 'meine Freunde', english: 'my friends', bangla: 'আমার বন্ধুদের' },
        ]
    },
    {
        id: 's16', german: 'Wir müssen ein neues Auto kaufen.', english: 'We need to buy a new car.', bangla: 'আমাদের একটি নতুন গাড়ি কিনতে হবে।', level: 'a2', wordBreakdown: [
            { german: 'Wir müssen', english: 'We need to', bangla: 'আমাদের হবে' },
            { german: 'ein neues Auto', english: 'a new car', bangla: 'একটি নতুন গাড়ি' },
            { german: 'kaufen', english: 'buy', bangla: 'কিনতে' },
        ]
    },
    {
        id: 's17', german: 'Kannst du das bitte noch einmal wiederholen?', english: 'Can you please repeat that again?', bangla: 'তুমি কি দয়া করে এটা আবার বলতে পারবে?', level: 'a2', wordBreakdown: [
            { german: 'Kannst du', english: 'Can you', bangla: 'তুমি কি পারবে' },
            { german: 'das', english: 'that', bangla: 'এটা' },
            { german: 'bitte', english: 'please', bangla: 'দয়া করে' },
            { german: 'noch einmal', english: 'once again', bangla: 'আবার' },
            { german: 'wiederholen', english: 'repeat', bangla: 'বলতে' },
        ]
    },

    // More B1
    {
        id: 's18', german: 'Obwohl ich müde war, bin ich zur Party gegangen.', english: 'Although I was tired, I went to the party.', bangla: 'আমি ক্লান্ত থাকা সত্ত্বেও পার্টিতে গিয়েছিলাম।', level: 'b1', wordBreakdown: [
            { german: 'Obwohl', english: 'Although', bangla: 'সত্ত্বেও' },
            { german: 'ich müde war', english: 'I was tired', bangla: 'আমি ক্লান্ত ছিলাম' },
            { german: 'bin ich ... gegangen', english: 'I went', bangla: 'আমি গিয়েছিলাম' },
            { german: 'zur Party', english: 'to the party', bangla: 'পার্টিতে' },
        ]
    },
    {
        id: 's19', german: 'Ich freue mich darauf, dich bald wiederzusehen.', english: 'I look forward to seeing you again soon.', bangla: 'আমি শীঘ্রই তোমার সাথে আবার দেখা করার অপেক্ষায় আছি।', level: 'b1', wordBreakdown: [
            { german: 'Ich freue mich darauf', english: 'I look forward to it', bangla: 'আমি অপেক্ষায় আছি' },
            { german: 'dich', english: 'you', bangla: 'তোমাকে' },
            { german: 'bald', english: 'soon', bangla: 'শীঘ্রই' },
            { german: 'wiederzusehen', english: 'seeing again', bangla: 'আবার দেখার' },
        ]
    },
    {
        id: 's20', german: 'Er hat mir geraten, jeden Tag Deutsch zu üben.', english: 'He advised me to practice German every day.', bangla: 'সে আমাকে প্রতিদিন জার্মান অনুশীলন করার পরামর্শ দিয়েছে।', level: 'b1', wordBreakdown: [
            { german: 'Er hat mir geraten', english: 'He advised me', bangla: 'সে আমাকে পরামর্শ দিয়েছে' },
            { german: 'jeden Tag', english: 'every day', bangla: 'প্রতিদিন' },
            { german: 'Deutsch zu üben', english: 'to practice German', bangla: 'জার্মান অনুশীলন করার' },
        ]
    },

    // NEW B2 LEVEL
    {
        id: 's21', german: 'Es liegt auf der Hand, dass eine solare Energiequelle sinnvoll ist.', english: 'It is obvious that a solar energy source makes sense.', bangla: 'এটা স্পষ্ট যে সৌরশক্তির উৎস অর্থবহ।', level: 'b2', wordBreakdown: [
            { german: 'Es liegt auf der Hand', english: 'It is obvious', bangla: 'এটা স্পষ্ট' },
            { german: 'dass', english: 'that', bangla: 'যে' },
            { german: 'eine solare Energiequelle', english: 'a solar energy source', bangla: 'একটি সৌরশক্তির উৎস' },
            { german: 'sinnvoll ist', english: 'makes sense', bangla: 'অর্থবহ' },
        ]
    },
    {
        id: 's22', german: 'Infolge des schlechten Wetters wurde der Flug annulliert.', english: 'Due to the bad weather, the flight was cancelled.', bangla: 'খারাপ আবহাওয়ার কারণে ফ্লাইট বাতিল করা হয়েছে।', level: 'b2', wordBreakdown: [
            { german: 'Infolge', english: 'As a result of / Due to', bangla: '-এর কারণে' },
            { german: 'des schlechten Wetters', english: 'the bad weather', bangla: 'খারাপ আবহাওয়া' },
            { german: 'wurde ... annulliert', english: 'was cancelled', bangla: 'বাতিল করা হয়েছে' },
            { german: 'der Flug', english: 'the flight', bangla: 'ফ্লাইট' },
        ]
    },
    {
        id: 's23', german: 'Wir müssen eine Lösung finden, die den Bedürfnissen aller entspricht.', english: 'We must find a solution that meets the needs of everyone.', bangla: 'আমাদের এমন একটি সমাধান খুঁজে বের করতে হবে যা সবার প্রয়োজন মেটায়।', level: 'b2', wordBreakdown: [
            { german: 'Wir müssen', english: 'We must', bangla: 'আমাদের হবে' },
            { german: 'eine Lösung finden', english: 'find a solution', bangla: 'একটি সমাধান খুঁজে বের করতে' },
            { german: 'die', english: 'which', bangla: 'যা' },
            { german: 'den Bedürfnissen', english: 'the needs', bangla: 'প্রয়োজন' },
            { german: 'aller', english: 'of everyone', bangla: 'সবার' },
            { german: 'entspricht', english: 'corresponds/meets', bangla: 'মেটায়' },
        ]
    },
    {
        id: 's24', german: 'Je mehr du übst, desto flüssiger sprichst du die Sprache.', english: 'The more you practice, the more fluently you speak the language.', bangla: 'তুমি যত বেশি অনুশীলন করবে, তুমি তত সাবলীলভাবে ভাষাটি বলতে পারবে।', level: 'b2', wordBreakdown: [
            { german: 'Je mehr', english: 'The more', bangla: 'যত বেশি' },
            { german: 'du übst', english: 'you practice', bangla: 'তুমি অনুশীলন করবে' },
            { german: 'desto', english: 'the (so)', bangla: 'তত' },
            { german: 'flüssiger', english: 'more fluently', bangla: 'সাবলীলভাবে' },
            { german: 'sprichst du', english: 'you speak', bangla: 'তুমি বলতে পারবে' },
            { german: 'die Sprache', english: 'the language', bangla: 'ভাষাটি' },
        ]
    },
    {
        id: 's25', german: 'Ich bin der Auffassung, dass Umweltschutz unsere höchste Priorität sein sollte.', english: 'I am of the opinion that environmental protection should be our highest priority.', bangla: 'আমার মতে, পরিবেশ সুরক্ষা আমাদের সর্বোচ্চ অগ্রাধিকার হওয়া উচিত।', level: 'b2', wordBreakdown: [
            { german: 'Ich bin der Auffassung', english: 'I am of the opinion', bangla: 'আমার মতে' },
            { german: 'dass', english: 'that', bangla: 'যে' },
            { german: 'Umweltschutz', english: 'environmental protection', bangla: 'পরিবেশ সুরক্ষা' },
            { german: 'unsere höchste', english: 'our highest', bangla: 'আমাদের সর্বোচ্চ' },
            { german: 'Priorität', english: 'priority', bangla: 'অগ্রাধিকার' },
            { german: 'sein sollte', english: 'should be', bangla: 'হওয়া উচিত' },
        ]
    },
];
