/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Button, Drawer } from "antd/lib";
import { RiMenuUnfoldLine } from "react-icons/ri";
import PageOptions from "./PageOptions";
import Logout from "./Logout";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <aside className="xl:hidden">
      <div className="">
        <Button onClick={showDrawer} icon={<RiMenuUnfoldLine />} />
      </div>

      <Drawer
        open={open}
        onClose={onClose}
        placement="left"
        width={280}
        getContainer={false}
        classNames={{
          header: "",
          body: "flex flex-col gap-8",
          content: "",
        }}
      >
        <div className="overflow-y-auto flex-grow no-scrollbar space-y-2">
          <PageOptions close={onClose} />
        </div>
        <Logout />
      </Drawer>
    </aside>
  );
};

export default MobileSidebar;
