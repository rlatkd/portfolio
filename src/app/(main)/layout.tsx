import '/styles/global.css';
import Footer from '@/widgets/Footer/footer';
import { Header } from '@/widgets/Header/header';

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
