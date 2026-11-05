import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
export const runtime = 'nodejs';

// OG 이미지는 CSS 변수를 쓸 수 없어 다크 테마(VS Code Dark+) 토큰의 hex 값을 직접 쓴다.
const color = {
  bg: '#1e1e1e',
  fg: '#e6e6e6',
  accent: '#4fc1ff',
  line: '#3c3c3c',
};

// fs reads physical files; TypeScript import aliases do not resolve filesystem paths.
const fonts = Promise.all(['Bold', 'Medium'].map(async weight => {
  const buffer = await fs.readFile(path.join(process.cwd(), `public/fonts/Pretendard-${weight}.woff`));
  return { name: 'Pretendard', data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer, weight: (weight === 'Bold' ? 700 : 500) as 700 | 500, style: 'normal' as const };
}));

// 2026-11-05: 공유 카드 이미지는 모든 링크 공통 한 가지다. 예전의 제목을 그린 모양(블로그 글 구조화 데이터용)은
// 11-04부터 쓰는 곳이 없어 지웠다. 주소에 title 등 다른 값을 붙여도 같은 그림이 나온다.
export async function GET() {
  // 2026-11-02: 카드의 제목·주소와 겹치지 않도록 이름·직함·도메인을 빼고 아이콘 + portfolio 표시와 사이트의 파일 탭 모양만 그린다.
  const files = ['about.md', 'experience.md', 'tasks/', 'side-projects/', 'posts/'];
  const bars = ['82%', '64%', '90%', '56%'];
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 56, width: '100%', height: '100%', padding: '0 80px', backgroundColor: color.bg, fontFamily: 'Pretendard', border: `1px solid ${color.line}` }}>
        {/* 사이트 사이드바의 '◉ portfolio'와 파비콘을 합친 표시 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width='52' height='52' viewBox='0 0 32 32'>
            <rect width='32' height='32' rx='8' fill='#252526' />
            <rect x='0.5' y='0.5' width='31' height='31' rx='7.5' fill='none' stroke='#3c3c3c' />
            <path d='M16 6L26 12L16 18L6 12Z' fill='#4fc1ff' />
            <path d='M6 18L16 24L26 18' fill='none' stroke='#4fc1ff' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          <div style={{ fontWeight: 500, fontSize: 34, color: color.accent }}>portfolio</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${color.line}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', backgroundColor: '#2d2d2d', borderBottom: `1px solid ${color.line}` }}>
            {files.map((file, i) => (
              <div key={file} style={{ display: 'flex', padding: '14px 24px', fontSize: 22, fontWeight: 500, color: i === 0 ? color.fg : '#8b8b8b', backgroundColor: i === 0 ? '#252526' : 'transparent', borderTop: `3px solid ${i === 0 ? '#0078d4' : 'transparent'}` }}>{file}</div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 40px', backgroundColor: '#252526' }}>
            {bars.map((width, i) => <div key={i} style={{ display: 'flex', width, height: 14, borderRadius: 7, backgroundColor: i === 0 ? '#3a4a57' : color.line }} />)}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await fonts, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' } }
  );
}
