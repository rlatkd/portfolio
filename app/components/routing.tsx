import { FaHome } from 'react-icons/fa';

type RoutingProps = {
    name?: string;
    icon?: JSX.Element;
  }
  
// 헤더 nav
export const routing: Record<string, RoutingProps> = {
  '/': {
    // name: 'home',
    icon: <FaHome className="h-6 w-6"/>,
  },
  '/portfolio': {
    name: 'portfolio',
  },
  '/posts': {
    name: 'post',
  },
  '/about': {
    name: 'about',
  },
  '/contact': {
    name: 'contact'
  },
}