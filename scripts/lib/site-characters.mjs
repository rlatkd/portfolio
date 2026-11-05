import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// 2026-11-04: 화면에 나올 수 있는 글자를 모은다. 본문 글꼴(Portfolio Sans)을 만들 때(scripts/build-fonts.mjs)와
// 빠진 글자가 없는지 검사할 때(tests/fonts.test.ts) 같은 기준을 쓴다.
// - src의 ts · tsx: 문자열 · 템플릿 문자열 · JSX 글자만 모은다(주석은 화면에 나오지 않아 뺀다)
// - 블로그 글 원문(mdx) 전체와 이미지 대체 문구(image-metadata.json의 alt)
// - 늘 넣는 글자: 키보드 기본 글자(ASCII)와 자주 쓰는 문장 부호(날짜 · 검색어처럼 실행 중에 만들어지는 글자 대비)
const ALWAYS = [
  ...Array.from({ length: 0x7f - 0x20 }, (_, index) => String.fromCharCode(0x20 + index)),
  ' ', '·', '–', '—', '‘', '’', '“', '”', '…', '‹', '›', '×', '©',
].join('');

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', middot: '·', ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', hellip: '…', times: '×', copy: '©' };
const decodeEntities = text => text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, name) => {
  if (name[0] === '#') return String.fromCodePoint(name[1] === 'x' || name[1] === 'X' ? parseInt(name.slice(2), 16) : Number(name.slice(1)));
  return ENTITIES[name.toLowerCase()] ?? match;
});

function files(directory, test) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? files(full, test) : test(entry.name) ? [full] : [];
  });
}

/** 사이트에 나올 수 있는 글자를 코드 포인트 순으로 겹치지 않게 이은 문자열을 돌려준다. */
export function collectSiteCharacters(root = process.cwd()) {
  const characters = new Set(ALWAYS);
  const add = text => { for (const character of decodeEntities(text)) if (character.codePointAt(0) >= 0x20) characters.add(character); };

  for (const file of files(path.join(root, 'src'), name => /\.tsx?$/.test(name))) {
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const visit = node => {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isJsxText(node)) add(node.text);
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  for (const file of files(path.join(root, 'src/shared/content/posts'), name => name.endsWith('.mdx'))) add(fs.readFileSync(file, 'utf8'));
  const images = JSON.parse(fs.readFileSync(path.join(root, 'src/shared/content/image-metadata.json'), 'utf8'));
  for (const entry of Object.values(images)) if (entry.alt) add(entry.alt);

  return [...characters].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join('');
}
