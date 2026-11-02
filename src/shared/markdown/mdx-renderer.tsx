import { Children, isValidElement } from 'react';
import { getImageProps } from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { CodeCopier } from '@/entities/post/ui/code-copier';
import { Linker } from '@/shared/markdown/linker';
import { remarkHeadingIds } from '@/shared/markdown/post-contents';
import images from '@/shared/content/image-metadata.json';
import { imageMetadata } from '@/shared/markdown/image-metadata';
import { highlightCode } from '@/shared/markdown/highlight-code';

// Velog bodies are Markdown with embedded HTML, rather than executable MDX.
const safeStyle = /^(?:(?:width|height|line-height):\s*\d+(?:\.\d+)?(?:px|%|em)|text-align:\s*(?:left|center|right))(?:;\s*(?:(?:width|height|line-height):\s*\d+(?:\.\d+)?(?:px|%|em)|text-align:\s*(?:left|center|right)))*;?$/;
const schema = {
  ...defaultSchema,
  clobberPrefix: '',
  tagNames: [...(defaultSchema.tagNames || []), 'aside'],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] || []), ['style', safeStyle]],
  },
};

export function MdxRenderer({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkHeadingIds]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], imageMetadata]}
      components={{
        img: ({ node, ...props }) => {
          if (!props.src) return null;
          const entry = (images as Record<string, { unavailable?: boolean; width?: number; height?: number }>)[String(props.src)];
          if (entry?.unavailable) return <span className='text-sm text-muted'>[{props.alt}: 이미지 서버에서 이미지를 제공하지 않습니다.]</span>;
          // 2026-11-02: 크기가 기록된 이미지는 Next.js 이미지 변환기를 거쳐 WebP로, 본문 너비에 맞게 줄여 보낸다.
          // 원문에 적힌 크기(style)는 그대로 지키고, 크기 기록이 없는 새 이미지는 원본을 그대로 쓴다.
          // getImageProps는 next/image와 같은 변환 주소(srcSet)를 만들어 주는 함수다(컴포넌트 대신 써서 서버·테스트 어디서나 같은 <img>가 나온다).
          if (entry?.width && entry.height) {
            const { props: optimized } = getImageProps({ src: String(props.src), alt: props.alt ?? '', width: entry.width, height: entry.height, sizes: '(min-width: 800px) 730px, 100vw' });
            return <img {...optimized} title={props.title} style={{ ...optimized.style, ...props.style }} className={props.className} />;
          }
          return <img {...props} />;
        },
        a: ({ node, ...props }) => <Linker {...props} />,
        pre: ({ children }) => {
          const code = Children.toArray(children).find(isValidElement);
          if (!code || !isValidElement<{ children?: React.ReactNode; className?: string }>(code)) {
            return <pre>{children}</pre>;
          }
          const text = Children.toArray(code.props.children).join('');
          return (
            <CodeCopier
              className={code.props.className}
              highlightedHtml={highlightCode(text, code.props.className)}
            >
              {text}
            </CodeCopier>
          );
        },
      }}
    >
      {source}
    </ReactMarkdown>
  )
}
