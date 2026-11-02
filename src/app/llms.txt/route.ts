import { baseUrl, siteDescription } from '@/shared/config/site';
import { profile } from '@/shared/data/site-data';
import { getPosts } from '@/shared/lib/markdown';

// 2026-11-02: AI 서비스에 사이트를 요약해 알려 주는 llms.txt(https://llmstxt.org 제안 형식, 공식 표준은 아님).
// 사이트 데이터에서 만들므로 글이 늘어도 자동으로 반영된다. 전화번호 등 화면에 없는 개인 정보는 넣지 않는다.
// 이력서(/resume)는 검색 노출을 막아 둔 페이지라 목록에 넣지 않는다.
export const dynamic = 'force-static';

export async function GET() {
  const posts = [...await getPosts()].sort((a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt));
  const lines = [
    `# ${profile.name} (${profile.nameEn})`,
    '',
    `> ${siteDescription}`,
    '',
    '## 주요 페이지',
    '',
    `- [포트폴리오](${baseUrl}): 경력·학력·기술, 회사 프로젝트와 주요 과제, 사이드 프로젝트`,
    `- [블로그](${baseUrl}/posts): 개발, 설계, 그리고 경험에 대한 기록`,
    `- [RSS](${baseUrl}/rss): 블로그 글 목록`,
    '',
    '## 블로그 글',
    '',
    ...posts.map(post => `- [${post.metadata.title}](${baseUrl}/posts/${encodeURIComponent(post.slug)})`),
    '',
    '## 연락처',
    '',
    `- 이메일: ${profile.email}`,
    `- GitHub: ${profile.github}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- Velog: ${profile.velog}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
