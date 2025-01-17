/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormatters";
import { formatCamelCase } from "@/utils/stringFormatters";

import { getFileUrl } from "@/config";
import useFetch from "@/hooks/useFetch";

import { FaMapLocationDot } from "react-icons/fa6";
import { LuBuilding } from "react-icons/lu";
import Loader from "@/components/global/ui/Loader";

export default function Page({ params }: any) {
  const id = params?.id;

  const { data, loading } = useFetch(`/job-seeker-support/${id}`) as any;

  if (loading) return <Loader />;

  return (
    <>
      {data && (
        <>
          <div className="mt-3 flex flex-col-reverse xl:flex-row gap-6 text-sm">
            <h1 className="font-semibold text-primaryLight flex-grow text-lg text-nowrap">
              {data?.category}
            </h1>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 items-start gap-4 text-[#323232]">
            <div className="rounded-lg border-2 flex flex-col gap-3 p-3 text-sm">
              <h2 className="font-semibold text-base mb-1">
                Inquiry information
              </h2>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Subject: </span>
                <span className="font-medium">{data?.subject}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Inquired on: </span>
                <span className="font-medium">
                  {formatDate(data?.createdAt)}
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <span className="font-semibold">Attachment: </span>
                <Link
                  className="py-1 px-4 text-sm bg-primary hover:bg-darkGreen text-white rounded-lg font-medium transition"
                  target="_blank"
                  href={getFileUrl(data?.attachment)}
                >
                  Open
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">Description: </span>
                <div
                  className="p-4 rounded-lg border"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                />
              </div>
            </div>

            <div className=" rounded-lg border-2 flex flex-col gap-3 p-3 text-sm">
              <h2 className="font-semibold text-base mb-1">
                Job seeker information
              </h2>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Full name: </span>
                <span className="font-medium">
                  {data?.jobSeeker?.firstName} {data?.jobSeeker?.lastName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Email: </span>
                <span className="font-medium">{data?.jobSeeker?.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Phone number: </span>
                <span className="font-medium">{data?.jobSeeker?.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Professionr: </span>
                <span className="font-medium">
                  {data?.jobSeeker?.profession || "Not specified"}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-semibold">Address: </span>
                <span className="font-medium">
                  {data?.jobSeeker?.temporaryAddress.country || "Not specified"}
                </span>
              </div>

              {/* <div className="font-medium flex items-center gap-2">
                <span className="font-semibold"> Status:</span>{" "}
                <StatusCard status={applicant?.status} /> */}

              {/* {applicant?.status !== "PENDING" && (
              <div className="flex-grow flex justify-start">
                <button
                  onClick={resetStatus}
                  className="border-2 border-red-500 text-xs rounded-full px-3 py-0.5 text-red-500 hover:text-white hover:bg-red-500 transition"
                >
                  Undo
                </button>
              </div>
            )} */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
