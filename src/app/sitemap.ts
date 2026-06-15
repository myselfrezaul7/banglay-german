import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://banglay-german.vercel.app';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/vocabulary`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...['a1', 'a2', 'b1', 'b2'].map(level => ({
            url: `${baseUrl}/vocabulary/${level}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        })),
        {
            url: `${baseUrl}/sentence-builder`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sentences`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/grammar`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/practice`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]
}
