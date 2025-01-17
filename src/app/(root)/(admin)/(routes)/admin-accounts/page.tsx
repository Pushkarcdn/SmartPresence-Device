/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import JobTabs from "@/components/my-order/OrderTabs";
"use client";

import { useEffect, useState } from "react";

import All from "@/components/admin/admins/All";
import Filtered from "@/components/admin/applications/Filtered";
import Loader from "@/components/global/ui/Loader";
import useFetch from "@/hooks/useFetch";
import { FaRegFilePdf } from "react-icons/fa";
import { downloadCSV } from "@/utils/csvFormatters";
import Link from "next/link";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All");

  const {
    data: admins,
    loading: adminsLoading,
    fetchData: refetchadmins,
  } = useFetch("/admins") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (admins) {
      setFiltered(
        admins.filter(
          (item: any) =>
            item?.firstName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.lastName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [admins, searchTerm]);

  const tabs = {
    All: <All data={filtered} refetch={refetchadmins} />,
  } as any;

  return (
    <div className="flex flex-col gap-4">
      {/* <h1 className="text-2xl font-semibold">Applications</h1> */}
      <div className="w-full overflow-x-auto no-scrollbar mt-2 mb-4">
        <div className="flex gap-6 text-nowrap">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`${
                currentTab === tab
                  ? "text-primary border-b-[3px] border-b-primary"
                  : ""
              } py-1 px-4 font-medium`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row text-sm gap-4">
        <input
          type="text"
          placeholder="Search"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <Link
          href={"/admin/admin-accounts/new"}
          className="py-3 px-14 rounded-md font-medium bg-active flex items-center justify-center text-white hover:bg-[#b65e00] transition text-center text-nowrap"
        >
          Create new account
        </Link>
      </div>
      {adminsLoading && <Loader />}
      {!adminsLoading && tabs[currentTab]}
    </div>
  );
}
