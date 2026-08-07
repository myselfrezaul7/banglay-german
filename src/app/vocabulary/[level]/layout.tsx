import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
    params: Promise<{ level: string }>;
};

export async function generateStaticParams() {
    return [
        { level: 'a1' },
        { level: 'a2' },
        { level: 'b1' },
        { level: 'b2' },
    ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { level: rawLevel } = await params;
    const level = (rawLevel || 'A1').toUpperCase();
    
    return {
        title: `${level} German Vocabulary - Banglay German`,
        description: `Master ${level} level German vocabulary with Bangla translations, pronunciation, and examples. Premium language learning.`,
        openGraph: {
            title: `${level} German Vocabulary - Banglay German`,
            description: `Master ${level} level German vocabulary with Bangla translations, pronunciation, and examples. Premium language learning.`,
        }
    };
}

export default function VocabularyLevelLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
