/* eslint-disable @typescript-eslint/no-unused-vars */

import TopTab from "@/components/admin/globals/TopTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | SmartPresence",
  description: "SmartPresence admin panel",
};

export default function JobNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      text: "All programs",
      link: "/programs",
    },

    {
      text: "Add program",
      link: "/programs/new",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <TopTab tabs={tabs} />
      <hr className="w-full" />
      {children}
    </div>
  );
}
