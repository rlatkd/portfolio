# Sanghun Kim · Portfolio

**실무 경험, 직접 만든 프로젝트, 공부하며 남긴 기술 기록.**

소프트웨어 엔지니어 김상훈의 개인 웹사이트입니다. 금융 도메인에서의 개발 경험과 프로젝트를 소개하고, 개발하며 배운 내용을 기술 블로그에 기록합니다.

[사이트 방문](https://www.sanghunkim.com) · [기술 블로그](https://www.sanghunkim.com/posts) · [이력서](https://www.sanghunkim.com/resume) · [Velog](https://velog.io/@kata/posts)

## 사이트 구성

| 페이지 | 내용 |
| --- | --- |
| **포트폴리오** `/` | 소개, 실무 경험, 프로젝트 캐러셀, 최근 글, 연락처 |
| **블로그** `/posts` | 검색, 카테고리 필터, 페이지네이션, 관련 글 |
| **글 상세** `/posts/[slug]` | 본문 목차, 코드 하이라이팅·복사, 표와 이미지 |
| **이력서** `/resume` | A4 문서 뷰어, 페이지 이동·확대, URL로 위치 복원, 인쇄 |

모바일과 데스크톱에 맞춘 레이아웃, 라이트·다크 테마, 페이지별 메타데이터와 공유용 OG 이미지, sitemap과 RSS를 제공합니다.

## 구현 방식

- **콘텐츠는 저장소에서 관리합니다.** 경력·프로젝트는 데이터 파일로, 블로그 본문은 Markdown으로 관리합니다.
- **본문과 상호작용을 나눴습니다.** App Router와 서버 컴포넌트를 바탕으로 페이지를 구성하고, 검색 입력·테마 전환·캐러셀·이력서 뷰어에는 클라이언트 컴포넌트를 사용합니다.
- **실제 사용 흐름을 검증합니다.** 콘텐츠·렌더링·URL 처리의 단위 테스트와 함께 글 탐색, 코드 복사, 테마 유지, 이력서 이동·인쇄를 브라우저에서 검사합니다.

| 구분 | 기술 |
| --- | --- |
| 웹 | Next.js 16 · React 19 · TypeScript |
| 스타일 | Tailwind CSS · Pretendard |
| 콘텐츠 | react-markdown · remark-gfm · rehype-sanitize · highlight.js |
| 검증 | Node.js Test Runner · Playwright · GitHub Actions |
| 배포 | Vercel |

## 로컬에서 실행하기

**Node.js 22 이상**, **pnpm 11.9.0**이 필요합니다.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

[localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

`NEXT_PUBLIC_BASE_URL`은 canonical URL·sitemap·RSS의 기준 주소입니다. 기본값은 `https://www.sanghunkim.com`이며, 로컬 실행을 위해 변경할 필요는 없습니다.

## 검증하기

```bash
# 타입 검사 → 단위 테스트 → 프로덕션 빌드
pnpm run check

# 브라우저 설치 후 E2E 테스트
pnpm exec playwright install chromium webkit
pnpm run test:e2e
```

E2E 테스트는 빌드 결과를 사용하며 테스트 서버를 자동으로 실행합니다. 로컬 Chromium 프로젝트는 설치된 **Google Chrome**을 사용하고, CI에서는 Playwright Chromium을 사용합니다. 모바일 시나리오는 WebKit에서도 검사합니다.

| 명령어 | 용도 |
| --- | --- |
| `pnpm build` / `pnpm start` | 프로덕션 빌드 / 서버 실행 |
| `pnpm content:check` | 콘텐츠 변경 확인 |
| `pnpm content:sync` | 콘텐츠 변경 반영 |
| `pnpm monitor` | 운영 사이트의 응답·본문·메타데이터 점검 |
| `pnpm images:check` / `pnpm links:check` | 외부 이미지 / 링크 점검 |

## 코드와 콘텐츠 위치

모듈 import에는 `@/*` → `src/*`, `@/styles/*` → `styles/*`, `@public/*` → `public/*` 별칭을 사용합니다. 예를 들어 이미지는 `import photo from '@public/images/resume/kim-sanghun-profile.webp'`로 가져올 수 있습니다. 브라우저에서 요청하는 `/images/...`, `/fonts/...` URL과 서버의 파일시스템 경로는 모듈 별칭과 구분합니다.

프로젝트 슬라이드와 증명사진은 `@public/images/...`, 검증용 JSON은 `@public/reports/...`에서 import합니다. 현재 Webpack 구성의 CSS 폰트 참조는 `url('~@public/fonts/...')`를 사용합니다. OG 이미지 생성의 `fs.readFile`은 실제 파일 경로가 필요하므로 `public/fonts/...`를 유지하며, 공개 URL과 문서 링크에는 별칭을 넣지 않습니다.

```text
src/
├── app/                 페이지 · 레이아웃 · RSS · OG 이미지
├── widgets/             포트폴리오 섹션
├── features/            테마 전환 · 관련 글 · 코드 복사
├── entities/            글 카드 · 목록 · 페이지네이션 · 목차
└── shared/
    ├── data/            경력 · 프로필 · 프로젝트
    ├── content/         블로그 본문 · 메타데이터
    ├── markdown/        본문 렌더링
    └── …                공통 UI · 설정 · 유틸리티
public/                  이미지 · 글꼴 · 공개 실험 결과
scripts/                 콘텐츠 동기화 · 운영 점검
tests/                   단위 테스트 · 브라우저 테스트
```

경력은 [`career-data.ts`](src/shared/data/career-data.ts), 학력·자격은 [`profile-data.ts`](src/shared/data/profile-data.ts), 소개·프로젝트는 [`site-data.tsx`](src/shared/data/site-data.tsx)에서 수정합니다. 블로그 본문은 [`src/shared/content/posts`](src/shared/content/posts)에 있습니다.

## 운영 문서

- [콘텐츠 관리와 배포 후 점검](docs/operations.md)
- [남은 작업](docs/TODO.md)

## 2026-11-01 구조 갱신

- 이력서는 `/resume` 하나로 통합했습니다. 예전 비교용 주소 `/resume2`는 `/resume`로 영구 리다이렉트됩니다.
- 경력 항목은 [`career-data.ts`](src/shared/data/career-data.ts)의 `work`가 홈 Experience와 이력서의 단일 원본입니다. 이력서 전용 내용(소개·학력·기술 스택·교육·수상·자격증·AI 활용 경험)은 [`resume-data.ts`](src/shared/data/resume-data.ts), Task 본문은 [`resume-case-studies.ts`](src/shared/data/resume-case-studies.ts)에서 수정합니다.
- 이력서 화면 스타일은 공용 배치 `src/app/resume/resume-viewer.module.css`와 흑백 테마 `src/app/resume/resume-theme.module.css`로 나뉩니다.
- 쓰지 않던 이미지(`header.jpg` 등)와 빈 폴더를 정리했습니다.


## 2026-11-02 갱신

- **디자인:** 사이트 전체를 코드 편집기(VS Code) 모양으로 바꿨습니다. 라이트는 Light Modern·Light+, 다크는 Dark+의 색을 쓰며 처음 방문하면 다크로 보입니다. 라벨·파일명·날짜에는 JetBrains Mono와 Nanum Gothic Coding을 씁니다.
- **홈 구성:** 왼쪽에 이름·소개·파일 목차를 두고, 오른쪽은 `about.md` · `experience/`(경력·학력·기술 탭) · `tasks/`(프로젝트·주요 과제 탭) · `side-projects/` · `posts/` · `contact.md` 영역으로 나눴습니다.
- **사이드 프로젝트 슬라이드:** 이미지 파일이 아니라 화면 구성 요소입니다. 프로젝트 데이터(`site-data.tsx`의 `projects`)에 화면 캡처 한 장만 있으면 같은 모양으로 만들어집니다. 위 "코드와 콘텐츠 위치"의 슬라이드 이미지 설명은 이전 구조입니다.
- **블로그 이미지:** 본문의 외부 이미지를 Next.js 이미지 변환으로 WebP로 바꾸고 본문 폭에 맞게 줄여 보냅니다. 글 원문(Markdown)과 이미지 주소는 그대로입니다.
- **공유 카드:** 어느 페이지 링크를 공유해도 같은 카드(제목·이미지)가 나옵니다.
- **개인정보 처리방침:** 별도 페이지 대신 하단 링크를 누르면 열리는 창으로 보여 줍니다. 예전 주소 `/privacy`는 홈으로 이동합니다.
- **새 위치:** `src/widgets/tasks`(과제 탭), `src/features/privacy-notice`(개인정보 처리방침), `src/shared/ui/pane.tsx` · `pane-tabs.tsx`(파일 탭 모양 영역)
