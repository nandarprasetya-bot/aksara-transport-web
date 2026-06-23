import { MetadataRoute } from 'next';
import { seoKeywords } from '@/data/seoKeywords';
import { supabase } from '@/lib/supabase';
import { dummyArticles } from '@/data/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jogjasewamobil.com'

  let articles: any[] = [];
  if (supabase) {
    const { data, error } = await supabase.from('articles').select('slug, created_at');
    if (!error && data && data.length > 0) {
      articles = data;
    } else {
      articles = dummyArticles;
    }
  } else {
    articles = dummyArticles;
  }

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/artikel/${article.slug}`,
    lastModified: new Date(article.created_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/mobil`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wisata`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...seoKeywords.map((data) => ({
      url: `${baseUrl}/${data.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...articleUrls
  ]
}
