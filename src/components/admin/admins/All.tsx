/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { formatDate } from "@/utils/dateTimeFormatters";
import ActionCard from "./ActionCard";
import { getFileUrl } from "@/config";

const All = ({ data, refetch }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-4 py-2 text-left font-medium min-w-64">
                  Admin
                </th>
                <th className="px-4 py-2 text-left font-medium">Phone</th>
                <th className="px-4 py-2 text-left font-medium">Address</th>
                <th className="px-4 py-2 text-left font-medium">Created on</th>
                <th className="px-8 py-2 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border-t pl-4 py-5 text-left">
                    <div className="flex items-center gap-4">
                      <Image
                        src={getFileUrl(item?.profileImage)}
                        alt={""}
                        width={200}
                        height={200}
                        className="rounded-full border-2 w-16 h-auto aspect-square object-cover object-center"
                      />
                      <div className="flex flex-col gap-0">
                        <h3>{item?.firstName + " " + item?.lastName}</h3>
                        <h4 className="text-xs">{item?.email}</h4>
                      </div>
                    </div>
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500">
                    {item?.phone}
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500">
                    {item?.address}
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {formatDate(item?.createdAt, "long")}
                  </td>

                  <td className="border-t py-5">
                    <ActionCard
                      id={item?.id}
                      refetch={refetch}
                      applications={data}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No admin accounts found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default All;
