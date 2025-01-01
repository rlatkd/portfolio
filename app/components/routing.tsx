type RoutingProps = {
    name?: string;
    icon?: JSX.Element;
  }
  
// 헤더 nav
export const routing: Record<string, RoutingProps> = {
  '/': {
    // name: 'home',
    icon: <img src='/static/images/logo.jpg' className="h-9 w-9"/>,
    name: 'KATALOG'
  },
  '/posts': {
    name: 'Archiving',
  },
  '/projects': {
    name: 'Projects',
  },
  '/about': {
    name: 'Career',
  },
  '/contact': {
    name: 'Contact'
  },
}