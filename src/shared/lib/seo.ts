import type { PostPreview } from '@/shared/types/post';
import { baseUrl, defaultOgImage, siteTitle } from '@/shared/config/site';
import { profile } from '@/shared/data/site-data';

// 2026-11-02: 모든 링크의 공유 카드(OG·X)를 하나로 통일한다. 페이지마다 다른 건 주소(og:url)뿐이다.
// 카드 설명은 사이드바 소개 문장(profile.intro)을 그대로 쓴다(이름은 제목에 있으므로 넣지 않는다).
// 검색 결과용 페이지 설명은 각 페이지에서 metadata.other.description으로 따로 넣는다(카드 설명과 섞이지 않게).
const shareDescription = profile.intro.replace(/\s*\n\s*/g, ' ');

export function shareCard(url: string) {
  return {
    openGraph: {
      title: siteTitle, description: shareDescription, url, siteName: '김상훈', locale: 'ko_KR', type: 'website' as const,
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteTitle }],
    },
    twitter: { card: 'summary_large_image' as const, title: siteTitle, description: shareDescription, images: [defaultOgImage] },
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
