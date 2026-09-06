// 포트폴리오 콘텐츠 (실제 경력기술서/포트폴리오 기준 · 단일 소스)
// 레이아웃 구조는 restyart 참고, 색/콘텐츠는 본인 것.

export const profile = {
  name: '김상훈',
  nameEn: 'Sanghun Kim',
  role: 'Software Engineer',
  intro: '데이터 정합성과 시스템 신뢰성을 먼저 두는\n금융 도메인 소프트웨어 엔지니어입니다.',
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
  '2024년 9월부터 효성에프엠에스에서 계약·결제·정산이 고객사에 닿는 채널 계층을 담당합니다. Spring Boot와 Vue.js로 백엔드와 프론트엔드를 함께 개발하는 풀스택 웹 개발자입니다.',
  'CMS+를 포함한 6개 서비스를 유지보수하며 전자계약, Branch Manager 두 건의 신규 프로젝트에 참여했습니다. 2025년 10월부터는 개발과 운영을 겸해 주 1일씩 CMS+와 Ibill의 배치 모니터링과 VoC 대응을 맡습니다.',
  '담당 서비스 중 교육비 수납 플랫폼 Ibill은 2026년 8월부터 오너를 맡고 있습니다. 요구사항을 도메인과 시스템 관점에서 구조화하고 기존 개선·신규 개발·보류 중 무엇을 할지 정합니다. 운영 이슈는 원인 분석부터 구현·배포까지 직접 처리합니다.',
  '결제 시스템에서는 성공한 요청보다 실패한 요청을 다루는 시간이 더 길었습니다. 외부 호출이 타임아웃되거나 결과가 돌아오지 않으면 요청이 실제로 처리됐는지조차 바로 알 수 없고, 결국 운영에서 원인을 추적해 상태를 보정하게 됩니다. 그 과정의 불편은 고객사가 먼저 감당합니다.',
  '그래서 되돌려도 안전한 실패와 되돌리면 안 되는 실패를 구분하고, 그 구분만큼은 사람이 매번 확인하지 않아도 되게 만들어야 한다고 봅니다. 실패를 없애려는 것이 아니라, 실패해도 다음 행동을 결정할 수 있는 시스템을 만들려고 합니다.',
];

export const aboutQuote = {
  text: '정확성은 노력이 아니라 구조가 보장해야 합니다.\n고칠 수 없는 시스템을 전제로 문제를 풀어왔습니다.\n무엇을 지키고 어디까지 내줄지 판단해 설계합니다.',
};

// 실무 시작일 (경력 자동 계산용)
export const careerStart = '2024-09-01';

// 담당 서비스 (효성에프엠에스)
export const careerServices = [
  { name: 'Connect', kind: '조회 전용 채널' },
  { name: 'CMS+', kind: '통합 PG' },
  { name: 'Ibill', kind: '교육비 수납' },
  { name: 'Customer API', kind: '고객 연동형 API' },
  { name: 'Branch Manager', kind: '유통기업 B2B' },
  { name: 'Square', kind: '정기 배송' },
];

// 실무 프로젝트 (효성에프엠에스)
export const careerProjects = [
  { name: '전자계약', kind: 'CMS+ 비대면 계약 체결 경로 신규 구축' },
  { name: '브랜치매니저', kind: '대형 유통기업 전용 B2B 플랫폼 신규 구축' },
];

export type Strength = {
  title: string;
  points: string[];
  result: string[];
  tags: string[];
  detail: {
    period?: string;
    summary?: string;
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
    title: '공유 조회 API 확장을 통한 결제·정산 데이터 정합성 확보',
    points: [
      '정산 화면 두 영역의 건수·금액 불일치 원인을 원장 결제·정산 테이블 직접 대조로 결제수단별 규명',
      '정산 대상 판정 규칙을 조회 화면에 복제하지 않고, 기존 사용처에 영향 없는 선택적 파라미터를 스펙으로 설계해 계정계 API 확장을 협의',
      '결제일·정산일 기준과 결제수단 조합 전반을 원장 데이터와 대조해 정합성 검증',
    ],
    result: [
      '두 화면의 숫자 불일치로 발생하던 VIP 고객사 VoC 제거 · 월 3건 규모',
      '기존 API 사용처에 영향 없이 정산 대상만 조회하는 경로 확보',
    ],
    tags: ['정산·결제 정합성', '하위 호환 API 설계', '데이터 소유권'],
    detail: {
      period: '2026.04 · 효성에프엠에스 Connect',
      summary: '판정 규칙을 소비자에 복제하지 않고, 원장 API를 확장해 해결',
      context:
        '정산 메뉴는 하나의 화면에 두 영역으로 구성됩니다. 정산내역을 조회해 그리드에 표시하고, 그 결과에서 추출한 조건으로 정산대상 결제내역을 다시 조회합니다. 두 영역의 건수와 결제금액 합계는 반드시 일치해야 합니다. 정산대상 결제내역 조회는 결제 메뉴의 결제내역조회와 동일한 계정계 API를 사용합니다.',
      problem:
        '동일 조건에서 정산대상 결제내역이 더 많은 건수를 반환했습니다. 정산 처리 시스템은 결제 데이터 중 정산 대상만 선별해 정산 데이터를 생성하는데, 조회는 그 판정 없이 결제 데이터를 그대로 반환하고 있었습니다. 원장의 결제테이블과 정산테이블을 직접 대조한 결과 원인은 결제수단마다 달랐습니다. 카드는 매입 전 취소로 정산 대상이 아니고, CMS는 네트워크 오류로 배치가 처리하지 못한 미편입 건이며, 휴대전화는 정산테이블의 결제일이 실제 결제일이 아니라 정산 작업 시점의 날짜가 일괄로 기록된 값이었습니다. 앞의 둘은 조회 대상 선정의 문제였고, 휴대전화는 같은 이름의 컬럼이 결제수단에 따라 다른 의미를 갖는 문제였습니다.',
      constraint:
        '계정계 DB는 계정계 WAS만 접근할 수 있다는 전사 규칙이 있어 채널은 API로만 접근하며, API 내부의 쿼리와 코드는 볼 수 없습니다. 또한 이 조회 API는 결제내역조회와 동일한 API라, 기존 동작을 바꾸면 결제 화면이 영향을 받습니다.',
      solution:
        '먼저 계정계 담당팀에 쿼리 수정을 요청했습니다. 정산 대상 판정을 쿼리에 넣어 정산 대상만 반환해 달라는 것이었습니다. 거절당했습니다. 쿼리가 복잡하고 길어 변경 영향을 통제할 수 없고, 결제내역조회가 이미 그 API를 쓰고 있어 기존 동작을 바꿀 수 없다는 이유였습니다. 협의를 거쳐 선택적 파라미터를 추가해 조건절을 분기하는 데까지 합의했습니다. Connect에서 응답을 후처리하는 방식은 선택하지 않았습니다. Connect는 조회 소비자일 뿐 정산 데이터를 생성하거나 판정하는 시스템이 아니기 때문입니다. 합의된 범위 안에서 원인 분석 결과와 판정 규칙을 정리해, 제외 대상 상태 코드·기존 소비자 무영향 보장 구조까지 스펙으로 만들어 전달했습니다. 파라미터를 주지 않으면 기존과 동일하게 동작하고, 주면 정산 처리 시스템이 기록한 정산 비대상 상태 코드가 쿼리에서 제외됩니다. 조회 축도 정리해, 정산대상 결제내역은 정산내역에서 추출한 결제일로 조회하되 휴대전화만 정산일을 축으로 사용했습니다. 정산일이 두 테이블에서 의미가 같은 유일한 축이었기 때문입니다.',
      impact:
        '같은 화면의 두 영역이 다른 숫자를 보여주던 문제가 사라지면서, VIP 고객사에서 월 3건 규모로 제기되던 VoC가 발생하지 않습니다. 계정계 원장 데이터를 직접 조회해 정답 집합과 대조했고, 결제일·정산일 기준과 결제수단 조합 전반에서 두 영역의 건수·금액이 일치함을 확인했습니다. 미처리 건이 재처리되면 정산 데이터가 생성되고 조회에도 함께 나타나므로, 조회 결과가 정산 데이터의 현재 상태를 그대로 따라갑니다. 선택적 파라미터 방식이라 기존 API 소비자에 영향이 없습니다.',
      insight:
        '가장 오래 걸린 것은 휴대전화였습니다. 데이터가 잘못된 줄 알았는데, 확인해보니 데이터는 멀쩡했고 같은 이름의 컬럼이 다른 의미를 담고 있었습니다. 하나의 컬럼이 문맥에 따라 다른 뜻을 가지면 그 문맥을 모르는 쪽은 반드시 틀립니다. 정산 데이터가 사실이고 조회는 그 사실의 파생입니다. 어느 시점에 조회해도 두 영역이 일치하는 것은 조회가 스스로 계산하지 않기 때문입니다. 다만 결제수단별 조회 축 분기는 결국 소비자에 남았고, 새 결제수단이 다른 정산 주기를 갖는다면 함께 수정해야 합니다.',
      tech: 'Java · Spring Boot · Vue.js',
    },
  },
  {
    title: '응답 크기 제어를 통한 정산대상 결제내역 대량 엑셀 추출',
    points: [
      '대량 조회 시 계정계 다운의 한계 지점이 쿼리가 아니라 한 응답에 담기는 행 수임을 규명',
      '1,000건 단위 페이징 순회와 SXSSF 스트리밍으로 계정계·배치 양쪽 메모리 상주 행 수를 총량과 무관한 상수로 고정',
      '계정계가 공용 시스템임을 고려해 병렬 호출 미적용, 추출 시간보다 안정성 우선',
    ],
    result: [
      '계정계를 고치지 않고 15만 건 엑셀 8분 내 추출',
      '5만 건 조회 제한 해제',
      '매월 반복되던 수기 추출 업무 제거',
    ],
    tags: ['메모리 상수화', 'SXSSF 스트리밍', '외부 제약 흡수'],
    detail: {
      period: '2026.04 · 효성에프엠에스 Connect · Excel Batch',
      summary: '15만 건 8분, 계정계 무수정. 5만 건 가드레일과 수기 추출 제거',
      context:
        '전사 대량 엑셀 표준 정책은 30만 건까지 허용합니다. 대량 엑셀은 비동기 구조로, 사용자가 조회 조건과 함께 신청하면 CMS+의 엑셀관리 테이블에 적재되고 주기적으로 기동하는 엑셀 배치가 파일을 생성한 뒤 종료합니다. 배치는 신청 조건만 넘겨받으므로 Connect 화면이 수행하던 계정계 조회를 배치가 한 벌 더 갖고 있어야 합니다.',
      problem:
        '정산대상 결제내역조회는 5만 건으로 제한되어 있었습니다. 과거 대량 조회로 계정계가 여러 차례 다운된 이력이 있어 임시로 낮춰 걸어둔 가드레일이었고, 그 상태로 수 년간 운영되고 있었습니다. 조회 대상이 10만 건 규모를 넘으면 계정계가 다운됐는데, 다운된 것은 DB가 아니라 계정계 애플리케이션 서버였습니다. 조회 결과 전체를 메모리에 적재해 응답을 구성하는 구조라 단 한 번의 요청으로도 프로세스가 내려갔습니다. 사내에서는 무거운 쿼리 탓으로 설명되고 있었으나, 실제 한계 지점은 쿼리가 아니라 한 응답에 담기는 행 수였습니다. 그 결과 5만 건을 넘는 대형 고객사 3곳은 매월 담당자에게 요청해 수기로 추출받고 있었습니다.',
      constraint:
        '계정계 API와 내부 쿼리는 수정할 수 없고 계정계 DB에 직접 접근할 수도 없습니다. 죽는 쪽을 고칠 수 없으므로 죽지 않도록 호출하는 방법을 찾아야 했습니다. 스테이징 환경에는 계정계 API가 연동되어 있으나 조회 대상 데이터가 1천 건 규모에 불과해 대량 조회 동작을 사전 검증할 수단도 없었습니다.',
      solution:
        '한 응답의 행 수가 한계라면, 한 응답에 담기는 행 수를 데이터 총량과 무관한 상수로 만들면 됩니다. 대량 조회를 1,000건 단위 페이징으로 분할해 계정계 API를 순회 호출했습니다. 다만 이대로면 15만 건을 합치는 쪽이 배치로 바뀔 뿐이므로, 합치지 않았습니다. 받은 페이지를 즉시 시트에 쓰고 버리며 SXSSF의 Row Access Window를 API 페이지 크기와 맞춰 시트에 쓰인 행도 디스크로 흘려보냈습니다. 계정계와 배치 양쪽 모두 메모리 상주 행 수가 전체 건수와 무관하게 고정됩니다. 병렬 호출은 적용하지 않았습니다. 페이징으로 나눠도 계정계 DB가 수행하는 조회 자체가 가벼워지지 않고, 계정계는 우리만 쓰는 시스템이 아니기 때문입니다. 추출은 비동기라 시간이 사용자 대기로 이어지지 않으므로, 시간을 내주고 공용 시스템의 안정성을 사는 쪽을 택했습니다.',
      impact:
        '15만 건 규모 엑셀을 계정계 장애 없이 8분 내에 추출합니다. 5만 건 가드레일이 필요 없어졌고 대형 고객사가 담당자를 거치지 않고 직접 추출하며, 매월 반복되던 수기 추출 운영 업무를 제거했습니다. 계정계는 한 줄도 수정하지 않아 해당 API를 공유하는 타 시스템에 영향이 없습니다. 대신 DB는 같은 조회를 페이지 수만큼 반복 수행합니다. 죽는 쪽은 애플리케이션 서버였고 DB는 견디는 쪽이었으므로, 견디는 쪽에 반복 비용을 지우고 죽는 쪽의 상주량을 상수로 묶는 교환을 택했습니다.',
      insight:
        '계정계 쿼리 개선을 먼저 요청했습니다. 사내에서는 이 장애가 무거운 쿼리 탓으로 설명되고 있었고 저도 그렇게 보고 있었으나, Task 01과 같은 협의에서 여러 시스템이 공유하는 쿼리라 변경 영향을 통제할 수 없다는 이유로 함께 거절당했습니다. 방향이 바뀐 것은 내려간 쪽을 확인하면서였습니다. 계정계가 대량 응답을 감당하지 못해 죽는다면, 그 응답을 대신 받아 들고 있을 배치라고 다를 이유가 없습니다. 문제의 뿌리가 계정계 특유의 사정이 아니라 전체 결과를 메모리에 적재하는 구조 자체에 있다면, 그 구조를 그대로 옮겨오는 순간 우리도 같은 방식으로 죽습니다. 메모리 문제는 옮겨서는 해결되지 않으므로 어느 쪽에도 쌓이지 않게 만들어야 합니다. 다만 이 판단은 관측과 추론에 기댄 것입니다. 계정계는 내부를 볼 수 없는 시스템이라 힙 덤프나 GC 로그를 직접 확인할 수 없었고, 담당팀에 원인 확인을 요청해 추정을 확증으로 바꾸는 경로는 남아 있었습니다.',
      tech: 'Java · Spring Boot · Apache POI(SXSSF) · Vue.js',
    },
  },
  {
    title: 'CMS 결제 요청 실패 청구의 상태 고착 해소 및 실패 보정 자동화',
    points: [
      '결과를 받기 전에 상태를 먼저 바꾸는 구조가 이중 출금 방지 장치임을 확인하고, 전송 로직은 보존한 채 예외 경로에만 개입',
      '되돌려도 안전한 실패(명시적 거부)만 대기로 복구하고, 접수 여부를 알 수 없는 타임아웃 건은 제외하는 보정 규칙 수립',
      '예외를 즉시 판정하지 않고 전송이 모두 끝난 뒤 한 번에 조회해 원인을 확인하는 2단계 보정으로 정상 전송 흐름에 영향 없음',
    ],
    result: [
      '고착 청구 약 2만 건 일괄 보정 · 이후 발생 건 배치 자동 복구',
      '운영자가 프로덕션 DB에서 청구 상태를 직접 바꾸던 작업 제거',
    ],
    tags: ['Spring Batch', '이중 출금 방지', '실패 정정 정책'],
    detail: {
      period: '2026.02 · 효성에프엠에스 CMS+',
      summary: '고착 2만 건 해소. 되돌려도 안전한 실패만 정정해 이중 출금 차단',
      context:
        'CMS 결제 요청 배치는 매일 17:30에 실행되며 결제예정일이 익영업일인 청구를 수집해 계정계로 전송합니다. 처리를 시작하면 API 호출 결과와 관계없이 청구상태를 결제중으로 먼저 바꾸고, 실제 전송 성공 여부는 결제송신요청 플래그에 따로 기록합니다. 2영업일 뒤 결과를 수신하는 배치는 결제일이 전영업일이고 청구상태가 결제중이며 결제송신요청이 Y인 청구를 매칭합니다.',
      problem:
        '고객사의 서비스 상태가 이용중지·해지예정·해지인 경우 계정계가 예외를 반환하는데, 기존 배치는 예외 발생 여부만 기록할 뿐 원인을 구분하지도 상태를 보정하지도 않았습니다. 상태는 이미 결제중으로 바뀐 뒤이고 요청 자체가 실패했으므로 결과를 받아 상태가 넘어가는 경로도 없습니다. 결제중 청구는 삭제할 수 없어 고객사의 서비스 재이용이 막혔고 VoC로 이어졌으며, 해소하려면 운영자가 프로덕션 DB에서 상태를 직접 변경해야 했습니다. 이렇게 고착된 청구가 약 2만 건 쌓여 있었습니다.',
      constraint:
        '납부자 계좌에서 실제 출금을 발생시키는 핵심 배치입니다. 수 년간 운영되어 왔고 변경 시 영향 범위를 통제하기 어렵습니다. 또한 계정계가 반환하는 예외는 원인을 구분하지 않아, 서비스 상태로 인한 실패와 네트워크 오류로 인한 실패가 동일한 예외로 전달됩니다.',
      solution:
        '전송 로직은 건드리지 않았습니다. 결과를 받기 전에 결제중으로 바꾸는 구조는 이중 출금을 방지하는 장치로 판단했기 때문입니다. 전송이 나간 뒤 상태를 바꾸기 전에 프로세스가 죽으면 청구가 대기로 남아 다음 실행에서 다시 선정되고 출금이 두 번 나갑니다. 결제중 고착은 불편이지만 이중 출금은 사고이므로, 구조는 그대로 두고 예외 경로에만 개입했습니다. 실패 보정을 원인 확인과 상태 보정 두 단계로 분리해, 예외가 나면 즉시 판정하지 않고 버퍼에 적재한 뒤 전송이 모두 끝난 후 고객 관리 시스템에서 서비스 상태를 벌크 조회해 원인을 확정했습니다. 전송 루프 한가운데에 외부 호출을 추가하면 그 실패가 정상 결제 전송에 영향을 줄 수 있고, 멀티스레드 Step이라 건별 조회는 동시 호출을 집중시키기 때문입니다. 수집에는 JobExecution 식별자를 키로 하는 Thread-safe 공용 배치 저장소를 만들어 다른 배치에서도 재사용할 수 있게 했습니다. 서비스 상태가 원인으로 확인된 건만 대기로 되돌리고, 타임아웃·네트워크 오류 건은 요청이 실제로 접수되었는지 알 수 없으므로 건드리지 않았습니다.',
      impact:
        '배포 시점에 고착되어 있던 약 2만 건을 대상을 특정해 일괄 보정했고, 이후 발생 건은 배치가 자동으로 복구합니다. 과거 건과 신규 건 모두에서 동일 유형의 VoC가 발생하지 않습니다. 운영자가 프로덕션 DB에서 상태를 직접 변경하던 작업을 제거했으며, 전송 로직을 바꾸지 않고 예외 경로에만 개입했으므로 정상 결제 흐름에 영향이 없습니다.',
      insight:
        '기존 배치에는 실패를 정정하는 정책 자체가 없었습니다. 예외가 발생했다는 사실만 기록될 뿐, 그 예외를 어떻게 다룰지에 대한 규칙이 없었습니다. 무엇이 실패의 원인이었는지는 기준이 아니었습니다. 요청이 실제로 나갔는지 확정할 수 있는가로 갈랐습니다. 그리고 납득되지 않는 코드에는 대개 이유가 있습니다. 그 이유를 모르는 채로 고치는 것은 개선이 아닙니다. 남은 과제는 결제중이 뭉개고 있는 "시도"와 "성공"을 상태로 분리하고, 계정계에 멱등성 키를 도입해 재시도 자체를 안전하게 만드는 것입니다.',
      tech: 'Java · Spring Boot · Spring Batch · ConcurrentHashMap · Oracle',
    },
  },
  {
    title: '외부 연동 실패 메시지의 노출 차단 및 실패 알림 자동화',
    points: [
      '외부 시스템 예외 메시지가 비고 컬럼을 거쳐 고객사 화면에 노출되던 문제를 AOP 공통 실패 처리로 경계에서 차단',
      '기록(로그)·표시(안내 문구)·전달(운영자 문자 알림)의 대상을 분리',
      '실패를 고객사 문의가 아닌 시스템 알림으로 인지, 재결제 필요 건 즉시 확인',
    ],
    result: [
      '월 10건 규모의 동일 유형 VoC 제거',
      '운영자의 비고 문구 수기 보정 제거',
    ],
    tags: ['Spring AOP', '시스템 경계 설계', '장애 탐지'],
    detail: {
      period: '2025.10 · 효성에프엠에스 CMS+',
      summary: 'VoC 월 10건 제거. 기록·표시·전달의 대상을 분리',
      context:
        '결제 처리 결과는 결제 테이블의 비고 컬럼에 문구로 기록되고, 이 컬럼은 수납 조회를 포함한 다수의 고객사 노출 화면에 그대로 표시됩니다. 계정계·대외계 등 외부 연동에서 예외가 발생하면 CMS+는 외부 시스템의 오류 메시지를 전달받는데, 그 메시지만으로는 어느 연동 단계의 오류인지 구분하기 어려웠고 하위 시스템의 예외가 문자열로 상위 채널까지 그대로 전파되고 있었습니다.',
      problem:
        '기존 로직은 Exception Message를 비고 컬럼에 그대로 기록했습니다. 그 결과 고객사가 수납 조회 화면에서 내부 시스템 오류 메시지를 보게 되었고, 자신의 납부자에게 왜 출금이 실패했는지 설명할 수 없어 월 10건 규모의 VoC로 이어졌습니다. 더 큰 문제는 실패 사실이 전달되지 않는다는 점이었습니다. 예외는 비고에만 남고 별도 알림이 없어, 운영자는 고객사가 VoC를 제기해야 실패를 인지했습니다. 이 중에는 재결제 요청이 필요한 건도 있어 인지가 늦어질수록 대응이 어려워집니다.',
      solution:
        '외부 연동 호출부의 실패 처리 로직을 AOP로 공통화해 한 곳에 응집시켰습니다(적용 대상은 사용자 요청 기반 단건 호출, 대량 배치는 제외). 기록·표시·전달의 대상을 분리해, 원본 예외는 기존대로 애플리케이션 로그에 남기고, 비고 컬럼에는 고객사가 이해할 수 있는 안내 문구를 기록하며, 운영자에게는 발생 시각·대상 식별 정보·호출 API·오류 내용을 문자로 발송했습니다. 예외의 원인과 후속 조치는 사람이 판단해야 하므로 판단에 필요한 정보를 전달하는 데 목적을 뒀습니다.',
      impact:
        '고객사 노출 화면에 내부 예외 문구가 표시되지 않습니다. 월 10건 규모로 발생하던 동일 유형의 VoC가 사라졌고, 운영자가 비고를 수기로 수정하던 작업을 제거했습니다. 외부 연동 실패를 고객사의 문의가 아니라 시스템 알림으로 인지해 재결제가 필요한 건을 바로 확인합니다.',
      insight:
        '기록의 대상과 표시의 대상은 다릅니다. 비고 컬럼은 내부 처리 결과를 남기는 로그이면서 동시에 고객사에게 보여주는 안내 문구였고, 예외가 발생하면 내부의 언어가 그대로 밖으로 전달됐습니다. 시스템 경계를 넘을 때 예외를 그대로 통과시키면 내부 구현이 외부로 새어 나갑니다. 무엇보다 우리보다 고객사가 실패를 먼저 발견했다는 점이 가장 큰 문제였습니다. 시스템이 자신의 실패를 알리지 못하면 그 역할을 사용자가 대신하게 됩니다. 다만 이 작업은 실패를 표현하고 전달하는 단계까지가 범위였고, 실패를 상태로 관리해 재처리 대상으로 다루는 구조는 남은 과제입니다.',
      tech: 'Java · Spring Boot · Spring AOP · Oracle',
    },
  },
];

// 그 외 담당 과제 (이력서 03 Track Record) — 최신순
export const trackRecord = [
  { period: '2026.08', title: '자동재결제 배치 · 배치 중 변경된 결제수단 처리 개선', service: 'CMS+' },
  { period: '2026.07', title: '가상계좌 보정배치 · 콜백 유실·당일 입금취소 분기 신설', service: 'CMS+' },
  { period: '2026.04', title: 'SMS 발송·원생 신규 등록 시 불필요 예약어 검증 제거', service: 'Ibill' },
  { period: '2026.02', title: '지급대행 어드민 · 테이블·엔티티 설계 및 비즈니스 로직 구현', service: '신규 웹뷰' },
  { period: '2026.01', title: '비회원 결제 정보 표기 · 공통 응답 DTO 스펙 정합화', service: 'CMS+' },
  { period: '2025.12', title: '청구 관리 페이지네이션 · Offset → Cursor 전환', service: 'CMS+' },
  { period: '2025.10', title: '결제 상태 환불 추가 · 결제 비즈니스 로직 전반 수정', service: 'CMS+' },
  { period: '2025.10', title: '인쇄 페이지 대량 렌더링 개선 · Redis 캐싱 전환', service: 'Connect' },
  { period: '2025.10', title: '버튼 클릭 이벤트 중복 방지 · 공용 컴포넌트화', service: 'CMS+' },
  { period: '2025.10', title: 'SQL Injection 대응 · PreparedStatement 전환', service: 'Square' },
  { period: '2025.09', title: '수납률 리포트 · 고객별 스케줄러 및 알림톡 발송', service: 'CMS+' },
  { period: '2025.08', title: '가상계좌 예금주명 동기화', service: 'CMS+' },
  { period: '2025.07', title: '신용카드 카드사명 데이터 보정', service: 'CMS+' },
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
    desc: '채널계 서비스의 백엔드·프론트엔드 개발과 운영을 담당합니다. 결제·정산·계약 도메인에서 계정계·대외계 연동, 배치, 데이터 정합성 문제를 주로 다룹니다. 2025년 10월부터는 개발과 운영을 겸하고, 2026년 8월부터 Ibill의 오너를 맡고 있습니다.',
    points: [
      '원장 테이블 직접 대조로 결제수단별 정산 불일치 원인을 규명하고, 정산 대상 판정 규칙을 소비자에 복제하지 않고, 기존 사용처에 영향 없는 파라미터를 스펙으로 설계해 계정계 API 확장을 협의로 이끌어냄',
      '계정계 다운의 실제 원인이 쿼리가 아니라 한 응답의 행 수임을 규명. 페이징 순회 호출과 SXSSF 스트리밍으로 양쪽 메모리 상주량을 상수로 고정해 계정계를 고치지 않고 15만 건 엑셀 8분 내 추출',
      '결과를 받기 전에 상태를 먼저 바꾸는 구조가 이중 출금 방지 장치임을 확인하고 전송 로직을 보존한 채 예외 경로만 보정. 되돌려도 안전한 실패만 정정해 고착 2만 건 해소',
      'AOP로 기록·표시·전달의 대상을 분리해 외부 연동 예외의 고객사 노출을 차단하고, 실패를 시스템 알림으로 인지하도록 전환 (VoC 월 10건 제거)',
      '전자계약 신규 구축 참여 — 화면·파트너 연동 구현 분담, 기획 및 파트너 스펙 협의 참여 (개발 2·기획 1·영업 1 + 파트너사 개발 3, 누적 5,000건)',
      'Branch Manager 신규 구축 참여 — 조직도·회원·사용자·결제·정산 다섯 개 도메인 중 결제·정산 채널의 백엔드·프론트엔드 담당 (개발 4·기획 1·영업 1)',
      '2025년 10월부터 개발과 운영 겸무 — 주 1일씩 CMS+와 Ibill의 배치 모니터링·VoC 대응',
      '2026년 8월부터 Ibill 오너 — 요구사항 구조화, 기존 개선·신규 개발·보류 결정, 운영 이슈 원인 분석부터 배포까지 직접 처리',
    ],
    tags: ['Spring Boot', 'Spring Batch', 'Vue.js', 'Oracle'],
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
  { label: 'Backend', items: ['Spring Batch', 'Spring AOP', 'Spring Security', 'MyBatis', 'Apache POI', 'Spring Data JPA'] },
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
    note: 'GPA 4.38 / 4.5',
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
