# CLAUDE.md

김상훈(Sanghun Kim) 포트폴리오 — Next.js 16 단일 페이지 포트폴리오 + 기술 블로그.

## 기술 스택
- Next.js 16 (App Router, RSC) · TypeScript
- Tailwind CSS (라이트/다크 테마, `.dark` class 전략)
- Markdown 블로그 (`react-markdown`, 파일시스템 기반; 기존 `.mdx` 파일명 유지)
- DB·댓글 기능 미사용 (관련 코드 제거됨)
- lucide-react (일반 아이콘), react-icons/fi (GitHub·LinkedIn 브랜드 아이콘), highlight.js (서버에서 언어별 코드 하이라이팅)

## 디자인 시스템
- 톤: 에디토리얼 — 네이비/골드/크림
- 폰트: Pretendard(본문·제목·라벨) · 시스템 모노스페이스(코드)
- 색상은 `styles/global.css`의 시맨틱 토큰 사용: `--bg --surface --surface-2 --fg --fg-strong --muted --line --accent`
  - Tailwind 클래스로 노출: `bg-bg surface fg fg-strong muted line accent` + 브랜드 `navy gold cream`
  - 하드코딩 색(`text-white`, `blue-*`, 그라디언트) 금지 → 토큰 사용
- 공통 섹션 래퍼: `@/shared/ui/Section` (모노 라벨 + 세리프 제목)

## 구조 (Feature-Sliced Design)
- `src/app` — 라우팅. `(main)` 단일 페이지(`/`) + `(blog)/posts` 블로그 + `api/og` + `rss`
- `src/widgets` — 메인 페이지 섹션 **8개**: About, Strengths, Experience, Projects, Writing, Contact, Sidebar, Footer
  - `About` — 인용 · 소개 문단 · 3열 카드(경력/담당 서비스/실무 프로젝트) · 학력·수상·자격 · 기술 스택
  - `Strengths` — 주요 과제 요약 카드 + 하단 Track Record 목록 (상세 데이터 비공개)
  - `Sidebar`/`Footer` — `profile.intro`, `navItems`
- `src/features` — PostRecommend, ThemeToggle
- `src/entities/Post` — 블로그 목록/페이지네이션/카테고리/TOC/네비
- `src/shared` — lib(markdown, seo), markdown 렌더러, data(site-data), ui, utils, config, hooks, content

## 콘텐츠 소스
- 포트폴리오 콘텐츠(프로필/경력/성과/스킬 등)는 전부 `src/shared/data/site-data.tsx` 단일 소스.
- 블로그 원문은 `https://velog.io/@kata/posts`. 본문·코드·표·이미지를 원문 그대로 유지하고 임의로 요약하거나 재작성하지 않는다. HTML 태그를 일괄 이스케이프하지 않는다. Markdown 렌더러가 원문의 HTML과 GFM을 처리한다.
- **이력의 기준 문서는 `port/main/이력서_김상훈.html`** (사용자가 기존 `port/20260926`에서 이동). 경력 사실·수치·팀 규모·업무 명칭은 이 문서와 사용자의 최신 확인 내용을 따른다. 이전 제출본을 현재 내용에 덮어쓰지 않는다.
- 콘텐츠 수정 시 기존 디자인, 컴포넌트 구조, 섹션 순서와 데이터 필드 형식을 유지한다. 별도 지시 없이 문단 렌더러나 강조용 컴포넌트를 추가하지 않는다.
- 코딩테스트 문제 생성·채점 플랫폼은 사용자 요청으로 포트폴리오에서 제외했다. 다시 추가하지 않는다.
- 2026-10-16 기준 이력서 파일이 `port/main/이력서_김상훈.html`에 존재한다. 최신 내용 확정 및 원본 대조는 `docs/TODO.md`의 후속 작업으로 관리한다. 공개 경력 사실을 추정해 추가하지 않는다.
- 면접 기록은 `port/interview/`.
- 원본 자료(이력서·자소서·포트폴리오·이미지)는 `/port` 폴더에 있으며 `.gitignore` 처리됨. 웹에서 쓰는 이미지는 `public/images/portfolio/`로 복사됨.

## 이력 서술 시 금지 표현
`site-data.tsx`를 고칠 때 반복해서 틀렸던 지점. **공개 저장소이므로 이력서보다 더 보수적으로 쓴다.**

| 금지 | 이유 | 대체 |
|---|---|---|
| `iBill 총괄` · `PO` | 직함을 받은 적 없음 (임명 없이 업무만 인계) | 하는 일로 서술 — 요구사항 구조화 / 개선·신규·보류 결정 / 운영 이슈 원인분석~배포 |
| `기획부터 운영까지` (전자계약) | 기획자가 따로 있었고 참관 수준 | 구현 분담 + 기획·협의 참여 |
| 신규 구축을 `주도` · `관철` | 전자계약·Branch Manager 둘 다 **참여자**. 계정계 API 확장도 거절 후 협의로 낙착 | 참여 / 협의로 이끌어냄 |
| `계약·결제·정산 서비스를 개발` | 정산 시스템을 만든다는 뜻이 됨 | `계약·결제·정산이 고객사에 닿는 채널 계층을 담당` |
| `결제중 선반영` · `가드레일` · `무수정` 등 사내 축약어 | 밖에서 안 통함 | 풀어서 서술 |

## 확인된 사실과 표현 기준
- Task 02의 메모리 문제는 장애 현상과 개선 결과에 근거한 추론이다. 힙 덤프·GC 로그로 원인을 확정했다고 쓰지 않는다.
- Task 03은 당일 전송 종료 직후 고객 관리 시스템의 **현재** 서비스 상태를 일괄 조회해 이용중지·해지예정·해지 고객사의 실패 청구를 보정한다. 요청 당시 상태와 거부 기록은 계정계에 있어 확인하지 못했다. 명시적 거부와 타임아웃을 구분해 접수 여부를 확정했다는 설명은 사용하지 않는다.
- 과거 고착 건과 신규 실패 건의 보정 시점을 구분한다. 신규 건은 아직 결제예정일 전이므로 같은 날 재실행까지 날짜 조건만으로 차단된다고 쓰지 않는다.
- up-quant는 가격 예측 기능을 구현한 프로젝트로 서술하지 않는다. 시장 분석·포트폴리오 구성·전략 검증을 설명한다.
- cms-plus의 Analysis 서버는 ECS Fargate의 나머지 서비스와 별도로 배포했다. Logstash 기반 로깅은 ELK로 표기한다. 성능은 `5만 건 처리 시간 12초 → 7초`로 쓰고 지표가 불분명한 상승률을 붙이지 않는다.
- CNN 논문은 학습 90%·검증 10%의 이진 분류 실험이다. 논문에서 확인되지 않은 회전·줌 증강, Early Stopping, ModelCheckpoint는 추가하지 않는다.
- 지급대행 업무명은 `지급대행 어드민 · 테이블, 엔티티 설계 및 비즈니스 로직 구현`을 유지한다.
- 회사 신규 프로젝트의 본인 역할과 팀 전체 성과를 구분하고, 완료한 구현과 후속 과제를 섞지 않는다.

## 작업 규칙
- 색은 반드시 시맨틱 토큰으로. 라이트/다크 양쪽에서 깨지지 않게 할 것.
- 모든 컴포넌트는 모바일 우선 반응형.
- 커밋 메시지는 conventional commits(`type: description`). 커밋/푸시는 사용자가 명시적으로 요청할 때만.

## 검증과 범위
- `pnpm run check` 및 `pnpm run test:e2e`로 검증한다.
- 현재 사용자 요청은 재검수 항목 중 2·6·8을 제외한 개선이다. 가독성·대비 개선은 승인되었으며 실무 상세 공개, 모바일 섹션 구조 변경, CNN 평가 설명 변경은 제외한다.
- 글 본문과 기존 요약은 보존한다. SEO 설명은 `seo-descriptions.json`, 출처와 실제 수정일은 `velog-sources.json`에서 관리한다.

## 2026-11-01 갱신 (이전 내용은 기록으로 남겨 두고 이 절을 우선한다)

### 문서 갱신 원칙
- CLAUDE.md·AGENTS.md·README.md 같은 문서는 이전 내역을 덮어쓰거나 지우지 않는다. 날짜를 붙인 새 절을 추가하는 방식으로만 갱신한다.
- 커밋은 사용자가 직접 한다. AI(Claude Code·Codex)는 커밋·푸시하지 않는다.

### 현재 구조
- 메인 페이지 위젯은 **7개**: About, Experience, Projects, Writing, Contact, Sidebar, Footer. 위의 "8개(Strengths 포함)" 설명은 과거 구조이며 Strengths 위젯과 관련 데이터(`strengths`, `careerServices` 등)는 삭제됐다.
- 이력서는 **`/resume` 하나**다. 비교용이던 `/resume2`를 정식 `/resume`로 통합했고 `/resume2`는 `/resume`로 영구 리다이렉트(308)된다. 기존 8쪽 디자인과 `variant` 분기는 삭제했다. 현재 11쪽.
  - 화면: `src/app/resume/resume-document.tsx` · 공용 배치 `resume-viewer.module.css` · 흑백 테마 `resume-theme.module.css` · 아키텍처 그림 `task-architecture.tsx`
  - 메타 title은 `김상훈_이력서`, 검색 노출은 noindex 유지(노출 여부는 사용자 결정 보류 중)
- 경력 사실의 단일 원본은 `src/shared/data/career-data.ts`의 `work`다. 홈 Experience 목록(`main`)과 이력서 본문(`title`·`points`·`platform`·`team`·`role`·`tech`)이 같은 항목을 쓴다. 화면별 용어 치환(`resume2Terms`)은 없앴으므로 원본 문구 자체를 확정 표현으로 관리한다.
- 이력서 전용 데이터는 `resume-data.ts`(소개·역할·학력·기술 스택·교육·수상·자격증·AI 활용 경험)와 `resume-case-studies.ts`(Task 01·02 본문)에 있다.
- 고객/고객사는 통일하지 않는다. 고객사 = 사업·도메인 용어, 고객 = 데이터·시스템 맥락.

### SEO
- robots: 전체 허용, `/api/`는 막고 공유 이미지 `/api/og`만 허용.
- 홈 canonical은 sitemap과 같은 슬래시 없는 주소(`https://www.sanghunkim.com`).
- 홈 Person JSON-LD에 worksFor·alumniOf·knowsAbout(이력서 기술 스택의 실무 항목)을 넣는다.

### 테마 (2026-11-01)
- 기본 테마는 라이트다. 사용자가 토글로 다크를 고르면 localStorage에 저장돼 새로고침 후에도 유지된다.

### 파일 이름 규칙 (2026-11-01)
- ts·tsx 파일과 폴더 이름은 모두 kebab-case다(Vercel·shadcn 방식). 예: `widgets/projects/project-carousel.tsx`, `shared/utils/date-formatter.ts`, `entities/post/ui/post-card.tsx`.
- 코드 안의 이름은 그대로: 컴포넌트·타입은 PascalCase, 함수·변수·훅은 camelCase, 상수는 UPPER_SNAKE_CASE. 기본 import 이름은 export 이름과 같게 쓴다.
- 위의 `@/shared/ui/Section`, `src/entities/Post` 표기는 과거 경로이며 지금은 `@/shared/ui/section`, `src/entities/post`다.

### 대화 해석 규칙 (2026-11-01)
- AI 답변이 끝나기 전에 사용자가 보낸 메시지는 그 이전 AI 답변에 대한 응답이다. 최신 답변의 새 목록·제안을 승인한 것으로 보지 않는다. 애매하면 적용 전에 묻는다.
- 수정 지시는 지시가 가리키는 안에만 적용하고, 보고로 낸 목록은 따로 승인받기 전까지 손대지 않는다.

## 2026-11-01 디자인 갱신 (VS Code 테마, 위 디자인 시스템·구조 설명보다 이 절을 우선한다)

### 디자인 시스템
- 톤: VS Code 편집기. 라이트는 Light Modern(화면 색)·Light+(코드 색), 다크는 Dark+의 공식 색 값을 쓴다. 이전 네이비·골드·크림, 슬레이트·틸 팔레트는 쓰지 않는다.
- 폰트: 본문 Pretendard, 라벨·파일명·날짜·칩은 `font-code`(JetBrains Mono · Nanum Gothic Coding, `next/font`로 이 사이트 서버에서 제공).
- 시맨틱 토큰(`styles/global.css`): 기존 `--bg --surface --surface-2 --fg --fg-strong --muted --line --accent`에 역할별 토큰 `--tab`(활성 탭) `--button`/`--on-button`(주 버튼) `--ok`/`--ok-bg`(KPI) `--chip`(기술 스택 칩)을 추가했다. Tailwind 클래스는 `tab button on-button ok ok-bg chip`.
  - `--accent`는 링크와 마우스를 올렸을 때의 색이다. 마우스 올림 색은 모두 `--accent` 하나로 통일한다.
- 공통 섹션 래퍼는 `@/shared/ui/pane`(머리에 파일 탭을 단 영역)이다. `@/shared/ui/section`·`collapsible`은 삭제했다.
- 파비콘(`src/app/icon.svg`)과 OG 이미지 아이콘은 기존 겹친 마름모 모양을 유지하고 색만 `#4fc1ff` / 바탕 `#252526`으로 바꿨다.

### 메인 구조
- 위젯 8개: About, Experience, Tasks, Projects, Writing, Contact, Sidebar, Footer.
  - 목차와 영역 머리는 파일 이름(`navItems[].file`)으로 표시한다: `about.md · experience.md · tasks/ · side-projects/ · writing/ · contact.md`.
  - Experience는 회사·직함·역할 3줄만 보여 준다. 프로젝트(신규 구축 2건)와 주요 과제는 `widgets/tasks`에서 `프로젝트 / 효성에프엠에스` 두 탭으로 나누고 설명까지 모두 보여 준다.
  - 사이드바 하단 링크는 GitHub · LinkedIn · 이메일 · RSS 아이콘이다. Velog는 뺐다.
- 블로그·개인정보·404·이력서 보기 도구는 같은 토큰으로 맞췄다. 이력서 본문(흑백 종이)은 바꾸지 않았다.
- 디자인 시안(`/test*`, `(design-test)` 라우트, 홈 시안 토글, `public/images/design-test`)은 모두 삭제했다.

### 2026-11-01 추가 갱신 (위 "테마 (2026-11-01)"의 라이트 기본값보다 이 절을 우선한다)
- 기본 테마는 **다크**다. 사용자가 토글로 라이트를 고르면 localStorage에 저장돼 유지된다.
- 탭 제목: 홈 기본 `sanghunkim`, 이력서 `resume`.
- 개인정보 및 방문 분석 안내는 별도 페이지(`/privacy`)를 없애고 하단 링크에서 여는 모달(`features/privacy-notice`)로 바꿨다. sitemap·모니터 경로에서도 뺐다.
- 홈 글 영역의 파일 이름은 `posts/`(id는 `writing` 유지)이고, `더보기 ›`는 영역 탭 줄 오른쪽 끝(`Pane`의 `action`)에 있다.
- 목차 현재 위치 배경은 `--nav-active` 토큰이다(라이트 `#e5ebf1`, 다크 `#2d2d2d`).
- 사이드 프로젝트 슬라이드 6장은 배경 남색을 `#252526` 계열 회색, 민트 부제를 `#4fc1ff`로 다시 칠했다(원본은 git 기록).
- 주 버튼(`--button`)은 VS Code 버튼 파랑이다(라이트 `#005fb8` button.background, 다크 `#0078d4`). 초록 `#16825d`는 쓰지 않는다.
- 슬라이드 민트 부제는 가장자리의 흐린 픽셀까지 `#4fc1ff`로 다시 칠했다.
- 이메일 버튼은 VS Code 보조 버튼 토큰(`--button-2` · `--on-button-2` · `--button-2-border`, Light/Dark Modern의 button.secondary 값)을 쓴다. 마우스를 올리면 `--accent` 테두리·글자.
- 사이드 프로젝트 원본 화면 캡처는 저장소에 있다: CMS+·Salesync `screen.png`, 나머지 `preview.png`.
- 사이드 프로젝트 슬라이드는 이미지(`slide.png`, 삭제됨)가 아니라 `project-carousel.tsx`의 `ProjectSlide` 구성 요소다. 왼쪽은 `context`·`title`, 오른쪽은 CSS 브라우저 틀 안의 `image`(원본 캡처). 새 프로젝트는 캡처 한 장과 데이터만 추가한다.
- 하단 링크·모달 제목은 "개인정보 처리방침"이다. 블로그 목록 탭 제목은 `posts`, 블로그 상세 탭 제목은 글 제목(검색 결과 제목과 같은 값이라 고정하지 않는다).
- 사이드 프로젝트 슬라이드 부제는 두 줄(종류에서 인원 수 제외 / 기간)이고, 슬라이드 아래 설명란에는 부제를 다시 쓰지 않는다. 포트폴리오 캡처(`portfolio/preview.png`)는 2026-11-01 현재 홈(다크)이다.
- `/privacy`는 홈으로 영구 이동(308)한다(next.config.js).
- 홈 글 영역의 섹션 id도 `posts`다(주소 `/#posts`). 위의 "id는 `writing` 유지"는 과거 내용이다.
- 홈 탭 제목은 `김상훈 | 개발자 포트폴리오`, 사이트 설명은 `…풀스택 개발자 김상훈의 포트폴리오.`다(검색 노출용, 위의 `sanghunkim`은 과거 내용).
- 홈 인물 구조화 데이터의 jobTitle은 `['Software Engineer', '풀스택 개발자']`다.
