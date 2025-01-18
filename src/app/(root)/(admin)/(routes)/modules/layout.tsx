/* eslint-disable @typescript-eslint/no-unused-vars */

import TopTab from "@/components/admin/globals/TopTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modules | SmartPresence",
  description: "SmartPresence admin panel - modules",
};

export default function ModuleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      text: "All modules",
      link: "/modules",
    },
    {
      text: "Add module",
      link: "/modules/new",
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
