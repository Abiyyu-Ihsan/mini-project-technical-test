import React from "react";

type BurgerMenuProps = {
  onClick: () => void;
  open: boolean;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick, open }) => {
  return (
    <div className="flex items-center mx-4 lg:hidden">
      <button
        type="button"
        className="relative text-gray-500 rounded-sm w-9 h-9 focus:outline-none"
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="burger menu"
        onClick={onClick}
      >
        <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <span
            aria-hidden="true"
            className={`block absolute h-0.5 w-5 rounded bg-[#EB92C0] transform transition duration-500 ease-in-out ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <div className="flex justify-between">
            <span
              aria-hidden="true"
              className={`block absolute rounded-full h-0.5 w-1.5 bg-[#EB92C0] transform transition duration-500 ease-in-out ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block absolute right-0 rounded h-0.5 w-4 bg-[#EB92C0] transform transition duration-500 ease-in-out ${
                open ? "opacity-0" : ""
              }`}
            />
          </div>
          <span
            aria-hidden="true"
            className={`block absolute h-0.5 w-5 rounded bg-[#EB92C0] transform transition duration-500 ease-in-out ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default BurgerMenu;
