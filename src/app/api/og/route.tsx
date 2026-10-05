import { ImageResponse } from 'next/og';
import { profile } from '@/shared/data/site-data';
export const runtime = 'edge';

// OG 이미지는 CSS 변수를 쓸 수 없어 라이트 테마 토큰의 hex 값을 직접 쓴다.
const color = {
  bg: '#f7f4ef',
  fg: '#0a1628',
  muted: '#4a4a6a',
  accent: '#c49a3c',
  line: '#d4cfc6',
};

// 사이트와 같은 Pretendard(layout.tsx와 같은 버전). ImageResponse는 woff2를 못 읽어 woff를 쓴다.
// 실패하면 기본 폰트로 렌더링한다.
const PRETENDARD = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff';

async function loadFont(file: string) {
  try {
    const res = await fetch(`${PRETENDARD}/${file}`);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || profile.name;
  const subtitle = url.searchParams.get('subtitle') || (url.searchParams.has('title') ? '' : profile.nameEn);
  const label = profile.role.toUpperCase();
  const site = 'www.sanghunkim.com';

  const [bold, medium] = await Promise.all([loadFont('Pretendard-Bold.woff'), loadFont('Pretendard-Medium.woff')]);

  const fonts = [
    bold && { name: 'Pretendard', data: bold, weight: 700 as const, style: 'normal' as const },
    medium && { name: 'Pretendard', data: medium, weight: 500 as const, style: 'normal' as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  // 긴 블로그 제목은 글자 크기를 줄인다.
  const titleSize = title.length > 40 ? 56 : title.length > 22 ? 68 : 88;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '72px 80px',
          backgroundColor: color.bg,
          fontFamily: 'Pretendard',
          border: `1px solid ${color.line}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 48, height: 2, backgroundColor: color.accent }} />
          <div style={{ fontWeight: 500, fontSize: 24, letterSpacing: 6, color: color.accent }}>{label}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 1.2,
              color: color.fg,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontWeight: 500, fontSize: 36, color: color.muted }}>{subtitle}</div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 500, fontSize: 24, color: color.muted }}>{site}</div>
          <svg width='56' height='56' viewBox='0 0 32 32'>
            <defs>
              <linearGradient id='gold' x1='0' y1='0' x2='0.35' y2='1'>
                <stop offset='0' stopColor='#f0d68f' />
                <stop offset='0.55' stopColor='#c9a24a' />
                <stop offset='1' stopColor='#9c732a' />
              </linearGradient>
            </defs>
            <polygon points='11,11 21,11 24.5,15.5 16,26 7.5,15.5' fill='url(#gold)' />
            <g stroke={color.bg} strokeWidth='0.9' strokeLinejoin='round' fill='none' opacity='0.85'>
              <line x1='7.5' y1='15.5' x2='24.5' y2='15.5' />
              <line x1='11' y1='11' x2='16' y2='26' />
              <line x1='21' y1='11' x2='16' y2='26' />
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
