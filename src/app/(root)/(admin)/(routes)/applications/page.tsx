/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import JobTabs from "@/components/my-order/OrderTabs";
"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

import All from "@/components/admin/applications/All";
import Filtered from "@/components/admin/applications/Filtered";
import Loader from "@/components/global/ui/Loader";

import { FaRegFilePdf } from "react-icons/fa";
import { downloadCSV } from "@/utils/csvFormatters";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All applications");

  const {
    data: applications,
    loading: applicationsLoading,
    fetchData: refetchApplications,
  } = useFetch("/applications") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (applications) {
      setFiltered(
        applications.filter(
          (item: any) =>
            item?.jobSeeker?.firstName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.jobSeeker?.lastName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.jobSeeker?.email
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.jobSeeker?.phone
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.job?.title
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.job?.companyName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.job?.location
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [applications, searchTerm]);

  const handleDownload = () => {
    let data = [];
    if (currentTab?.includes("All")) {
      data = filtered;
    } else {
      data = filtered?.filter((item: any) =>
        item?.status?.toLowerCase().includes(currentTab?.toLowerCase())
      );
    }

    data = data?.map((item: any) => {
      // Clean and format the desired salary
      // Clean the desired salary but keep "Rs" and format as a single column
      const formattedDesiredSalary = item?.desiredSalary
        ? item?.desiredSalary.replace(/,/g, "").trim() // Remove commas but keep Rs
        : "";

      return {
        "First Name": item?.firstName || "",
        "Last Name": item?.lastName || "",
        "Job title": item?.jobTitle || "",
        "Company Name": item?.companyName || "",
        Email: item?.email || "",
        Phone: item?.phone || "",
        Address: item?.address || "",
        Experience: item?.yearOfExperience || "",
        "Desired salary": formattedDesiredSalary || "",
        Status: item?.status || "",
        "Applied on": item?.createdAt || "",
        "Cover letter": item?.coverLetter || "",
      };
    });

    if (data?.length < 1) return;

    downloadCSV(data);
  };

  const tabs = {
    "All applications": <All data={filtered} refetch={refetchApplications} />,
    Pending: (
      <Filtered
        data={filtered}
        status="PENDING"
        refetch={refetchApplications}
      />
    ),
    Interviewing: (
      <Filtered
        data={filtered}
        status="INTERVIEWING"
        refetch={refetchApplications}
      />
    ),
    Interviewed: (
      <Filtered
        data={filtered}
        status="INTERVIEWED"
        refetch={refetchApplications}
      />
    ),
    Shortlisted: (
      <Filtered
        data={filtered}
        status="SHORTLISTED"
        refetch={refetchApplications}
      />
    ),
    Hired: (
      <Filtered data={filtered} status="HIRED" refetch={refetchApplications} />
    ),
    Rejected: (
      <Filtered
        data={filtered}
        status="REJECTED"
        refetch={refetchApplications}
      />
    ),
  } as any;

  if (applicationsLoading) return <Loader />;

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
        <button
          onClick={handleDownload}
          className="py-3 px-14 rounded-md font-medium bg-active flex items-center justify-center gap-2 text-white hover:bg-[#b65e00] transition text-center text-nowrap"
        >
          <span>Export</span>
          <FaRegFilePdf size={18} />
        </button>
      </div>

      {tabs[currentTab]}
    </div>
  );
}
