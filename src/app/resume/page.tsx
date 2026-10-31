import type { Metadata } from 'next';
import ResumeDocument from './resume-document';

export const metadata: Metadata = {
  title: '이력서',
  description: '김상훈 경력기술서 — 주요 문제 해결 경험, 서비스 구축과 운영·개선 경험',
  alternates: { canonical: '/resume' },
  robots: { index: false, follow: true },
};


export default function ResumePage() {
  return <ResumeDocument />;
}
