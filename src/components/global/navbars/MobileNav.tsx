/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { RxCross2 } from "react-icons/rx";
import { IoMenuOutline } from "react-icons/io5";

import type { MenuProps } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { RiSearchLine } from "react-icons/ri";

type MenuItem = Required<MenuProps>["items"][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

export default function UserNavMobile() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [searchBarState, setSearchBarState] = useState(false);

  const [stateOpenKeys, setStateOpenKeys] = useState(["0", "0"]);

  const items: MenuItem[] = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Industry",
      style: {
        color: "white",
      },
      children: [
        {
          key: "11",
          label: "Healthcare",
          children: [
            {
              key: "111",
              label: "Healthcare Staffing Solutions",
              onClick: () => {
                router.push("/industries/health-care-staffing-solution");
              },
              style: {
                color: "white",
              },
            },
          ],
          style: {
            color: "white",
          },
        },

        {
          key: "12",
          label: "Technology",
          children: [
            {
              key: "121",
              label: "Innovative IT Staffing Solutions",
              onClick: () => {
                router.push("/industries/innovative-it-staffing-solutions");
              },
            },
            {
              key: "122",
              label: "End-to-End Software & Application Development",
              onClick: () => {
                router.push(
                  "/industries/end-to-end-software-and-application-development"
                );
              },
            },
          ],
          style: {
            color: "white",
          },
        },

        {
          key: "13",
          label: "Immigration",
          children: [
            {
              key: "131",
              label: "Eb3 Skilled and Professional Talent Acquisition",
              onClick: () => {
                router.push(
                  "/industries/eb3-skilled-and-professional-talent-acquisitions"
                );
              },
            },
          ],
        },
      ],
    },

    {
      key: "2",
      icon: <SettingOutlined />,
      label: "Services",
      children: [
        {
          key: "21",
          label: "Strategic Staffing Solutions",
          onClick: () => {
            router.push("/services/strategic-staffing-solutions");
          },
        },
        {
          key: "22",
          label: "Advanced Technology Solutions",
          onClick: () => {
            router.push("/services/advance-technology-solutions");
          },
        },
        {
          key: "23",
          label: "Immigration & Talent Mobility Solutions",
          onClick: () => {
            router.push("/services/immigration-and-talent-mobility-solutions");
          },
        },
      ],
    },

    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: "Explore Careers",
      onClick: () => {
        router.push("/careers");
      },
      style: {
        color: "white",
        backgroundColor: "transparent",
      },
    },
  ];

  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <div className="block lg:hidden w-full sticky top-0 z-50 ">
      <div className="w-full py-4 component-px flex items-center justify-between bg-primaryLight select-none relative z-10">
        <Link href={"/"}>
          <Image
            src={"/icons/logo.png"}
            alt={""}
            width={200}
            height={200}
            className="h-10 w-auto"
          />
        </Link>

        <div className="flex items-center gap-3 relative z-10">
          <div
            className={`border-2 rounded-lg aspect-square p-1.5 h-full hover:bg-white hover:text-primary active:bg-primary active:text-white transition ${
              searchBarState ? "bg-white text-primary" : "text-white"
            }`}
            onClick={() => {
              setSearchBarState(!searchBarState);
            }}
          >
            <RiSearchLine size={15} className="font-bold" />
          </div>

          {!isOpen && (
            <div
              className="text-white hover:scale-105 cursor-pointer w-10 flex justify-end"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <IoMenuOutline size={28} />
            </div>
          )}

          {isOpen && (
            <div
              className="text-white cursor-pointer hover:scale-105 w-10 flex justify-end"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <RxCross2 size={25} />
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchBarState(false);
          router.push("/search/" + search);
        }}
        className={`w-full bg-primaryDark p-4 absolute left-0 transition z-0 ${
          searchBarState ? "top-full" : "-top-full"
        }`}
      >
        <input
          type="text"
          placeholder="Search products"
          className="w-full bg-primaryLight text-[#f1f1f1] py-2 px-4 rounded-lg outline-none text-sm"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div
        className={`fixed top-0 z-0 h-screen w-[80vw] sm:w-[70vw] min-w-[280px] max-w-[500px] text-white flex flex-col gap-4 bg-primaryDark drop-shadow-2xl select-none transition-all duration-300 ease-in-out py-32 px-12 text-center ${
          isOpen ? "right-0" : "right-[-600px]"
        }`}
      >
        <NavItem link={"/"} name="Home" />
        {/* <NavItem link={"/"} name="Women" /> */}
        {/* <NavItem link={"/"} name="Men" /> */}
        {/* <NavItem link={"/"} name="Blog" /> */}
        <NavItem link={"/"} name="Contact" />
        {/* <NavItem link={"/"} name="Register" /> */}
        {/* <NavItem link={"/"} name="Signin" /> */}

        {/* Nested menu options */}

        {/* <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          items={items}
          className='custom-menu-item'
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none'
          }}
        /> */}
      </div>

      {/* <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} /> */}
    </div>
  );
}

const NavItem = ({
  link,
  name,
  classes,
}: {
  link: string;
  name: string;
  classes?: string;
}) => {
  return (
    <Link href={link}>
      <span className={`text-white hover:text-gray-300 transition ${classes}`}>
        {name}
      </span>
    </Link>
  );
};
