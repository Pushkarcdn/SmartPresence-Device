/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "@/utils/dateTimeFormatters";
import { formatCamelCase } from "@/utils/stringFormatters";
import Link from "next/link";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuBuilding } from "react-icons/lu";

const JobDetails = ({ job }: any) => {
  return (
    <div className="lg:col-span-2 rounded-lg border-2 flex flex-col gap-3 p-3">
      <h2 className="font-semibold text-xl ">{job.title}</h2>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <LuBuilding size={20} />

          <span>{job.companyName}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaMapLocationDot size={20} />

          <span>{job.location}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2 text-sm">
        <h2 className="text-lg font-semibold">Job description</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: job?.jobDescription,
          }}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2 text-sm">
        <h2 className="text-lg font-semibold">About company</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: job?.aboutCompany,
          }}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2 text-sm">
        <h2 className="text-lg font-semibold">Job requirements</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: job?.jobRequirements,
          }}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2 text-sm">
        <h2 className="text-lg font-semibold">Interview process</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: job?.interviewProcess,
          }}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2 text-sm">
        <h2 className="text-lg font-semibold">Company benefits</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: job?.companyBenefits,
          }}
        />
      </div>

      <hr />

      <div className="flex flex-col gap-1 mt-2 text-sm">
        <h2 className="text-lg font-semibold">Job Details</h2>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Company name: </span>
            <span>{job.companyName}</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-semibold">Address: </span>
            <span>{job?.location || "Not specified"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Deadline: </span>
            <span>
              {job.deadline ? formatDate(job?.deadline) : "Not specified"}
            </span>
          </div>

          {job?.minSalary &&
            job?.maxSalary(
              <div className="flex items-center gap-2">
                <span className="font-semibold">Salary: </span>
                <span>${job?.minSalary + " to " + job?.maxSalary}</span>
              </div>
            )}

          <div className="flex items-center gap-2">
            <span className="font-semibold">Employment type: </span>
            <span>{formatCamelCase(job.timing)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Level: </span>
            <span>{formatCamelCase(job.level) + " level"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Location type: </span>
            <span>{formatCamelCase(job.locationType)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Urgency: </span>
            <span>{formatCamelCase(job.urgency)}</span>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-1 mt-2 text-sm">
        <h2 className="text-lg font-semibold">Contact person</h2>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Name: </span>
            <span>{job.contactPerson || "Not specified"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Email: </span>
            <a href={`mailto:${job.email}`}>{job.email || "Not specified"}</a>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Phone: </span>
            <span>{job.phone || "Not specified"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Company website: </span>
            {job.website ? (
              <Link target="_blank" href={job.website}>
                <span>{job.website}</span>
              </Link>
            ) : (
              <span>Not specified</span>
            )}
          </div>
        </div>
      </div>

      <hr />

      <span className="text-greyish text-xs">
        Posted on: {formatDate(job.createdAt)}
      </span>
    </div>
  );
};

export default JobDetails;
