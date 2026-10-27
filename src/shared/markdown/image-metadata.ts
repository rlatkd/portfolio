import metadata from '@/shared/content/image-metadata.json';

type Node = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: Node[] };
const text = (node: Node): string => node.value || node.children?.map(text).join('') || '';
// Display metadata supplements the original Markdown without rewriting it.
export function imageMetadata() {
  return (tree: Node) => {
    let context = '본문';
    let index = 0;
    const visit = (node: Node) => {
      if (/^h[1-6]$/.test(node.tagName || '')) context = text(node);
      if (node.tagName === 'img') {
        const props = node.properties ||= {};
        const entry = (metadata as Record<string, { width?: number; height?: number; alt?: string }>)[String(props.src)];
        props.alt = entry?.alt || props.alt || `${context} 관련 이미지 ${++index}`;
        props.loading = 'lazy';
        props.decoding = 'async';
        if (entry?.width && entry.height && !props.width && !props.height && !props.style) {
          props.width = entry.width; props.height = entry.height;
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
