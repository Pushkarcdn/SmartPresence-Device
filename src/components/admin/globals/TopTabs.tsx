/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TopTab({ tabs }: any) {
  return (
    <div className="w-full flex items-start gap-3 text-nowrap overflow-x-auto no-scrollbar">
      {tabs?.map((tab: any, index: number) => (
        <Tab text={tab?.text} link={tab?.link} key={index} />
      ))}
    </div>
  );
}

const Tab = ({ text, link }: { text: string; link: string }) => {
  const isActive = usePathname() === link;

  return (
    <Link
      href={link}
      className={`text-center py-2 px-2 mx-2 cursor-pointer transition-all text-darkText 
        ${
          isActive
            ? " opacity-100 border-b-[3px] border-primary font-semibold text-primary"
            : "opacity-50 hover:opacity-80 font-medium"
        }
      `}
    >
      {text}
    </Link>
  );
};
