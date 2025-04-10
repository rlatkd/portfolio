import '@/styles/global.css';
import Footer from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';

type LayoutProps = {
  children: React.ReactNode,
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </>
  )
}
