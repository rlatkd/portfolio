# 김상훈 | Portfolio

금융 도메인 소프트웨어 엔지니어 김상훈의 포트폴리오와 기술 블로그입니다. 실무에서 수행한 프로젝트와 개선 과제, 사이드 프로젝트, 개발하며 남긴 기록을 한곳에서 제공합니다.

[포트폴리오](https://www.sanghunkim.com) · [블로그](https://www.sanghunkim.com/posts) · [이력서](https://www.sanghunkim.com/resume) · [RSS](https://www.sanghunkim.com/rss)

## 주요 기능

### 포트폴리오

VS Code 편집기를 모티브로 사이드바 목차와 파일 탭 형태의 영역을 구성했습니다. 경력·학력·기술과 회사에서 수행한 과제를 탭으로 구분하고, 사이드 프로젝트는 화면 캡처와 프로젝트 데이터를 조합한 캐러셀로 소개합니다.

- `about.md`: 소개와 업무에서 중요하게 생각하는 기준
- `experience/`: 경력·학력·기술
- `tasks/`: 회사 프로젝트와 주요 과제
- `side-projects/`: 사이드 프로젝트 소개와 저장소 링크
- `posts/`: 최근 기술 블로그 글
- `contact.md`: 이메일 문의와 주소 복사

다크 테마를 기본으로 제공하며, 사용자가 선택한 테마는 브라우저에 저장합니다. 화면 너비에 맞춘 레이아웃과 키보드 탐색, 움직임 줄이기 설정도 지원합니다.

### 기술 블로그

Velog의 글을 저장소에 동기화해 서비스합니다. 별도 데이터베이스 없이 MDX 파일과 메타데이터를 읽어 목록과 상세 페이지를 만듭니다.

- 제목·요약·카테고리 검색, 카테고리 필터, 페이지 이동
- 검색·필터 조건을 유지하는 목록 복귀
- 현재 읽는 절을 표시하는 목차와 제목 바로가기
- 코드 문법 강조와 원문 코드 복사
- 표·외부 이미지 렌더링, 이전·다음 글과 관련 글 탐색

확장자는 `.mdx`이지만 실행 가능한 JSX 대신 Markdown과 제한된 HTML로 렌더링합니다. HTML은 허용 목록으로 정제하고, 코드 강조·이미지 크기·대체 설명 등 표시 처리는 원문 밖에서 적용합니다.

### 이력서

`/resume`에서 A4 비율의 문서를 제공합니다. 페이지 이동·확대·너비 맞춤을 지원하며, 현재 페이지와 배율은 URL에 보존합니다. 브라우저 인쇄 시 보기 도구를 숨기고 전체 페이지를 출력합니다.

이력서는 `noindex`로 설정하고 사이트맵에서 제외합니다. `/resume2`는 `/resume`로 영구 리다이렉트합니다.

## 기술과 구현 구조

| 영역 | 구성 |
| --- | --- |
| 실행 환경 | Node.js 22.x · pnpm 11.9.0 |
| 애플리케이션 | Next.js 16.4 · React 19.3 · TypeScript |
| 스타일 | Tailwind CSS · CSS Modules · 시맨틱 색상 토큰 |
| 글꼴 | Pretendard · JetBrains Mono · Nanum Gothic Coding |
| Markdown | react-markdown · remark-gfm · rehype-raw · rehype-sanitize |
| 코드 강조 | highlight.js |
| 검증 | Node.js Test Runner · Playwright · GitHub Actions |
| 배포·분석 | Vercel · Google Analytics 4 · Vercel Web Analytics · Speed Insights |

페이지와 콘텐츠 조회는 App Router의 서버 컴포넌트를 중심으로 구성합니다. 테마, 탭, 캐러셀, 코드 복사, 이력서 뷰어 등 상호작용이 필요한 부분은 클라이언트 컴포넌트로 분리합니다. 블로그 검색도 URL의 검색 조건을 서버에서 처리합니다.

```text
src/
├── app/                   페이지·레이아웃, RSS·OG 이미지·llms.txt
├── widgets/               소개·경력·과제·사이드 프로젝트 등 화면 영역
├── features/              테마·이메일 복사·개인정보 안내 등 기능
├── entities/post/ui/      글 목록·페이지 이동·목차·코드 복사
└── shared/
    ├── config/            도메인·사이트 메타데이터
    ├── content/           블로그 원문·출처·이미지 메타데이터
    ├── data/              프로필·경력·프로젝트·이력서 데이터
    ├── lib/               콘텐츠 조회·검색·SEO 처리
    ├── markdown/          원문 파싱·정제·렌더링
    └── ui/                Pane·PaneTabs·공통 헤더·보기 도구
styles/                    전역 스타일·테마 토큰
public/                    화면 캡처·글꼴·공개 실험 결과
scripts/                   콘텐츠 동기화·리소스 점검·운영 모니터링
tests/                     단위 테스트·브라우저 테스트
```

화면 영역은 [`Pane`](src/shared/ui/pane.tsx), 탭 영역은 [`PaneTabs`](src/shared/ui/pane-tabs.tsx)를 사용합니다. 테마 색상은 [`styles/global.css`](styles/global.css)의 토큰으로 관리합니다. 사이드 프로젝트 슬라이드는 별도 합성 이미지 대신 [`project-carousel.tsx`](src/widgets/projects/project-carousel.tsx)에서 화면 캡처와 제목·기간을 조합해 렌더링합니다.

## 로컬 실행

Node.js **22.x**와 pnpm **11.9.0**을 사용합니다. 저장소의 `engines`와 `packageManager` 설정에 맞춰 준비한 뒤 실행합니다.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다. 개발·프로덕션 빌드 모두 현재 설정에서는 Webpack을 사용합니다.

환경 변수는 [`.env.example`](.env.example)을 참고합니다. 필요하면 `.env.local`로 복사해 사용합니다.

| 변수 | 용도 | 기본값 |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_URL` | canonical URL·사이트맵·RSS·구조화 데이터의 기준 도메인 | `https://www.sanghunkim.com` |

로컬 화면을 확인하기 위해 기준 도메인을 `localhost`로 바꿀 필요는 없습니다.

## 검증

```sh
# 타입 검사, 단위 테스트, 프로덕션 빌드
pnpm run check

# 브라우저 설치 후 빌드 결과를 대상으로 E2E 실행
pnpm exec playwright install chromium webkit
pnpm run test:e2e
```

E2E는 `127.0.0.1:3100`에 테스트 서버를 자동 실행합니다. 로컬 Chromium 테스트에는 설치된 Google Chrome을 사용하고, CI에서는 Playwright Chromium을 사용합니다. 지정된 모바일 시나리오는 WebKit에서도 실행합니다.

단위 테스트는 원문 보존·코드 렌더링·목차·요약·URL 처리·콘텐츠 동기화 등을 검사합니다. 브라우저 테스트는 글 탐색·테마 유지·검색·반응형 배치와 이력서 이동·확대·인쇄를 확인합니다. 실행 범위는 [`tests`](tests)와 [`playwright.config.ts`](playwright.config.ts)에 정의되어 있습니다.

GitHub Actions의 [`Validate`](.github/workflows/check.yml)는 push·PR에서 의존성 보안 검사, 타입 검사, 단위 테스트, 빌드와 E2E를 실행합니다.

## 콘텐츠 관리

| 수정할 내용 | 원본 위치 |
| --- | --- |
| 공개 프로필·소개·사이드 프로젝트·홈 기술 목록 | [`site-data.tsx`](src/shared/data/site-data.tsx) |
| 회사·역할·프로젝트·주요 과제 | [`career-data.ts`](src/shared/data/career-data.ts) |
| 이력서 소개·학력·기술·교육·수상·자격·AI 활용 경험 | [`resume-data.ts`](src/shared/data/resume-data.ts) |
| 교육·수상·자격증의 프로필 데이터 | [`profile-data.ts`](src/shared/data/profile-data.ts) |
| 이력서 Task 상세 본문 | [`resume-case-studies.ts`](src/shared/data/resume-case-studies.ts) |
| 블로그 원문과 기본 메타데이터 | [`src/shared/content/posts`](src/shared/content/posts) |
| 블로그 출처·수정일·본문 해시 | [`velog-sources.json`](src/shared/content/velog-sources.json) |
| 이미지 크기·대체 설명·제공 상태 | [`image-metadata.json`](src/shared/content/image-metadata.json) |

홈과 이력서는 경력·학력 등의 데이터를 공유합니다. 데이터를 변경하면 각 화면에 미치는 영향을 함께 확인해야 합니다.

블로그 파일명에서 `.mdx`를 뺀 값이 상세 주소의 slug가 됩니다. 기존 주소를 바꾸려면 콘텐츠 파일뿐 아니라 출처 메타데이터와 링크도 함께 검토해야 합니다.

```sh
# Velog 원문과 저장소의 차이 확인
pnpm content:check

# 확인한 변경 사항 반영
pnpm content:sync
```

확인 명령은 파일을 수정하지 않으며 차이가 있으면 종료 코드 1을 반환합니다. 반영 명령은 기존 frontmatter를 보존하고 원문·출처 정보를 갱신합니다. 로컬 본문이 기록된 해시와 다르면 덮어쓰지 않고 중단합니다. Velog에서 사라진 글도 자동으로 삭제하지 않습니다.

**블로그 Markdown 본문은 직접 수정하지 않습니다.** 표시 방식의 변경은 렌더러에서 처리하고, 새 외부 이미지의 크기·설명은 이미지 메타데이터로 관리합니다. 크기가 기록된 이미지는 Next.js 이미지 변환을 거치며 원문의 이미지 주소는 유지합니다.

## 배포와 운영

Vercel 프로젝트의 Node.js Version은 저장소와 CI에 맞춰 **22.x**로 설정합니다. `package.json`의 `engines.node`가 프로젝트 설정보다 우선하므로 두 값을 일치시켜야 버전 불일치 경고가 나지 않습니다. 변경은 새 배포부터 적용됩니다.

페이지별 canonical URL과 구조화 데이터, 사이트맵·RSS를 제공합니다. 링크 공유 카드의 제목·설명·이미지는 공통 설정을 사용하며, 검색용 제목·설명은 페이지별로 관리합니다. `/llms.txt`는 공개 사이트 데이터와 블로그 목록으로 생성합니다.

개인정보 안내는 하단 링크에서 여는 모달입니다. 기존 `/privacy` 주소는 홈으로 이동합니다. 방문 분석은 Vercel 운영 환경이면서 대표 도메인에 접속한 경우에만 활성화합니다.

| 명령 | 용도 |
| --- | --- |
| `pnpm build` / `pnpm start` | 프로덕션 빌드 / 빌드 결과 실행 |
| `pnpm monitor` | 운영 페이지의 응답·본문·canonical·RSS 등 점검 |
| `pnpm images:check` | 블로그 외부 이미지의 제공 상태와 크기 점검 |
| `pnpm links:check` | 블로그 본문의 외부 링크 점검 |
| `pnpm measure` | 로컬 페이지의 로딩 지표·가로 넘침 측정 및 캡처 |

측정 스크립트는 로컬 주소를 대상으로 사용하며, 배포 성능을 판단할 때는 개발 서버 대신 프로덕션 빌드로 실행합니다. 실행 환경과 측정 범위는 결과 파일에 함께 기록됩니다.
