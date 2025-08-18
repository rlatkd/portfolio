import React from 'react';
import { slugify } from '@/shared/utils/slugify';

export function HashLevel(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { 
        id: slug,
        style: { scrollMarginTop: '80px' }
      },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading;
}
