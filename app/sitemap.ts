import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vultisig.com'
  const currentDate = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/termofservice`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/vult`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // AI Agent Discovery
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/SKILL.md`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const articles = await getAllArticles()
  const articlePages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages]
}
