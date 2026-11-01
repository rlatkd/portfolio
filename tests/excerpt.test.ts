import test from 'node:test';
import assert from 'node:assert/strict';
import { getBodyExcerpt, getPostSummary } from '../src/shared/markdown/excerpt';

test('excerpts quote the original beginning without markup, image URLs or invented descriptions', () => {
  assert.equal(getBodyExcerpt('## 제목\n\n**원문**의 [링크](https://example.com)를 `읽는다`.\n\n![이미지](https://example.com/a.png)\n\n다음 문장.'), '제목 원문의 링크를 읽는다. 다음 문장.');
  assert.equal(getBodyExcerpt('<aside>원문 안내</aside>\n\n문장'), '원문 안내 문장');
  assert.equal(getBodyExcerpt('![image](https://example.com/a.png)'), '');
});

test('excerpts consistently truncate at 160 characters without splitting emoji', () => {
  assert.equal(getBodyExcerpt('가'.repeat(160)), '가'.repeat(160));
  assert.equal(getBodyExcerpt('가'.repeat(159) + '😀끝'), '가'.repeat(159) + '😀…');
});

test('post summaries prefer editorial text and fallback excerpts omit fenced code', () => {
  const body = '본문 설명\n\n```java\npublic class Example {}\n```\n\n다음 설명';
  assert.equal(getPostSummary('직접 작성한 요약', body), '직접 작성한 요약');
  assert.equal(getPostSummary('  ', body), '본문 설명 다음 설명');
  assert.equal(getPostSummary(undefined, body), '본문 설명 다음 설명');
});
