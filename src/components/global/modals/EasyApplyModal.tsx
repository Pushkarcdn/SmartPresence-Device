/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "antd/lib";
import { IoLocationOutline } from "react-icons/io5";
import hitApi from "@/lib/axios";
import FailedModal from "./FailedModal";
import Gamification from "./Gamification";
import { formatCamelCase } from "@/utils/stringFormatters";
import { Select } from "antd";

import { Poppins } from "next/font/google";
import {
  labelRender,
  pastExperienceOptions,
  salaryOptions,
} from "@/data/jobMasterData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  job: any;
}

export default function EasyApplyModal({
  isOpen,
  closeModal,
  job,
}: ModuleModalProps) {
  const [failedModalStatus, setFailedModalStatus] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobId: job?.id,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    cv: null,
    address: "",
    yearOfExperience: "",
    desiredSalary: "",
  }) as any;

  const handleChange = (e: any) => {
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

      if (file) {
        if (file.size > maxSize) {
          setFailedText(
            `The selected file is too large. Please select a file smaller than ${
              maxSize / 1024 / 1024
            } MB.`
          );
          setFailedModalStatus(true);
          // Clear the input
          (e.target as HTMLInputElement).value = "";
          return;
        }

        setFormData({
          ...formData,
          [e.target.name]: file,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.desiredSalary || !formData.yearOfExperience) {
      setFailedText("Please fill all the required fields");
      setFailedModalStatus(true);
      return;
    }

    try {
      setLoading(true);

      const res = (await hitApi(`/apply`, "POST", formData, {
        "Content-Type": "multipart/form-data",
      })) as any;

      if (res?.success) {
        setSuccessModalStatus(true);
      } else {
        setFailedText(res?.message);
        setFailedModalStatus(true);
      }

      setLoading(false);
    } catch (error: any) {
      console.error("error is :  ", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
      width={1400}
      styles={{
        content: {
          backgroundColor: "white",
          borderRadius: "30px",
          padding: "0",
          marginTop: "70px",
          marginBottom: "70px",
          marginLeft: "10px",
          marginRight: "10px",
        },
      }}
      className={`p-0 m-0 font-primary ${poppins.className}`}
    >
      <div className="w-full flex flex-col gap-12 component-px items-center pb-24">
        <button
          className="bg-red-200 hover:bg-red-300 transition text-[#E13232] py-2.5  hover:drop-shadow-2xl hover:shadow px-16 font-bold flex items-center gap-2 rounded-b-3xl"
          onClick={closeModal}
        >
          <span>Close</span>
          <span className="rotate-90">{">"}</span>
        </button>

        <div className="w-full rounded-xl flex flex-col gap-6">
          <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-grow flex flex-col gap-1">
              <h2 className="text-xl sm:text-3xl font-bold">{job?.title}</h2>

              {job?.salary && (
                <h2 className="text-secondary font-medium">
                  Rs. {job?.salary}
                </h2>
              )}
            </div>

            <div className="flex gap-2.5">
              {/* <button className="border-2 rounded-lg p-2 flex items-center justify-center">

                                <BiFlag size={25} color="red" enableBackground={'red'} />

                            </button> */}

              {/* <button className="border-2 rounded-lg p-2 flex items-center justify-center">

                                <BiShare size={25} color="red" enableBackground={'red'} />

                            </button> */}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-grow flex flex-col gap-8"
          >
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Image
                  // src={getFileUrl(job?.companyLogo)}
                  src={"/Logo.png"}
                  alt={""}
                  width={200}
                  height={200}
                  className="w-full max-h-36 sm:w-16 rounded-xl border-2 object-contain p-1"
                />

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <h2 className="font-bold text-base text-primaryLight">
                      {/* {(job?.companyName)} */}
                      SmartPresence
                    </h2>

                    <span className="text-greyish hidden sm:block">•</span>

                    <div className="font-semibold flex items-start gap-1 text-greyish">
                      <IoLocationOutline className="mt-1" />
                      <span>{job?.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap text-sm">
                    <span className="py-1 px-5 bg-[#fcecd2] text-[#f7bf65] rounded-full">
                      {formatCamelCase(job?.timing)}
                    </span>

                    <span className=" text-greyish">•</span>

                    <span className="py-1 px-5 bg-primaryLight rounded-full bg-green-100 text-green-500">
                      {formatCamelCase(job?.locationType)}
                    </span>
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value={loading ? "Applying..." : "Apply"}
                className="py-3 px-16 rounded-lg bg-primary hover:bg-darkGreen text-white font-medium hover:bg-primaryDark transition cursor-pointer"
                disabled={loading}
              />
            </div>

            <hr />

            <div className="text-sm text-[#323232] flex flex-col gap-5">
              <span className="font-bold text-xl">
                Fill up the details below to apply for the job application
              </span>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    First name <span className="text-red-500 text-sm">*</span>
                  </label>

                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                    placeholder="First name"
                    value={formData?.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Last name <span className="text-red-500 text-sm">*</span>
                  </label>

                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                    placeholder="Last name"
                    value={formData?.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email<span className="text-red-500 text-sm">*</span>
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                    placeholder="example@mail.com"
                    value={formData?.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Phone<span className="text-red-500 text-sm">*</span>
                  </label>

                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                    placeholder="9812345678"
                    value={formData?.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Address<span className="text-red-500 text-sm">*</span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="address"
                    className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                    placeholder="Street address"
                    value={formData?.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Past experience
                    <span className="text-red-500 text-sm">*</span>
                  </label>

                  <Select
                    labelRender={labelRender}
                    value={formData.yearOfExperience}
                    style={{
                      width: "100%",
                      borderRadius: "0.5rem",
                      border: "0px solid transparent",
                      height: "45px",
                      color: "#555555",
                      outline: "none",
                    }}
                    onChange={(value) => {
                      setFormData({ ...formData, yearOfExperience: value });
                    }}
                    options={pastExperienceOptions.map((option) => ({
                      label: option,
                      value: option,
                    }))}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Upload CV<span className="text-red-500 text-sm">*</span>
                  </label>

                  <input
                    className="block w-full text-sm text-gray-900 border border-[#d9d9d9] rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="cv"
                    type="file"
                    name="cv"
                    accept="application/pdf"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Desired salary
                    <span className="text-red-500 text-sm">*</span>
                  </label>

                  <Select
                    labelRender={labelRender}
                    value={formData.desiredSalary}
                    style={{
                      width: "100%",
                      borderRadius: "0.5rem",
                      border: "0px solid transparent",
                      height: "45px",
                      color: "#555555",
                      outline: "none",
                    }}
                    onChange={(value) => {
                      setFormData({ ...formData, desiredSalary: value });
                    }}
                    options={salaryOptions.map((option) => ({
                      label: option,
                      value: option,
                    }))}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Cover letter
                  </label>

                  <textarea
                    id="name"
                    name="coverLetter"
                    className="w-full p-3 border-2 bg-[#fafafa] transition outline-blue-300 rounded-lg resize-none"
                    placeholder="Cover letter"
                    rows={6}
                    value={formData?.coverLetter}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {failedModalStatus && (
          <FailedModal
            isOpen={failedModalStatus}
            closeModal={() => setFailedModalStatus(false)}
            text={failedText || "Something went wrong! Please try again later."}
            title="Failed"
          />
        )}

        {successModalStatus && (
          <Gamification
            isOpen={successModalStatus}
            closeModal={() => setSuccessModalStatus(false)}
            title="Your request has successfully submitted"
            text="Our team will review the details and ensure your listing is live shortly. You'll be notified through email once the job post is approved and published."
            link={"/careers"}
          />
        )}
      </div>
    </Modal>
  );
}
