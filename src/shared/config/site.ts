const configuredUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.sanghunkim.com';
const parsedUrl = new URL(configuredUrl);
if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('NEXT_PUBLIC_BASE_URL must be an HTTP(S) URL');
export const baseUrl = parsedUrl.origin;
export const siteTitle = '김상훈 · Software Engineer';
export const siteDescription = '데이터 정합성과 시스템 신뢰성을 우선하는 소프트웨어 엔지니어 김상훈의 포트폴리오.';
export const authorId = `${baseUrl}/#person`;
export const defaultOgImage = `${baseUrl}/api/og`;
