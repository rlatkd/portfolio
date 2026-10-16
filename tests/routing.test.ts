import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePostQuery, getPostListing, listingUrl } from '../src/shared/lib/post-listing';
import { escapeXml, serializeJsonLd } from '../src/shared/lib/seo';
import { dateFormatter } from '../src/shared/utils/dateFormatter';

const posts = Array.from({ length: 25 }, (_, index) => ({ slug: `post-${index}`, metadata: { index, title: `Post ${index}`, category: index < 20 ? 'Java' : 'API', publishedAt: '2024-01-01', summary: 'Original summary' } }));
test('invalid, repeated and out-of-range page parameters cannot produce indexable empty pages', () => {
  for (const page of ['0', '-1', 'abc', '1.5', '', 'Infinity', '9007199254740992', ['1', '2']]) assert.equal(parsePostQuery({ page }), null);
  assert.equal(getPostListing(posts, { page: '999' }), null);
  assert.equal(getPostListing(posts, { category: 'missing' }), null);
  assert.equal(getPostListing(posts, { page: '2', category: 'API' }), null);
  assert.equal(getPostListing(posts, { page: '2', category: 'JAVA' })?.posts.length, 10);
  assert.equal(getPostListing(posts, { page: '3' })?.posts.length, 5);
});
test('pagination URLs preserve and encode category while normalizing page one', () => {
  assert.equal(listingUrl(1), '/posts');
  assert.equal(listingUrl(2), '/posts?page=2');
  assert.equal(listingUrl(2, 'a&b'), '/posts?category=a%26b&page=2');
});
test('RSS and JSON-LD text cannot break their containing documents', () => {
  assert.equal(escapeXml('<A & "B">'), '&lt;A &amp; &quot;B&quot;&gt;');
  const json = serializeJsonLd({ headline: '</script><script>alert(1)</script>' });
  assert.ok(!json.includes('<'));
  assert.equal(JSON.parse(json).headline, '</script><script>alert(1)</script>');
});
test('dates remain deterministic across time zones and year boundaries', () => {
  assert.equal(dateFormatter('2024-12-31'), 'December 31, 2024');
  assert.equal(dateFormatter('invalid'), '');
  assert.equal(dateFormatter('2024-12-31', true, new Date('2025-01-01T00:00:00+09:00')), 'December 31, 2024 (1d ago)');
});
