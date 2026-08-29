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
- `src/app` — 라우팅. `(main)` 단일 페이지(`/`) + `(blog)/posts` 블로그 + `api`(comments·og·posts) + `rss`
- `src/widgets` — 메인 페이지 섹션 **8개**: About, Strengths, Experience, Projects, Writing, Contact, Sidebar, Footer
  - `About` — 인용 · 소개 문단 · 3열 카드(경력/담당 서비스/실무 프로젝트) · 학력·수상·자격 · 기술 스택
  - `Strengths` — 주요 과제 카드(모달 상세) + 하단 Track Record 목록
  - `Sidebar`/`Footer` — `profile.intro`, `navItems`
- `src/features` — CommentForm, PostRecommend, ThemeToggle
- `src/entities/Post` — 블로그 목록/페이지네이션/카테고리/TOC/네비
- `src/shared` — lib(markdown, db), markdown 렌더러, data(site-data), ui, utils, config, hooks, content

## 콘텐츠 소스
- 포트폴리오 콘텐츠(프로필/경력/성과/스킬 등)는 전부 `src/shared/data/site-data.tsx` 단일 소스.
- **이력의 기준 문서는 `port/naver_webtoon/이력서_김상훈.html`** (2026.08.23 네이버웹툰 제출본). 경력 사실·수치·팀 규모는 이 문서를 따른다. `port/toss_payments/`의 이전 이력서는 폐기.
- 면접 기록은 `port/interview/`.
- 원본 자료(이력서·자소서·포트폴리오·이미지)는 `/port` 폴더에 있으며 `.gitignore` 처리됨. 웹에서 쓰는 이미지는 `public/images/portfolio/`로 복사됨.

## 이력 서술 시 금지 표현
`site-data.tsx`를 고칠 때 반복해서 틀렸던 지점. **공개 저장소이므로 이력서보다 더 보수적으로 쓴다.**

| 금지 | 이유 | 대체 |
|---|---|---|
| `Ibill 총괄` · `PO` | 직함을 받은 적 없음 (임명 없이 업무만 인계) | 하는 일로 서술 — 요구사항 구조화 / 개선·신규·보류 결정 / 운영 이슈 원인분석~배포 |
| `기획부터 운영까지` (전자계약) | 기획자가 따로 있었고 참관 수준 | 구현 분담 + 기획·협의 참여 |
| 신규 구축을 `주도` · `관철` | 전자계약·Branch Manager 둘 다 **참여자**. 계정계 API 확장도 거절 후 협의로 낙착 | 참여 / 협의로 이끌어냄 |
| `계약·결제·정산 서비스를 개발` | 정산 시스템을 만든다는 뜻이 됨 | `계약·결제·정산이 고객사에 닿는 채널 계층을 담당` |
| `결제중 선반영` · `가드레일` · `무수정` 등 사내 축약어 | 밖에서 안 통함 | 풀어서 서술 |

## 작업 규칙
- 색은 반드시 시맨틱 토큰으로. 라이트/다크 양쪽에서 깨지지 않게 할 것.
- 모든 컴포넌트는 모바일 우선 반응형.
- 커밋 메시지는 conventional commits(`type: description`). 커밋/푸시는 사용자가 명시적으로 요청할 때만.
