import type { Metadata } from 'next';
import ResumeDocument from './resume-document';
import styles from './resume-theme.module.css';

export const metadata: Metadata = {
  title: { absolute: 'resume' },
  description: '김상훈 이력서 — 계약·결제·정산 채널을 개발·운영하는 소프트웨어 엔지니어의 경력, 주요 과제, 프로젝트, 기술 스택',
  alternates: { canonical: '/resume' },
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  return <div className={styles.classic}><ResumeDocument /></div>;
}
