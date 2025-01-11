import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { PrimaryButton, PrimaryOutlineButton } from "../buttons/Buttons";

export default function Navbar() {
  // Define the menu items

  return (
    <nav className="w-full component-px hidden sm:flex items-center justify-between sticky top-0 z-50 select-none text-nowrap gap-3 lg:gap-5 text-sm bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 firefox:bg-opacity-90 py-3">
      <Link href={"/"} className="pr-12">
        <Image
          src={"/icons/logo.png"}
          alt=""
          width={200}
          height={200}
          className="h-10 w-auto aspect-auto"
        />
      </Link>

      <div className="flex items-center gap-6 sm:gap-8">
        <PrimaryOutlineButton title="Attendance mode" link={"/"} />

        <PrimaryButton title="Enroll" link={"/enroll"} />
      </div>
    </nav>
  );
}
