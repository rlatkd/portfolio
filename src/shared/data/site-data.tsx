// 포트폴리오 콘텐츠 (실제 경력기술서/포트폴리오 기준 · 단일 소스)
// 레이아웃 구조는 restyart 참고, 색/콘텐츠는 본인 것.

export const profile = {
  name: '김상훈',
  nameEn: 'Sanghun Kim',
  role: 'Software Engineer',
  intro: '데이터 정합성과 시스템 신뢰성을 최우선으로 설계하는\n금융 도메인 소프트웨어 엔지니어입니다.',
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

// 담당 서비스 (효성에프엠에스)
export const careerServices = [
  { name: 'Connect', kind: '레거시 전용 웹뷰' },
  { name: 'CMS+', kind: '통합 PG 결제' },
  { name: 'Ibill', kind: '교육비 수납' },
  { name: 'Customer API', kind: '고객 연동형 API' },
  { name: 'Square', kind: '정기 배송' },
];

// 실무 프로젝트 (효성에프엠에스)
export const careerProjects = [
  { name: '전자계약', kind: 'CMS+ 비대면 계약 체결 경로 신규 구축' },
  { name: '아이빌', kind: '교육비 수납 전용 레거시 플랫폼 마이그레이션' },
  { name: '브랜치매니저', kind: '대형 유통기업 전용 B2B 플랫폼 신규 구축' },
];

export type Strength = {
  title: string;
  points: string[];
  tags: string[];
  detail: {
    period?: string;
    context?: string;
    problem: string;
    constraint?: string;
    solution: string;
    impact: string;
    insight: string;
    tech?: string;
  };
};

export const strengths: Strength[] = [
  {
    title: '공유 조회 API 필터링 축 도입을 통한 정산 및 결제 정합성 확보',
    points: [
      '정산대상 결제내역조회와 정산내역조회의 건수·금액 불일치 원인 규명. 카드 매입 전 취소, 휴대전화 정산 기준일, 정산 배치 미처리 등 결제수단별 정산 편입 조건 차이 확인',
      '결제 화면과 공유하는 계정계 API에 하위 호환 파라미터 기반 정산 관점 필터링 축 도입',
      '기존 소비자 영향 없이 두 화면의 건수·금액 정합성 확보',
    ],
    tags: ['정산·결제 정합성', '하위 호환 API 설계', '데이터 소유권'],
    detail: {
      period: '2026.04 · 효성에프엠에스 Connect',
      context:
        '결제 데이터와 정산 데이터는 모두 결제 계정계에 저장되고, 정산 처리는 별도 팀의 정산 계정계가 수행합니다. Connect의 정산 메뉴는 확정된 정산 결과를 보는 정산내역조회와 그 근거 결제 건을 보는 정산대상 결제내역조회 두 화면으로 구성되며, 두 화면의 건수·금액은 반드시 일치해야 합니다. 정산대상 결제내역조회는 결제 메뉴의 결제내역조회와 동일한 계정계 API를 공유합니다.',
      problem:
        '동일한 검색 조건에서 정산대상 결제내역조회가 정산내역조회보다 많은 건수를 반환했습니다. 원인은 결제수단별로 달랐습니다. 카드는 대금 청구가 없는 매입 전 취소, 휴대전화는 통신사 월 단위 정산으로 결제일과 다른 정산 기준일, CMS는 정산 배치 미처리 건. 세 경우 모두 정산내역에 없는 것이 정상이었습니다. 결제와 정산이 같은 거래를 다루지만 서로 다른 사건이었습니다.',
      constraint:
        '해당 조회 API는 결제 화면과 정산 화면이 공유해, 기존 동작을 바꾸면 결제내역조회가 영향을 받습니다. 계정계 원본 쿼리 또한 다수 시스템이 공유하는 레거시라 수정할 수 없었습니다.',
      solution:
        'Connect에서 응답을 후처리하지 않았습니다. 데이터를 소유하지 않은 쪽이 판정 규칙을 복제하면 동일 API를 쓰는 다른 서비스에서 같은 불일치가 반복되기 때문입니다. 원인 분석과 판정 규칙을 정리해 계정계 담당팀에 전달하고, 기존 동작을 바꾸지 않는 선택적 파라미터 기반 필터링 축을 요청·설계했습니다. 파라미터를 주지 않으면 기존과 동일하게 동작하고, 주면 조회 기준일이 정산일로 전환되며 정산 비대상 상태가 제외됩니다. 결제수단별 부가세 산정과 카드 부분취소 반영도 함께 구현했습니다.',
      impact:
        '어떤 조회 조건에서도 정산내역조회와 정산대상 결제내역조회의 건수·금액이 일치합니다. 기존 API 소비자(결제내역조회)에 영향이 없고, 정산 판정 규칙이 API 스펙에 반영돼 결제수단이 추가돼도 동일한 파라미터 축으로 확장됩니다.',
      insight:
        '결제와 정산은 같은 거래를 다루지만 서로 다른 사건이라는 것을 원인을 짚으며 알게 됐습니다. 소비하는 쪽이 판정 규칙을 복제하면 반드시 어긋나고, 원본을 바꾸지 않고 읽는 관점만 바꾸는 방식이 가능하다는 것을 배웠습니다.',
      tech: 'Java · Spring Boot · Vue.js',
    },
  },
  {
    title: '계정계 부하 흡수를 통한 정산대상 결제내역 대량 추출 자동화',
    points: [
      '수정 불가능한 계정계 레거시 조회 쿼리의 부하를 호출 측 1,000건 단위 분할 호출로 흡수',
      'SXSSF 스트리밍 적용으로 메모리 상주 행 수를 일정하게 유지',
      '15만 건 규모 정산대상 결제내역 엑셀 추출 자동화(8분), 담당자의 수기 추출 업무 제거',
    ],
    tags: ['부하 분산', 'SXSSF 스트리밍', '레거시 제약 설계'],
    detail: {
      period: '2026.04 · 효성에프엠에스 Connect',
      context:
        'Connect는 자체 데이터베이스 없이 계정계 API에 의존합니다. 정산대상 결제내역조회는 정산의 근거가 되는 결제 건을 조회하는 화면이며, 계정계의 조회 쿼리는 다수의 UNION으로 구성된 레거시 원본으로 여러 시스템이 공유해 수정할 수 없었습니다.',
      problem:
        '전사 대량 엑셀 정책은 30만 건까지 허용하지만, 이 화면은 정산대상 결제내역 조회 대상이 십만 건 규모를 넘으면 단일 요청이 계정계 서버를 다운시켰습니다. 5만 건을 초과하는 대형 고객은 기능을 쓰지 못해 담당자가 별도 추출 프로그램을 수기 실행해 파일을 전달했습니다. 정책상 허용된 규모를 시스템이 처리하지 못해 사람이 대신하고 있었습니다.',
      constraint:
        '원인인 계정계 원본 쿼리는 다수 시스템이 공유하는 레거시라 수정할 수 없었습니다. 부하를 호출 측에서 흡수하는 방향밖에 없었습니다.',
      solution:
        '단일 대량 요청을 1,000건 단위로 분할해 계정계 API를 순회 호출하고 응답을 병합했습니다. 전체 건수를 먼저 조회해 페이지 수를 산출한 뒤 순차 호출하므로 계정계는 매 요청마다 처리 가능한 규모만 처리합니다. 동시 부하가 문제였으므로 병렬화는 분할의 의미를 상쇄해 적용하지 않고, 처리 시간보다 계정계 안정성을 택했습니다. 엑셀은 SXSSF 스트리밍으로 생성하고 Row Access Window를 API 페이지 크기와 맞춰 메모리 상주 행 수를 일정하게 유지했습니다.',
      impact:
        '15만 건 규모 정산대상 결제내역 엑셀을 계정계 장애 없이 8분에 추출합니다. 대형 고객이 담당자를 거치지 않고 직접 추출하며, 수기 추출 프로그램 운영 업무를 제거했습니다. 원본 쿼리를 수정하지 않아 이를 공유하는 타 시스템에 대한 영향도 없습니다.',
      insight:
        '사람이 대신하던 이유가 업무의 복잡성이 아니라 시스템의 물리적 한계였다는 점이 인상적이었습니다. 외부 시스템의 제약을 제거 대상이 아니라 설계의 전제로 받아들이면 풀리는 문제가 있다는 것을 배웠습니다. 다만 추출할 때마다 계정계를 조회하므로 부하가 근본적으로 사라진 것은 아닙니다. 정산 결과를 조회 전용 저장소에 적재해 원장과 조회 모델을 분리하는 것을 다음 과제로 봅니다.',
      tech: 'Java · Spring Boot · Apache POI(SXSSF) · Vue.js',
    },
  },
  {
    title: '결제 요청 실패 시 청구 상태 고착 문제 해소',
    points: [
      '결제 요청 실패 시 청구가 결제중 상태로 고착돼 삭제가 차단되고 고객 재이용 VoC로 이어지던 문제 해소',
      '계정계 예외가 원인을 구분하지 않아, 즉시 판정하지 않고 계약상태를 재조회해 검증하는 2단계 구조 설계. 영구 실패와 일시 실패 구분',
      'ConcurrentHashMap 기반 Thread-safe 저장소로 멀티스레드 Step 간 보정 대상 전달',
      '운영 담당자의 프로덕션 DB 수기 보정 작업 제거',
    ],
    tags: ['Spring Batch', 'ConcurrentHashMap', '멀티스레드 동시성'],
    detail: {
      period: '2026.02 · 효성에프엠에스 CMS+',
      context:
        'CMS결제요청배치는 매일 17:30에 익영업일 결제 대상 청구를 계정계로 전송하고, 계정계는 대외계를 거쳐 금융기관에 출금을 요청합니다. 요청과 결과 수신 사이에 2영업일 간격이 있습니다. 배치는 청구상태가 대기인 건을 선정하고, 전송을 시작하면 계정계 응답과 무관하게 청구상태를 결제중으로 먼저 갱신합니다. 결제중은 결과 수신 시점에 종결되어야 하는 일시적 상태입니다.',
      problem:
        '계약상태가 이용중지·해지예정·해지인 경우 계정계가 예외를 반환하는데, 기존 배치는 이를 로그로만 남기고 이미 결제중으로 전이된 상태를 되돌리지 않았습니다. 결과가 돌아올 일이 없어 결제중에서 벗어날 경로가 없었고, 결제중 청구는 삭제가 막혀 고객 재이용이 차단되며 VoC로 이어졌습니다.',
      constraint:
        '이 배치는 실제 출금을 발생시키는 핵심 배치라 변경 영향 범위를 통제하기 어렵습니다. 또 계정계 예외는 원인을 구분하지 않아, 재시도해도 같은 영구 실패(계약상태)와 재시도로 풀리는 일시 실패(네트워크)가 동일한 예외로 전달됐습니다.',
      solution:
        '대상 선정 조건은 건드리지 않고 예외 경로에만 개입했습니다. Step 1에서 예외 건을 즉시 판정하지 않고 별도 버퍼에 적재하고, Step 2에서 정산 계정계에 계약상태를 재조회해 원인을 확정한 뒤 계약상태가 원인인 건만 청구상태를 결제중에서 대기로 되돌렸습니다. 대상 선정 쿼리를 전수 확인해 되돌린 건이 다음 배치에서 재선정되지 않음을 검증했습니다. Step 1이 멀티스레드라 ConcurrentHashMap과 ConcurrentLinkedQueue를 조합한 Thread-safe 저장소를 구현하고, computeIfAbsent로 큐 생성 경합을 제거하고 조회 시 복사본을 반환해 순회 중 변경을 차단했습니다.',
      impact:
        '계약상태로 실패한 청구가 더는 결제중으로 고착되지 않아 고객이 과거 청구를 정상 정리할 수 있습니다. 운영 담당자의 프로덕션 DB 수기 보정을 제거했고, 핵심 배치 로직을 바꾸지 않아 정상 결제 흐름에 영향이 없습니다.',
      insight:
        '예외가 원인을 담고 있지 않았으므로, 예외를 판정으로 받아들이지 않고 확인 가능한 사실로 원인을 검증하는 방식이 필요했습니다. 청구상태 하나를 되돌리는 단순한 변경이었지만 그 상태를 읽는 모든 지점을 먼저 확인하지 않았다면 무한 재시도를 만들 수 있었습니다. 계약상태가 원인이 아닌 실패 건의 재실행 자동화는 남은 과제입니다.',
      tech: 'Java · Spring Boot · Spring Batch · ConcurrentHashMap · Oracle',
    },
  },
  {
    title: '외부 연동 예외의 고객 노출 차단 및 실패 알림 자동화',
    points: [
      '계정계·대외계에서 발생한 예외 메시지가 고객 노출 화면에 그대로 표시되던 문제를 AOP 기반 경계 변환으로 차단',
      '실패 발생 시 운영 담당자에게 즉시 알림 발송(발생 시각·대상 고객·호출 API·예외 내용). 고객 문의 이전에 실패 인지로 전환',
      '운영 담당자의 수기 문구 수정 작업 제거',
    ],
    tags: ['Spring AOP', '시스템 경계 설계', '장애 알림'],
    detail: {
      period: '2025.10 · 효성에프엠에스 CMS+',
      context:
        'CMS+는 고객 접점의 채널 시스템입니다. 결제 처리 결과는 결제 테이블의 비고 컬럼에 문구로 기록되는데, 이 비고 컬럼은 수납상세를 포함한 다수의 고객 노출 화면에서 그대로 표시됩니다.',
      problem:
        '계정계·대외계 예외가 문자열로 그대로 전파돼 비고 컬럼에 기록되면서, 고객이 수납상세 화면에서 내부 예외 문구를 보게 됐고 VoC로 이어졌습니다. 더 큰 문제는 실패가 비고에만 남고 별도 알림이 없어, 운영 담당자가 고객이 VoC를 제기해야 실패를 인지했다는 점입니다. 이 중에는 재결제 요청이 필요한 건도 있어 인지가 늦을수록 대응이 어려워졌습니다.',
      solution:
        'AOP로 외부 연동 예외 지점을 인터셉트해 후처리를 한 곳에 응집했습니다. 비고 컬럼에는 예외 메시지 대신 고객이 이해할 수 있는 안내 문구를 기록하고, 동시에 운영 담당자에게 발생 시각·대상 고객·호출 API·예외 내용을 문자로 발송했습니다. 원인 판단과 후속 조치는 사람 몫이므로 판단에 필요한 정보를 전달하는 데 목적을 뒀습니다.',
      impact:
        '내부 예외 문구가 고객 화면에 노출되지 않아 해당 VoC가 사라졌고, 비고를 수기로 수정하던 작업을 제거했습니다. 외부 연동 실패를 고객 문의가 아니라 시스템 알림으로 인지해 재결제가 필요한 건을 즉시 확인합니다.',
      insight:
        '비고 컬럼이 내부 로그이자 고객 안내 문구라는 두 역할을 겸하고 있었고, 예외가 나면 내부의 언어가 그대로 고객에게 전달됐습니다. 기록의 대상과 표시의 대상은 다르다는 것을 배웠습니다. 다만 이 작업은 예외를 올바르게 표현·전달하는 데 그쳤고, 지금이라면 실패를 상태로 기록해 재처리 대상으로 관리하는 구조를 함께 설계하겠습니다.',
      tech: 'Java · Spring Boot · Spring AOP · Oracle',
    },
  },
  {
    title: '전자계약 서비스 신규 구축 및 링크 서명 확장',
    points: [
      '기획 단계부터 참여해 외부 파트너 전자서명 연동 구조 설계',
      '계약 정보를 소유한 CMS+가 토큰 기반으로 인증·인가하고 서명 처리는 파트너가 담당',
      '서명 완료 콜백 수신 후 계약 원본을 계정계에 보관하고 자동이체를 등록해 계약 체결부터 수납 등록까지 무인 완결',
      '링크 서명 확장으로 회원 사전 등록 없이 본인인증 후 회원 등록과 계약 체결을 하나의 흐름으로 통합',
    ],
    tags: ['외부 연동 설계', '토큰 기반 인증', '신뢰 경계'],
    detail: {
      period: '2024.09 — 2025.06 · 효성에프엠에스 CMS+',
      context:
        'CMS+는 회원사에게 수납 관리 플랫폼을 제공하고, 회원사는 자신의 회원(납부자)을 등록해 자동이체로 대금을 수납합니다. 자동이체 계약은 기존에 종이 계약서로 처리됐고 사내 전자서명 기능이 없어, 계약 대상·내용은 CMS+가 관리하고 서명 화면·본인인증·서명 처리는 외부 파트너가 담당하는 구조로 연동했습니다.',
      problem:
        '개별 발송 방식은 회원이 먼저 등록돼 있어야 계약을 보낼 수 있습니다. 그러나 회원사가 다수의 잠재 고객에게 일괄로 계약을 제안하는 상황에서는 회원 정보를 사전에 확보하지 못해 이 전제가 성립하지 않았습니다.',
      solution:
        '계약 대상을 파트너로 넘길 때 신뢰 경계를 넘게 되는데, 파트너는 접속자가 계약 대상인지 알 수 없습니다. CMS+가 계약 대상을 확인한 뒤 해당 계약 접근 권한을 담은 토큰을 발급하도록 설계하고, 서명 완료 콜백 수신 후 계약 원본을 계정계에 보관하고 자동이체를 등록해 무인 완결시켰습니다. 이후 회원 등록 없이 시작하는 링크 서명 방식을 추가하면서, 토큰이 증명하는 대상을 계약 대상자에서 계약 양식으로 전환하고 신원 확인은 서명 시점의 본인인증 결과에 의존하도록 재설계했습니다.',
      impact:
        '종이 기반 대면 계약을 비대면 전자계약으로 대체하고, 계약 체결과 자동이체 등록을 하나의 흐름으로 연결해 별도 수납 등록 절차를 없앴습니다. 링크 서명으로 회원 정보를 사전 확보하지 않고도 회원 등록과 계약 체결을 한 흐름에서 완료합니다.',
      insight:
        '전자서명 기능은 우리가 만들지 않았지만, 그 기능을 안전하게 쓸 수 있는 조건을 만드는 것이 우리 몫이었습니다. 같은 계약이라도 시작 지점이 달라지면 토큰이 무엇을 증명하는지가 달라져 흐름마다 신뢰의 출처를 다시 정의해야 했습니다. 계약은 법적 효력을 갖는 사실이므로 채널 시스템이 아니라 원장이 소유해야 한다고 판단해 원본을 계정계에 보관했습니다.',
      tech: 'Java · Spring Boot · Vue.js · Oracle · 외부 파트너 API 연동',
    },
  },
];

export const experience = [
  {
    period: '2026.03 — 현재',
    role: '성균관대학교',
    org: '일반대학원 퀀트응용경제학과',
    desc: '개발자로 일하며 실무와 석사 과정을 병행하고 있습니다. 경제학과 정량 분석의 융합을 지향하는, 데이터 분석(빅데이터·머신러닝)에 특화된 경제학 석사 과정으로, 계량경제이론·빅데이터분석과 머신러닝·퀀트 방법론을 이수하며 금융 데이터의 통계적 특성과 예측 방법론으로 역량을 정량 분석까지 확장하고 있습니다.',
    points: [
      '계량경제이론과 시계열 분석으로 금융 데이터의 통계적 특성과 예측 방법론 학습',
      '빅데이터분석·머신러닝 기반 자산 가격 예측·포트폴리오 최적화를 암호화폐 퀀트 대시보드 프로젝트로 구현',
      '실무 데이터 처리·시스템 설계 경험을 정량 분석 파이프라인에 접목',
    ],
    tags: ['계량경제', '머신러닝', '시계열 분석', 'Python'],
  },
  {
    period: '2024.09 — 현재',
    role: 'Fullstack Developer · 효성에프엠에스',
    org: '개발팀 (Application Platform) · 선임',
    desc: '채널계 서비스의 백엔드·프론트엔드 개발과 운영을 담당합니다. 결제·정산·계약 도메인에서 계정계·대외계 연동, 배치, 데이터 정합성 문제를 주로 다룹니다.',
    points: [
      '결제 화면과 공유하는 계정계 API에 하위 호환 필터링 축을 도입해, 기존 소비자 영향 없이 정산대상 결제내역과 정산내역의 정합성 확보',
      '수정 불가능한 계정계 레거시 쿼리의 부하를 호출 측 분할 호출로 흡수하고 SXSSF 스트리밍을 적용해 15만 건 규모 정산대상 결제내역 추출 자동화(8분)',
      '결제 배치 실패 시 계약상태를 재조회해 검증하는 2단계 구조와 ConcurrentHashMap Thread-safe 저장소로 청구 상태 고착 해소',
      'AOP 기반 예외 경계 변환으로 외부 연동 예외의 고객 노출 차단 및 실패 알림 자동화',
      '전자계약 서비스 신규 구축 및 링크 서명 확장 (기획~운영, 토큰 기반 인증)',
    ],
    tags: ['Spring Boot', 'Vue.js', 'Oracle'],
  },
  {
    period: '2024.02 — 2024.08',
    role: 'MSA Full Stack 개발 전문가 양성 과정',
    org: '한국소프트웨어산업협회 · 960h',
    desc: '자동 청구/결제 시스템을 4인 팀으로 구축하며 아키텍트로서 시스템·인프라 아키텍처, DevOps, 협업 환경을 주도했습니다. Kafka 이벤트 기반 MSA를 ECS Fargate에 배포하고 CI/CD·중앙 로깅·모니터링까지 클라우드 네이티브 스택을 설계했습니다.',
    points: [
      'Main·Payment·Messaging·Batch·Analysis 서버를 역할·언어별로 분리한 MSA를 ECS Fargate 멀티 AZ에 배포 (RDS·Read Replica·ElastiCache for Redis)',
      'Kafka 3-브로커 클러스터(Zookeeper 앙상블·토픽별 파티션 리플리케이션)로 결제·메시징·결제결과를 Consumer Group 단위 비동기 분산',
      'batch.size·linger.ms 데이터 기반 튜닝으로 5만 건 결제 처리 12초 → 7초(약 70%↑)',
      'GitHub Actions CI/CD로 프론트는 S3·CloudFront, 백엔드는 ECR·ECS에 배포하고 ALB·Route53·ACM으로 서비스 구성',
      'Logback→Kafka→Logstash→Elasticsearch→Kibana 중앙 로깅과 Prometheus·Grafana(JVM Micrometer) 모니터링, Kafdrop·UI for Kafka로 운영 관측성 확보',
      '아키텍트로서 Git 브랜치 전략(feat/dev/prod/main)·커밋 컨벤션·Lint 정립과 Jira·Slack 자동화로 협업 환경 구축',
    ],
    tags: ['MSA', 'Kafka', 'ECS', 'EFK', 'Elasticsearch'],
  },
  {
    period: '2023.08 — 2024.02',
    role: '클라우드 엔지니어 양성 과정',
    org: '㈜신세계아이앤씨 · 920h',
    desc: 'AWS 멀티 AZ 환경에 MSA 클라우드 POS(sale-sync)를 4인 팀으로 구축했습니다. EKS 컨테이너 오케스트레이션, Argo CD GitOps, Terraform IaC, EFK·Prometheus 관측성까지 클라우드 네이티브 스택을 설계·운영했습니다.',
    points: [
      '매장·상품·주문·매출·대시보드·컨설팅 6개 마이크로서비스를 서비스별 DB로 분리하고 멀티 AZ EKS 클러스터에 컨테이너로 배포',
      'GitHub Actions로 이미지를 빌드해 ECR에 푸시하고 Argo CD 기반 GitOps로 EKS에 배포',
      'Terraform IaC로 인프라를 코드화하고 S3·DynamoDB를 상태 백엔드·잠금으로 사용',
      'Kafka 이벤트 기반 비동기 통신과 OpenAI API 매출 컨설팅, RDS Master·Read Replica로 조회 부하 분산',
      'EFK(Elasticsearch·Kibana·fluentd) 로깅과 Prometheus·Grafana 모니터링으로 관측성 확보, 프론트는 S3·CloudFront(WAF·Route53·ACM)로 배포',
    ],
    tags: ['MSA', 'EKS', 'Argo CD', 'Terraform', 'React'],
  },
  {
    period: '2018.03 — 2023.02',
    role: '경희대학교',
    org: '전자정보대학 생체의공학과',
    desc: '의료기기·의료영상을 다루는 공학을 전공하며, 신호 처리와 딥러닝으로 이어지는 데이터 중심 사고의 기반을 다졌습니다.',
    points: [
      '전자기학·회로이론·신호와 시스템 등 신호·하드웨어 기반 공학 이수',
      '의료영상·생체신호를 다루며 데이터 기반 문제 해결에 관심',
      '졸업논문으로 CNN 기반 간종양 CT 분류(VGG19 99.3%) 수행, 딥러닝 첫 프로젝트 적용',
    ],
    tags: ['생체신호처리', 'CNN', 'MATLAB', '제어공학'],
  },
  {
    period: '2015.03 — 2017.02',
    role: '한서항공직업전문학교',
    org: '항공정비과',
    desc: '항공기 정비를 전공하며 작은 오차도 허용되지 않는 안전·정밀 중심의 절차를 익혔고, 이때의 태도가 데이터 정합성과 시스템 신뢰성을 우선하는 지금의 개발 원칙으로 이어졌습니다.',
    points: [],
    tags: [],
  },
];

export const projects = [
  {
    title: 'AI 코딩 테스트 문제 생성·채점 플랫폼',
    context: '개인 프로젝트 · 2026',
    badge: 'Claude Code',
    points: [
      '기존 알고리즘 문제 데이터를 학습해 AI가 매일 새로운 코딩 테스트 문제를 생성하고, 지문·입출력·제약·테스트케이스까지 자동으로 구성하는 것을 목표로 합니다.',
      '생성 문제를 그대로 내보내지 않습니다. 자체 임베딩(Sentence Transformer·pgvector)으로 기존 문제와의 유사도를 걸러내고, 서로 다른 세션으로 만든 N개 풀이의 출력이 일치할 때만 정답으로 채택하는 교차검증을 거친 뒤, 사람 검수를 통과한 문제만 공개하도록 설계했습니다.',
      '사용자 제출 코드는 Kafka로 비동기 분산해 Go 채점 워커가 seccomp·cgroups로 격리된 Docker 샌드박스에서 실행합니다. 문제 생성(Python·LLM·LangChain)·검증·채점(Go)·API·프론트를 언어별로 분리한 폴리글랏 마이크로서비스로, 넓은 최신 스택을 동작하는 세로 슬라이스 단위로 학습·구현하고 있습니다.',
    ],
    tags: ['Go', 'Next.js', 'NestJS', 'LangChain', 'Transformer', 'pgvector'],
    href: 'https://github.com/rlatkd/cote-js',
    image: '/images/cote-js/preview.png',
  },
  {
    title: '암호화폐 퀀트 분석 대시보드',
    context: '개인 프로젝트 · 2026',
    badge: 'Claude Code',
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
    title: '포트폴리오',
    context: '개인 프로젝트 · 2025',
    points: [
      'Next.js 14 App Router·RSC 기반 단일 페이지 포트폴리오와 MDX 파일시스템 블로그를 한 코드베이스로 운영합니다.',
      'MongoDB 댓글·대댓글, 시맨틱 토큰 기반 라이트/다크 테마, FSD(Feature-Sliced Design) 아키텍처로 확장성을 확보했습니다.',
      '마크다운을 서버 컴포넌트에서 렌더링해 클라이언트 번들을 최소화하고 초기 로딩 성능을 높였습니다.',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'MongoDB'],
    href: 'https://github.com/rlatkd',
    image: '/images/portfolio/preview.png',
  },
  {
    title: '자동 청구/결제 시스템',
    context: '팀 프로젝트 · 2024',
    points: [
      'Main·Payment·Messaging·Batch·Analysis 서버를 역할·언어별로 분리한 MSA를 ECS Fargate 멀티 AZ에 배포하고, RDS·Read Replica·ElastiCache for Redis로 데이터 계층을 구성했습니다.',
      'Kafka 3-브로커 클러스터(Zookeeper 앙상블·토픽별 파티션 리플리케이션)로 결제·메시징·결제결과를 Consumer Group 단위로 비동기 분산하고, batch.size·linger.ms 튜닝으로 5만 건 처리를 12초 → 7초(약 70%↑)로 단축했습니다.',
      'Logback→Kafka→Logstash→Elasticsearch→Kibana 중앙 로깅과 Prometheus·Grafana(JVM Micrometer) 모니터링, Kafdrop·UI for Kafka로 운영 관측성을 확보했습니다.',
      'GitHub Actions CI/CD로 프론트는 S3·CloudFront, 백엔드는 ECR·ECS에 배포하고, 아키텍트로서 Git 브랜치 전략·커밋 컨벤션·Jira·Slack 자동화로 협업 환경을 구축했습니다.',
    ],
    tags: ['React', 'Spring Boot', 'MSA', 'Kafka', 'ECS Fargate', 'EFK'],
    href: 'https://github.com/rlatkd/cms-plus',
    image: '/images/cms-plus/preview.jpg',
  },
  {
    title: 'MSA 클라우드 POS',
    context: '팀 프로젝트 · 2023',
    points: [
      '매장·상품·주문·매출·대시보드·컨설팅 6개 마이크로서비스를 서비스별 DB로 분리하고, 멀티 AZ EKS 클러스터에 컨테이너로 배포했습니다.',
      'GitHub Actions로 이미지를 빌드해 ECR에 푸시하고 Argo CD 기반 GitOps로 EKS에 배포했으며, Terraform IaC(S3·DynamoDB 상태 백엔드·잠금)로 인프라를 코드화했습니다.',
      'Kafka 이벤트 기반 비동기 통신과 OpenAI API 매출 컨설팅을 연결하고, RDS Master·Read Replica로 조회 부하를 분산했습니다.',
      'EFK(Elasticsearch·Kibana·fluentd) 로깅과 Prometheus·Grafana 모니터링으로 관측성을 확보하고, 프론트는 S3·CloudFront(WAF·Route53·ACM)로 배포했습니다.',
    ],
    tags: ['React', 'MSA', 'EKS', 'Argo CD', 'Terraform', 'Kafka', 'AWS'],
    href: 'https://github.com/rlatkd/sale-sync',
    image: '/images/sale-sync/preview.png',
  },
  {
    title: '간종양 CNN 분류 모델 비교',
    context: '학부 졸업논문 · 2022',
    points: [
      'LiTS17 데이터셋의 간 CT 이미지 4,325장(종양 2,472·정상 1,853)을 1mm³ 등방성 재샘플링·224×224 리사이즈하고 회전·줌 증강으로 학습셋을 구성했습니다.',
      'LeNet5·AlexNet·VGG19·ResNet50 4개 CNN 아키텍처를 동일 조건에서 학습·비교하고, Early Stopping·ModelCheckpoint로 과적합을 제어했습니다.',
      'VGG19가 검증 정확도 99.3%로 최고 성능(AlexNet 95.6%·ResNet50 94.8%·LeNet5 93.2%)을 기록했으며, 층 깊이가 정확도에 기여하되 단순한 층수 증가가 능사는 아님을 확인했습니다.',
    ],
    tags: ['Python', 'Keras', 'CNN', 'VGG19', 'Medical Imaging'],
    image: '/images/liver-tumor-cnn/preview.png',
  },
  {
    title: 'CT 이미지 재구성',
    context: '학부 프로젝트 · 2022',
    points: [
      '실제 스캐너 회전 대신 디지털 이미지를 여러 각도로 회전시켜 투영 데이터를 생성하고 사이노그램을 만든 뒤, 필터 역투영(Filtered Back-Projection)으로 원본 영상을 재구성했습니다.',
      '5종 필터와 보간법을 비교하고 MSE로 화질을 정량 평가해, 공간 해상도에 유리한 최적 파라미터를 도출했습니다.',
      '각도 스텝(투영 개수) 변화가 재구성 정확도에 미치는 영향을 분석했습니다.',
    ],
    tags: ['MATLAB', 'CT Reconstruction', 'Signal Processing'],
    href: 'https://github.com/rlatkd/ct-image-reconstruction',
    image: '/images/ct-image-reconstruction/preview.png',
    imageFit: 'contain',
  },
];

export const skillGroups = [
  { label: 'Language', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
  { label: 'Framework', items: ['Spring Boot', 'FastAPI', 'React', 'Vue.js', 'Next.js'] },
  { label: 'Backend', items: ['Spring Batch', 'Spring Data JPA', 'Spring Security'] },
  { label: 'Frontend', items: ['Recoil', 'Zustand', 'Tailwind CSS'] },
  { label: 'Database', items: ['Oracle', 'MySQL', 'Redis', 'Elasticsearch'] },
  { label: 'Infra', items: ['AWS', 'Docker', 'Kubernetes', 'Linux'] },
  { label: 'Messaging', items: ['Apache Kafka'] },
  { label: 'Observability', items: ['Prometheus', 'Grafana', 'Kibana'] },
  { label: 'CI/CD', items: ['GitHub Actions', 'Argo CD', 'GitLab Runner', 'Bamboo'] },
  { label: 'IaC', items: ['Terraform'] },
  { label: 'SCM', items: ['GitHub', 'GitLab', 'Bitbucket'] },
  { label: 'Collaboration', items: ['Jira', 'Confluence'] },
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
  {
    period: '2015.03 — 2017.02',
    org: '한서항공직업전문학교',
    detail: 'Associate Degree, Aircraft Maintenance',
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
  { id: 'projects', label: 'Side Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];
