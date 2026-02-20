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

3. **오른쪽 여백 문제 해결** (`src/app/layout.tsx`, `styles/global.css`)
   - 모바일에서 `max-w-6xl` 제한 제거 (데스크톱에서만 적용)
   - html에 `overflow-x: hidden` 추가

### 2026-02-21 (KST): 페이지 레이아웃 통일
1. **모든 페이지 레이아웃统一** (`src/app/(main)/*/page.tsx`)
   - 메인 페이지와 동일하게 `max-w-4xl mx-auto px-4 md:px-0` 패턴 적용
   - 수정된 파일:
     - `posts/[slug]/page.tsx`: w-4/6 → max-w-4xl
     - `posts/page.tsx`: px-4 md:px-0 추가
     - `projects/page.tsx`: px-4 md:px-0 추가
     - `projects/[projectId]/page.tsx`: w-4/6 → max-w-4xl
     - `career/page.tsx`: 레이아웃 클래스 추가
     - `contact/page.tsx`: 레이아웃 클래스 추가

### 2026-02-20 (KST): TOC 스크롤 위치 이동 수정
1. **TOC 위치 이동 구현** (`src/entities/Post/ui/TableOfContents.tsx`)
   - 헤더 스크롤 위치에 따라 TOC가 위아래로 움직이도록 수정
   - `tocTranslate` 상태 추가 및 `checkNavigationVisibility` 로직 변경
   - 헤더가 화면에서 사라지면 TOC도 따라내려오고, 나타나면 원래 위치로 복귀
   - 后来改为opacity만 변경, 위치 이동 제거

2. **TOC 컨테이너 수정** (`src/app/(main)/posts/[slug]/page.tsx`)
   - sticky → fixed로 변경하여 자유로운 위치 이동 가능
   - 모바일에서는 숨기고 데스크톱에서만 표시 (`hidden md:block`)
   - 우측 위치 조정을 위해 `right-[max(0px,calc(50%-640px))]` 사용
   - 상단 위치 `top-28`로 조정

## 작업 규칙 (Rule)
- 코드 수정/추가 작업이 끝날 때마다, 변경 사항을 AGENTS.md의 "현재 작업 내용" 섹션에 날짜와 함께 기록할 것
- 수정된 파일 경로와 간단한 내용을 요약하여 기록할 것
- 날짜는 대한민국 표준시 (KST, UTC+9) 기준으로 기재할 것
- 코드 수정 시 발견된 추가 개선점이 있으면 "다음 작업" 섹션에 자동 기록할 것
- 사용자가 명시적으로 커밋을 요청하면, 작업 내용을 요약한 커밋 메시지를 작성할 것 (예: feat: 모바일 헤더 메뉴 추가)
- 커밋 메시지는 conventional commits 형식遵循: `type: description`
- 사용자가 명시적으로 push를 요청하면 main branch로 push할 것

