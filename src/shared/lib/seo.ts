import type { PostPreview } from '@/shared/types/post';
import { baseUrl, defaultOgImage, siteTitle } from '@/shared/config/site';

// 2026-11-02: 모든 링크의 공유 카드(OG·X)를 하나로 통일한다. 페이지마다 다른 건 주소(og:url)뿐이다.
// 카드에는 이미지가 있으므로 설명은 넣지 않는다. Next.js는 metadata.description이 있으면 카드 설명(og·twitter)에 자동으로 복사하므로,
// 검색 결과용 페이지 설명은 각 페이지에서 metadata.other.description으로 직접 넣는다(<meta name="description">은 그대로 나간다).
export function shareCard(url: string) {
  return {
    openGraph: {
      title: siteTitle, url, siteName: '김상훈', locale: 'ko_KR', type: 'website' as const,
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteTitle }],
    },
    twitter: { card: 'summary_large_image' as const, title: siteTitle, images: [defaultOgImage] },
  };
}

// 2026-11-02: 탭 제목·검색 결과 제목도 글의 원래 제목(velog 제목)을 쓴다. 따로 두던 검색용 제목(seo-titles.json)은 없앴다.
export function getPostTitle(post: PostPreview) {
  return post.metadata.title;
}
export function getPostDescription(post: PostPreview) {
  return post.metadata.summary;
}
export function getPostImage(post: PostPreview) {
  return post.metadata.image ? new URL(post.metadata.image, baseUrl).href
    : `${baseUrl}/api/og?title=${encodeURIComponent(post.metadata.title)}`;
}
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
export function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
}
