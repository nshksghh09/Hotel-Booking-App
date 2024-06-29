import Headers from "../components/Headers";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode; //it means we will accept react components as children in the Layout component
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Headers></Headers>
      <Hero></Hero>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
