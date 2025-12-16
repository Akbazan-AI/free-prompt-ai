import { MetadataRoute } from 'next';
import { getAllPrompts } from '@/lib/prompts/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prompt-ai.vercel.app';
  const allPrompts = getAllPrompts();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic prompt pages
  const promptPages = allPrompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...promptPages];
}
