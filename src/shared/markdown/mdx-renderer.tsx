import { Children, isValidElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { CodeCopier } from '@/entities/Post/ui/CodeCopier';
import { Linker } from '@/shared/markdown/linker';
import { remarkHeadingIds } from '@/shared/markdown/postContents';
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
      rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
      components={{
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
