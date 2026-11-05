import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { collectSiteCharacters } from '../scripts/lib/site-characters.mjs';
import built from '../scripts/fonts/portfolio-sans-characters.json';

// 2026-11-04: 본문 글꼴(Portfolio Sans)은 사이트에 쓰인 글자만 담는다. 글이나 문구를 바꿔 새 글자가 생겼는데
// 글꼴을 다시 만들지 않으면 그 글자만 다른 글꼴로 보이므로 여기서 잡는다. 실패하면 pnpm fonts:build를 실행한다.
test('every character the site can show is included in the body font', () => {
  const included = new Set(built.characters);
  const missing = [...collectSiteCharacters()].filter(character => !included.has(character));
  assert.deepEqual(missing, [], `본문 글꼴에 없는 글자 ${missing.length}개: ${missing.join('')} → pnpm fonts:build로 글꼴을 다시 만드세요`);
});

test('body font files exist for both weights and stay small', () => {
  for (const weight of ['medium', 'bold']) {
    const size = fs.statSync(`public/fonts/portfolio-sans-${weight}.woff2`).size;
    assert.ok(size > 10_000 && size < 200_000, `${weight}: ${size} bytes`);
  }
});
