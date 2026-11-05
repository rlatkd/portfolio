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

// 2026-11-04: 블로그 글은 공유 카드 모습(제목 · 설명 · 이미지)은 그대로 두고, 종류만 article로 바꿔 발행일 · 수정일을 넣는다.
export function articleShareCard(url: string, publishedTime: string, modifiedTime: string) {
  const card = shareCard(url);
  return { ...card, openGraph: { ...card.openGraph, type: 'article' as const, publishedTime, modifiedTime } };
}

// 2026-11-02: 탭 제목·검색 결과 제목도 글의 원래 제목(velog 제목)을 쓴다. 따로 두던 검색용 제목(seo-titles.json)은 없앴다.
export function getPostTitle(post: PostPreview) {
  return post.metadata.title;
}
export function getPostDescription(post: PostPreview) {
  return post.metadata.summary;
}
// 2026-11-04: 글 구조화 데이터 이미지는 글 자체 대표 이미지가 있으면 그것, 없으면 지금 공유 카드 이미지(/api/og)를 쓴다(제목을 그린 옛 모양 대신).
export function getPostImage(post: PostPreview) {
  return post.metadata.image ? new URL(post.metadata.image, baseUrl).href : defaultOgImage;
}
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
export function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
}
