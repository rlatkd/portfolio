import Image from 'next/image';

type RoutingProps = {
  name?: string;
  icon?: JSX.Element;
}
  
// 헤더 nav
export const routing: Record<string, RoutingProps> = {
  '/': {
    name: 'XOps',
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