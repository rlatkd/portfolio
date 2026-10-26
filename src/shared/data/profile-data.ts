import type { Certification } from '@/shared/types/portfolio';

export const education = [
  {
    period: '2026.03 — 현재',
    org: '성균관대학교 일반대학원',
    detail: '퀀트응용경제학과 · 석사 재학',
  },
  {
    period: '2018.03 — 2023.02',
    org: '경희대학교 전자정보대학',
    detail: '생체의공학과 · 학사 졸업',
    note: 'Thesis: Comparative Study of CNN Models for Liver Tumor Image Classification (2022)',
  },
  {
    period: '2015.03 — 2017.02',
    org: '한서항공직업전문학교',
    detail: '항공정비과 · 전문학사',
  },
];

export const training = [
  {
    period: '2024.02.26 — 2024.08.09',
    title: 'MSA 기반 Full Stack 개발 전문가 양성 과정',
    org: '한국소프트웨어산업협회',
    hours: '960h',
  },
  {
    period: '2023.08.07 — 2024.02.02',
    title: '클라우드 엔지니어 양성 과정',
    org: '신세계아이앤씨',
    hours: '920h',
  },
];

export const awards = [
  {
    date: '2024.08',
    title: 'SW전문인재양성 우수성과 컨퍼런스 우수상',
    org: '정보통신기획평가원',
  },
  {
    date: '2024.08',
    title: '파이널 프로젝트 최우수상',
    org: '한국소프트웨어산업협회',
  },
  {
    date: '2024.08',
    title: '우수 수료생',
    org: '한국소프트웨어산업협회',
  },
  {
    date: '2024.02',
    title: '파이널 프로젝트 최우수상',
    org: '신세계아이앤씨',
  },
];

export const certifications: Certification[] = [
  {
    name: '데이터분석 준전문가 (ADsP)',
    org: '한국데이터산업진흥원',
    date: '2025.06',
    id: 'adsp',
  },
  {
    name: 'SQL 개발자 (SQLD)',
    org: '한국데이터산업진흥원',
    date: '2024.06',
    id: 'sqld',
  },
];
