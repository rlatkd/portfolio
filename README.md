# 김상훈 포트폴리오 · Writing

- https://www.sanghunkim.com
- https://www.kimsanghun.com → 대표 도메인으로 리디렉션

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS를 사용합니다. 이 실행 환경의 Turbopack 내부 통신 제한으로 개발·빌드는 공식 지원 Webpack 모드를 사용합니다. 글은 파일에서 읽으며 DB와 댓글 기능은 사용하지 않습니다.

## 실행

Node.js 22 이상과 pnpm 11.9.0이 필요합니다.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

브라우저를 함께 열려면 `pnpm dev:open`을 사용합니다. 운영 빌드는 `pnpm build`, 실행은 `pnpm start`입니다.

## 설정과 배포

`NEXT_PUBLIC_BASE_URL`은 대표 도메인의 origin입니다. 기본값은 `https://www.sanghunkim.com`이며 canonical, sitemap, RSS, 구조화 데이터에 공통 적용됩니다. 환경변수를 바꾸면 재빌드해야 합니다.

GA4 측정 ID `G-8ZK16NWL6K`는 루트 레이아웃에 한 번 연결되어 있습니다. 공개 식별자이며 비밀 키가 아닙니다. Vercel Analytics와 Speed Insights도 사용합니다.

Vercel에서는 Node.js 22, 설치 명령 `pnpm install --frozen-lockfile`, 빌드 명령 `pnpm build`를 사용합니다. `sanghunkim.com`과 `www.kimsanghun.com`은 호스팅의 도메인 설정에서 경로를 보존하는 308 리디렉션으로 대표 도메인에 연결합니다. 프리뷰 배포의 검색 차단은 호스팅 설정에서 확인합니다.

댓글 UI·API와 MongoDB 연결·개발용 Docker 설정은 제거했습니다. DB 환경변수는 필요하지 않습니다.

## 콘텐츠와 SEO

- 포트폴리오: `src/shared/data/site-data.tsx`
- 글 원문: `src/shared/content/posts/*.mdx` (기존 URL 보존을 위해 파일명 유지)
- 원문 출처: https://velog.io/@kata/posts
- 출처·실제 수정일·본문 SHA-256: `src/shared/content/velog-sources.json`
- 검색 결과용 별도 제목·설명: `src/shared/content/seo-titles.json`, `seo-descriptions.json`

Velog 본문·코드·기존 요약은 임의로 재작성하지 않습니다. 원문은 HTML과 GFM이 섞인 Markdown으로 렌더링하며 실행 가능한 JSX로 해석하지 않습니다. 원본의 빈 이미지 주소 2곳은 그대로입니다.

홈과 글 상세는 정적으로 생성하고 하루 간격으로 재검증합니다. 목록의 query는 서버에서 처리합니다. 추천은 같은 카테고리 우선으로 서버에서 선정하고 다른 글의 본문을 브라우저에 전달하지 않습니다.

목록 페이지는 페이지별 canonical을 사용합니다. 카테고리 필터는 자체 canonical과 `noindex, follow`를 제공합니다. 잘못된 페이지 번호·없는 카테고리는 404, 명시적 `page=1`과 대문자 카테고리는 정규 주소로 308 리디렉션합니다.

배포 후 Search Console과 네이버 서치어드바이저에서 `/sitemap.xml`을 제출하고 대표 URL을 검사합니다. 계정 연결·색인 결과·실사용 Core Web Vitals는 로컬 검사로 확인할 수 없습니다.

## 검증

```bash
pnpm run check
pnpm run test:e2e
```

`check`는 라우트 타입 생성, strict TypeScript 검사, 원문·코드 보존 및 URL·직렬화 회귀 검사, 프로덕션 빌드를 수행합니다. 브라우저 검사는 빌드 후 로컬 서버를 자동 실행합니다. 로컬에서는 설치된 Chrome을 사용하고, CI에서는 Playwright Chromium을 설치합니다.

브라우저 검사는 50개 글, 모바일 페이지네이션, 테마 저장, 목차·코드 복사, 잘못된 URL, 제거한 댓글 API, sitemap·RSS·OG·이미지 최적화를 확인합니다. GitHub Actions에서도 같은 검사를 수행합니다.

폰트 파일의 라이선스는 `public/fonts/OFL.txt`에 있습니다. OG 이미지는 외부 폰트 다운로드 없이 생성됩니다.

전체 개선·검증 결과와 보류 사항은 [검증 기록](docs/validation.md)에 있습니다. 운영 의존성 보안 경고는 0건이며, 수정 버전이 미배포된 개발용 `braces` 경고 1건은 해당 문서에서 추적합니다.
