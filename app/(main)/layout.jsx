import Header from "../common/header";
import Footer from "../common/footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div className="px-6 md:px-12 lg:px-36 py-4 md:py-6">
        {children}
      </div>
      <Footer />
    </>
  );
}
