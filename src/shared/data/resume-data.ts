import { education as profileEducation, training, awards, certifications } from './profile-data';

// 전체 이력서 콘텐츠 — port/main/김상훈_이력서_원티드.pdf 기준 (전화번호는 공개하지 않음)

export const summary = [
  'Spring Boot·Vue.js 기반 서비스를 개발하고 운영하는 소프트웨어 엔지니어 김상훈입니다. 효성에프엠에스에서 청구·결제·정산 채널 6개 서비스의 유지보수와 배치 모니터링·VoC 대응을 맡고 있습니다.',
  '외부 시스템의 제약 안에서 복잡한 처리 흐름을 분석하고 개선해 왔습니다. 전자서명 완료부터 수납 등록까지 이어지는 연동을 구현했습니다. CMS 결제 요청 실패 청구의 보정 자동화와 대량 데이터 추출 개선으로 반복적인 운영 업무를 줄였습니다.',
  '현재 교육비 수납 플랫폼 iBill의 서비스 담당자로 요구사항을 검토해 개선·신규 개발·보류 여부를 결정합니다. 운영 이슈는 원인 분석부터 구현·배포까지 처리합니다.',
];

// resume2 소개: 문단 단위로 자연스럽게 이어지는 본문.
export const resume2Introduction = {
  paragraphs: [
    '계약·결제·정산이 고객에 닿는 채널 계층을 담당하며 4개 플랫폼을 Spring Boot와 Vue.js로 개발하고 운영하고 있습니다. 화면부터 API와 배치까지 담당 범위를 넓혀 계정계 등 여러 시스템 사이의 데이터 처리 흐름을 개선합니다.',
    'VoC를 분석할 때 출발점은 화면에 드러난 현상보다 데이터가 만들어지는 기준과 시스템 사이의 전달 과정입니다. 결제와 정산의 작은 불일치도 고객 업무에 직접 영향을 주기 때문에 기존 처리 흐름과 연동 시스템에 미칠 영향까지 검토한 뒤 수정 방향을 정합니다.',
    '2026년 8월부터는 교육비 수납 플랫폼 iBill의 오너를 맡고 있습니다. 고객 요청을 검토해 진행할 과제를 선정하고 운영 이슈의 원인 분석부터 배포까지 책임집니다.',
  ],
};

// 회사 항목 아래의 담당 범위 (최신순)
export { companyRoles, work } from './career-data';

const resumeEducation = [
  {
    period: '2026.03 — 현재',
    title: '성균관대학교 일반대학원',
    sub: '퀀트응용경제학과 · 대학원 재학 중',
    lines: [
      '개발 업무와 석사 과정을 병행하며 계량경제이론·시계열 분석·머신러닝을 학습하고 있습니다.',
    ],
  },
  {
    period: '2018.03 — 2023.02',
    title: '경희대학교',
    sub: '생체의공학과 · 학사 졸업',
    lines: [
      '의료영상·생체신호 처리와 전자회로·제어 관련 과목을 이수했습니다.',
      '졸업논문에서는 간 CT 영상 4,325장을 전처리하고 LeNet5·AlexNet·VGG19·ResNet50의 정확도·손실·학습 시간을 비교했습니다.',
      '학습 90%·검증 10%의 이진 분류 실험에서 VGG19의 검증 정확도는 99.3%였습니다. 종양 종류를 구분하지 못하는 실험의 한계와 후속 과제를 정리했습니다.',
    ],
  },
];

// resume2 학력: 기간에 상태를 붙이고 설명 대신 학사 논문만 남긴다.
export const resume2Education: Record<string, { period: string; sub: string; lines: string[] }> = {
  '성균관대학교 일반대학원': { period: '2026.03 — 2027.08 (재학중)', sub: '퀀트응용경제학과 · 석사', lines: [] },
  '경희대학교': { period: '2018.03 — 2023.02 (졸업)', sub: '생체의공학과 · 학사', lines: ['Thesis - Comparative Study of CNN Models for Liver Tumor Image Classification (2022)'] },
};

// resume2 교육·수상 본문: 교육은 과정 기술과 그 과정의 팀 프로젝트(site-data cms-plus·sale-sync)를 기준으로 쓴다.
export const resume2OtherLines: Record<string, string[]> = {
  'MSA 기반 Full Stack 개발 전문가 양성 과정 (960h)': [
    '파이널 프로젝트: github.com/rlatkd/cms-plus',
  ],
  '클라우드 엔지니어 양성 과정 (920h)': [
    '파이널 프로젝트: github.com/rlatkd/sale-sync',
  ],
  'SW전문인재양성 우수성과 컨퍼런스 우수상': [],
  '파이널 프로젝트 최우수상': [],
  '우수 수료생': [],
};

export const education = resumeEducation.map((item, index) => ({ ...item, period: profileEducation[index].period }));

// resume2 기술: 기준 이력서(port/main)의 분류와 실무 표시를 따른다. work=true는 실무(효성에프엠에스)에서 사용.
export const resume2Skills: { label: string; items: { name: string; work?: boolean }[] }[] = [
  { label: 'AI', items: [{ name: 'Claude Code' }, { name: 'Codex' }, { name: 'OpenCode', work: true }] },
  { label: 'Collaboration', items: [{ name: 'Confluence', work: true }, { name: 'Jira', work: true }, { name: 'Slack', work: true }, { name: 'Notion' }, { name: 'Discord' }, { name: 'Google Workspace' }] },
  { label: 'Language', items: [{ name: 'Java', work: true }, { name: 'JavaScript', work: true }, { name: 'Python' }, { name: 'TypeScript' }] },
  { label: 'Framework', items: [{ name: 'Spring Boot', work: true }, { name: 'Vue.js', work: true }, { name: 'FastAPI' }, { name: 'Next.js' }, { name: 'React' }] },
  { label: 'Backend', items: [{ name: 'Spring Batch', work: true }, { name: 'Spring AOP', work: true }, { name: 'Spring Security', work: true }, { name: 'MyBatis', work: true }, { name: 'JdbcTemplate', work: true }, { name: 'Apache POI', work: true }, { name: 'Spring Data JPA', work: true }, { name: 'QueryDSL', work: true }, { name: 'Logback', work: true }] },
  { label: 'Database', items: [{ name: 'Oracle', work: true }, { name: 'Redis', work: true }, { name: 'MySQL' }, { name: 'Elasticsearch' }] },
  { label: 'Messaging', items: [{ name: 'EAI', work: true }, { name: 'Apache Kafka' }] },
  { label: 'Test', items: [{ name: 'Mockito', work: true }, { name: 'Playwright' }, { name: 'Storybook' }, { name: 'Vitest' }] },
  { label: 'Infra', items: [{ name: 'Linux', work: true }, { name: 'Nginx', work: true }, { name: 'AWS' }, { name: 'Docker' }, { name: 'Kubernetes' }, { name: 'Terraform' }] },
  { label: 'CI/CD', items: [{ name: 'Bamboo', work: true }, { name: 'Bitbucket', work: true }, { name: 'GitHub Actions' }, { name: 'Argo CD' }] },
  { label: 'Monitoring', items: [{ name: 'InterMax', work: true }, { name: 'Scouter', work: true }, { name: 'Prometheus' }, { name: 'Grafana' }, { name: 'Kibana' }, { name: 'Fluentd' }] },
  { label: 'Template', items: [{ name: 'JSP', work: true }, { name: 'Thymeleaf', work: true }] },
  { label: 'Frontend', items: [{ name: 'jQuery', work: true }, { name: 'Recoil' }, { name: 'Redux' }, { name: 'TanStack Query' }, { name: 'Vuex' }, { name: 'Zustand' }] },
  { label: 'UI', items: [{ name: 'Kendo UI', work: true }, { name: 'Tailwind CSS', work: true }, { name: 'Bootstrap' }, { name: 'Chart.js' }, { name: 'ECharts' }, { name: 'MUI' }, { name: 'styled-components' }] },
  { label: 'Build', items: [{ name: 'Webpack', work: true }, { name: 'Babel' }, { name: 'Vite' }] },
  { label: 'Lint', items: [{ name: 'ESLint' }, { name: 'Prettier' }] },
];

export const skills = ['Java', 'Python', 'Spring Boot', 'REST API', 'AWS', 'Spring Framework', 'SQL', 'Oracle', 'MySQL', 'Apache Kafka', 'Docker', 'Git', 'GitHub Actions', 'Redis', 'React', 'Vue.js', 'JavaScript', 'Next.js'];

const resumeOthers = [
  {
    period: '2024.08',
    kind: '수상',
    title: 'SW전문인재양성 우수성과 컨퍼런스 우수상',
    org: '정보통신기획평가원',
    lines: [
      '자동 청구·결제 시스템의 개발 성과를 발표해 우수상을 수상했습니다.',
    ],
  },
  {
    period: '2024.08',
    kind: '수상',
    title: '파이널 프로젝트 최우수상',
    org: '한국소프트웨어산업협회',
    lines: [
      '4인 팀의 자동 청구·결제 시스템에서 아키텍처 설계와 결제·배치 개발을 맡아 최우수상을 수상했습니다.',
    ],
  },
  {
    period: '2024.08',
    kind: '수상',
    title: '우수 수료생',
    org: '한국소프트웨어산업협회',
    lines: [
      '960시간의 MSA 기반 Full Stack 개발 전문가 양성 과정을 이수하고 우수 수료생으로 선정됐습니다.',
    ],
  },
  {
    period: '2025.06',
    kind: '자격증',
    title: '데이터분석 준전문가(ADsP)',
    code: 'ADsP-045011461',
    org: '한국데이터산업진흥원',
    lines: [],
  },
  {
    period: '2024.06',
    kind: '자격증',
    title: 'SQL 개발자(SQLD)',
    code: 'SQLD-053001728',
    org: '한국데이터산업진흥원',
    lines: [],
  },
  {
    period: '2024.02.26 — 2024.08.09',
    kind: '교육',
    title: 'MSA 기반 Full Stack 개발 전문가 양성 과정 (960h)',
    org: '한국소프트웨어산업협회',
    lines: [
      'Java·Spring Boot 기반 백엔드와 React 기반 프론트엔드 개발을 학습했습니다.',
      'REST API 설계, 데이터베이스 연동, Spring Batch 기반 배치 처리, Kafka 기반 비동기 통신을 실습했습니다.',
      'MSA의 서비스 분리와 연동 구조를 익혔습니다. AWS 배포와 CI/CD 및 로그·메트릭 모니터링을 학습했습니다.',
    ],
  },
  {
    period: '2023.08.07 — 2024.02.02',
    kind: '교육',
    title: '클라우드 엔지니어 양성 과정 (920h)',
    org: '신세계아이앤씨',
    lines: [
      '클라우드 환경에서 애플리케이션을 배포하고 운영하는 데 필요한 인프라 기술을 학습했습니다.',
      'AWS 인프라 구성, Docker 컨테이너화, Kubernetes 기반 배포·운영을 실습했습니다.',
      'Terraform 인프라 관리와 GitHub Actions·Argo CD 기반 CI/CD를 학습했습니다. EFK 로그 수집과 Prometheus·Grafana 모니터링 환경을 구성했습니다.',
    ],
  },
];

const normalize = (value: string) => value.replace(/[\s()]/g, '');
export const others = resumeOthers.map(item => {
  const fact = [...awards, ...training, ...certifications.map(entry => ({ ...entry, title: entry.name }))].find(entry => normalize(item.title).startsWith(normalize(entry.title)));
  return fact ? { ...item, period: 'date' in fact ? fact.date : fact.period, org: fact.org } : item;
});

// resume2 AI 활용 경험 — UPquant 저장소 README·CLAUDE.md 작업 이력 기준
export const resume2AiExperience = [
  '검증하기 어려운 가격 예측 대신 시장 흐름과 투자 위험을 데이터로 보여 주는 분석으로 방향을 정했습니다.',
  'Claude Code에 개발·분석·디자인·기획 관점의 전수 리뷰를 맡기고 Codex로 교차 검토해 반영할 항목을 직접 골랐습니다.',
  '교차 검토 과정에서 가격끼리 비교해 상관관계가 부풀려지던 계산과 미래 데이터가 섞인 백테스트를 찾아 바로잡았습니다.',
  '시장 상황 판별 모델이 거의 매일 판정을 바꾸는 문제를 확인하고 입력 지표를 보강해 199일 중 9번으로 안정시켰습니다.',
  '백그라운드 캐시 갱신이 외부 API 호출 한도를 먼저 차지해 사용자 요청이 약 31초 밀리던 문제를 요청 우선 처리로 해결했습니다.',
];

// AI 활용 경험 — 대학원에서 배운 분석 기법을 적용한 개인 프로젝트
export const aiExperience = [
  '업비트 KRW 마켓 약 260종을 대상으로 시장 분석·포트폴리오 구성·전략 검증 서비스를 개발했습니다.',
  'HMM·GARCH·PCA 등 9개 정량 기법과 거래비용·슬리피지를 반영한 백테스트, 워크포워드 검정을 구현했습니다.',
  'Claude Code를 활용해 Python·FastAPI와 React로 개발했습니다. GitHub Actions의 테스트·빌드 통과 후 AWS에 배포하도록 구성했습니다.',
];
