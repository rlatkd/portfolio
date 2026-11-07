import { MetadataRoute } from 'next';
import { baseUrl } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // 페이지는 모두 허용하고 API는 막되 공유 미리보기 이미지(/api/og)는 열어 둔다.
        allow: ['/', '/api/og'],
        disallow: '/api/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
