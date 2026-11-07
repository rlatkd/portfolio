# CLAUDE.md

김상훈(Sanghun Kim) 포트폴리오. Next.js 16 단일 페이지 포트폴리오 + 기술 블로그 + 이력서(`/resume`).

## 0. 문서 작성 규칙

이 절은 `CLAUDE.md` · `AGENTS.md` · `README.md`를 고칠 때 따르는 형식이다. 갱신할 때마다 같은 형식을 유지한다.

- **현재 상태만 적는다.** 바뀐 사실은 해당 절의 해당 줄을 직접 고친다. 날짜를 붙인 절을 덧붙이거나 `(과거 내용)` · `위의 ~는 이전 값` 같은 표기를 남기지 않는다. 변경 이력은 git이 보관한다.
- **절 순서는 고정한다.** `0 문서 작성 규칙 → 1 작업 원칙 → 2 기술 스택 → 3 구조 → 4 디자인 → 5 화면별 세부 → 6 콘텐츠 → 7 이력 서술 기준 → 8 SEO · 분석 · 배포 → 9 검증 · 도구 → 10 보류 항목`. 새 내용은 맞는 절에 넣고, 절을 새로 만들지 않는다.
- **한 줄에 사실 하나.** 개조식, `~다` 체. 파일 · 경로 · 값 · 명령은 백틱. 이유는 필요할 때만 줄 끝 괄호로 짧게.
- **날짜는 쓰지 않는다.** 예외는 경력 기간처럼 날짜 자체가 사실인 경우뿐이다.
- **CLAUDE.md와 AGENTS.md는 함께 고친다.** 한쪽을 고치면 같은 작업에서 다른 쪽도 같은 방향으로 갱신한다(AGENTS.md는 요약이라 해당 요점이 있거나 새로 생기면 반영).
- **대화를 옮겨 적지 않는다.** 사용자와 나눈 말을 그대로 인용하거나 "사용자가 ~라고 했다"를 근거로 남기지 않는다. 정해진 규칙과 사실만 중립적인 문장으로 쓴다.
- **공개 저장소다.** 지원한 회사 이름, 고객사 등급, VoC 건수 같은 내부 수치, 개인 연락처는 쓰지 않는다.
- **세 문서의 역할:** `CLAUDE.md` = 작업 기준의 원본. `AGENTS.md` = Codex 등 다른 에이전트용 요약, 세부는 `CLAUDE.md`를 가리킨다. `README.md` = 저장소 방문자용 소개 · 실행 방법, 작업 규칙과 변경 기록은 넣지 않는다.
- 같은 사실이 두 문서에 있으면 둘 다 고친다.

## 1. 작업 원칙

- 커밋 · 푸시는 사용자가 직접 한다. AI는 하지 않는다. 커밋 메시지는 항상 한 줄 `type: 설명`이다(type은 feat · fix · refactor · docs · test · chore 등, 본문 없음).
- AI 답변이 끝나기 전에 사용자가 보낸 메시지는 그 이전 답변에 대한 응답이다. 최신 답변의 새 목록 · 제안을 승인한 것으로 보지 않는다. 애매하면 적용 전에 묻는다.
- 기능 · 페이지 · 파일을 폐기할 때는 관련된 것을 모두 찾아 함께 폐기한다: 코드 · 설정(리다이렉트 등) · 테스트 · 정적 파일 · `CLAUDE.md` · `AGENTS.md` · `README.md`. 저장소 전체를 검색해 남은 언급이 없는지 확인한다(`port/` 원본 자료와 지난 인계 파일은 제외).
- 수정 지시는 그 지시가 가리키는 범위에만 적용한다. 보고로 낸 목록은 따로 승인받기 전까지 손대지 않는다.
- 사용자에게 진행 여부나 의사결정이 필요한 작업 목록을 낼 때는 항상 `1.` `2.` `3.` 오름차순 번호 목록으로 쓴다(체크박스 · 글머리표 · 표로 대신하지 않는다).
- 방식을 제안하기 전에 이 사이트의 실제 데이터를 먼저 측정한다.
- 로컬 개발 서버(`pnpm dev`, http://localhost:3000)는 켜 둔다. 재시작은 3000 포트 프로세스를 끄고 `.next/dev`를 지운 뒤 띄운다.
- 로컬 작업을 시작할 때 `port/INDEX.md`가 있으면 먼저 읽고, 그 안의 안내에 따라 필요한 문서만 연다. `port/`의 내용은 공개 문서 · 코드 · 커밋 메시지에 옮기지 않는다.
- 작업 인계는 `port/handoff/YYYY-MM-DD.md`(날짜별 한 파일)로 한다.
  - 시작: 날짜가 가장 최근인 인계 파일을 읽고 그 `해야 할 일`부터 이어 간다.
  - 갱신: 파일을 바꾸는 작업을 하나 마칠 때마다 오늘 날짜 인계 파일을 갱신한다. 오늘 파일이 없으면 가장 최근 파일의 `해야 할 일` · `보류` · `주의점`을 옮겨 와 새로 만든다. 지난 날짜 파일은 고치지 않는다.
  - 형식(순서 고정): `1. 해야 할 일`(번호 목록, 사용자 결정이 필요한 항목은 `결정 필요` 표시) · `2. 보류` · `3. 한 일` · `4. 새로 추가된 항목` · `5. 정해진 것` · `6. 주의점`. 끝낸 일은 `해야 할 일`에서 지우고 `한 일`에 적는다.

## 2. 기술 스택

- Next.js 16 (App Router, RSC, webpack) · React 19 · TypeScript strict
- Node 22.x · pnpm 11.9.0
- Tailwind CSS 3 + CSS Modules. 테마는 `.dark` class 전략
- 블로그: 파일 기반 Markdown(`react-markdown` · remark-gfm · rehype-raw · rehype-sanitize). 파일 확장자는 `.mdx`지만 실행 가능한 MDX가 아니다
- 코드 하이라이팅: highlight.js(서버)
- 아이콘: lucide-react, 브랜드 아이콘은 react-icons/fi
- DB · 댓글 없음
- 배포: Vercel, 함수 지역 서울(`vercel.json` `icn1`)

## 3. 구조

Feature-Sliced Design. 의존 방향은 `app → widgets → features · entities → shared`.

- `src/app`
  - `(main)` 홈 `/` · `(blog)/posts` 목록 · `(blog)/posts/[slug]` 상세 · `resume` · `api/og` · `rss` · `llms.txt` · `sitemap` · `robots`
  - 블로그 목록 · 상세 공용 레이아웃은 `(blog)/layout.tsx`
- `src/widgets` — 홈 영역 8개: about, experience, tasks, projects, writing, contact, sidebar, footer. 모바일 목차 버튼은 `sidebar/mobile-section-menu.tsx`
- `src/features` — copy-email, post-recommend, privacy-notice, theme-toggle
- `src/entities/post/ui` — 글 목록 · 카드 · 페이지 버튼 · 카테고리 · 목차 · 이전/다음
- `src/shared/markdown` — 블로그 본문 렌더러 · 코드 강조 · 코드 복사 버튼(`code-copier.tsx`) · 이미지 메타데이터 · 목차 id
- `src/shared` — config, content, data, lib, markdown, types, ui, utils
- 코드 주석은 지금 코드가 왜 그런지만 적는다. 날짜, `~로 바꿨다` · `이전에는` 같은 변경 경위를 쓰지 않는다(변경 이력은 git). 코드만 봐도 분명하면 주석을 두지 않는다.
- 이름 규칙: ts · tsx 파일과 폴더는 kebab-case. 코드 안에서 컴포넌트 · 타입은 PascalCase, 함수 · 변수 · 훅은 camelCase, 상수는 UPPER_SNAKE_CASE. 기본 import 이름은 export 이름과 같게.

## 4. 디자인

- 톤: VS Code 편집기. 라이트는 Light Modern(화면) · Light+(코드), 다크는 Dark+ 공식 색 값.
- 기본 테마는 다크. 토글로 바꾸면 localStorage에 저장된다. 그리기 전에 인라인 스크립트(`theme-effect.ts`)로 적용해 깜빡임을 막는다.
- 색은 `styles/global.css`의 시맨틱 토큰만 쓴다. 하드코딩 색(`text-white`, `blue-*`, 그라디언트) 금지. 라이트 · 다크 둘 다 확인한다.
  - 기본: `--bg --surface --surface-2 --fg --fg-strong --muted --line --accent`
  - 역할별: `--tab`(활성 탭) · `--button` / `--on-button`(주 버튼, 라이트 `#005fb8` 다크 `#0078d4`) · `--button-2` / `--on-button-2` / `--button-2-border`(보조 버튼, 두 테마 모두 테두리만) · `--ok` / `--ok-bg`(KPI) · `--chip`(기술 칩) · `--nav-active`(목차 현재 위치, 라이트 `#e5ebf1` 다크 `#2d2d2d`) · `--error`(`#f85149`)
  - `--accent`는 링크와 마우스 올림 색이다. 마우스 올림 색은 모두 `--accent` 하나로 통일한다.
  - `--muted`는 라이트 `#656c76`, 다크 `#959595`(모든 바탕 대비 4.5:1 이상, `tests/design-tokens.test.ts`가 확인).
- 글꼴
  - 본문: `Portfolio Sans` = Pretendard 1.3.9에서 사이트에 쓰인 글자만 남긴 woff2 두 파일(`public/fonts/portfolio-sans-medium.woff2` · `-bold.woff2`). 400~500은 Medium, 600~900은 Bold.
  - 줄인 글꼴은 OFL상 수정 버전이라 `Pretendard`라고 부르지 않는다. 저작권 · 라이선스 정보는 글꼴 안에 그대로 두고 전문은 `public/fonts/OFL.txt`.
  - 원본 `assets/fonts/Pretendard-Medium.woff` · `-Bold.woff`는 공유 카드 이미지(`/api/og`가 파일로 읽음)와 글꼴 만들기 원본이다. 화면에서 받지 않으므로 `public/` 밖에 둔다.
  - 새 글자가 생기면 `tests/fonts.test.ts`가 실패한다. `pnpm fonts:build`(글자 목록 `scripts/fonts/portfolio-sans-characters.json`)를 실행한다.
  - 대체 글꼴 `Portfolio Sans Fallback`은 Windows 맑은 고딕을 Pretendard 폭에 맞춘 묶음이다(글꼴 교체 때 흔들림 감소).
  - 라벨 · 파일명 · 날짜(`font-code`): 영문 · 숫자는 JetBrains Mono(`next/font`), 그 안의 한글은 본문 글꼴.
- 공통 영역: `@/shared/ui/pane`(파일 탭 머리, 오른쪽 `action` 자리), 탭으로 나뉜 영역은 `@/shared/ui/pane-tabs`.
- 화면 아래 정렬 값은 `global.css` CSS 변수로만 바꾼다: `--bottom-mask`(1024px 이상 96px, 높이 760px 이하 45px) · `--home-width` 1152px · `--home-gutter` 48px · `--document-width` 794px · `--floating-size` 44px · `--floating-gap` 48px · `--floating-edge`(1024px 미만 12px, 이상 24px) · `--sidebar-top`(38px, 높이 760px 이하 32px) · `--sidebar-name-offset` 42px.
- 문구 부호: 긴 줄표(—) 금지. 기간은 `–`, 나열은 `·`, 제목 구분자는 `|`.
- 모든 컴포넌트는 모바일 우선 반응형.
- 파비콘(`src/app/icon.svg`)과 공유 카드 아이콘은 겹친 마름모, 색 `#4fc1ff` · 바탕 `#252526`.

## 5. 화면별 세부

### 홈
- 탭 제목 `김상훈 | 개발자 포트폴리오`.
- 사이드바 목차와 영역 머리는 파일 이름(`navItems[].file`): `about.md · experience/ · tasks/ · side-projects/ · posts/ · contact.md`. 탭으로 나뉜 영역은 폴더(`/`)로 표시한다.
- experience: `경력 / 학력 / 기술` 탭.
  - 경력은 회사 · 직함 · 역할 3줄.
  - 학력은 `resume-data.ts`의 `education`(이력서와 공용).
  - 기술은 `site-data.tsx`의 `majorSkills`: AI · Collaboration · Language · Framework · Etc 순. 실무가 아닌 것도 섞어 보여 준다. Etc는 Oracle · Kafka · Elasticsearch · Kubernetes · AWS.
- tasks: `프로젝트 / 회사` 두 탭(회사 탭 이름은 `company.name`). 프로젝트는 신규 구축 2건이고, 두 탭 모두 설명까지 보여 준다.
- `PaneTabs`는 WAI-ARIA 탭 패턴이다. 선택된 탭만 Tab 정지점이고, ← → Home End로 옮긴다. 탭 내용은 tabIndex 0이고, 숨은 탭 내용도 HTML에 들어 있다.
- side-projects: 슬라이드는 `project-carousel.tsx`의 `ProjectSlide` 컴포넌트다. 왼쪽은 `context` · `title`, 오른쪽은 CSS 브라우저 틀 안의 캡처 `image`.
  - 캡처는 WebP다: CMS+ · Salesync는 `screen.webp`, 나머지는 `preview.webp`. 새 프로젝트는 캡처 한 장과 데이터만 추가한다.
  - 부제는 두 줄(종류, 인원 수 제외 / 기간)이다. 슬라이드 아래 설명란에는 부제를 다시 쓰지 않는다.
  - 모바일 조작부는 오른쪽 정렬, 1024px 이상은 양 끝 배치.
- posts 영역: id · 주소 `/#posts`. `더보기 ›`는 탭 줄 오른쪽 끝(`Pane`의 `action`).
- contact: 이메일 복사 결과는 아이콘으로만 보인다(성공 ✓ `--accent`, 실패 ✕ `--error`). 상태 문구는 화면 낭독기에만 읽힌다.
- 사이드바 하단 아이콘: GitHub · LinkedIn · Velog · 이메일 · RSS.
- 하단 ©는 lucide `Copyright` 아이콘(12px, 선 굵기 2.4, `align-[-0.14em]`). 화면 낭독기는 숨긴 `©` 글자를 읽는다.
- 개인정보 처리방침은 하단 링크로 여는 모달(`features/privacy-notice`)이다. 본문 여백은 데스크톱 40px, 640px 미만 24px로, 글자 기준 위아래와 좌우가 같다.
- 데스크톱 홈은 사이드바 이름(김상훈) 글자 위 끝과 about.md 영역 위 끝을 맞춘다. 본문 위 여백 = `--sidebar-top` + `--sidebar-name-offset`(e2e가 1px 이내로 확인). 사이드바 위쪽 글자 크기 · 간격을 바꾸면 `--sidebar-name-offset`을 다시 잰다.
- 데스크톱은 화면 아래 `--bottom-mask` 높이를 가림 띠(`.portfolio-bottom-mask`)로 가린다. 사이드바는 가림 띠보다 위층(`lg:z-[31]`)이다.
- 1024px 미만은 화면 오른쪽 위에 목차 버튼(`mobile-section-menu.tsx`, 파일 목록 아이콘)이 있다. 오른쪽 끝 간격은 아래쪽 떠 있는 버튼과 같은 `--floating-edge`(12px)로, 본문 오른쪽 끝(24px)에 맞추지 않는다. 맨 위에서는 숨고 about 영역에 들어서면 나타난다. 누르면 버튼 아래에 사이드바와 같은 목차가 열리고(현재 영역 강조), 항목을 누르면 그 영역으로 이동한 뒤 닫힌다. 바깥을 누르거나 Esc로도 닫힌다. 현재 위치 추적 · 이동은 사이드바와 같은 `section-navigation.ts`를 쓴다.
- 떠 있는 버튼(목차 · 위로 가기 · 테마)은 본문 카드와 구분되도록 글자색 `--fg-strong`으로 채운 동그란 버튼이다(`shared/ui/floating-button.ts`, 아이콘은 바탕색 `--bg`라 테마마다 반전, 위로 가기 아이콘은 꺾쇠 `^`). 위로 가기는 240px 넘게 내려가면 테마 버튼 위에 따로 나타난다. 목차 버튼은 열리면 바깥 고리를 그린다.
- 떠 있는 버튼(위로 가기 · 테마)은 본문 영역 오른쪽 끝에서 `--floating-gap` 옆에 둔다(창이 좁으면 창 오른쪽 `--floating-edge`). 아래 끝은 가림 띠 높이에 맞춘다. 클래스는 홈 `.portfolio-floating`, 블로그 `.document-floating`.
- 낮은 데스크톱(1024×600)에서는 사이드바 아이콘이 잘린다(대응 여부 미정).

### 블로그
- 목록 탭 제목은 `posts`. 화면 부제와 RSS 설명은 `개발, 설계, 그리고 경험에 대한 기록을 남깁니다.`
- 목록은 요청마다 서버에서 그린다(검색 `q` · `category` · `page`, 한 쪽 10개). 검색창 아래 안내 문구는 없다.
- 상세 탭 제목은 글의 원래 제목이다. 제목 아래에 velog 원문 수정일 `Updated <수정일>`을 보인다. Velog 원문 링크는 두지 않는다.
- 상단 줄(`< 포트폴리오`와 오른쪽 버튼)은 화면 맨 위(top 0)에 고정된다(`shared/ui/document-layout.module.css` `.header`). 블로그 · 이력서 공통이다.
- 1200px 이상에서 왼쪽 목차는 처음 높이에 고정되고, 가림 띠 위에서 끝난다.
- 목록 · 상세 모두 데스크톱 화면 아래를 가린다.
- 본문 이미지: `image-metadata.json`에 크기가 있으면 `next/image`의 `getImageProps`로 WebP · 본문 너비(약 730px)에 맞춰 보낸다. 깨진 원본은 `replacement` 주소로 그린다. 크기 기록이 없는 새 이미지는 원본 `<img>` 그대로다. 허용 호스트는 `next.config.js` `images.remotePatterns`.
- 페이지 이동 스피너(`shared/ui/navigation-spinner.tsx`, 루트 레이아웃): 같은 사이트 링크 · 폼 제출로 이동할 때 0.3초가 넘으면 화면 가운데에 보이고, 주소가 바뀌면 사라진다. `loading.tsx`는 응답 스트리밍으로 `/posts`의 404 · 308 상태 코드를 200으로 바꾸므로 쓰지 않는다.
- 페이지 버튼: 1쪽의 « ‹, 마지막 쪽의 › »는 자리만 남기고 보이지 않는다(`invisible`, 쪽 번호 위치가 밀리지 않음). 결과가 한 쪽이면 `1`만 보인다.

### 이력서 (`/resume`)
- 쪽 구성: 1쪽 소개 · 대표 과제 01 · 대표 과제 02 · 프로젝트 · 주요 과제 2쪽 · 그 외 과제 · 기타 2쪽, 모두 9쪽.
- 대표 과제 아키텍처 그림 쪽(`task-architecture.tsx`)은 숨겨 두었다. `resume-document.tsx`의 `SHOW_TASK_ARCHITECTURE`를 `true`로 바꾸면 대표 과제마다 그림 쪽이 붙어 11쪽이 된다. 이때 e2e 쪽 수 기대값도 같이 바꾼다.
- 파일
  - 화면: `src/app/resume/resume-document.tsx`
  - 공용 배치: `resume-viewer.module.css`
  - 흑백 종이 테마: `resume-theme.module.css`
- 탭 제목 `resume`. 검색 노출은 noindex이고 사이트맵에서도 빠진다(노출 여부는 사용자 결정 보류).
- 1쪽 대표 과제 목록과 대표 과제 쪽 제목은 `resume-case-studies.ts`의 `title`. 쪽 제목 위치 보정은 각 쪽의 `data-title-offset`.
- 수상 · 교육 · 자격증은 `profile-data.ts`의 id를 `resume-data.ts`의 `factId`로 연결한다.
- 인쇄 버튼은 브라우저 인쇄(PDF로 저장)를 그대로 쓴다. 문구는 640px 이상 `인쇄 | PDF 저장`(프린터 아이콘), 미만 `PDF 저장`(내려받기 아이콘).
- A4 · 여백 0을 무시하는 기기에서는 쪽 전체를 인쇄 영역에 맞춰 줄인다(`global.css` `zoom`).
- 앱 안 브라우저(네이버 앱 등)는 `window.print()`가 동작하지 않는다. 인쇄가 시작되지 않으면 외부 브라우저로 여는 안내 창을 띄운다(`print-button.tsx`). Android는 "Chrome으로 열기"와 "다른 브라우저로 열기" 두 버튼이다.
- 이력서 종이 본문 디자인(흑백)은 사이트 테마와 따로 둔다.

### 공통 포커스 · 스크롤
- 가림 띠가 있는 페이지는 `scroll-padding-bottom`을 가림 높이 + 8px로 둔다.
- 1024px 미만 홈은 위쪽 스크롤 여백이 목차 버튼 아래 끝 + 8px(4.75rem = 76px)이다. 영역 scroll-margin은 1024px 이상에서만 24px.
- 블로그 · 이력서는 위쪽 스크롤 여백이 머리 줄 높이 + 8px(86px, 640px 미만 78px)이다. 블로그 소제목 scroll-margin은 18px.
- 넘침이 잘리는 자리(홈 하단 개인정보 버튼 · 블로그 목차 링크 · 탭 · 탭 내용)는 포커스 테두리를 안쪽(-2px)에 그린다.

## 6. 콘텐츠

- 경력 사실의 단일 원본은 `src/shared/data/career-data.ts`의 `work`다. 홈 tasks와 이력서 본문(`title` · `points` · `platform` · `team` · `role` · `tech`)이 같은 항목을 쓴다. 화면별 용어 치환은 두지 않고, 원본 문구 자체를 확정 표현으로 관리한다.
- `site-data.tsx`: `profile` · `aboutIntro` · `aboutKeyTerms` · `majorSkills` · `trackRecord` · `projects` · `navItems`.
  - `aboutKeyTerms`는 본문과 글자가 정확히 같아야 굵게 표시된다(다르면 오류 없이 굵게만 사라진다).
- `resume-data.ts`: 이력서 소개 · 학력(단일 원본) · 기술 스택 · 교육 · 수상 · 자격증 · AI 활용 경험.
- `resume-case-studies.ts`: 대표 과제 01 · 02 본문. 이력서에서 `Task` 대신 `대표 과제`라는 용어를 쓴다(인사 담당자도 읽는 문서라 한국어 명사로 통일).
- `profile-data.ts`: 교육 · 수상 · 자격증 원본(`factId`로 연결).
- 고객 / 고객사는 통일하지 않는다. 고객사 = 사업 · 도메인 용어, 고객 = 데이터 · 시스템 맥락.
- 블로그 원문은 `https://velog.io/@kata/posts`다.
  - 본문 · 코드 · 표 · 이미지를 원문 그대로 두고 요약 · 재작성하지 않는다. HTML을 일괄 이스케이프하지 않는다.
  - Markdown 본문은 고치지 않는다. velog 동기화가 본문 해시(`velog-sources.json`)로 변경을 막는다. 표시 방식은 렌더러(`src/shared/markdown`)에서 바꾼다.
  - 글 설명은 frontmatter `summary`, 출처와 실제 수정일은 `velog-sources.json`, 이미지 크기 · 대체 설명 · 대체 주소는 `image-metadata.json`.
- 콘텐츠를 고칠 때 기존 디자인, 컴포넌트 구조, 섹션 순서, 데이터 필드 형식을 유지한다. 지시 없이 문단 렌더러나 강조용 컴포넌트를 추가하지 않는다.
- 코딩테스트 문제 생성 · 채점 플랫폼은 포트폴리오에서 제외했다. 다시 추가하지 않는다.
- `port/`는 원본 자료(이력서 · 자소서 · 포트폴리오 · 이미지 · 면접 기록 · 작업 인계 파일) 폴더다. `.gitignore` 대상이고 정리 · 삭제 대상이 아니다. 웹에서 쓰는 이미지는 `public/images/`로 복사해 쓴다.

## 7. 이력 서술 기준

**공개 저장소이므로 이력서보다 보수적으로 쓴다.** 이력의 기준 문서는 `port/main/이력서_김상훈.html`과 사용자의 최신 확인 내용이다. 이전 제출본으로 현재 내용을 덮어쓰지 않고, 공개 경력 사실을 추정해 추가하지 않는다.

| 금지 | 이유 | 대체 |
|---|---|---|
| `iBill 총괄` · `PO` | 직함을 받은 적 없음(임명 없이 업무만 인계) | 하는 일로 서술: 요구사항 구조화 / 개선 · 신규 · 보류 결정 / 운영 이슈 원인분석~배포 |
| `기획부터 운영까지` (전자계약) | 기획자가 따로 있었음 | 구현 분담 + 기획 · 협의 참여 |
| 신규 구축을 `주도` · `관철` | 전자계약 · Branch Manager 둘 다 참여자. 계정계 API 확장도 거절 후 협의로 낙착 | 참여 / 협의로 이끌어냄 |
| `계약·결제·정산 서비스를 개발` | 정산 시스템을 만든다는 뜻이 됨 | `계약·결제·정산이 고객사에 닿는 채널 계층을 담당` |
| 사내 축약어(`결제중 선반영` · `가드레일` · `무수정` 등) | 밖에서 안 통함 | 풀어서 서술 |

- 대표 과제 02의 메모리 문제는 장애 현상과 개선 결과에 근거한 추론이다. 힙 덤프 · GC 로그로 원인을 확정했다고 쓰지 않는다.
- 실패 청구 보정은 당일 전송 종료 직후 고객 관리 시스템의 **현재** 서비스 상태를 일괄 조회해 이용중지 · 해지예정 · 해지 고객사의 실패 청구를 보정한다. 요청 당시 상태와 거부 기록은 확인하지 못했다. 명시적 거부와 타임아웃을 구분해 접수 여부를 확정했다고 쓰지 않는다.
- 과거 고착 건과 신규 실패 건의 보정 시점을 구분한다. 신규 건은 아직 결제예정일 전이므로, 같은 날 재실행까지 날짜 조건만으로 차단된다고 쓰지 않는다.
- up-quant는 가격 예측 기능을 구현한 프로젝트로 쓰지 않는다. 시장 분석 · 포트폴리오 구성 · 전략 검증을 설명한다.
- cms-plus의 Analysis 서버는 ECS Fargate의 나머지 서비스와 따로 배포했다. Logstash 기반 로깅은 ELK로 표기한다. 성능은 `5만 건 처리 시간 12초 → 7초`로 쓰고, 지표가 불분명한 상승률을 붙이지 않는다.
- CNN 논문은 학습 90% · 검증 10%의 이진 분류 실험이다. 논문에서 확인되지 않은 회전 · 줌 증강, Early Stopping, ModelCheckpoint는 추가하지 않는다.
- 지급대행 업무명은 `지급대행 어드민 · 테이블, 엔티티 설계 및 비즈니스 로직 구현`을 유지한다.
- 회사 신규 프로젝트에서는 본인 역할과 팀 전체 성과를 구분한다. 완료한 구현과 후속 과제를 섞지 않는다.
- 경력 항목의 팀 인원 표기(`team`)는 작업 대상으로 고려하지 않는다. 고치거나 검토 항목으로 올리지 않는다.

## 8. SEO · 분석 · 배포

- 기준 주소는 `NEXT_PUBLIC_BASE_URL`(기본 `https://www.sanghunkim.com`)이다. 홈 canonical은 슬래시 없는 주소로, sitemap과 같다.
- 탭 제목 형식은 `%s | 김상훈`.
- 홈 검색 설명(`siteDescription`): `데이터 정합성과 시스템 신뢰성을 먼저 두는 금융 도메인 소프트웨어 엔지니어 김상훈입니다. Spring Boot와 Vue.js로 서비스를 개발하고 운영합니다.`
- 블로그 목록 검색 설명: `김상훈의 개발, 설계, 그리고 경험에 대한 기록입니다.`
- 이력서 검색 설명: `김상훈 이력서 - 계약·결제·정산이 고객에 닿는 채널 계층을 담당하는 …`(메타 문구에 긴 줄표 금지).
- 검색 결과용 설명은 각 페이지에서 `metadata.other.description`으로 넣는다. `metadata.description`을 쓰면 Next.js가 공유 카드 설명으로 복사한다.
- 공유 카드(OG · X)는 모든 링크가 같다(`shared/lib/seo.ts` `shareCard(url)`).
  - 제목 `김상훈 | 개발자 포트폴리오`, 설명 `profile.intro`, 이미지 `/api/og`.
  - 페이지마다 다른 건 주소(og:url)뿐이다. 블로그 글은 종류만 `article`(발행일 · 수정일)이다.
- `/api/og`는 한 가지 모양뿐이다: 왼쪽 위 마름모 아이콘 + `portfolio` + 파일 탭 모양.
- 홈 구조화 데이터는 `@graph`로 WebSite(`#website`) · ProfilePage(`#profile`) · Person(`#person`)을 @id로 연결한다.
  - 사이트 운영자와 페이지 주인공은 인물이다. 근무처는 인물의 `worksFor`일 뿐 publisher로 쓰지 않는다.
  - `jobTitle`은 화면에 보이는 직함만: `['Software Engineer', 'Full-stack Developer']`.
  - `knowsAbout`은 `majorSkills`와 같다. `sameAs`는 GitHub · LinkedIn · Velog.
- 글 구조화 데이터 이미지는 글 대표 이미지, 없으면 `/api/og`.
- robots: 전체 허용, `/api/`는 막고 `/api/og`만 허용.
- RSS 이름 `김상훈 | Posts`.
- `/llms.txt`는 사이트 데이터로 만든다: 소개 · 주요 페이지 · 글 목록 · 연락처. 전화번호와 이력서는 넣지 않는다.
- 리다이렉트(308): `/privacy → /`.
- GA는 `shared/ui/production-analytics.tsx`에서 gtag를 직접 불러온다(운영 환경에서만).
  - 측정 요청에서 이 사이트 주소의 `q` · `from`과 `ep.search_term`을 지운다(`shared/lib/analytics-privacy.ts`, `tests/analytics-privacy.test.ts`).
  - 인라인 스크립트 문자열 안에 역슬래시를 직접 쓰지 않는다(템플릿 문자열이 이스케이프를 먹어 GA가 멈춘다).

## 9. 검증 · 도구

- `pnpm run check`: 타입 검사 · 단위 테스트 · 빌드.
- `pnpm run test:e2e`: Playwright. 3100 포트에 운영 빌드를 띄우므로, 3100에 남은 `next start`가 있으면 먼저 끈다.
- 단위 테스트: 콘텐츠 · 라우팅 · 이미지 허용 주소 · 색 대비 · 본문 글꼴 글자 · GA 정리 · 요약 · 모니터 · 동기화.
- e2e: 홈 · 블로그 탐색 · 테마 · 검색 · 반응형 · 포커스와 가림 띠 · 고정 줄 · 탭 키보드 · 모바일 목차 버튼 · 이력서 이동 · 확대 · 인쇄 쪽 수 · 앱 안 인쇄 안내 · 글 article 정보 · 이동 스피너.
- `pnpm dev:open`: 개발 서버가 준비되면 브라우저를 연다.
- `pnpm fonts:build` · `pnpm content:check` / `content:sync` · `pnpm images:check` · `pnpm links:check` · `pnpm monitor` · `pnpm measure`.

## 10. 보류 항목

- 보류 항목은 다음 세션에서 진행한다. 그 전에는 먼저 꺼내 진행하지 않는다.
- 사용자가 남은 작업을 보류로 넘기라고 하면 다음 둘을 합쳐 다음 인계의 보류로 넘긴다. 매 세션 같은 방식이다.
  1. 이전 인계의 보류 항목 중 이번 세션에 해결된 것을 뺀 나머지
  2. 이번 세션에 작업하다 끝내지 못한 것
- 결정 대기 · 논의 거리는 보류와 따로 적는다. 사용자가 보류로 정하지 않은 항목을 보류에 넣지 않는다.
- 현재 보류 목록은 가장 최근 인계 파일(`port/handoff/`)의 `2. 보류`에 있다. 이 문서에는 목록을 두지 않는다.
