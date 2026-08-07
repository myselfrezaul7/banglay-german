import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Learner Profile - Banglay German',
    description: 'Track your German learning progress, view achievements, level, streak, and saved favorites.',
    openGraph: {
        title: 'Learner Profile - Banglay German',
        description: 'Track your German learning progress, view achievements, level, streak, and saved favorites.',
    }
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
