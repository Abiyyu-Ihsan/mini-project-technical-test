import Head from "next/head";
import Navbar from "./Navbar";
import { FC, useEffect, useState } from "react";

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
      <div className="flex">
        <Head>
          <title>{`KDP | Dashboard`}</title>
        </Head>
       
        <div className="flex flex-col grow ">
          <Navbar />
          {children}
        </div>
      </div>
      
    </>
  );
};

export default LayoutDashboardView;
