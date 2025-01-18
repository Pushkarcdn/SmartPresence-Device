/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { formatDate } from "@/utils/dateTimeFormatters";
import Image from "next/image";
import { getFileUrl } from "@/config";
import ActionCard from "./ActionCard";

const All = ({ data, refetch }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Company</th>
                <th className="px-4 py-2 text-left font-medium">Feedback</th>
                <th className="px-4 py-2 text-left font-medium">Created on</th>
                <th className="px-8 py-2 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border-t px-4 py-5 text-left  min-w-44">
                    <div className="flex items-center gap-2">
                      <Image
                        src={getFileUrl(item?.profileImage)}
                        alt="company logo"
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div className="flex flex-col gap-0">
                        <h3>{item?.name}</h3>
                        <h4 className="text-xs">{item?.designation}</h4>
                      </div>
                    </div>
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500">
                    <Image
                      src={getFileUrl(item?.companyLogo)}
                      alt="company logo"
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500 min-w-72 max-w-96 overflow-hidden whitespace-nowrap text-ellipsis">
                    {item?.feedback}
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {formatDate(item?.createdAt, "long")}
                  </td>

                  <td className="border-t py-5">
                    <ActionCard id={item?.id} data={data} refetch={refetch} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No testimonials found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default All;
