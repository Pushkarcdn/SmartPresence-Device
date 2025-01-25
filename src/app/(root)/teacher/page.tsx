/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import hitApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { Select } from "antd";

import Gamification from "@/components/global/modals/Gamification";
import Loader from "@/components/global/ui/Loader";
import {
  PrimaryButton,
  PrimaryOutlineButton,
} from "@/components/global/buttons/Buttons";
import config from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { today } from "@/utils/dateTimeFormatters";

const Attendances = () => {
  const [formData, setFormData] = useState({
    groupId: null,
    date: "",
  }) as any;

  const [loading, setLoading] = useState(false);
  const [attendances, setAttendances] = useState() as any;
  const [groupData, setGroupData] = useState() as any;
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  // Form Management

  const { data: programs, loading: programsLoading } = useFetch(
    "/programs"
  ) as any;

  const { userData, loading: userDataLoading } = useAuth() as any;

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setFailedText("");

    setAttendances(null);
    setGroupData(null);

    if (!(formData.groupId && formData.date)) {
      setFailedText("Please fill all the required fields.");
      return;
    }

    setLoading(true);

    // Send the form data to the server
    const res = await hitApi("/day-attendances", "POST", formData);

    if (res?.success) {
      setSuccessModalStatus(true);
      setAttendances(res?.data?.attendances);
      setGroupData(res?.data?.classData?.group?.group);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const isPresent = (id: string) => {
    if (!attendances) return false;

    const student = attendances.find(
      (attendance: any) => attendance.userId === id
    );
    if (student) {
      return true;
    } else {
      return false;
    }
  };

  if (programsLoading || !userData) {
    return <Loader />;
  }

  return (
    <div className="w-full component-py component-px grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-y-4 text-left">
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
                  .localeCompare(
                    (optionB?.label ?? "").toString().toLowerCase()
                  )
              }
              value={userData.module.program.id}
              options={programs?.map((program: any) => ({
                value: program.id,
                label: program.name,
              }))}
              className="w-full h-10"
              disabled
              // style={{ width: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm">
              Module <span className="text-red-500 text-sm">*</span>
            </label>
            <Select
              showSearch
              placeholder="Select a module"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .localeCompare(
                    (optionB?.label ?? "").toString().toLowerCase()
                  )
              }
              value={userData?.module.id}
              className="w-full h-10"
              // onChange={(value: any) =>
              //   setFormData({
              //     ...formData,
              //     moduleId: value,
              //   })
              // }
              options={programs
                ?.find(
                  (program: any) => program.id === userData.module.program.id
                )
                ?.modules.map((module: any) => ({
                  value: module.id,
                  label: module.name,
                }))}
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm">
              Group <span className="text-red-500 text-sm">*</span>
            </label>
            <Select
              showSearch
              placeholder="Select a group"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .localeCompare(
                    (optionB?.label ?? "").toString().toLowerCase()
                  )
              }
              value={formData.groupId}
              className="w-full h-10"
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  groupId: value,
                })
              }
              options={programs
                ?.find(
                  (program: any) => program.id === userData.module.program.id
                )
                ?.groups.map((group: any) => ({
                  value: group.id,
                  label: group.name,
                }))}
              disabled={!programs}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm">
              Date
              <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.firstName}
              // max={today}
              onChange={handleChange}
              className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
            />
          </div>
        </div>

        {failedText && (
          <div className="col-span-2 w-full bg-red-100 rounded-lg p-3  text-red-500 text-sm text-center">
            {failedText}
          </div>
        )}

        <div className="w-full flex items-center justify-end gap-4">
          {/* <Link
            href={"/enrollments/students"}
            className="px-12 py-2 text-secondary hover:bg-secondary hover:text-white transition border-2 border-secondary rounded-lg text-center"
          >
            Cancel
          </Link> */}
          <button
            onClick={handleSubmit}
            className={`px-16 py-3 bg-primary hover:bg-primaryDark transition text-white rounded-lg flex items-center justify-center text-center disabled:bg-primaryDark ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "loading..." : "Show attendance"}
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="w-full flex flex-col flex-grow gap-4">
          {loading && <Loader />}

          {!loading && (
            <div className="border-2 rounded-2xl h-full flex-grow p-3">
              <div className="w-full flex flex-col gap-4">
                {groupData?.map((student: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-5"
                  >
                    <span className="text-sm">
                      {student?.firstName + " " + student?.lastName}
                    </span>
                    <div className="text-sm cursor-pointer">
                      {isPresent(student?.id) ? (
                        <div className="py-2 px-6 rounded-lg bg-green-100 text-green-600 ">
                          Present
                        </div>
                      ) : (
                        <div className="py-2 px-6 rounded-lg bg-red-100 text-red-600 ">
                          Absent
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendances;
