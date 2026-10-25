import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { profile } from '@/shared/data/site-data';
export const runtime = 'nodejs';

// OG 이미지는 CSS 변수를 쓸 수 없어 기본 다크 테마 토큰의 hex 값을 직접 쓴다.
const color = {
  bg: '#0f172a',
  fg: '#e2e8f0',
  muted: '#94a3b8',
  accent: '#5eead4',
  line: '#243148',
};

const fonts = Promise.all(['Bold', 'Medium'].map(async weight => {
  const buffer = await fs.readFile(path.join(process.cwd(), `public/fonts/Pretendard-${weight}.woff`));
  return { name: 'Pretendard', data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer, weight: (weight === 'Bold' ? 700 : 500) as 700 | 500, style: 'normal' as const };
}));

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = (url.searchParams.get('title') || profile.name).slice(0, 160);
  const subtitle = (url.searchParams.get('subtitle') || (url.searchParams.has('title') ? '' : profile.nameEn)).slice(0, 160);
  const label = profile.role.toUpperCase();
  const site = 'www.sanghunkim.com';

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
            <rect width='32' height='32' rx='8' fill='#0f172a' />
            <rect x='0.5' y='0.5' width='31' height='31' rx='7.5' fill='none' stroke='#243148' />
            <path d='M16 6L26 12L16 18L6 12Z' fill='#5eead4' />
            <path d='M6 18L16 24L26 18' fill='none' stroke='#5eead4' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: await fonts,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    }
  );
}
