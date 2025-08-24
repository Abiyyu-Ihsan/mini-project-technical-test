import Head from "next/head";
import Navbar from "./Navbar";
import { FC, useEffect, useState } from "react";
import Footer from "./Footer";

interface LayoutDashboardProps {
  children: React.ReactNode;
}

const LayoutDashboardView: FC<LayoutDashboardProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const LoadingScreen = () => {
    setLoading(true);
    {
      children;
    }
    setLoading(false);
  };

  useEffect(() => {
    LoadingScreen();
  }, []);

  return (
    <>
      <div >
        <Head>
          <title>{`K-Stylehub`}</title>
        </Head>
       
        <div className="min-h-screen bg-[#FDFCFC] transition-all delay-300 ">
          <Navbar />
          {children}
        <Footer />
        </div>
      </div>
      
    </>
  );
};

export default LayoutDashboardView;
