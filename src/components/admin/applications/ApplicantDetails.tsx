/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { StatusCard } from "../programs/StatusCard";
import { getFileUrl } from "@/config";
import InterviewsList from "./InterviewsList";
import { formatDate } from "@/utils/dateFormatters";

const ApplicantDetails = ({
  application,
  setUndoModalStatus,
  cancelInterview,
  setFinishInterviewModalStatus,
}: any) => {
  const interviews = application?.interviews;
  return (
    <div className="p-3 border-2 rounded-lg flex flex-col gap-2.5 text-sm">
      {application?.status === "INTERVIEWING" && (
        <div className="w-full border-0 bg-white rounded-lg flex flex-col gap-2">
          <h2 className="font-semibold text-base mb-1 text-active">
            INTERVIEWING
          </h2>

          <span>Interview date : {formatDate(interviews?.[0]?.date)}</span>

          <span>Interview time : {interviews?.[0]?.time}</span>

          <span>Scheduled : {formatDate(interviews?.[0]?.updatedAt)}</span>

          <div>
            Message for applicant:{" "}
            <p className="rounded-lg border-2 py-2 my-2 px-3 text-gray-700">
              {interviews?.[0]?.messageForApplicant}
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <span>
              <a
                className="font-medium text-white bg-primary rounded-md py-3 px-12 hover:bg-darkGreen transition flex-1 text-center flex items-center justify-center"
                href={interviews?.[0]?.link}
                target="_blank"
              >
                Start Interview
              </a>
            </span>

            <div className="w-full flex flex-col md:flex-row gap-3 md:items-center text-sm">
              <button
                onClick={() => setFinishInterviewModalStatus(true)}
                className="font-medium text-active rounded-md p-3 hover:bg-active transition flex-1 text-center flex items-center justify-center flex-grow border-active border-2 hover:text-white"
              >
                Finish Interview
              </button>

              <button
                onClick={cancelInterview}
                className="font-medium hover:text-white hover:bg-red-500 rounded-md p-2.5 border-2 border-red-500 text-red-500 transition flex-1 text-center flex-grow"
              >
                Cancel Interview
              </button>
            </div>
          </div>
          <hr className="my-2" />
        </div>
      )}

      <h2 className="font-semibold text-base mb-1">Overview</h2>

      <div className="flex items-center gap-2">
        <span className="font-semibold">First name: </span>
        <span className="font-medium">
          {application.jobSeeker.firstName || "Not specified"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">Last name: </span>
        <span className="font-medium">
          {application.jobSeeker.lastName || "Not specified"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">Email: </span>
        <span className="font-medium">
          {application.jobSeeker.email || "Not specified"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">Phone number: </span>
        <span className="font-medium">
          {application.jobSeeker?.phone || "Not specified"}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <span className="font-semibold">Country: </span>
        <span className="font-medium">
          {application.jobSeeker.temporaryAddress?.country || "Not specified"}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <span className="font-semibold">State: </span>
        <span className="font-medium">
          {application.jobSeeker.temporaryAddress?.state || "Not specified"}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <span className="font-semibold">City: </span>
        <span className="font-medium">
          {application.jobSeeker.temporaryAddress?.city || "Not specified"}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <span className="font-semibold">Street address: </span>
        <span className="font-medium">
          {application.jobSeeker.temporaryAddress?.streetAddress ||
            "Not specified"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">Experience: </span>
        <span className="font-medium">
          {application?.yearOfExperience || "Not specified"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">Desired salary: </span>
        <span className="font-medium">
          {application.desiredSalary || "Not specified"}
        </span>
      </div>

      <div className="font-medium flex items-center gap-2">
        <span className="font-semibold"> Status:</span>{" "}
        <StatusCard status={application.status} />
        {application?.status !== "PENDING" && (
          <div className="flex-grow flex justify-start">
            <button
              onClick={() => setUndoModalStatus(true)}
              className="border-2 border-red-500 text-xs rounded-full px-3 py-0.5 text-red-500 hover:text-white hover:bg-red-500 transition"
            >
              Undo
            </button>
          </div>
        )}
      </div>

      <span className="text-base mt-2">Resume:</span>

      <div className="w-full flex flex-col 2xl:flex-row gap-3">
        <a
          href={getFileUrl(application?.cv)}
          target="_blank"
          className="font-medium text-white bg-primary rounded-md py-2.5 px-5 hover:bg-darkGreen transition flex-1 text-center"
        >
          View
        </a>
      </div>

      <span className="text-base mt-2">Cover letter:</span>

      <p className="bg-[#F5F5F5] p-2 text-sm rounded-lg text-[#707070]">
        {application?.coverLetter || "N/A"}
      </p>

      {application?.remarks && (
        <>
          <span className="text-base mt-2">Remarks:</span>
          <p className="bg-[#F5F5F5] p-2 text-sm rounded-lg text-[#707070]">
            {application?.remarks}
          </p>
        </>
      )}

      <InterviewsList interviews={application?.interviews} />
    </div>
  );
};

export default ApplicantDetails;
