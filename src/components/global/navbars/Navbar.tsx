/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getFileUrl } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { PrimaryButton } from "@/components/global/buttons/Buttons";
import ProfileImage from "../ui/ProfileImage";

export default function Navbar() {
  const pathname = usePathname();

  const { userData } = useAuth();

  return (
    <nav
      className={`bg-white bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 shadow-md`}
    >
      <div className="px-3 sm:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-5">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            className="w-16"
            width={130}
            height={44}
          />
          <span className="text-lg bg-gradient-to-r from-[#e39762] to-[#323232] font-bold bg-clip-text text-transparent">
            SmartPresence
          </span>
        </Link>

        {userData?.id && (
          <div className="flex items-center gap-2 select-none text-right">
            {pathname !== "/live-attendance" ? (
              <PrimaryButton
                title="Attendance mode"
                link="/live-attendance"
                className="mr-12"
              />
            ) : (
              <PrimaryButton
                title="Dashboard"
                link="/dashboard"
                className="mr-12"
              />
            )}

            <div className="flex-col gap-0 hidden sm:flex">
              <h4 className="font-medium">
                {userData?.firstName + " " + userData?.lastName}
              </h4>
              <h4 className="text-xs">{userData?.email}</h4>
            </div>
            {/* <Image
              src={getFileUrl(userData?.profileImage)}
              alt={""}
              width={40}
              height={40}
              className="rounded-full border-2 w-auto aspect-square object-cover object-center"
            /> */}
            <ProfileImage
              fullName={userData.firstName + " " + userData.lastName}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
