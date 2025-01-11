/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, Drawer } from "antd/lib";
import { IoPersonOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";

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
                    header: 'component-px',
                    body: 'component-px',
                }}
            >
                <div className="min-h-[75vh] overflow-y-auto no-scrollbar space-y-2">

                    <NavItem
                        icon={<GoInbox size={20} />}
                        text="My orders"
                        navigateTo="/my-orders/pending"
                    />

                    <NavItem
                        icon={<FaTruckFast size={20} />}
                        text="Track order"
                        navigateTo="/track-order"
                    />

                    <NavItem
                        icon={<IoPersonOutline size={18} />}
                        text="My account"
                        navigateTo="/my-account"
                    />

                    <NavItem
                        icon={<IoPersonOutline size={18} />}
                        text="Password settings"
                        navigateTo="/password"
                    />

                </div>

            </Drawer>

        </aside >

    );
};

export default MobileSidebar;
// NavItem component (unchanged)
const NavItem = ({ icon, text, navigateTo }: any) => {

    const isActive = usePathname().includes(navigateTo);

    return (
        <Link href={navigateTo} className={`w-full flex items-center gap-2 2xl:gap-4 py-3.5 px-5 hover:bg-primaryDark hover:text-white rounded-xl transition-all duration-300 ease-in-out cursor-pointer 
            ${isActive
                ? "text-white bg-primaryLight"
                : "text-primaryLight "
            }
        `}
        >
            <div>{icon}</div>
            <div>{text}</div>
        </Link>
    );
};