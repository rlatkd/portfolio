// Only verified public resources; retired demo hosts are not linked as working services.
export const projectResources: Record<string, { demo?: { href: string; label: string }; architecture?: string; note?: string }> = {
  'https://github.com/rlatkd/up-quant': {
    note: '실행 방법과 환경 설정은 저장소 README에서 확인할 수 있습니다.',
  },
  'https://github.com/rlatkd/portfolio': {
    demo: { href: '/', label: '사이트 보기' },
  },
  'https://github.com/rlatkd/cms-plus': {
    architecture: 'https://github.com/rlatkd/cms-plus/blob/dev/assets/system-architecture.png',
    note: '과거 공개 데모 도메인은 현재 연결되지 않아 코드·구조도·결과 화면으로 확인할 수 있습니다.',
  },
  'https://github.com/rlatkd/sale-sync': {
    demo: { href: 'https://raw.githubusercontent.com/ssg-salesync/.github/main/assets/page/orderAdd.gif', label: '주문 등록 시연 GIF' },
    note: '운영 서버 대신 프로젝트 당시의 기능 시연을 제공합니다.',
  },
};
