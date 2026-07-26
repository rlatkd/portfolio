import '/styles/global.css';
import Sidebar from '@/widgets/Sidebar/sidebar';
import Footer from '@/widgets/Footer/footer';
import ScrollToTop from '@/shared/ui/scroll-to-top';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* w-full: 루트 main(flex-col)에서 mx-auto가 stretch를 무효화해 모바일에서 min-content 폭으로 커지는 것 방지 */}
      <div className='mx-auto w-full max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16 lg:px-16'>
        <Sidebar />
        <main className='lg:w-[52%]'>{children}</main>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
