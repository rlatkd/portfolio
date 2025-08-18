import { slugify } from '@/shared/utils/slugify';

type PostContentsProps = {
  level: number;
  text: string;
  id: string;
}

export const getPostContents = (content: string) => {
  const contentRegex = /^(#{1,6})\s+(.+)$/gm;
  const contents: PostContentsProps[] = [];
  let mdxInfo;

  while ((mdxInfo = contentRegex.exec(content)) !== null) {
    const level = mdxInfo[1].length;
    const text = mdxInfo[2].trim();
    const id = slugify(text);

    contents.push({ level, text, id });
  }

  return contents;
}
