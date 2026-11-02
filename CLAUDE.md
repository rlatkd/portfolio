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

## 2026-11-02 갱신
- 제목 구분자는 `|`다(탭 제목 형식 `%s | 김상훈`, 공유 카드·RSS 이름 포함). 화면 본문과 이력서의 `·`는 그대로 둔다.
- 홈 공유 카드(OG·X) 제목과 이미지 대체 문구는 탭 제목과 같은 `siteTitle` = `김상훈 | 개발자 포트폴리오`. RSS 이름은 `김상훈 | Posts`.
- 이력서 메타 설명은 이력서 1쪽 소개 표현을 따른다: `김상훈 이력서 - 계약·결제·정산이 고객에 닿는 채널 계층을 담당하는 …`. 메타 문구에 긴 줄표(—)를 쓰지 않는다.
- 홈 인물 구조화 데이터의 jobTitle은 화면에 보이는 직함만 쓴다: `['Software Engineer', 'Full-stack Developer']`(위의 '풀스택 개발자'는 과거 내용).
- 공유 카드(OG·X)는 모든 링크가 같다: 제목 `김상훈 | 개발자 포트폴리오`, 설명은 사이트 설명, 이미지 `/api/og`. 페이지마다 다른 건 주소(og:url)뿐이다. 공통 값은 `shared/lib/seo.ts`의 `shareCard(url)`.
- 공유 카드 이미지(`/api/og`, 제목 없이 요청)는 카드의 제목·설명·주소와 겹치지 않도록 이름과 도메인을 빼고 `SOFTWARE ENGINEER` 라벨, 사이트 파일 탭 모양, 아이콘만 그린다. 제목을 붙인 요청(블로그 글 구조화 데이터 이미지)은 기존 모양을 쓴다.
- 공유 카드에는 설명(og:description·twitter:description)을 넣지 않는다. 이미지는 왼쪽 위 마름모 아이콘 + `portfolio`와 파일 탭 모양만 있다(`SOFTWARE ENGINEER` 라벨 삭제). 검색 결과용 페이지 설명(meta description)은 그대로다.
- Next.js는 `metadata.description`을 공유 카드 설명(og·twitter)에 자동으로 복사한다. 그래서 검색 결과용 페이지 설명은 각 페이지에서 `metadata.other.description`으로 넣는다(`<meta name="description">`은 그대로 한 번 나간다). `description` 키를 다시 쓰면 카드에 설명이 되살아난다.
- 홈 검색 결과 설명(siteDescription)은 사이드바 소개 + About 첫 문단을 합친 `데이터 정합성과 시스템 신뢰성을 먼저 두는 금융 도메인 소프트웨어 엔지니어 김상훈입니다. Spring Boot와 Vue.js로 서비스를 개발하고 운영합니다.`다(위의 `…풀스택 개발자 김상훈의 포트폴리오.`는 과거 내용). 탭 제목 `김상훈 | 개발자 포트폴리오`는 유지.
- 이메일 복사 버튼은 결과를 아이콘으로만 보여 준다(성공 ✓ `--accent`, 실패 ✕ `--error` = VS Code errorForeground `#f85149`). 상태 문구는 화면에서 숨기고 화면 낭독기에만 읽힌다.
- 블로그 본문 이미지는 `image-metadata.json`에 크기가 기록된 경우 `next/image`로 그려 WebP·본문 너비(약 730px)에 맞춰 보낸다. 글 마크다운과 원본 이미지 주소는 바꾸지 않는다(velog 동기화 해시 유지). 허용 호스트는 `next.config.js`의 `images.remotePatterns`. 크기 기록이 없는 새 이미지는 원본 `<img>` 그대로다.
- 홈 experience 영역은 tasks처럼 머리를 `경력 / 학력` 탭으로 나눈다(`shared/ui/pane-tabs.tsx`, 숨은 탭 내용도 HTML에 있음). 학력은 이력서와 같은 `resume-data.ts`의 `education`.
- 홈 데스크톱에서는 화면 아래 사이드바 아이콘 아래 끝 높이(96px, 낮은 화면 45px) 밑으로 오른쪽 본문을 가린다(`.portfolio-bottom-mask`).
- 탭으로 나뉜 영역은 사이드바 목차에서 폴더로 표시한다: `experience/`(경력·학력), `tasks/`.
- tasks 영역도 experience와 같은 `PaneTabs`를 쓴다(탭 이름 옆 개수 표시). 선택하지 않은 탭의 과제도 HTML에 들어 있다. `widgets/tasks/task-tabs.tsx`는 삭제했다.
- 홈 데스크톱의 위로 가기 · 테마 버튼도 가림 띠 위로 올려, 버튼 아래 끝을 사이드바 아이콘 아래 끝 높이에 맞춘다(`.portfolio-floating`).
- 위로 가기 · 테마 버튼은 창 맨 오른쪽이 아니라 본문 영역 오른쪽 끝에서 24px 옆에 둔다(홈 `.portfolio-floating`, 블로그 `.document-floating`). 창이 좁으면 창 오른쪽 24px.
- 블로그 페이지의 떠 있는 버튼도 홈과 같은 높이(데스크톱 화면 아래 96px, 낮은 화면 45px)를 쓴다.
- 떠 있는 버튼과 본문 영역 사이 간격은 40px다(위의 24px는 과거 값).
- 떠 있는 버튼과 본문 영역 사이 간격은 48px다(위의 24px · 40px는 과거 값).
- 블로그 글 상세도 홈처럼 데스크톱 화면 아래를 가린다(`.portfolio-bottom-mask`). 왼쪽 고정 목차는 가림 띠 위에서 끝나도록 최대 높이를 줄였다.
- 화면 아래 가림 띠는 블로그 목록에도 적용한다. 블로그는 공용 레이아웃(`(blog)/layout.tsx`)에 있다.
- 이메일 · 블로그 검색 보조 버튼은 두 테마 모두 테두리만 쓴다(라이트 `--button-2`도 transparent).
- 블로그 목록 · 상세 · 이력서의 상단 줄(`< 포트폴리오`와 오른쪽 버튼)은 스크롤해도 위에 고정된다(`document-layout.module.css` `.header` sticky).
- 블로그 목록 검색창 아래 안내 문구("제목·요약·카테고리에서 검색합니다…")는 뺐다.
- 블로그 글 왼쪽 목차(1200px 이상)는 스크롤에 밀려 올라가지 않고 처음 보이던 높이에 고정된다(목차 칸이 문서에서 시작하는 높이를 sticky top으로 씀).
- 블로그 · 이력서 상단 줄은 처음부터 화면 맨 위(top 0)에 붙어 있어 스크롤해도 전혀 움직이지 않는다(페이지 위 여백만큼 음수 여백 + 안쪽 위 여백).
- 블로그 글 탭 제목(검색 결과 제목)은 글의 원래 제목을 쓴다. 따로 두던 검색용 제목 파일 `seo-titles.json`은 삭제했다(위의 "블로그 상세 탭 제목은 글 제목"·검색용 제목 설명은 이 기준으로 읽는다).
- 블로그 소개 문구: 화면 부제와 RSS 설명은 `개발, 설계, 그리고 경험에 대한 기록을 남깁니다.`, 블로그 목록 검색 설명은 이름을 붙인 `김상훈의 개발, 설계, 그리고 경험에 대한 기록입니다.`
- 홈 experience 탭은 `경력 / 학력 / 기술`이다. 기술 탭은 `site-data.tsx`의 `majorSkills`(AI · Language · Framework · Etc, 이력서 기술 스택 중 큰 항목만, 실무 아닌 것 포함)이고, 홈 인물 구조화 데이터의 knowsAbout도 이 목록과 같다.
- 기술 탭에 `Collaboration`(Jira · Confluence · Slack · Notion, 이력서 협업 도구 중 큰 항목) 줄을 Etc 앞에 추가했다.
- 기술 탭 순서: AI · Collaboration · Language · Framework · Etc.
- 기술 탭 Etc에서 Redis · Docker를 뺐다: Oracle · Kafka · Elasticsearch · Kubernetes · AWS.
- 사이드바 하단 아이콘에 Velog를 다시 넣었다: GitHub · LinkedIn · Velog · 이메일 · RSS. 구조화 데이터 sameAs(velog 포함)가 모두 화면에 보인다.
- 안 쓰는 옛 색 설정을 지웠다: 브랜드 토큰(`--navy` · `--gold` · `--cream` 등, Tailwind `navy` · `gold` · `cream`)과 `--glow`. 위 11-01 이전 절의 브랜드 색 설명은 과거 내용이다.
- 안 쓰는 코드 정리: `site-data.tsx`의 옛 `experience` 데이터와 `Experience` 타입, 학력·교육·수상·자격증 다시 내보내기(원본은 `profile-data.ts`), 쓰지 않던 sugar-high 코드 색 규칙(`.token.*`, `.sh__line`, `--sh-jsxliterals` · `--sh-property` · `--sh-entity`)과 `.tracking-label`을 지웠다.
- `profile-data.ts`의 옛 `education`(쓰는 곳 없음)도 지웠다. 학력의 단일 원본은 `resume-data.ts`의 `education`(이력서·홈 학력 탭 공용)이다.
- 공유 카드 설명(og:description · twitter:description)을 다시 넣었다. 모든 링크 공통으로 사이드바 소개 문장 `데이터 정합성과 시스템 신뢰성을 먼저 두는 금융 도메인 소프트웨어 엔지니어입니다.`(profile.intro)를 쓴다. 위의 "공유 카드에는 설명을 넣지 않는다"는 과거 내용이다. 검색 결과용 페이지 설명은 지금처럼 `metadata.other.description`.
- 홈 구조화 데이터는 `@graph`로 WebSite(`#website`, 이름 김상훈, 운영자 = 인물) · ProfilePage(`#profile`, 주인공 = 인물) · Person(`#person`)을 @id로 연결한다. 근무처 효성에프엠에스는 인물의 worksFor일 뿐 사이트 운영자로 쓰지 않는다(검사 도구가 제안한 publisher = Organization 코드는 쓰지 않는다).
- `/llms.txt`(`src/app/llms.txt/route.ts`)는 사이트 데이터로 만든다: 소개, 주요 페이지(포트폴리오·블로그·RSS), 블로그 글 전체 목록, 연락처(이메일·GitHub·LinkedIn·Velog). 전화번호와 검색 노출을 막아 둔 이력서는 넣지 않는다.
