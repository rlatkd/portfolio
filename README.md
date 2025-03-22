TODO

1. 메타데이터 제네레이터 수정
2. baseUrl 수정 및 배포
3. UIUX 생각
4. Light House 성능 개선
5. 핸드폰으로 볼 때 반응형 적용
6. 다크모드 수정
7. css 공통화
8. import 경로 @로 수정

MongoDB 명령어

```
docker container exec -it MONGODB_CONTAINER bash
mongosh
show dbs
use DATABASE_NAME
show collections
db.COLLECTION_NAME.find() (.pretty())
db.COLLECTION_NAME.find(OBJECT)
```


폴더 구조 변경

```
project-root/
├── app/                    # App Router의 기본 디렉토리
│   ├── (auth)/             # 그룹화된 라우트 (선택적)
│   │   ├── login/          # /login 경로
│   │   │   └── page.tsx    # 로그인 페이지
│   │   └── register/       # /register 경로
│   │       └── page.tsx    # 회원가입 페이지
│   ├── api/                # API 라우트
│   │   └── [...]/route.ts  # API 엔드포인트
│   ├── blog/               # 블로그 관련 페이지
│   │   ├── [slug]/         # 동적 라우트
│   │   │   └── page.tsx    # 블로그 상세 페이지
│   │   └── page.tsx        # 블로그 목록 페이지
│   ├── _components/        # 앱 전체에서 사용하는 컴포넌트 (프라이빗)
│   ├── error.tsx           # 에러 처리 컴포넌트
│   ├── layout.tsx          # 루트 레이아웃
│   ├── loading.tsx         # 로딩 상태 컴포넌트
│   ├── not-found.tsx       # 404 페이지
│   └── page.tsx            # 홈페이지
├── components/             # 전역 공유 컴포넌트
│   ├── ui/                 # UI 컴포넌트 (버튼, 카드 등)
│   └── layout/             # 레이아웃 관련 컴포넌트
├── lib/                    # 유틸리티 함수, 설정 등
│   ├── utils.ts            # 유틸리티 함수
│   └── constants.ts        # 상수
├── hooks/                  # 커스텀 훅
├── contexts/               # React 컨텍스트
├── types/                  # 타입 정의
├── styles/                 # 전역 스타일
│   └── globals.css
├── public/                 # 정적 파일
│   ├── images/
│   └── fonts/
├── middleware.ts           # 미들웨어
├── next.config.js          # Next.js 설정
├── tailwind.config.js      # Tailwind CSS 설정
├── tsconfig.json           # TypeScript 설정
└── package.json
```