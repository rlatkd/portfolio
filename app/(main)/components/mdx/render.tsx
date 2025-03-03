import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import { Code } from '../client/posts/code'
import { Table } from './table'
import { Linker } from './linker'
import { Level } from './level'

export function Render(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}

const components = {
  h1: Level(1),
  h2: Level(2),
  h3: Level(3),
  h4: Level(4),
  h5: Level(5),
  h6: Level(6),
  a: Linker,
  code: Code,
  Table,
}

// function RoundedImage(props) {
//   return <Image alt={props.alt} className="rounded-lg" {...props} />
// }
