/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbListSearch } from "react-icons/tb";
import { LuClipboardList, LuShieldQuestion } from "react-icons/lu";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineReviews,
  MdOutlineScreenSearchDesktop,
} from "react-icons/md";
import { BsPatchQuestion } from "react-icons/bs";
import { GoOrganization } from "react-icons/go";
import { useAuth } from "@/contexts/AuthContext";
import { BiSupport } from "react-icons/bi";
import { SiCoursera } from "react-icons/si";
import { CiViewList } from "react-icons/ci";
import { HiMiniUserGroup, HiOutlineUserGroup } from "react-icons/hi2";
import { PiCertificate, PiTimerLight, PiUserLight } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";

const data = [
  {
    icon: <PiCertificate size={22} />,
    text: "Programs",
    navigateTo: "/programs",
  },
  {
    icon: <CiViewList size={22} />,
    text: "Modules",
    navigateTo: "/modules",
  },
  {
    icon: <HiOutlineUserGroup size={22} />,
    text: "Groups",
    navigateTo: "/groups",
  },
  {
    icon: <PiTimerLight size={22} />,
    text: "Classes",
    navigateTo: "/classes",
  },
  {
    icon: <PiUserLight size={22} />,
    text: "Users",
    navigateTo: "/users",
  },
];

const PageOptions = ({ close }: { close?: () => void }) => {
  // NavItem component (unchanged)
  const NavItem = ({
    icon,
    text,
    navigateTo,
  }: {
    icon: JSX.Element;
    text: string;
    navigateTo: string;
  }) => {
    const isActive = usePathname().includes(navigateTo);

    return (
      <Link
        href={navigateTo}
        onClick={close}
        className={`w-full flex items-center gap-2 2xl:gap-4 py-3 xl:py-3.5 px-3 2xl:px-5 hover:bg-primaryDark hover:text-white rounded-xl transition-all duration-300 ease-in-out cursor-pointer 
                ${isActive ? "text-white bg-primary" : " text-darkText "}
            `}
      >
        <div>{icon}</div>
        <div>{text}</div>
      </Link>
    );
  };

  const { userData } = useAuth();

  const [filteredData, setFilteredData] = useState(data?.slice(0, -1));

  useEffect(() => {
    if (userData?.role === "superAdmin") {
      setFilteredData(data);
    }
  }, [userData]);

  return (
    <>
      {filteredData?.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          text={item.text}
          navigateTo={item.navigateTo}
        />
      ))}
    </>
  );
};

export default PageOptions;
