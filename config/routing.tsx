import Image from 'next/image';

type RoutingProps = {
  name?: string;
  icon?: JSX.Element;
}
  
// 헤더 nav
export const routing: Record<string, RoutingProps> = {
  '/': {
    // name: 'home',
    icon: <Image src='/images/logo.jpg' alt="Logo" width={36} height={36} className='rounded' />,
    name: 'KATALOG'
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