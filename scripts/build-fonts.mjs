// 본문 글꼴 만들기. 실행: pnpm fonts:build
// Pretendard 1.3.9 원본(assets/fonts/Pretendard-*.woff, 공유 카드 이미지도 같이 씀)에서 사이트에 쓰인 글자만 남겨
// 굵기별 woff2 한 파일씩 만든다(공식 다이나믹 서브셋은 페이지마다 17~24조각을 받아 더 무겁다).
// OFL FAQ 2.6 · 2.8: 글자를 덜어 낸 웹폰트는 수정 버전(Modified Version)이라 예약 이름 'Pretendard'를 쓸 수 없다.
// 그래서 글꼴 이름(이름 표 1 · 2 · 3 · 4 · 6 · 16 · 17)과 CSS 이름 · 파일 이름을 Portfolio Sans로 바꾼다.
// 저작권 · 상표 · 제작자 · 라이선스 정보(이름 표 0 · 7 · 8 · 9 · 11 · 12 · 13 · 14)는 그대로 두고, 라이선스 전문은 public/fonts/OFL.txt.
// 글을 추가해 새 글자가 생기면 tests/fonts.test.ts가 실패한다. 그때 이 스크립트를 다시 실행한다.
import fs from 'node:fs/promises';
import subsetFont from 'subset-font';
import { collectSiteCharacters } from './lib/site-characters.mjs';
import { renameFont } from './lib/font-name.mjs';

const KEEP_NAME_IDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17];
const fonts = [
  {
    source: 'assets/fonts/Pretendard-Medium.woff',
    target: 'public/fonts/portfolio-sans-medium.woff2',
    names: { 1: 'Portfolio Sans Medium', 2: 'Regular', 3: '1.309;Portfolio Sans Medium', 4: 'Portfolio Sans Medium', 6: 'PortfolioSans-Medium', 16: 'Portfolio Sans', 17: 'Medium' },
  },
  {
    source: 'assets/fonts/Pretendard-Bold.woff',
    target: 'public/fonts/portfolio-sans-bold.woff2',
    names: { 1: 'Portfolio Sans', 2: 'Bold', 3: '1.309;Portfolio Sans Bold', 4: 'Portfolio Sans Bold', 6: 'PortfolioSans-Bold', 16: 'Portfolio Sans', 17: 'Bold' },
  },
];

const characters = collectSiteCharacters();
for (const font of fonts) {
  // 1) 쓰인 글자만 남긴다(OpenType 기능은 모두 유지: 숫자 폭 맞춤 tnum 등). 2) 이름을 바꾼다. 3) 글자는 그대로 두고 woff2로 묶는다.
  const subset = await subsetFont(await fs.readFile(font.source), characters, { targetFormat: 'truetype', preserveNameIds: KEEP_NAME_IDS });
  const renamed = renameFont(subset, font.names);
  const woff2 = await subsetFont(renamed, '', { keepAllGlyphs: true, targetFormat: 'woff2', preserveNameIds: KEEP_NAME_IDS });
  await fs.writeFile(font.target, woff2);
  console.log(`${font.target}: ${Math.round(woff2.length / 1024)}KB`);
}
await fs.mkdir('scripts/fonts', { recursive: true });
await fs.writeFile('scripts/fonts/portfolio-sans-characters.json', `${JSON.stringify({
  note: 'pnpm fonts:build가 만든다. public/fonts/portfolio-sans-*.woff2에 담긴 글자 목록(직접 고치지 않는다).',
  source: 'Pretendard 1.3.9 (assets/fonts/Pretendard-Medium.woff, Pretendard-Bold.woff)',
  characters,
}, null, 2)}\n`);
console.log(`글자 ${[...characters].length}개`);
