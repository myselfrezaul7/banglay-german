import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Daily German Sentences - Banglay German',
    description: 'Learn practical German sentences and daily phrases with English and Bangla translations.',
    openGraph: {
        title: 'Daily German Sentences - Banglay German',
        description: 'Learn practical German sentences and daily phrases with English and Bangla translations.',
    }
};

export default function SentencesLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
