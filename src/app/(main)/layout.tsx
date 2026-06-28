import '/styles/global.css';
import Footer from '@/widgets/Footer/footer';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div>{children}</div>
      <Footer />
    </>
  );
}
