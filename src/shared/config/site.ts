const configuredUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.sanghunkim.com';
const parsedUrl = new URL(configuredUrl);
if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('NEXT_PUBLIC_BASE_URL must be an HTTP(S) URL');
export const baseUrl = parsedUrl.origin;
// 홈 탭 제목과 같은 값을 공유 카드(OG·X) 제목과 이미지 대체 문구에 쓴다. 제목 구분자는 |
export const siteTitle = '김상훈 | 개발자 포트폴리오';
// 홈 검색 결과 설명. 사이드바 소개(profile.intro)와 About 첫 문단을 합쳐 화면에 보이는 표현으로 쓴다.
export const siteDescription = '데이터 정합성과 시스템 신뢰성을 먼저 두는 금융 도메인 소프트웨어 엔지니어 김상훈입니다. Spring Boot와 Vue.js로 서비스를 개발하고 운영합니다.';
export const authorId = `${baseUrl}/#person`;
export const defaultOgImage = `${baseUrl}/api/og`;
