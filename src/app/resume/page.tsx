import type { Metadata } from 'next';
import { baseUrl } from '@/shared/config/site';
import { shareCard } from '@/shared/lib/seo';
import ResumeDocument from './resume-document';
import styles from './resume-theme.module.css';

export const metadata: Metadata = {
  title: { absolute: 'resume' },
  // 이력서 1쪽 소개(resume-data.ts introduction)와 같은 표현을 쓴다.
  other: { description: '김상훈 이력서 - 계약·결제·정산이 고객에 닿는 채널 계층을 담당하는 소프트웨어 엔지니어의 경력, 주요 과제, 프로젝트, 기술 스택' },
  alternates: { canonical: '/resume' },
  robots: { index: false, follow: true },
  ...shareCard(`${baseUrl}/resume`),
};

export default function ResumePage() {
  return <div className={styles.classic}><ResumeDocument /></div>;
}
