### TODO

- ~~Interceptor로 라우팅 벗어나는거 캐치~~
- ~~filter, sort 다시 구현~~
- ~~posts 우측 탭 구현~~
- ~~posts 목차 탭 맨 위, 만 아래 버그 수정~~
- ~~recommend.tsx 해결 - 서버컴포넌트와 클라이언트컴포넌트 분리~~
- ~~import 경로 @로 수정~~
- ~~캐싱 다시 한번~~
- ~~폴더 구조 변경~~
- ~~MySQL에서 MongoDB로 변경~~
- middleware.ts 수정
- Nextjs 버전 올려야 됨 (보안이슈)
- 추천게시물 캐러셀로 변경
- RESTful API로 수정 (경로 지금 뭔가 좀 애매함)
- 메타데이터 제네레이터 수정 (이게 SEO의 꽃인거같은데 어렵다)
- baseUrl 수정 및 배포 (이건 뭐.. 금방할듯 Vercel말고 AWS라 CloudFlare 생각 중)
- 댓글 github auth (깃헙 auth로 댓글 달수있게)
- 게시글 플랫폼 공유 (위하고 비슷)
- 다크모드 수정
- Type, Interface 정의 제대로
- 핸드폰으로 볼 때 반응형 적용 (적응형인듯?)
- css 공통화 (퍼블리싱...이런1)
- UIUX 생각 (퍼블리싱...이런2)
- 폴더 구조 md 다시
- favicon 수정 (급하지 않음)
- Light House 성능 개선 (최후의 보루)

### MongoDB Command

```sh
docker container exec -it MONGODB_CONTAINER bash
mongosh
show dbs
use DATABASE_NAME
show collections
db.COLLECTION_NAME.find() (.pretty())
db.COLLECTION_NAME.find(OBJECT)
```

### Directory Structure (미완)

```PlainText
project-root/
├── app/                               - App Router의 기본 디렉터리
│   ├── (main)/                        - 라우팅 그룹화
│   │   ├── career/
│   │   │   └── page.tsx               - career 페이지
│   │   │── contact/
│   │   │   └── page.tsx               - contact 페이지
│   │   ├── posts/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx           - posts 상세 페이지
│   │   │   └── page.tsx               - posts 목록 페이지
│   │   ├── projects/
│   │   │   ├── [projectId]/
│   │   │   │   └── page.tsx           - projects 상세 페이지
│   │   │   └── page.tsx               - projects 목록 페이지
│   │   ├── layout.tsx                 - main 서비스 레이아웃
│   │   └── page.tsx                   - main 페이지
│   ├── api/
│   │   ├── og/
│   │   │   └── route.tsx              - OG API 라우트
│   │   ├── posts/
│   │   │   └── [postId]/              - [미완]
│   │   └── rss/
│   │       └── route.tsx              - RSS API 라우트
│   ├── favicon.ico
│   ├── layout.tsx                     - 루트 레이아웃
│   └── not-found.tsx                  - 404 페이지
├── components/
│   ├── layouts/
│   ├── markdown/
│   ├── posts/
│   ├── providers/
│   └── ui/
├── config/
├── content/
├── database/
├── lib/
├── public/
│   ├── fonts/
│   └── images/
├── styles/
│   └── globals.css
├── utils/
│   └── globals.css
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
