import Link from 'next/link'
import { ThemeSwitcher } from '../client/theme-switcher'
import { FaGithub, FaHome } from 'react-icons/fa'

// 헤더 nav
const navItems: Record<string, NavItem> = {
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
  }
}

type NavItem = {
  name?: string;
  icon?: JSX.Element;
}

export function Header() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative mb-8"
          id="nav"
        >
          <div className="flex flex-row space-x-20 pr-10">
            {Object.entries(navItems).map(([path, { name, icon }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {path === '/' ? icon : name}
                </Link>
              )
            })}
          </div>
          <div className="ml-auto flex space-x-4 items-center">
            <a href="https://github.com/rlatkd" target="_blank" rel="noopener noreferrer">
              <FaGithub className="h-6 w-6" />
            </a>
            <ThemeSwitcher />
          </div>
        </nav>
        <div>
          <img src='static/images/header.jpg'
          className='rounded-3xl w-full h-48' />
        </div>
      </div>
    </aside>
  )
}
