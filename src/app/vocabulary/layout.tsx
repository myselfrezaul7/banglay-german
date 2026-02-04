import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'German Vocabulary - All Levels (A1-B2)',
    description: 'Browse German vocabulary lists from A1 to B2 level. Learn words with English and Bangla translations.',
    openGraph: {
        title: 'German Vocabulary | Banglay German',
        description: 'Master German vocabulary from beginner (A1) to advanced (B2). Free resources with Bangla translations.',
    },
};

export default function VocabularyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
