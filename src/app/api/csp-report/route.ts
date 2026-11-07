// CSP 위반 보고(next.config.js의 report-to · report-uri)를 받아 Vercel 함수 로그에 남긴다.
// report-to는 application/reports+json(보고 배열), report-uri는 application/csp-report(보고 하나)로 온다. 둘 다 본문 그대로 남긴다.
// 누구나 보낼 수 있는 주소라 내용은 앞 4KB만 남기고, 응답은 항상 204다.
const MAX_LOG_LENGTH = 4096;

export async function POST(request: Request) {
  const body = (await request.text().catch(() => '')).slice(0, MAX_LOG_LENGTH);
  if (body) console.warn('csp-report', body);
  return new Response(null, { status: 204 });
}
