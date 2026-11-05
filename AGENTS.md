<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 토스 특별전형 이력서 작업 재개

`port/toss/20261031`의 이력서·주요 과제 작성이나 이 세션의 후속 작업을 이어갈 때는 먼저 `port/toss/20261031/세션인계_메모.md`를 읽는다. 사용자가 정정한 사실, 이미 답한 질문, 현재 산출물, 선호하는 대화·문서·인쇄 디자인을 보존한 프로젝트 메모리다. 기존 자료로 알 수 있는 내용을 재질문하거나 과제 작성 대화를 면접 준비·웹 개발로 확대하지 않는다. 사용자의 최신 지시를 우선한다.

## 2026-11-01 갱신

- 이력서는 `/resume` 하나다(`/resume2`는 `/resume`로 리다이렉트). 위의 세션인계 메모에서 말하는 "resume2"는 지금의 `/resume`를 뜻한다.
- 문서는 덮어쓰지 않고 날짜를 붙인 절을 추가해 갱신한다. 커밋은 사용자가 직접 한다.

## 2026-11-02 갱신

- 디자인·구조의 최신 기준은 `CLAUDE.md`의 `2026-11-01 디자인 갱신`·`2026-11-02 갱신` 절이다. 그보다 위에 있는 네이비·골드·크림 색, `Section` 래퍼, `Writing` 위젯 설명은 과거 내용이다.
- 화면은 VS Code 편집기 모양이다. 색은 `styles/global.css`의 시맨틱 토큰만 쓰고 하드코딩하지 않는다. 기본 테마는 다크다.
- 홈·블로그의 영역은 `src/shared/ui/pane.tsx`(파일 탭 머리), 탭으로 나뉜 영역은 `src/shared/ui/pane-tabs.tsx`를 쓴다.
- 화면 문구와 메타 문구에 긴 줄표(—)를 쓰지 않는다. 기간은 `–`, 나열은 `·`, 제목 구분자는 `|`다.
- 블로그 글 Markdown 본문은 고치지 않는다. velog 동기화가 본문 해시(`velog-sources.json`)로 변경을 막는다. 표시 방식은 렌더러(`src/shared/markdown`)에서 바꾼다.
- 문서는 날짜를 붙인 절을 추가해 갱신하고, 커밋은 사용자가 직접 한다.

## 2026-11-04 갱신

- 변경 내역은 `CLAUDE.md`의 `2026-11-04 갱신` 절에 있다.
- 본문 글꼴은 Pretendard에서 사이트 글자만 남긴 `Portfolio Sans`다. OFL상 이 글꼴을 `Pretendard`라고 부르지 않는다. 새 글자가 생겨 `tests/fonts.test.ts`가 실패하면 `pnpm fonts:build`를 실행한다.
- 화면 아래 정렬 숫자는 `styles/global.css`의 CSS 변수(`--bottom-mask` 등)로만 바꾼다.
- GA 측정 요청에서 검색어를 지우는 코드는 `src/shared/ui/production-analytics.tsx`에 있다. GA를 다른 방식으로 바꿀 때 같이 확인한다.
- 이력서를 일부러 바꿨다면 `pnpm exec playwright test resume-visual --update-snapshots=all`로 화면 비교 기준 그림을 다시 만든다.

## 2026-11-05 갱신

- 변경 내역은 `CLAUDE.md`의 `2026-11-05 갱신` 절에 있다.
- 라벨 한글은 본문 글꼴(Portfolio Sans)로 그린다. 나눔고딕코딩은 쓰지 않는다.
- GA 시작 스크립트는 `src/shared/lib/analytics-privacy.ts`에서 고치고 `tests/analytics-privacy.test.ts`로 확인한다. 스크립트 문자열 안에 역슬래시를 직접 쓰지 않는다.
- 이력서 화면 비교 테스트는 지웠다(위 11-04 절의 기준 그림 다시 만들기 안내는 과거 내용).
- 세션 인계 메모(11-04~05 작업 · 보류 항목 · about.md 문구 고민 · 다음 작업 논의 거리)는 `port/portfolio/20261105/세션인계_메모.md`에 있다(저장소에 올라가지 않음). 이어서 작업할 때 먼저 읽는다.
