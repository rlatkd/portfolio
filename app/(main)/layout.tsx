import '@/styles/global.css';
import Footer from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';
import { Top } from '@/components/layouts/top';

type LayoutProps = {
  children: React.ReactNode,
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Top />
      <div>
        {children}
      </div>
      <Footer />
    </>
  )
}
