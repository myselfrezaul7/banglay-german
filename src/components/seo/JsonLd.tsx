import { FC } from 'react';

interface JsonLdProps {
    type: 'Organization' | 'WebSite' | 'Course';
    data?: Record<string, unknown>;
}

export const JsonLd: FC<JsonLdProps> = ({ type, data }) => {
    let schema: Record<string, unknown>;

    if (type === 'Organization') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Banglay German',
            url: 'https://banglay-german.vercel.app',
            logo: 'https://banglay-german.vercel.app/logo.png',
            description: 'Learn German with Bangla translations.',
            sameAs: [],
        };
    } else if (type === 'WebSite') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://banglay-german.vercel.app',
            name: 'Banglay German',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://banglay-german.vercel.app/vocabulary?search={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        };
    } else if (type === 'Course') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: data?.name || 'German Language Course',
            description: data?.description || 'Learn German vocabulary and grammar.',
            provider: {
                '@type': 'Organization',
                name: 'Banglay German',
                sameAs: 'https://banglay-german.vercel.app',
            },
            hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'online',
                inLanguage: ['de', 'en', 'bn'],
            },
            ...data,
        };
    } else {
        return null;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default JsonLd;
