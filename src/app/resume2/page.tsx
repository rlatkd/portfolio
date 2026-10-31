import type { Metadata } from 'next';
import ResumeDocument from '../resume/resume-document';
import styles from './classic-resume.module.css';

export const metadata: Metadata = {
  title: '이력서 · 기존 디자인',
  description: '현재 이력서 내용을 기존 흑백 디자인으로 비교하는 경력기술서',
  alternates: { canonical: '/resume2' },
  robots: { index: false, follow: true },
};

export default function ResumeComparisonPage() {
  return <div className={styles.classic}><ResumeDocument runningTitle='RESUME' variant='resume2' /></div>;
}
