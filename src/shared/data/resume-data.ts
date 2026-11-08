import { training, awards, certifications } from './profile-data';

// 이력서(/resume) 콘텐츠.

// 1쪽 소개: 문단 단위로 이어지는 본문.
export const introduction = [
  '계약·결제·정산이 고객에 닿는 채널 계층을 담당하며 4개 플랫폼을 Spring Boot와 Vue.js로 개발하고 운영하고 있습니다. 화면부터 API와 배치까지 담당 범위를 넓혀 계정계 등 여러 시스템 사이의 데이터 처리 흐름을 개선합니다.',
  'VoC를 분석할 때는 화면에 드러난 현상보다 데이터가 만들어지는 기준과 시스템 사이의 전달 과정부터 살펴봅니다. 결제와 정산의 작은 불일치도 고객 업무에 직접 영향을 주기 때문에 기존 처리 흐름과 연동 시스템에 미칠 영향까지 검토한 뒤 수정 방향을 정합니다.',
  '2026년 8월부터는 교육비 수납 플랫폼 iBill의 오너를 맡고 있습니다. 고객 요청을 검토해 진행할 과제를 선정하고 운영 이슈의 원인 분석부터 배포까지 책임집니다.',
];

// 학력: 기간에 상태를 붙이고 학사 논문만 남긴다.
export const education = [
  { period: '2026.03 — 2027.08 (재학중)', title: '성균관대학교 일반대학원', sub: '퀀트응용경제학과 · 석사', lines: [] as string[] },
  { period: '2018.03 — 2023.02 (졸업)', title: '경희대학교', sub: '생체의공학과 · 학사', lines: ['Thesis - Comparative Study of CNN Models for Liver Tumor Image Classification (2022)'] },
];

// 기술 스택: 기준 이력서(port/main)의 분류와 실무 표시를 따른다. work=true는 실무(효성에프엠에스)에서 사용.
export const skills: { label: string; items: { name: string; work?: boolean }[] }[] = [
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

// 교육·수상·자격증. 교육 줄은 과정의 파이널 프로젝트 저장소를 가리킨다.
// 기간·기관은 여기 적지 않고 factId로 profile-data.ts에서 가져온다.
const resumeOthers = [
  {
    kind: '수상',
    factId: 'iitp-conference-excellence',
    title: 'SW전문인재양성 우수성과 컨퍼런스 우수상',
    lines: [],
  },
  {
    kind: '수상',
    factId: 'kosa-final-project',
    title: '파이널 프로젝트 최우수상',
    lines: [],
  },
  {
    kind: '수상',
    factId: 'kosa-top-graduate',
    title: '우수 수료생',
    lines: [],
  },
  {
    kind: '자격증',
    factId: 'adsp',
    title: '데이터분석 준전문가(ADsP)',
    code: 'ADsP-045011461',
    lines: [],
  },
  {
    kind: '자격증',
    factId: 'sqld',
    title: 'SQL 개발자(SQLD)',
    code: 'SQLD-053001728',
    lines: [],
  },
  {
    kind: '교육',
    factId: 'kosa-msa-fullstack',
    title: 'MSA 기반 Full Stack 개발 전문가 양성 과정 (960h)',
    lines: [
      '파이널 프로젝트: github.com/rlatkd/cms-plus',
    ],
  },
  {
    kind: '교육',
    factId: 'ssg-cloud-engineer',
    title: '클라우드 엔지니어 양성 과정 (920h)',
    lines: [
      '파이널 프로젝트: github.com/rlatkd/sale-sync',
    ],
  },
];

// 기간·기관은 profile-data.ts의 항목을 id(factId)로 찾아 쓴다. 제목 문구를 다듬어도 연결이 끊기지 않는다.
// 없는 id를 적으면 빌드에서 바로 실패하게 해 엉뚱한 항목에 붙거나 조용히 빠지는 일을 막는다.
const facts = [...awards, ...training, ...certifications];
export const others = resumeOthers.map(({ factId, ...item }) => {
  const fact = facts.find(entry => entry.id === factId);
  if (!fact) throw new Error(`resume-data: profile-data에 없는 id입니다: ${factId}`);
  return { ...item, period: 'date' in fact ? fact.date : fact.period, org: fact.org };
});

// AI 활용 경험: UPquant 저장소 README·CLAUDE.md 작업 이력 기준
export const aiExperience = [
  'CLAUDE.md에 구조·규칙·결정 근거를 남기고 체크리스트로 진행을 확인해 세션이 바뀌어도 같은 기준으로 작업했습니다.',
  'Claude Code에 네 관점의 전수 리뷰를 맡기고 Codex로 교차 검토한 뒤 승인한 항목만 구현했습니다.',
  '개별 작업에서는 드러나지 않던, 한 화면만 다른 기준으로 구현된 계산을 전수 리뷰로 찾아 통일했습니다.',
  'AI의 지적을 일괄 적용하지 않고 코드별로 확인해 실제 문제가 있는 부분만 고치고 나머지는 유지했습니다.',
  '모델의 출력을 그대로 쓰지 않고 판정 변화 횟수를 확인해 199일 중 195번 바뀌던 결과를 입력 보강으로 9번까지 줄였습니다.',
];
