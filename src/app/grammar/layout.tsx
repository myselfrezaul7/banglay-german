import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'German Grammar Lessons',
    description: 'Learn German grammar rules with clear explanations in English and Bangla. Master articles, verb conjugation, and sentence structure.',
    openGraph: {
        title: 'German Grammar | Banglay German',
        description: 'Comprehensive German grammar lessons for A1-B2 levels.',
    },
};

export default function GrammarLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
