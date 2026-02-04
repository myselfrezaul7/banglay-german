import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'German Practice Quiz',
    description: 'Test your German vocabulary knowledge with our speed quiz. Practice A1-B2 level words and track your progress.',
    openGraph: {
        title: 'Practice Quiz | Banglay German',
        description: 'Speed quiz to test your German vocabulary knowledge.',
    },
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
