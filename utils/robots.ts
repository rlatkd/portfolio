import { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/sitemap';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
