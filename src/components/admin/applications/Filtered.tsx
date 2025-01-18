/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { formatDate } from "@/utils/dateTimeFormatters";
import StatusCard from "../programs/StatusCard";
import ApplicationsActionCard from "./ApplicationsActionCard";

const Filtered = ({ data, status, refetch }: any) => {
  const filteredData = data?.filter((item: any) => item?.status === status);

  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-4 py-2 text-left font-medium">Applicant</th>
                <th className="px-4 py-2 text-left font-medium">Applied for</th>
                <th className="px-4 py-2 text-left font-medium">
                  Company name
                </th>
                {/* <th className="px-4 py-2 text-left font-medium">Status</th> */}
                <th className="px-4 py-2 text-left font-medium">Country</th>
                <th className="px-4 py-2 text-left font-medium">Applied on</th>
                <th className="px-8 py-2 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {filteredData?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border-t px-4 py-5 text-left  min-w-44">
                    <div className="flex flex-col gap-0">
                      <h3>
                        {item?.jobSeeker?.firstName +
                          " " +
                          item?.jobSeeker?.lastName}
                      </h3>
                      <h4 className="text-xs">{item?.jobSeeker?.email}</h4>
                    </div>
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500">
                    {item?.job?.title}
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.job?.companyName}
                  </td>

                  {/* <td className="border-t px-4 py-5 text-left text-sm text-gray-500">
                    <StatusCard status={item?.status} />
                  </td> */}

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500">
                    {item?.jobSeeker?.temporaryAddress?.country}
                  </td>

                  <td className="border-t px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {formatDate(item?.createdAt, "long")}
                  </td>

                  <td className="border-t py-5">
                    <ApplicationsActionCard item={item} refetch={refetch} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No applications found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filtered;
