import { MDXRemote } from 'next-mdx-remote/rsc';
import { CodeCopier } from '@/entities/Post/ui/CodeCopier';
import { ContentTable } from '@/shared/markdown/content-table';
import { Linker } from '@/shared/markdown/linker';
import { HashLevel } from '@/shared/markdown/hash-level';

export function MdxRenderer(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}

const components = {
  h1: HashLevel(1),
  h2: HashLevel(2),
  h3: HashLevel(3),
  h4: HashLevel(4),
  h5: HashLevel(5),
  h6: HashLevel(6),
  a: Linker,
  code: CodeCopier,
  ContentTable,
}

// function RoundedImage(props) {
//   return <Image alt={props.alt} className='rounded-lg' {...props} />
// }
