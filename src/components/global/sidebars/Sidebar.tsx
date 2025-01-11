/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";
import { FaTruckFast } from "react-icons/fa6";
import { usePathname } from "next/navigation";

// Sidebar component
const Sidebar = () => {
  return (
    <div className="hidden xl:flex flex-col bg-white sticky left-0 top-20 overflow-y-scroll no-scrollbar rounded-2xl p-4 pb-8 w-full gap-2 text-base text-nowrap">
      <NavItem
        icon={<GoInbox size={20} />}
        text="My orders"
        navigateTo="/my-orders"
      />

      <NavItem
        icon={<FaTruckFast size={20} />}
        text="Track order"
        navigateTo="/track-order"
      />

      <NavItem
        icon={<IoPersonOutline size={18} />}
        text="My account"
        navigateTo="/my-account"
      />

      <NavItem
        icon={<IoPersonOutline size={20} />}
        text="Password"
        navigateTo="/change-password"
      />
    </div>
  );
};

// NavItem component (unchanged)
const NavItem = ({ icon, text, navigateTo }: any) => {
  const isActive = usePathname().includes(navigateTo);

  return (
    <Link
      href={navigateTo}
      className={`w-full flex items-center gap-2 2xl:gap-4 py-3 xl:py-3.5 px-3 2xl:px-5 hover:bg-primaryDark hover:text-white rounded-xl transition-all duration-300 ease-in-out cursor-pointer 
            ${isActive ? "text-white bg-primaryLight" : "text-primaryLight "}
        `}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </Link>
  );
};

export default Sidebar;
