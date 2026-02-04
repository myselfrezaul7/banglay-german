import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'German Sentence Builder',
    description: 'Learn German sentence structure by arranging words. Practice grammar and vocabulary interactively.',
    openGraph: {
        title: 'Sentence Builder | Banglay German',
        description: 'Interactive German sentence building practice.',
    },
};

export default function SentenceBuilderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
