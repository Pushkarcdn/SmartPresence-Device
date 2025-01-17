/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import JobTabs from "@/components/my-order/OrderTabs";
"use client";

import { useEffect, useState } from "react";

import All from "@/components/admin/inquiries/All";
import Loader from "@/components/global/ui/Loader";
import useFetch from "@/hooks/useFetch";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All inquiries");

  const {
    data: inquiries,
    loading: inquiriesLoading,
    fetchData: refetchInquiris,
  } = useFetch("/inquiries") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (inquiries) {
      setFiltered(
        inquiries.filter(
          (item: any) =>
            item?.fullName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.companyName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [inquiries, searchTerm]);

  const tabs = {
    "All inquiries": (
      <All data={filtered} inquiries={inquiries} refetch={refetchInquiris} />
    ),
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
      </div>
      {inquiriesLoading && <Loader />}
      {!inquiriesLoading && tabs[currentTab]}
    </div>
  );
}
