import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// 색 토큰(styles/global.css)의 글자 대비를 WCAG 2.x 공식으로 계산해 4.5:1 이상인지 확인한다.
// 보조 글자(--muted)가 탭 줄 · 페이지 바탕에서 4.5:1에 못 미쳤던 문제(다크 4.04:1, 라이트 4.33:1)가 다시 생기지 않게 한다.
const css = fs.readFileSync(path.join(process.cwd(), 'styles/global.css'), 'utf8');

function tokens(selector: RegExp) {
  for (const match of css.matchAll(new RegExp(`${selector.source}\\s*\\{([^}]*)\\}`, 'gm'))) {
    if (!match[1].includes('--muted')) continue;
    return Object.fromEntries([...match[1].matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)].map(([, name, value]) => [name, value]));
  }
  throw new Error(`${selector} 색 토큰을 찾지 못했습니다`);
}

function luminance(hex: string) {
  const [red, green, blue] = [1, 3, 5].map(index => {
    const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

const themes = { light: tokens(/^:root/), dark: tokens(/^\.dark/) };

test('text color tokens keep 4.5:1 contrast on every surface in both themes', () => {
  for (const [theme, palette] of Object.entries(themes)) {
    for (const foreground of ['--fg', '--fg-strong', '--muted', '--accent', '--chip', '--ok']) {
      for (const background of ['--bg', '--surface', '--surface-2']) {
        const ratio = contrast(palette[foreground], palette[background]);
        assert.ok(ratio >= 4.5, `${theme} ${foreground} ${palette[foreground]} on ${background} ${palette[background]}: ${ratio.toFixed(2)}:1`);
      }
    }
    for (const [foreground, background] of [['--on-button', '--button'], ['--on-accent', '--accent'], ['--fg-strong', '--nav-active']]) {
      const ratio = contrast(palette[foreground], palette[background]);
      assert.ok(ratio >= 4.5, `${theme} ${foreground} on ${background}: ${ratio.toFixed(2)}:1`);
    }
  }
});

test('contrast formula matches known WCAG reference values', () => {
  assert.equal(contrast('#000000', '#ffffff').toFixed(2), '21.00');
  assert.equal(contrast('#767676', '#ffffff').toFixed(2), '4.54');
});
