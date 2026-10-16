import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';
import { slugify } from '@/shared/utils/slugify';

type MarkdownNode = {
  type: string;
  depth?: number;
  children?: MarkdownNode[];
  data?: { hProperties?: Record<string, unknown> };
};

type PostContents = { level: number; text: string; id: string };

function assignHeadingIds(tree: MarkdownNode) {
  const contents: PostContents[] = [];
  const used = new Set<string>();
  const visit = (node: MarkdownNode) => {
    if (node.type === 'heading') {
      const text = toString(node as Parameters<typeof toString>[0]);
      const base = slugify(text) || 'section';
      let id = base;
      let suffix = 1;
      while (used.has(id)) id = `${base}-${suffix++}`;
      used.add(id);
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
      contents.push({ level: node.depth!, text, id });
    }
    node.children?.forEach(visit);
  };
  visit(tree);
  return contents;
}

export function remarkHeadingIds() {
  return (tree: MarkdownNode) => { assignHeadingIds(tree); };
}

export function getPostContents(content: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(content);
  return assignHeadingIds(tree);
}
