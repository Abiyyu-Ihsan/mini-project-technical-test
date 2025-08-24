import { Menu } from "@headlessui/react";
import React, { FC, useEffect, useState } from "react";
import ListMenu from "@components/widgets/menu/index";
import { useRouter } from "next/router";
// import IconLogout from "@components/icons/IconLogout";
import { ArrowLeft, X } from "react-feather";

import BurgerMenu from "./BurgerMenu";
import { useBurgerStore } from "@libs/utils/stateBurgerZustand";
import Link from "next/link";

interface Dropdown {
  menu?: boolean;
  className?: string;
  setMenu?: any;
  setBurger?: any;
  burger?: boolean;
  src?: any;
}

interface Navbarprops {
  backButton?: boolean | ((isBack: boolean) => void);
  title?: string;
  description?: string;
  profile?: any;
  children?: React.ReactNode;
  fullname?: string;
  code?: any;
}

const MyDropdown: FC<Dropdown> = ({ src, setMenu }) => {
  const router = useRouter();

  return (
    <Menu>
      <Menu.Button>
        {" "}
        <div className="inline-flex p-1 rounded-full gap-1.5">
          <img
            src={src}
            className="w-12 h-12 object-cover rounded-full shadow-lg"
            alt="profile"
          />
          <img
            src="/images/arrow-down.svg"
            className="flex w-2 lg:hidden"
            alt="profile"
            onClick={() => setMenu(true)}
          />
        </div>
      </Menu.Button>
      <Menu.Items className="fixed z-50 flex flex-col items-start w-1/3 px-2 bg-white rounded-bl-lg xs:right-8 sm:right-0 shadow-2xl top-[60px] ">
        <div className="w-full py-2">
          {/* <ListMenu.Profile text="Profile" href="/profile" /> */}
          <button
            onClick={async () => {
              router.push("login");
            }}
            className="inline-flex gap-2 mt-3 py-2 w-full items-center cursor-pointer border border-transparent hover:shadow-lg hover:border-[#FF1A1A] hover:rounded-[4px] text-sm font-medium text-danger"
          >
            <i className="ml-2 xl:ml-3">
              {/* <IconLogout width={20} height={22} /> */}
            </i>
            Keluar
          </button>
        </div>
      </Menu.Items>
    </Menu>
  );
};

// ini diperuntukan buat useState sesuai sama key api nya
type ApiResponse = {
  selfie_picture: string;
  fullname: string;
  status_caption: string;
};
type ApiResponseStatus = {
  selfie_picture: string;
  fullname: string;
};

const Navbar: FC<Navbarprops> = ({
  title,
  description,
  backButton = false,
  profile,
  children,
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (typeof backButton === "boolean") {
      router.push("/");
    } else {
      backButton?.(true);
    }
  };
  const [menu, setMenu] = useState<boolean>(false);
  const [menus, setMenus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const toggleClicked = useBurgerStore((state: any) => state.toggleClicked);
  const [profiles, setProfile] = useState<ApiResponse | any>([]);

  const [status, setStatus] = useState<string | any>([]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (menus === true) {
        event.preventDefault();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (menus === true) {
        event.preventDefault();
      }
    };

    // Add event listeners when the component mounts
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      // Clean up the event listeners when the component unmounts
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [menus]);

  return (
    <header
      className="transition-all "
    >
      {/* navbar web */}

      <div
        className="bg-black shadow-lg mt-0 md:p-4  fixed w-full z-[60] transition duration-500
  "
      >
        <div className="flex items-center gap-1 py-2 md:py-0 lg:pt-0 mx-auto max-w-screen-2xl">
          <div className="-ml-2 md:-ml-4">
            <BurgerMenu onClick={() => setMenu(!menu)} open={menu} />
          </div>
          <div className="-ml-5 cursor-pointer lg:ml-4 mr-auto lg:w-auto lg:mr-auto">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                aria-label="logo"
                className="mt-1.5 h-8 md:h-8 lg:h-10 mr-auto"
             
              />
            </Link>
          </div>
          <div className="flex gap-3 items-center ml-auto !justify-start">
            <ul className="items-center hidden space-x-1 font-card lg:flex ">
              {/* <NavLink active={pathname == "/beli"} text="Sewa" href="/sewa-rumah" /> */}

              <ListMenu.Home text="Product" href="/" media />


       
            </ul>

          </div>
        </div>
      </div>

      {/* navbar mobile */}
      <div
        className={`fixed lg:hidden transform transition duration-500 ease-in-out z-50 pt-20 right-0 bg-white w-full h-screen overflow-y-auto
        ${menu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="flex flex-col h-full">
          <ListMenu.Home text="Product" href="/" media />
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
