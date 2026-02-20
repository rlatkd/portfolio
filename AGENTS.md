# Portfolio Project

## 프로젝트 개요
- Next.js 14 기반 포트폴리오 웹사이트
- TypeScript, Tailwind CSS 사용
- 모바일 반응형 지원

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (아이콘)

## 주요 페이지/기능
- `/` - 메인 페이지 (Hero, Characteristics, Timeline, Technique, Project, Newsletter 위젯)
- `/posts` -博客列表
- `/projects` - 프로젝트 목록
- `/career` - 경력 페이지
- `/contact` - 연락처 페이지

## 현재 작업 내용

### 2026-02-20 (KST): 모바일 레이아웃 수정
1. **프로젝트 캐러셀 수정** (`src/widgets/Project/project.tsx`)
   - 모바일에서 `w-screen` → `w-full`로 변경하여 가로 오버플로우 해결
   - 모바일 카드 너비를 300px, 데스크톱 480px로 동적 조정
   - window 리사이즈 이벤트监听

2. **헤더 모바일 메뉴 추가** (`src/widgets/Header/header.tsx`)
   - 모바일에서 햄버거 메뉴(줄3개) 버튼 추가
   - 터치 시 드롭다운 메뉴出现
   - 데스크톱에서는 기존 가로 메뉴 유지

### 2026-02-20 (KST): AGENTS.md 생성 및 Rule 추가
- AGENTS.md 파일 생성 (프로젝트 개요, 기술 스택, 현재 작업 내용 기재)
- 작업 규칙 추가 (코드 수정 시 AGENTS.md에 기록)

### 2026-02-20 (KST): 모바일 가로 스크롤 및 중앙 정렬 수정
1. **가로 스크롤 방지** (`src/app/layout.tsx`, `styles/global.css`)
   - `overflow-y-scroll` → `overflow-x-hidden` 변경
   - `min-width: 360px` 제거
   - `mx-4` → `mx-auto` 변경

2. **중앙 정렬 패딩 추가** (`src/app/(main)/page.tsx`, `src/app/layout.tsx`)
   - 모바일에서 좌우 패딩 `px-4` 추가
   - 이중 패딩 문제 해결

## 다음 작업
- 모바일 환경 추가 테스트
-其它 레이아웃 이슈 수정 필요시 진행

## 작업 규칙 (Rule)
- 코드 수정/추가 작업이 끝날 때마다, 변경 사항을 AGENTS.md의 "현재 작업 내용" 섹션에 날짜와 함께 기록할 것
- 수정된 파일 경로와 간단한 내용을 요약하여 기록할 것
- 날짜는 대한민국 표준시 (KST, UTC+9) 기준으로 기재할 것
- 사용자가 명시적으로 커밋을 요청하면, 작업 내용을 요약한 커밋 메시지를 작성할 것 (예: feat: 모바일 헤더 메뉴 추가)
- 커밋 메시지는 conventional commits 형식遵循: `type: description`
- 사용자가 명시적으로 push를 요청하면 main branch로 push할 것

