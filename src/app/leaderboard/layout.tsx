import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Global Leaderboard - Banglay German',
    description: 'See how you stack up against top German learners around the world. Compete, earn XP, and track rank.',
    openGraph: {
        title: 'Global Leaderboard - Banglay German',
        description: 'See how you stack up against top German learners around the world.',
    }
};

export default function LeaderboardLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
