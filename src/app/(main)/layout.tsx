import '/styles/global.css';
import Footer from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';

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
