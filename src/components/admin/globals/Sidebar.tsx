/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PageOptions from "./PageOptions";
import Logout from "./Logout";

// Sidebar component
const Sidebar = () => {
  return (
    <div className="relative w-full h-full hidden xl:flex">
      <div className="flex flex-col w-full h-full bg-white absolute top-0 lft-0 overflow-y-scroll no-scrollbar rounded-2xl p-4 gap-6 text-base text-nowrap">
        <div className="w-full overflow-y-auto overflow-x-hidden scrollbar pr-2 flex flex-col gap-2">
          <PageOptions />
        </div>

        <div className="flex-grow min-h-20 flex flex-col justify-end gap-2">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
