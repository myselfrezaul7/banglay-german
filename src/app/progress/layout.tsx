import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Learning Analytics & Progress - Banglay German',
    description: 'Detailed stats on learned vocabulary, quizzes completed, and level progress rings.',
    openGraph: {
        title: 'Learning Analytics & Progress - Banglay German',
        description: 'Detailed stats on learned vocabulary, quizzes completed, and level progress rings.',
    }
};

export default function ProgressLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
