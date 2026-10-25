import { strengths } from '@/shared/data/site-data';

// 드롭다운·홈 목록·상세 페이지가 함께 쓰는 짧은 이름 (strengths 순서와 동일)
const shortLabels = ['정산 데이터 정합성 확보', '정산대상 대량 엑셀 추출', '결제중 고착 청구 보정', '외부 연동 실패 알림'];

export const cases = strengths.map((s, i) => ({
  no: i + 1,
  href: `/demo/case/${i + 1}`,
  label: `${String(i + 1).padStart(2, '0')} ${shortLabels[i] ?? s.title}`,
  strength: s,
}));
