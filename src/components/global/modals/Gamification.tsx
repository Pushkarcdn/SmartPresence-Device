/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal } from "antd/lib";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";

import { Poppins } from "next/font/google";
import { PrimaryButton } from "../buttons/Buttons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: any;
  action?: () => void;
  link?: string;
}

const Gamification = ({
  isOpen,
  closeModal,
  title,
  text,
  action,
  link,
}: ModuleModalProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        closeIcon={null}
        centered
        className={`${poppins.className}`}
      >
        <div className="flex flex-col items-center gap-2 py-2">
          <Link
            href={link || "/"}
            className="w-full flex justify-end p-3 text-2xl cursor-pointer hover:text-red-500 transition"
          >
            <RxCross2 />
          </Link>
          <div className="flex flex-col items-center gap-5">
            <Image
              src={"/icons/finak.gif"}
              unoptimized
              alt=""
              width={1000}
              height={1000}
              className="w-32"
            />
            <span className="text-center font-semibold text-lg md:text-xl text-[#323232]">
              {title}
            </span>
          </div>

          <p className="text-center text-[#606060]">{text}</p>

          <div className="flex gap-4 items-center text-sm mt-5 w-full px-10">
            {action && (
              <PrimaryButton
                className="w-full font-semibold hover:text-white"
                title={"Continue"}
                onClick={action}
              />
            )}
            {link && (
              <PrimaryButton
                className="w-full font-semibold hover:text-white"
                title={"Continue"}
                link={link}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Gamification;
