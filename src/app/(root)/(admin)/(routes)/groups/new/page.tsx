/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Select } from "antd";
import hitApi from "@/lib/axios";

import Gamification from "@/components/global/modals/Gamification";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/global/ui/Loader";

const AddGroup = () => {
  const [formData, setFormData] = useState({
    programId: "",
    name: "",
  }) as any;

  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const { data: programs, loading: programsLoading } = useFetch(
    "/programs"
  ) as any;

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setFailedText("");

    // Check if all required fields are filled
    if (!(formData.name && formData.programId)) {
      setLoading(false);
      setFailedText("Please fill all the required fields");
      return;
    }

    setLoading(true);

    // Send the form data to the server
    const res = await hitApi("/groups", "POST", formData);

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  if (programsLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm">
            Group Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="i.e. C11"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm">
            Program <span className="text-red-500 text-sm">*</span>
          </label>
          <Select
            showSearch
            placeholder="Select a program"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toString().toLowerCase())
            }
            options={programs?.map((program: any) => ({
              value: program.id,
              label: program.name,
            }))}
            className="w-full h-10"
            onChange={(value: any) =>
              setFormData({
                ...formData,
                programId: value,
              })
            }
            // style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/groups"}
          className="px-12 py-2 text-secondary hover:bg-secondary hover:text-white transition border-2 border-secondary rounded-lg text-center"
        >
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          className={`px-16 py-3 bg-primary hover:bg-primaryDark transition text-white rounded-lg flex items-center justify-center text-center disabled:bg-primaryDark ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {failedText && (
        <div className="w-full bg-red-100 rounded-lg p-3 mb-3 text-red-500 text-sm text-center">
          {failedText}
        </div>
      )}

      {successModalStatus && (
        <Gamification
          isOpen={successModalStatus}
          closeModal={() => setSuccessModalStatus(false)}
          title="Successs"
          text="Group added successfully!"
          link={"/groups"}
        />
      )}
    </div>
  );
};

export default AddGroup;
