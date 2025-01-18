/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { formatDate } from "@/utils/dateTimeFormatters";
import Loader from "@/components/global/ui/Loader";
import ActionCard from "@/components/admin/programs/ActionCard";

export default function Programs() {
  const [searchTerm, setSearchTerm] = useState("") as any;

  const { data, loading, fetchData: refetch } = useFetch(`/programs`) as any;

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
        <Link
          href={"/programs/new"}
          className="py-3 px-14 rounded-md font-medium bg-active flex items-center justify-center text-white bg-secondary hover:bg-[#b65e00] transition text-center text-nowrap"
        >
          Add new program
        </Link>
      </div>

      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-2 py-2 text-left font-medium">
                  Program name
                </th>
                <th className="px-2 py-2 text-left font-medium">
                  Total credits
                </th>

                <th className="px-2 py-2 text-left font-medium">Created</th>
                <th className="px-8 py-2 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.map(
                (item: any, index: number) =>
                  (item?.name
                    ?.toLowerCase()
                    .includes(searchTerm?.toLowerCase().trim()) ||
                    item?.totalCredits
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase().trim())) && (
                    <tr key={index}>
                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500 min-w-44">
                        {item.name}
                      </td>

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {item.totalCredits}
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
              No program found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
