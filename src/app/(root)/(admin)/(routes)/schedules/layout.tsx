/* eslint-disable @typescript-eslint/no-unused-vars */

import TopTab from "@/components/admin/globals/TopTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class schedules | SmartPresence",
  description: "SmartPresence admin panel - schedules",
};

export default function SchdeuleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      text: "All classes",
      link: "/schedules",
    },
    {
      text: "Add schedule",
      link: "/schedules/new",
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
