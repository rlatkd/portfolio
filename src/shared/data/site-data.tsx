// 포트폴리오 콘텐츠 (실제 경력기술서/포트폴리오 기준 · 단일 소스)
// 레이아웃 구조는 restyart 참고, 색/콘텐츠는 본인 것.

export const profile = {
  name: '김상훈',
  nameEn: 'Sanghun Kim',
  role: 'Software Engineer',
  intro: '데이터 정합성과 시스템 신뢰성을 최우선으로 설계하는 금융 도메인 소프트웨어 엔지니어입니다.',
  email: 'rlatkdgns042@naver.com',
  mobile: '+82 10-2627-0378',
  location: '대한민국 서울특별시 성동구',
  github: 'https://github.com/rlatkd',
  githubLabel: 'github.com/rlatkd',
  linkedin: 'https://linkedin.com/in/sanghunkim96',
  linkedinLabel: 'linkedin.com/in/sanghunkim96',
  velog: 'https://velog.io/@kata',
  velogLabel: 'velog.io/@kata',
};

export const aboutIntro = [
  '‘왜 이렇게 동작하는가’가 논리적으로 완전히 풀리기 전에는 다음으로 넘어가지 못하는 편입니다. 그럴듯한 추측으로 덮기보다 근거와 데이터로 판단하고, 모르는 것은 모른다고 인정한 뒤 끝까지 파고듭니다.',
  '금융 도메인에서는 작은 오차 하나가 곧 사고로 이어진다고 생각합니다. 그래서 당장 동작하는 코드보다 변경에 강한 설계를, 화려한 기능보다 데이터 정합성과 시스템 신뢰성을 먼저 둡니다.',
  '동시에 구현 속도와 유지보수성 사이의 트레이드오프를 분명히 인지하려 합니다. 문제를 막아낸 뒤에도 ‘더 나은 방법은 없었는가’를 회고하며 다음 설계를 다듬습니다.',
];

export const aboutQuote = {
  text: '단 한 건의 데이터 불일치도 허용하지 않는 설계가\n금융 시스템 신뢰성의 근간입니다.',
};

// 실무 시작일 (경력 자동 계산용)
export const careerStart = '2024-09-01';

export const stats = [
  { value: '5', label: '담당 서비스' },
  { value: '2', label: '실무 프로젝트' },
  { value: '2', label: '자격증' },
];

export type Strength = {
  title: string;
  desc: string;
  tags: string[];
  detail: {
    period?: string;
    problem: string;
    solution: string;
    impact: string;
    insight: string;
  };
};

export const strengths: Strength[] = [
  {
    title: '동시성 제어 & 데이터 정합성',
    desc: '멀티스레드 배치에서 ConcurrentHashMap 기반 Thread-safe 저장소로 레이스 컨디션을 해결하고 데이터 유실률을 80% 개선했습니다.',
    tags: ['ConcurrentHashMap', 'Spring Batch', 'Thread-safe'],
    detail: {
      period: '2026.02 · 효성에프엠에스 CMS+',
      problem:
        '대량의 요금 청구·정산이 멀티스레드 비동기 배치로 집중되는 환경에서, 레이스 컨디션으로 결제 데이터가 누락·중복 처리되는 심각한 데이터 정합성 훼손이 발생했습니다.',
      solution:
        'ConcurrentHashMap 기반의 Thread-safe한 커스텀 로컬 저장소를 설계·구현했습니다. 각 스레드가 처리 상태를 독립적으로 관리하고, 처리 완료·실패 지점을 정확히 기록하는 동시성 제어 로직을 추가했습니다.',
      impact:
        '동시성 이슈로 인한 배치 데이터 유실률을 80% 개선했습니다. 장애 시 실패 지점을 즉시 추적할 수 있어 운영 담당자의 수동 보정 리소스를 완전히 제거했습니다.',
      insight:
        '커스텀 저장소로 해결했으나, Spring Batch의 JobExecutionContext 등 프레임워크 자체 메커니즘을 깊이 활용했다면 더 견고했을 것이라는 점을 깨달았습니다.',
    },
  },
  {
    title: 'MSA 장애 격리 & 복원력',
    desc: 'AOP 기반 보상 트랜잭션으로 타 서비스 장애 시에도 결제 정합성을 자동 보장하고 장애성 VoC를 제거했습니다.',
    tags: ['AOP', '보상 트랜잭션', 'Saga Pattern'],
    detail: {
      period: '2025.10 · 효성에프엠에스 CMS+',
      problem:
        '내부 4개 마이크로서비스와 실시간 동기 통신을 수행하는 환경에서, 타 서비스 장애 시 화면에는 "결제 완료"로 노출되나 실제 데이터는 결제되지 않는 불일치가 발생해 치명적인 고객 VoC를 유발했습니다.',
      solution:
        'AOP로 내부 API 통신 실패 지점을 인터셉트하고, 트랜잭션 보상 및 결제 상태 롤백 로직을 설계·구현했습니다. 장애 발생 시 자동으로 후속 보상 트랜잭션이 실행되도록 했습니다.',
      impact:
        '네트워크 장애 발생 시에도 결제 데이터 정합성을 자동으로 보장했습니다. 장애성 고객 VoC가 획기적으로 감소하고 수작업 보정 리소스를 완전히 제거했습니다.',
      insight:
        '빠른 구현을 위해 AOP를 택했으나, 결합도를 낮추고 모니터링 가시성을 높이려면 Resilience4j 기반 Circuit Breaker가 더 적절함을 파악했습니다.',
    },
  },
  {
    title: '도메인 주도 설계 & 레거시 개선',
    desc: '결합도 높은 레거시의 비즈니스 규칙을 도메인 레이어로 분리하고 계층 책임을 재정의해 변경 영향 범위를 최소화했습니다.',
    tags: ['DDD', '리팩토링', '계층 설계'],
    detail: {
      period: '2025.12 · 효성에프엠에스 Connect',
      problem:
        '하나의 메서드에 수많은 로직이 결합된 레거시 환경에서 신규 기능 추가 시 사이드 이펙트가 빈번했습니다.',
      solution:
        '비즈니스 규칙을 도메인 레이어로 분리하고 계층 간 책임을 재정의했습니다.',
      impact:
        '신규 피처 개발 속도가 증가하고 배포 후 장애 리스크가 감소했습니다.',
      insight:
        '리팩토링 시 단위 테스트 부재의 위험성을 체감하여, 이후 주요 로직에 테스트 코드를 먼저 작성한 뒤 리팩토링하는 방식으로 프로세스를 개선했습니다.',
    },
  },
  {
    title: 'DB 성능 & 쿼리 튜닝',
    desc: '실행 계획 분석, 불필요한 JOIN 제거, 인덱스 최적화, Cursor 페이지네이션으로 배치 처리를 38초에서 4초로 단축했습니다.',
    tags: ['Oracle', '인덱스 최적화', 'Cursor Pagination'],
    detail: {
      period: '2025.12 · 효성에프엠에스 Connect',
      problem: '비효율적인 쿼리로 주요 조회 화면의 응답 지연이 발생했습니다.',
      solution:
        '쿼리 실행 계획을 분석해 불필요한 JOIN을 제거하고 인덱스를 최적화했으며, Cursor 기반 페이지네이션을 적용했습니다.',
      impact: '주요 조회 화면 렌더링 응답 속도가 대폭 개선되고, 배치 처리 시간을 38초에서 4초로 단축했습니다.',
      insight: '직관이 아닌 실행 계획·측정 기반의 최적화가 성능 개선의 핵심임을 다시 체감했습니다.',
    },
  },
  {
    title: '대용량 비동기 처리',
    desc: 'Kafka 기반 메시지 큐로 동기식 Back-pressure 한계를 극복하고, batch.size·linger.ms 튜닝으로 처리 성능을 70% 높였습니다.',
    tags: ['Apache Kafka', '비동기', '성능 튜닝'],
    detail: {
      period: '2024.08 · 사이드 프로젝트 (cms-plus)',
      problem:
        '피크 타임에 수만 건의 청구서를 동시 발송할 때 외부 API 처리 지연이 스레드 고갈·커넥션 타임아웃으로 전파되는 문제가 있었습니다.',
      solution:
        '동기식 의존성을 끊고 Kafka 기반 비동기 메시지 큐로 전환했습니다. 메시지를 Batch 단위로 묶어 네트워크 왕복 비용을 최소화했습니다.',
      impact:
        '외부 시스템 장애 시에도 메인 서버의 안정적 응답성을 확보했고, batch.size·linger.ms 튜닝으로 5만 건 처리를 12초에서 7초로 단축(약 70%↑)했습니다.',
      insight:
        '기본 설정으로는 처리량이 극대화되지 않아, 직관이 아닌 데이터 기반(3D 그래프 시각화) 파라미터 튜닝으로 최적 균형점을 도출했습니다.',
    },
  },
  {
    title: '보안 & 인증',
    desc: 'PreparedStatement 전환으로 SQL Injection 취약점을 차단하고, JWT·OAuth 2.0 기반 외부 연동 인증을 설계·구현했습니다.',
    tags: ['Spring Security', 'JWT', 'OAuth 2.0'],
    detail: {
      period: '2024.09 — 2025.06 · 효성에프엠에스 CMS+',
      problem:
        '동적 쿼리의 SQL Injection 취약점이 존재했고, 수기·오프라인 중심 전자계약은 휴먼 에러와 컴플라이언스 리스크가 있었습니다.',
      solution:
        'PreparedStatement 전환으로 인젝션을 차단하고, JWT·OAuth 2.0 기반 외부 연동 API와 자체 전자서명 링크 시스템을 설계·구현했습니다.',
      impact:
        'SQL Injection 취약점을 완전히 차단하고, 전자계약 프로세스를 전면 디지털화하며 데이터 처리 속도를 30% 이상 향상시켰습니다.',
      insight: '보안은 기능 완성 후가 아니라 설계 단계에서 기본값으로 두어야 한다는 원칙을 체득했습니다.',
    },
  },
];

export const experience = [
  {
    period: '2026.03 — 현재',
    role: '퀀트응용경제학과 · 석사 재학',
    org: '성균관대학교 일반대학원',
    desc: '퀀트 금융, 시계열 분석, 딥러닝을 연구하고 있습니다.',
    points: [],
    tags: [],
  },
  {
    period: '2024.09 — 현재',
    role: 'Backend Engineer · 효성에프엠에스',
    org: '개발팀 (Application Platform) · 선임',
    desc: '채널계 백엔드·프론트엔드 개발 및 운영. CMS+(통합 PG 결제)·Customer API·Square(정기 배송)·Ibill(교육비 수납)·Connect(Core계 웹뷰)를 담당합니다.',
    points: [
      '멀티스레드 배치 동시성 제어로 데이터 유실률 80% 개선 (ConcurrentHashMap Thread-safe 저장소)',
      'AOP 기반 보상 트랜잭션으로 MSA 결제 정합성 자동 보장, 장애성 고객 VoC 제거',
      '도메인 모델 기반 레거시 리팩토링·인덱스 최적화로 배치 처리 38초 → 4초 단축',
      '신규 전자계약 시스템 MVP~v2 설계·구축 (Spring Batch, JWT/OAuth 2.0, 처리 속도 30%↑)',
    ],
    tags: ['Spring Boot', 'Spring Batch', 'Oracle', 'MyBatis', 'AOP', 'JWT'],
  },
  {
    period: '2024.02 — 2024.08',
    role: 'MSA Full Stack 개발 전문가 양성 과정',
    org: '한국소프트웨어산업협회 · 960h',
    desc: '대용량 자동 청구/결제 시스템을 4인 팀으로 구축하며 아키텍처 설계와 성능 최적화를 주도했습니다. 파이널 프로젝트 최우수상·우수 수료.',
    points: [
      'Kafka 기반 비동기 메시지 큐 아키텍처로 전환해 외부 장애 시에도 응답성 확보',
      '데이터 기반 파라미터 튜닝으로 5만 건 처리 12초 → 7초 (약 70% 향상)',
      'ECS 기반 MSA 구축, Prometheus·Grafana 연동으로 실시간 관측성 확보',
    ],
    tags: ['Kafka', 'Spring Boot', 'ECS', 'Elasticsearch', 'Grafana'],
  },
  {
    period: '2023.08 — 2024.02',
    role: '클라우드 엔지니어 양성 과정',
    org: '㈜신세계아이앤씨 · 920h',
    desc: 'AWS·Docker·Kubernetes 기반 클라우드 인프라와 컨테이너 오케스트레이션, IaC를 학습하고 실습했습니다.',
    points: [
      'Docker·Kubernetes 컨테이너 오케스트레이션 및 AWS 인프라 구성',
      'Terraform 기반 IaC, CI/CD 파이프라인 실습',
    ],
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    period: '2018.03 — 2023.02',
    role: '생체의공학과 · 학사 졸업',
    org: '경희대학교',
    desc: '논문: Comparative Study of CNN Models for Liver Tumor Image Classification (2022)',
    points: [],
    tags: [],
  },
];

export const projects = [
  {
    title: '암호화폐 퀀트 분석 대시보드',
    context: '개인 프로젝트 · 2025',
    points: [
      '업비트 KRW 마켓 약 260종을 대상으로 HMM 시장 국면 탐지, 마코위츠 포트폴리오 최적화, 팩터 분석, 백테스팅 등 9개 퀀트 기법을 하나의 분석 파이프라인으로 통합했습니다.',
      '“시장 국면 → 자산 구조 → 팩터 검증 → 최적화 → 전략 검증”의 5단계로 의사결정 흐름을 구조화해, 어떤 근거로 포트폴리오가 도출됐는지 한눈에 추적할 수 있게 설계했습니다.',
      'stale-while-revalidate 캐싱과 단일 WebSocket 허브로 콜드스타트 지연과 동시 연결 폭증을 제거해, 수백 종목 실시간 시세를 안정적으로 갱신합니다.',
    ],
    tags: ['FastAPI', 'Python', 'React', 'TypeScript', 'WebSocket', 'AWS'],
    href: 'https://github.com/rlatkd/up-quant',
    image: '/images/up-quant/preview.png',
  },
  {
    title: '자동 청구/결제 시스템',
    context: 'cms-plus · 4인 팀 · 성능 최적화 담당',
    points: [
      '피크 타임에 외부 결제 API 지연이 스레드 고갈로 전파되던 구조를, Kafka 비동기 메시지 큐로 분리해 장애 전파를 차단했습니다.',
      'batch.size·linger.ms를 데이터 기반으로 튜닝해 5만 건 청구 처리를 12초 → 7초(약 70%↑)로 단축했습니다.',
      'ECS 기반 MSA로 서비스를 독립 배포하고 RDS Read Replica로 조회 부하를 분산, Prometheus·Grafana·ELK로 처리량·지연·에러를 실시간 관측했습니다.',
    ],
    tags: ['Spring Boot', 'Kafka', 'ECS', 'Elasticsearch', 'Grafana'],
    href: 'https://github.com/rlatkd/cms-plus',
    image: '/images/cms-plus/preview.jpg',
  },
  {
    title: 'MSA 클라우드 POS',
    context: 'Sale-Sync · 4인 팀 · 신세계I&C 클라우드 과정',
    points: [
      '매장·상품·주문·매출·대시보드·컨설팅 6개 도메인을 독립 서비스로 분리하고 서비스별 DB를 두어 결합도를 최소화했습니다.',
      'Kafka 이벤트 기반 비동기 통신으로 주문 → 매출 집계 흐름을 느슨하게 연결해, 한 서비스의 장애가 전체로 번지지 않도록 했습니다.',
      'AWS(S3·CloudFront·WAF·Route53)와 GitHub Actions CI/CD로 무중단 배포 파이프라인을 구성했습니다.',
    ],
    tags: ['React', 'Recoil', 'MSA', 'Kafka', 'AWS', 'GitHub Actions'],
    href: 'https://github.com/rlatkd/sale-sync',
    image: '/images/sale-sync/preview.png',
  },
  {
    title: '포트폴리오',
    context: '개인 프로젝트 · Next.js',
    points: [
      'Next.js 14 App Router·RSC 기반 단일 페이지 포트폴리오와 MDX 파일시스템 블로그를 한 코드베이스로 운영합니다.',
      'MongoDB 댓글·대댓글, 시맨틱 토큰 기반 라이트/다크 테마, FSD(Feature-Sliced Design) 아키텍처로 확장성을 확보했습니다.',
      '마크다운을 서버 컴포넌트에서 렌더링해 클라이언트 번들을 최소화하고 초기 로딩 성능을 높였습니다.',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
    href: 'https://github.com/rlatkd',
    image: '/images/portfolio/preview.png',
  },
];

export const skillGroups = [
  { label: 'Language', items: ['Java', 'Python', 'JavaScript'] },
  { label: 'Backend', items: ['Spring Boot', 'FastAPI', 'Spring Batch', 'Spring Data JPA', 'Spring Security'] },
  { label: 'Frontend', items: ['React', 'Vue.js', 'Recoil', 'Zustand', 'Tailwind CSS'] },
  { label: 'Database', items: ['Oracle', 'MySQL', 'Redis'] },
  { label: 'Infra', items: ['AWS', 'Docker', 'Kubernetes', 'Apache Kafka', 'Linux'] },
  { label: 'DevOps', items: ['GitHub Actions', 'GitLab Runner', 'Bamboo', 'Git', 'Bitbucket', 'Jira', 'Confluence'] },
];

export const education = [
  {
    period: '2026.03 — 현재',
    org: '성균관대학교 일반대학원',
    detail: 'Master of Science, Quantitative Applied Economics',
    note: 'GPA 4.5 / 4.5',
  },
  {
    period: '2018.03 — 2023.02',
    org: '경희대학교 전자정보대학',
    detail: 'Bachelor of Engineering, Biomedical Engineering',
    note: 'Thesis: Comparative Study of CNN Models for Liver Tumor Image Classification (2022)',
  },
];

export const training = [
  {
    period: '2024.02 — 2024.08',
    title: 'MSA 기반 Full Stack 개발 전문가 양성 과정',
    org: '한국소프트웨어산업협회',
    hours: '960h',
  },
  {
    period: '2023.08 — 2024.02',
    title: '클라우드 엔지니어 양성 과정',
    org: '신세계아이앤씨',
    hours: '920h',
  },
];

export const awards = [
  { date: '2024.08', title: 'SW전문인재양성 우수성과 컨퍼런스 우수상', org: '정보통신기획평가원' },
  { date: '2024.08', title: '파이널 프로젝트 최우수상', org: '한국소프트웨어산업협회' },
  { date: '2024.08', title: '우수 수료생', org: '한국소프트웨어산업협회' },
  { date: '2024.02', title: '파이널 프로젝트 최우수상', org: '신세계아이앤씨' },
];

export const certifications = [
  { name: '데이터분석 준전문가 (ADsP)', org: '한국데이터산업진흥원', date: '2025.06', id: 'ADsP-045011461' },
  { name: 'SQL 개발자 (SQLD)', org: '한국데이터산업진흥원', date: '2024.06', id: 'SQLD-053001728' },
];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
