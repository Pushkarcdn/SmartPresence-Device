/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import "../styles/globals.css";
import "../styles/customStyles.css";

import "react-toastify/dist/ReactToastify.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartPresence",
  description: "SmartPresence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-bgcolor relative ${poppins.className}`}>
        <NextTopLoader
          color="#0295A9"
          initialPosition={0.08}
          crawlSpeed={100}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="linear"
          speed={100}
          shadow="0 0 10px #0295A9,0 0 5px #0295A9"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
         <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        {children}
      </body>
    </html>
  );
}
