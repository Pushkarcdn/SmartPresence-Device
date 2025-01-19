/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { formatDate } from "@/utils/dateTimeFormatters";
import Loader from "@/components/global/ui/Loader";
import ActionCard from "@/components/admin/enrollments/ActionCard";

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("") as any;

  const { data, loading, fetchData: refetch } = useFetch(`/teachers`) as any;

  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full flex flex-col md:flex-row text-sm gap-4">
        <input
          type="text"
          placeholder="Search"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-2 py-2 text-left font-medium">Teacher</th>
                <th className="px-2 py-2 text-left font-medium">Program</th>
                <th className="px-2 py-2 text-left font-medium">Module</th>
                <th className="px-2 py-2 text-left font-medium">Phone</th>
                <th className="px-2 py-2 text-left font-medium">Address</th>
                <th className="px-2 py-2 text-left font-medium">Enrolled on</th>
                <th className="px-8 py-2 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.map(
                (item: any, index: number) =>
                  (item?.firstName
                    ?.toLowerCase()
                    .includes(searchTerm?.toLowerCase().trim()) ||
                    item?.lastName
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase().trim()) ||
                    item?.module.name
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase().trim()) ||
                    item?.module.program.name
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase().trim()) ||
                    item?.phone
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase().trim()) ||
                    item?.address
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase().trim())) && (
                    <tr key={index}>
                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500 min-w-44">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">
                            {item.firstName} {item.lastName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.email}
                          </span>
                        </div>
                      </td>

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {item.module.program.name}
                      </td>

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {item.module.name}
                      </td>

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {item.phone}
                      </td>

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {item.address}
                      </td>

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {formatDate(item?.createdAt, "long")}
                      </td>

                      <td className="border-t py-5">
                        <ActionCard id={item.id} refetch={refetch} />
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}

        {loading && <Loader />}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No students are enrolled yet!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
