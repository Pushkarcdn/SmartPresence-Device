/* eslint-disable @typescript-eslint/no-unused-vars */

import TopTab from "@/components/admin/globals/TopTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrollments | SmartPresence",
  description: "SmartPresence admin panel - enrollments",
};

export default function EnrollmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      text: "Students",
      link: "/enrollments/students",
    },
    {
      text: "Teachers",
      link: "/enrollments/teachers",
    },
    {
      text: "Enroll new",
      link: "/enrollments/new",
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
