import type { PublicProfile, Project } from '@/shared/types/portfolio';

// 포트폴리오 콘텐츠: port/main/이력서_김상훈.html 및 사용자 확인 내용 기준.
// 업무 명칭·기간·수치는 이 파일에서 관리하고 기존 컴포넌트가 표시한다.

export const profile: PublicProfile = {
  name: '김상훈',
  nameEn: 'Sanghun Kim',
  role: 'Software Engineer',
  intro: '데이터 정합성과 시스템 신뢰성을 먼저 두는\n금융 도메인 소프트웨어 엔지니어입니다.',
  email: 'rlatkdgns042@naver.com',
  location: '대한민국 서울특별시 성동구',
  github: 'https://github.com/rlatkd',
  githubLabel: 'github.com/rlatkd',
  linkedin: 'https://linkedin.com/in/sanghunkim96',
  linkedinLabel: 'linkedin.com/in/sanghunkim96',
  velog: 'https://velog.io/@kata',
  velogLabel: 'velog.io/@kata',
};

export const aboutIntro = [
  // 2026-11-01: 사용자가 직접 쓴 개발자 소개. 이력서 문장과 달리 관점 위주로 쓴다.
  'Spring Boot와 Vue.js로 서비스를 개발하고 운영하면서 데이터 정합성과 시스템 안정성을 고민해 왔습니다.',
  '문제를 풀 때는 기존 구조와 제약을 먼저 이해하고 다른 시스템에 주는 영향을 줄이는 쪽을 택합니다.',
];

// About 문단에서 진하게 표시할 문구 (2026-11-01: 현재 소개 문단 기준으로 갱신)
export const aboutKeyTerms = ['데이터 정합성과 시스템 안정성', '다른 시스템에 주는 영향을 줄이는 쪽'];

// 2026-11-02: 홈 experience '기술' 탭. 이력서 기술 스택 중 큰 항목만 고른 것(실무가 아닌 것 포함).
// 검색엔진용 인물 정보의 knowsAbout도 이 목록을 그대로 쓴다(화면에 보이는 것만).
export const majorSkills = [
  { label: 'AI', items: ['Claude Code', 'Codex', 'OpenCode'] },
  { label: 'Collaboration', items: ['Jira', 'Confluence', 'Slack', 'Notion'] },
  { label: 'Language', items: ['Java', 'JavaScript', 'TypeScript', 'Python'] },
  { label: 'Framework', items: ['Spring Boot', 'FastAPI', 'Vue.js', 'React', 'Next.js'] },
  { label: 'Etc', items: ['Oracle', 'Kafka', 'Elasticsearch', 'Kubernetes', 'AWS'] },
];

// 그 외 담당 과제 (이력서 03 Track Record) — 최신순
export const trackRecord = [
  {
    period: '2026.09 — 2026.10',
    title: 'Sparrow SAST · 정적 분석으로 발견한 취약점 대응',
    service: '-',
  },
  {
    period: '2026.08',
    title: '자동재결제 배치 실행 중 결제수단 변경 시 결제수단 동기화 처리',
    service: 'CMS+',
  },
  {
    period: '2026.07',
    title: '가상계좌 결제 결과반영 배치 수행 시 당일 입금취소 분기 신설',
    service: 'CMS+',
  },
  {
    period: '2026.04',
    title: 'SMS 발송 및 원생 신규 등록 시 불필요한 예약어 검증 제거',
    service: 'iBill',
  },
  {
    period: '2026.02',
    title: '지급대행 플랫폼 구축 · 테이블, 엔티티 설계 및 비즈니스 로직 구현',
    service: 'Admin',
  },
  {
    period: '2026.01',
    title: '비회원 결제 정보 표기 방식 개선 및 API 스펙 통일',
    service: 'CMS+',
  },
  {
    period: '2025.12',
    title: '청구 내역 조회 시 Offset에서 Cursor 방식으로 전환',
    service: 'CMS+',
  },
  {
    period: '2025.11',
    title: '신규 결제상태 환불 추가 및 관련 결제 로직 전반 수정',
    service: 'CMS+',
  },
  {
    period: '2025.11',
    title: '대량 인쇄 페이지 캐싱 적용을 통한 렌더링 개선',
    service: 'Connect',
  },
  {
    period: '2025.10',
    title: '사용자 이벤트 중복 방지를 위한 공용 컴포넌트 생성',
    service: 'CMS+',
  },
  {
    period: '2025.10',
    title: 'PreparedStatement 전환을 통한 SQL Injection 대응',
    service: '-',
  },
  {
    period: '2025.09',
    title: '통계 서비스 구축 및 수납률 리포트 신설',
    service: 'CMS+',
  },
  {
    period: '2025.08',
    title: '청구/결제 분기별 가상계좌 예금주명 불일치 개선',
    service: 'CMS+',
  }
];

export const projects: Project[] = [
  {
    id: 'up-quant',
    summary: '시장 분석·포트폴리오 구성·전략 검증을 연결한 개인 프로젝트입니다. Python·FastAPI로 개발하고 AWS 배포와 CI/CD를 구성했습니다.',
    title: '암호화폐 퀀트 분석 대시보드',
    context: '개인 프로젝트 · 2026.05 – 2026.07',
    badge: 'Claude Code',
    points: [
      '검증하기 어려운 가격 예측 대신 시장 흐름과 투자 위험을 데이터로 보여 주는 분석으로 방향을 정했습니다.',
      'Claude Code에 개발·분석·디자인·기획 관점의 전수 리뷰를 맡기고 Codex로 교차 검토해 반영할 항목을 직접 골랐습니다.',
      '교차 검토 과정에서 가격끼리 비교해 상관관계가 부풀려지던 계산과 미래 데이터가 섞인 백테스트를 찾아 바로잡았습니다.',
      '시장 상황 판별 모델이 거의 매일 판정을 바꾸는 문제를 확인하고 입력 지표를 보강해 199일 중 9번으로 안정시켰습니다.',
      '백그라운드 캐시 갱신이 외부 API 호출 한도를 먼저 차지해 사용자 요청이 약 31초 밀리던 문제를 요청 우선 처리로 해결했습니다.',
    ],
    tags: ['FastAPI', 'Python', 'React', 'TypeScript', 'WebSocket', 'AWS'],
    href: 'https://github.com/rlatkd/up-quant',
    image: '/images/up-quant/preview.png',
  },
  {
    id: 'portfolio',
    summary: 'Next.js App Router 기반 포트폴리오와 Markdown 기술 블로그입니다. DB 없이 파일 기반 콘텐츠를 제공하고 SEO와 콘텐츠 검증을 자동화했습니다.',
    title: '포트폴리오',
    context: '개인 프로젝트 · 2024.11 – 현재',
    points: [
      'Next.js App Router 기반 포트폴리오와 Markdown 기술 블로그를 개발했습니다.',
      'DB 없이 파일 기반 콘텐츠를 제공하며, 라이트·다크 테마와 반응형 화면을 구성했습니다.',
      '글 검색·카테고리 필터·목차 탐색을 제공하고, 페이지별 메타데이터·사이트맵·RSS를 구성했습니다.',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Markdown', 'Playwright'],
    href: 'https://github.com/rlatkd/portfolio',
    image: '/images/portfolio/preview.png',
  },
  {
    id: 'cms-plus',
    summary: '4인 교육 팀 프로젝트에서 아키텍처·인프라 설계와 결제·상품·배치 개발을 맡았습니다. Kafka 부하 테스트로 5만 건 처리 시간을 12초에서 7초로 줄였습니다.',
    title: '자동 청구·결제 시스템',
    context: '팀 프로젝트 4인 · 아키텍트 · 2024',
    points: [
      '시스템·인프라 설계와 결제·상품·배치 기능 개발을 맡았습니다. Main·Payment·Messaging·Batch는 ECS Fargate에, Analysis는 별도 서버에 배포했습니다.',
      'Kafka 브로커 3대와 Zookeeper 앙상블을 구성했습니다. 결제 요청·결제 결과·메시징 토픽을 분리하고, 파티션 복제와 Consumer Group을 구성해 비동기로 처리했습니다.',
      'batch.size·linger.ms 조합별 부하 테스트와 3D 그래프 비교로 Kafka 설정을 조정해, 5만 건 처리 시간을 12초에서 7초로 단축했습니다.',
      'Logback·Kafka·Logstash·Elasticsearch·Kibana로 서버 로그를 모아 조회하고, Prometheus·Grafana로 메트릭을 모니터링했습니다. GitHub Actions CI/CD와 Jira·Slack 연동도 구성했습니다.',
    ],
    tags: ['React', 'Spring Boot', 'Spring Batch', 'Kafka', 'ECS Fargate', 'ELK'],
    href: 'https://github.com/rlatkd/cms-plus',
    image: '/images/cms-plus/screen.png',
  },
  {
    id: 'sale-sync',
    summary: '매장·상품·주문·매출을 서비스별로 분리한 4인 교육 팀 프로젝트입니다. 서비스별 DB 분리와 Kafka 기반 비동기 통신을 구성했습니다.',
    title: 'MSA 기반 웹 POS 서비스',
    context: '팀 프로젝트 4인 · 프론트엔드 리드 · 2024',
    points: [
      '매장·상품·주문·매출·대시보드·컨설팅을 서비스별로 분리한 웹 POS입니다. 각 서비스의 DB를 분리하고 AWS EKS에 배포했습니다.',
      'GitHub Actions에서 이미지를 빌드해 ECR에 저장하고 Argo CD로 배포했습니다. Terraform으로 인프라를 관리하며 S3·DynamoDB를 상태 저장과 잠금에 사용했습니다.',
      'Kafka 기반 비동기 통신과 OpenAI API를 이용한 매출 컨설팅을 구성했습니다. 로그는 EFK에서 조회하고 메트릭은 Prometheus·Grafana로 모니터링했습니다.',
    ],
    tags: ['React', 'MSA', 'EKS', 'Argo CD', 'Terraform', 'Kafka', 'AWS'],
    href: 'https://github.com/rlatkd/sale-sync',
    image: '/images/sale-sync/screen.png',
  },
  {
    id: 'liver-tumor-cnn',
    summary: '간 CT 4,325장으로 LeNet5·AlexNet·VGG19·ResNet50의 종양 유무 분류 성능을 비교한 학부 졸업논문입니다. VGG19의 검증 정확도가 99.3%로 가장 높았습니다.',
    title: '간종양 CNN 분류 모델 비교',
    context: '학부 졸업논문 · 2022',
    points: [
      'LiTS17 간 CT 4,325장(종양 2,472 · 정상 1,853)을 1mm³ 등방성 해상도로 재샘플링하고 224×224로 조정해, 학습 90%·검증 10%로 나눴습니다.',
      'LeNet5·AlexNet·VGG19·ResNet50의 정확도·손실·학습 시간을 비교했으며, VGG19의 검증 정확도가 99.3%로 가장 높았습니다.',
      '종양 유무를 구분하는 이진 분류의 한계를 정리하고, 종양 종류를 구분하는 다중 클래스 분류를 후속 연구 과제로 제시했습니다.',
    ],
    tags: ['Python', 'Keras', 'CNN', 'VGG19', 'Medical Imaging'],
    image: '/images/liver-tumor-cnn/preview.png',
  },
  {
    id: 'ct-image-reconstruction',
    summary: 'MATLAB으로 투영 데이터와 사이노그램을 만들었습니다. 필터·보간법·투영 각도에 따른 CT 재구성 결과를 비교했습니다.',
    title: 'CT 이미지 재구성',
    context: '학부 프로젝트 · 2022',
    points: [
      'MATLAB에서 이미지 회전 함수를 구현해 각도별 투영 데이터와 사이노그램을 만들고, iradon으로 역투영해 영상을 재구성했습니다.',
      '5종 필터와 보간법을 적용한 결과를 원본 이미지와 비교하고 MSE로 평가했습니다.',
      '투영 각도 간격에 따라 재구성 영상에 나타나는 왜곡을 비교했습니다.',
    ],
    tags: ['MATLAB', 'CT Reconstruction', 'Signal Processing'],
    href: 'https://github.com/rlatkd/ct-image-reconstruction',
    image: '/images/ct-image-reconstruction/preview.png',
    imageFit: 'contain',
  },
];

// 2026-11-01: VS Code 디자인. 목차와 각 영역 머리에 파일 이름(file)으로 표시한다.
export const navItems = [
  { id: 'about', label: 'About', file: 'about.md' },
  { id: 'experience', label: 'Experience', file: 'experience/' },
  { id: 'tasks', label: 'Tasks', file: 'tasks/' },
  { id: 'projects', label: 'Side Projects', file: 'side-projects/' },
  { id: 'posts', label: 'Posts', file: 'posts/' },
  { id: 'contact', label: 'Contact', file: 'contact.md' },
];
