# CLAUDE.md

김상훈(Sanghun Kim) 포트폴리오 — Next.js 14 단일 페이지 포트폴리오 + 기술 블로그.

## 기술 스택
- Next.js 14 (App Router, RSC) · TypeScript
- Tailwind CSS (라이트/다크 테마, `.dark` class 전략)
- MDX 블로그 (`next-mdx-remote/rsc`, 파일시스템 기반)
- MongoDB (댓글/대댓글 전용)
- lucide-react (아이콘), sugar-high (코드 하이라이팅)

## 디자인 시스템
- 톤: 에디토리얼 — 네이비/골드/크림
- 폰트: DM Serif Display(제목) · Noto Sans KR(본문) · JetBrains Mono(라벨/코드)
- 색상은 `styles/global.css`의 시맨틱 토큰 사용: `--bg --surface --surface-2 --fg --fg-strong --muted --line --accent`
  - Tailwind 클래스로 노출: `bg-bg surface fg fg-strong muted line accent` + 브랜드 `navy gold cream`
  - 하드코딩 색(`text-white`, `blue-*`, 그라디언트) 금지 → 토큰 사용
- 공통 섹션 래퍼: `@/shared/ui/Section` (모노 라벨 + 세리프 제목)

## 구조 (Feature-Sliced Design)
- `src/app` — 라우팅. `(main)` 단일 페이지(`/`) + `posts` 블로그 + `api`
- `src/widgets` — 메인 페이지 섹션: Hero, About, Experience, Achievements, Projects, Skills, Writing, Contact, Header, Footer
- `src/features` — CommentForm, PostRecommend, ThemeToggle
- `src/entities/Post` — 블로그 목록/페이지네이션/카테고리/TOC/네비
- `src/shared` — lib(markdown, db), markdown 렌더러, data(site-data), ui, utils, config

## 콘텐츠 소스
- 포트폴리오 콘텐츠(프로필/경력/성과/스킬 등)는 전부 `src/shared/data/site-data.tsx` 단일 소스.
- 원본 자료(경력기술서·포트폴리오·이미지)는 `/port` 폴더에 있으며 `.gitignore` 처리됨. 웹에서 쓰는 이미지는 `public/images/portfolio/`로 복사됨.

## 작업 규칙
- 색은 반드시 시맨틱 토큰으로. 라이트/다크 양쪽에서 깨지지 않게 할 것.
- 모든 컴포넌트는 모바일 우선 반응형.
- 커밋 메시지는 conventional commits(`type: description`). 커밋/푸시는 사용자가 명시적으로 요청할 때만.
