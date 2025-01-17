/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { formatDate } from "@/utils/dateFormatters";
import ActionCard from "./ActionCard";

const All = ({ data, refetch }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-4 py-2 text-left font-medium">Question</th>
                <th className="px-4 py-2 text-left font-medium">Answer</th>
                <th className="px-4 py-2 text-left font-medium">Created on</th>
                <th className="px-8 py-2 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500 min-w-72 max-w-1/2">
                    {item?.question}
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500 min-w-72 max-w-/2">
                    {item?.answer}
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
              No faqs found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default All;
