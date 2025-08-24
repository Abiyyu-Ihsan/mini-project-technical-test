import { useOutsideClick } from "@libs/utils/useOutsideClick";
import Link from "next/link";
import { FC, useRef, useState } from "react";

interface ChildLink {
  text: string;
  href: string;
  active?: boolean;
}

interface MenuHomeProps {
  text?: string;
  active?: boolean;
  mobile?: string;
  href?: string;
  media?: boolean;
  child?: ChildLink[];
  actionButton?: boolean;
  newNavbar?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const MenuHome: FC<MenuHomeProps> = ({
  active,
  href,
  text,
  mobile,
  media,
  child,
  actionButton,
  newNavbar,
  target,
}) => {
  const [expand, setExpand] = useState<boolean>(false);
  const ref = useRef<HTMLLIElement>(null);

  useOutsideClick(ref, () => setExpand(false));

  const toggle = () => setExpand((prev) => !prev);

  if (child && child.length > 0) {
    return (
      <li ref={ref} className="relative">
        <button
          onClick={toggle}
          className={`
            font-semibold rounded-md w-full cursor-pointer select-none flex justify-center text-sm text-white items-center px-4 h-12 lg:h-10 transition
            hover:!bg-[#53CCE1] hover:!text-white 
            ${active ? "bg-[#53CCE1] dark:bg-white/5 lg:bg-none font-semibold text-redsy-3 dark:text-redsy-1" : ""}
            ${actionButton ? "bg-[#53CCE1] hover:bg-[#53CCE1] text-white shadow-lg shadow-[#E2CEE3] hover:shadow-none" : ""}
            ${newNavbar ? "lg:h-8" : ""}
          `}
        >
          {text}
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.234315 0.33429C0.546734 0.0218708 1.05327 0.0218708 1.36569 0.33429L4 2.9686L6.63432 0.33429C6.94673 0.0218707 7.45327 0.0218707 7.76569 0.33429C8.0781 0.64671 8.0781 1.15324 7.76569 1.46566L4.56569 4.66566C4.25327 4.97808 3.74673 4.97808 3.43431 4.66566L0.234315 1.46566C-0.0781049 1.15324 -0.0781049 0.64671 0.234315 0.33429Z"
            />
          </svg>
        </button>
        <div
          className={`rounded-md lg:absolute top-full right-0 lg:mt-2 bg-white dark:bg-blacksy-1 border-blacksy-2/10 transition-all duration-500 font-semibold text-blacksy-3/90 overflow-hidden ${
            expand ? "max-h-[1000px] shadow-lg border" : "max-h-0"
          }`}
        >
          <ul className="text-center lg:text-start">
            {child.map((e, i) => (
              <li key={i}>
                <Link href={e.href} legacyBehavior>
                  <a
                    className={`
                      font-semibold text-blacksy-3/90 rounded-md py-3 px-6 lg:pr-12 border-b border-blacksy-2/10 dark:border-blacksy-2 w-full whitespace-nowrap hover:!bg-[#53CCE1] hover:!text-black block
                      ${e.active ? "rounded-md bg-[#53CCE1] dark:bg-white/5 lg:bg-none font-semibold text-redsy-3 dark:text-[#70A542]" : ""}
                    `}
                  >
                    {e.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`relative ${actionButton ? "p-4 lg:p-0 mt-auto mb-16 md:mb-0" : ""}`}
    >
      <Link href={href || "#"} legacyBehavior>
        <a
          target={target}
          className={`
            rounded-md w-full flex items-center justify-center px-4 h-12 lg:h-10 transition
            hover:!bg-[#53CCE1] hover:!text-white font-semibold
            text-sm text-white
            ${active ? "bg-[#53CCE1] dark:bg-white/5 lg:bg-none font-semibold text-white dark:text-redsy-1" : ""}
            ${actionButton ? "bg-[#53CCE1] hover:!bg-[#53CCE1] !text-white shadow-lg shadow-[#53CCE1]-1/50 hover:shadow-none" : ""}
          `}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};

export default MenuHome;
