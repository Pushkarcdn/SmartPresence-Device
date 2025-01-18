/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "@/utils/dateTimeFormatters";
import Link from "next/link";
import React from "react";

const InterviewsList = ({ interviews }: any) => {
  if (interviews.length === 0) return null;

  return (
    <div className="mt-6 w-full flex flex-col gap-2 text-sm max-h-[95vh] overflow-y-auto no-scrollbar">
      <h2 className="font-semibold text-base mb-1 text-secondary">
        Interview history
      </h2>

      {interviews.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="border-2 rounded-lg p-3 flex flex-col gap-2"
          >
            <span>Interview date : {formatDate(item?.date)}</span>

            <span>Time : {item?.time}</span>

            <span>Scheduled on : {formatDate(item?.createdAt)}</span>

            <span>Message : {item?.messageForApplicant}</span>

            <span>
              Link :{" "}
              <Link
                target="_blank"
                className="text-blue-700 font-medium"
                href={item?.link}
              >
                Open
              </Link>
            </span>

            {item?.status === "PENDING" && !item?.conclusion && (
              <span className="font-semibold italic text-yellow-800">
                INTERVIEW PENDING
              </span>
            )}

            {item?.status === "CANCELLED" && (
              <span className="font-semibold italic text-red-600">
                Cancelled
              </span>
            )}

            {item?.status === "DONE" && (
              <span className="font-semibold italic text-green-600">
                Completed
              </span>
            )}

            {item?.conclusion && (
              <div className="flex flex-col gap-1">
                Conclusion : {item?.conclusion}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InterviewsList;
