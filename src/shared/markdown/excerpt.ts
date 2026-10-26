import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

type Node = { type: string; value?: string; children?: Node[] };

// Quote the beginning of the original body; do not paraphrase or add descriptions.
export function getBodyExcerpt(source: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source);
  const plain = (node: Node): string => {
    if (node.type === 'break') return ' ';
    if (node.type === 'image' || node.type === 'imageReference' || node.type === 'definition') return '';
    if (node.type === 'html') return (node.value || '').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]*>/g, ' ');
    if (node.value !== undefined) return node.value;
    const separator = ['paragraph', 'heading', 'link', 'emphasis', 'strong', 'delete'].includes(node.type) ? '' : ' ';
    return node.children?.map(plain).join(separator) || '';
  };
  const text = plain(tree).replace(/\s+/g, ' ').trim();
  const characters = Array.from(text);
  return characters.slice(0, 160).join('') + (characters.length > 160 ? '…' : '');
}
