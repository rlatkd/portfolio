import './global.css'
import { Header } from './components/client/header'
import Footer from './components/client/footer'
import { Top } from './components/top'

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
