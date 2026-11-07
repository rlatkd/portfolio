<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

작업 기준의 원본은 `CLAUDE.md`다. 이 파일은 다른 에이전트(Codex 등)가 먼저 지킬 요점만 모은 요약이다. 둘이 다르면 `CLAUDE.md`를 따른다. 이 파일도 `CLAUDE.md` `0. 문서 작성 규칙`의 형식을 따른다(현재 상태만, 날짜 절 없음, 해당 줄을 직접 고침).

- **두 문서는 함께 고친다.** 이 파일을 고치면 같은 작업에서 `CLAUDE.md`도 같은 방향으로 갱신하고, `CLAUDE.md`를 고치면 이 파일의 해당 요점도 갱신한다.

## 시작할 때

- 로컬 작업을 시작할 때 `port/INDEX.md`가 있으면 먼저 읽고, 그 안의 안내에 따라 필요한 문서만 연다. `port/`의 내용은 공개 문서 · 코드 · 커밋 메시지에 옮기지 않는다.
- 사용자가 정정한 사실과 이미 답한 질문을 다시 묻지 않고, 사용자의 최신 지시를 우선한다.
- 작업 인계는 `port/handoff/YYYY-MM-DD.md`로 한다. 시작할 때 가장 최근 파일을 읽고, 파일을 바꾸는 작업을 하나 마칠 때마다 오늘 날짜 파일을 갱신한다. 형식과 보류 넘기기 규칙은 `CLAUDE.md` `1. 작업 원칙` · `10. 보류 항목`을 따른다.

## 작업 원칙

- 커밋 · 푸시는 사용자가 직접 한다. 커밋 메시지는 항상 한 줄 `type: 설명`이다(본문 없음).
- 커밋 여부를 말하기 전에 `git status` · `git log`로 먼저 확인한다. 사용자는 알리지 않고 커밋하므로 미커밋이라고 가정하지 않는다.
- 기능 · 페이지 · 파일을 폐기할 때는 코드 · 설정 · 테스트 · 정적 파일 · 세 문서(`CLAUDE.md` · `AGENTS.md` · `README.md`)에서 관련된 것을 모두 찾아 함께 폐기하고, 저장소 전체 검색으로 남은 언급이 없는지 확인한다.
- 수정 지시는 지시한 범위에만 적용한다. 보고한 목록은 따로 승인받기 전까지 손대지 않는다.
- 사용자에게 진행 여부나 의사결정이 필요한 작업 목록을 낼 때는 항상 `1.` `2.` `3.` 오름차순 번호 목록으로 쓴다(체크박스 · 글머리표 · 표로 대신하지 않는다). 한 번의 답변에는 5개까지만 쓰고, 나머지는 남은 개수만 알린 뒤 요청받으면 다음 5개를 보고한다.
- 공개 저장소다. 지원한 회사 이름이나 내부 수치를 문서와 코드에 쓰지 않는다.
- 문서에 대화를 그대로 인용하거나 대화를 근거로 남기지 않는다. 규칙과 사실만 중립적인 문장으로 쓴다.

## 코드 · 디자인

- 화면은 VS Code 편집기 모양이고 기본 테마는 다크다. 색은 `styles/global.css`의 시맨틱 토큰만 쓴다.
- 영역은 `src/shared/ui/pane.tsx`, 탭 영역은 `src/shared/ui/pane-tabs.tsx`를 쓴다. 떠 있는 버튼은 `src/shared/ui/floating-button.ts`의 동그란 반전 무채색 버튼(바탕 `--fg-strong`, 아이콘 `--bg`)을 쓴다.
- 화면 정렬 숫자는 `global.css`의 CSS 변수로만 바꾼다: 아래 정렬 `--bottom-mask` 등, 떠 있는 버튼 창 끝 간격 `--floating-edge`, 홈 위쪽 정렬(사이드바 이름 글자 위 끝 = about.md 위 끝) `--sidebar-top` · `--sidebar-name-offset`.
- 문구에 긴 줄표(—)를 쓰지 않는다. 기간 `–`, 나열 `·`, 제목 구분자 `|`.
- 파일 · 폴더 이름은 kebab-case.
- 코드 주석은 지금 코드가 왜 그런지만 적는다. 날짜와 변경 경위(`~로 바꿨다` · `이전에는`)는 쓰지 않는다.

## 콘텐츠

- 경력 사실의 원본은 `src/shared/data/career-data.ts`의 `work`다. 이력 서술 금지 표현은 `CLAUDE.md` `7. 이력 서술 기준`을 따른다.
- 블로그 Markdown 본문은 고치지 않는다(velog 동기화 해시). 표시 방식은 `src/shared/markdown` 렌더러에서 바꾼다.
- 이력서는 `/resume` 하나이고 9쪽이다. 인쇄 버튼 문구는 모든 화면에서 `인쇄 | PDF 저장`이다. iOS WebKit 인쇄는 쪽 높이를 내용 높이로 둔다(`global.css`). 대표 과제 아키텍처 그림 쪽은 `SHOW_TASK_ARCHITECTURE`로 숨겨 두었다.

## 글꼴

- 본문 글꼴은 Pretendard에서 사이트 글자만 남긴 `Portfolio Sans`다. OFL상 `Pretendard`라고 부르지 않는다.
- `tests/fonts.test.ts`가 실패하면 `pnpm fonts:build`를 실행한다.
- 라벨 한글은 본문 글꼴로 그린다.
- 원본 `Pretendard-*.woff`는 `assets/fonts/`에 있다(공유 카드 이미지와 글꼴 만들기 원본, 공개 경로 밖).

## 분석

- GA 시작 스크립트는 `src/shared/lib/analytics-privacy.ts`에서 고치고 `tests/analytics-privacy.test.ts`로 확인한다. 스크립트 문자열 안에 역슬래시를 직접 쓰지 않는다. 검색어 정리 대상은 `google-analytics.com`만이 아니라 `www.google.com` 등 모든 Google `/g/collect` 요청이다.

## 검증

- `pnpm run check` → `pnpm run test:e2e`. e2e는 3100 포트를 쓴다.
- 운영 점검은 `pnpm monitor`(GitHub Actions `Monitor`가 매일 실행). CSP는 보고 전용이고 위반은 `report-to` · `report-uri`로 `/api/csp-report`에 받는다(Chrome의 `report-to`는 HTTPS에서만 동작).
