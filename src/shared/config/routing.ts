import Image from 'next/image';

type RoutingProps = {
  name?: string;
  icon?: JSX.Element;
}
  
// 헤더 nav
export const routing: Record<string, RoutingProps> = {
  '/': {
    name: 'shk',
  },
  '/posts': {
    name: 'Archive',
  },
  '/projects': {
    name: 'Project',
  },
  '/career': {
    name: 'Career',
  },
  '/contact': {
    name: 'Contact'
  },
}