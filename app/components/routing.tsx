type RoutingProps = {
    name?: string;
    icon?: JSX.Element;
  }
  
// 헤더 nav
export const routing: Record<string, RoutingProps> = {
  '/': {
    // name: 'home',
    icon: <img src='/static/images/logo.jpg' className="h-9 w-9"/>,
    name: 'Katalog'
  },
  '/portfolio': {
    name: '포트폴리오',
  },
  '/posts': {
    name: '블로그',
  },
  '/about': {
    name: '래퍼런스',
  },
  '/contact': {
    name: '문의'
  },
}