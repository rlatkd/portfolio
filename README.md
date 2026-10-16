# 김상훈 포트폴리오

경력과 프로젝트, 기술 기록을 소개하는 개인 포트폴리오 웹사이트입니다.

**[웹사이트 바로가기](https://www.sanghunkim.com)** · [Velog](https://velog.io/@kata/posts)

## 주요 기능

- **포트폴리오** — 소개, 실무 경험, 프로젝트, 기술 스택 및 연락처
- **기술 블로그** — 글 검색, 카테고리 필터, 페이지네이션, 관련 글 추천
- **글 읽기** — 목차 탐색, 코드 하이라이팅과 복사, 표·이미지 렌더링
- **화면과 검색 노출** — 반응형 레이아웃, 라이트·다크 테마, 페이지별 메타데이터, sitemap·RSS·OG 이미지

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 16 App Router, React 19 |
| 언어·스타일 | TypeScript, Tailwind CSS |
| 콘텐츠 | Markdown, react-markdown, remark-gfm, highlight.js |
| 테스트 | Node.js Test Runner, Playwright |
| 배포·분석 | Vercel, Google Analytics 4, Vercel Analytics, Speed Insights |

포트폴리오 정보와 블로그 글은 저장소의 파일로 관리합니다. 페이지는 서버 컴포넌트로 구성하고, 테마 전환·검색어 입력·코드 복사 등 필요한 상호작용을 제공합니다.

## 로컬 실행

Node.js 22 이상과 pnpm 11.9.0을 사용합니다.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

`.env.local`의 `NEXT_PUBLIC_BASE_URL`은 canonical, sitemap, RSS 등에 사용하는 사이트의 대표 주소입니다. 기본값은 `https://www.sanghunkim.com`입니다.

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드한 사이트 실행 |
| `pnpm run check` | 타입 검사, 단위 테스트, 프로덕션 빌드 |
| `pnpm run test:e2e` | 브라우저 테스트 |

브라우저 테스트는 빌드 후 실행합니다. 로컬에서는 Chrome을, CI에서는 Playwright Chromium을 사용합니다.

## 프로젝트 구조

```text
src/
├── app/        # 페이지, 레이아웃, 라우트
├── widgets/    # 포트폴리오 섹션
├── features/   # 테마 전환, 글 추천, 복사 등 사용자 기능
├── entities/   # 글 카드, 목록, 페이지네이션, 목차
└── shared/     # 공통 UI, 데이터, 콘텐츠, 렌더러, 유틸리티
public/         # 이미지, 글꼴 등 정적 파일
styles/         # 전역 스타일과 테마
scripts/        # 콘텐츠·운영 관리 도구
tests/         # 단위 테스트와 브라우저 테스트
```

## 콘텐츠 관리

- 경력·프로젝트 정보: `src/shared/data/site-data.tsx`
- 블로그 본문: `src/shared/content/posts/*.mdx`
- 글 출처·수정일: `src/shared/content/velog-sources.json`
- 홈 대표 글: `src/shared/config/writing.ts` (정확한 파일명 slug 사용, 누락 시 검증 실패)

글 목록은 편집 순서인 `index` 내림차순이며, RSS는 발행일 내림차순입니다. 검색은 제목·요약·카테고리를 대상으로 합니다. 전화번호와 자격 식별번호는 공개 데이터에 넣지 않습니다.

`src/package.json`과 `tests/package.json`은 소스와 테스트를 ESM으로 명시합니다. ESM 전용 Markdown 의존성을 테스트에서 CommonJS로 변환하지 않도록 하며, 루트의 Next.js·Tailwind 설정은 기존 CommonJS를 유지합니다. Markdown 파일은 `.gitattributes`에서 LF 줄바꿈을 사용하도록 지정합니다.

이전 소개 원본은 `docs/archive`에 보관합니다.

블로그는 [직접 작성한 Velog 글](https://velog.io/@kata/posts)을 가져와 제공합니다. `.mdx` 확장자를 유지하되, 본문은 HTML과 GFM을 지원하는 Markdown으로 렌더링합니다.

콘텐츠 동기화와 배포 후 점검 방법은 [운영 문서](docs/operations.md)를 참고하세요.
