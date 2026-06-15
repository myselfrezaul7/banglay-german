import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
    params: { level: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const level = params.level.toUpperCase();
    
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
