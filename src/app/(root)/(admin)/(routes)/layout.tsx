/* eslint-disable @typescript-eslint/no-unused-vars */

import Sidebar from "@/components/admin/globals/Sidebar";
import MobileSidebar from "@/components/admin/globals/MobileSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col">
      <main
        className={`w-full flex-grow flex flex-col xl:grid grid-cols-1 xl:grid-cols-5 items-start justify-start gap-3 xl:gap-6 p-3 sm:p-8`}
      >
        <Sidebar />
        <MobileSidebar />
        <div className="w-full h-full xl:col-span-4 relative">
          <div className="absolute w-full h-full p-3 bg-white rounded-lg xl:rounded-2xl">
            <div className="w-full h-full overflow-y-auto scrollbar pr-4">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
