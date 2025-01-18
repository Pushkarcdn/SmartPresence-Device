/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Select } from "antd";
import hitApi from "@/lib/axios";

import Gamification from "@/components/global/modals/Gamification";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/global/ui/Loader";
import {
  formatDate,
  formatTime,
  getDateForField,
  today,
} from "@/utils/dateTimeFormatters";

const EditSchedule = ({ params }: any) => {
  const { id } = params;

  const [programId, setProgramId] = useState() as any;
  const [formData, setFormData] = useState({
    moduleId: "",
    teacherId: "",
    groupId: "",
    date: "",
    startTime: "",
    endTime: "",
  }) as any;

  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const { data, loading: dataLoading } = useFetch(`/classes/${id}`) as any;

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
    if (
      !(
        formData.date &&
        formData.startTime &&
        formData.endTime &&
        formData.teacherId &&
        formData.moduleId &&
        formData.groupId
      )
    ) {
      setLoading(false);
      setFailedText("Please fill all the required fields");
      return;
    }

    // Check if the end time is greater than the start time
    if (formData.endTime <= formData.startTime) {
      setLoading(false);
      setFailedText("Class end time must be greater than start time");
      return;
    }

    setLoading(true);

    // Send the form data to the server
    const res = await hitApi(`/classes/${id}`, "PUT", formData);

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (programId && data) {
      // const program = programs.find((program: any) => program.id === programId);

      if (programId === data?.teacher.module.program?.id) {
        return;
      }

      setFormData({
        ...formData,
        moduleId: "",
        groupId: "",
      });
    }
  }, [programId]);

  useEffect(() => {
    if (formData.moduleId && programs && data) {
      const program = programs.find((program: any) => program.id === programId);

      const moduleData = program?.modules.find(
        (module: any) => module.id === formData.moduleId
      );

      const teacher = moduleData?.teachers.find(
        (teacher: any) => teacher.id === formData.teacherId
      );

      if (teacher?.id === formData?.teacherId) {
        return;
      }

      setFormData({
        ...formData,
        teacherId: "",
      });
    }
  }, [formData.moduleId]);

  useEffect(() => {
    if (data) {
      setProgramId(data?.teacher.module.program?.id);
      setFormData({
        ...formData,
        moduleId: data?.teacher.module.id,
        teacherId: data?.teacher.id,
        groupId: data?.groupId,
        date: data?.date,
        startTime: data?.startTime,
        endTime: data?.endTime,
      });
    }
  }, [data]);

  if (dataLoading || programsLoading || !data || !programs) {
    return <Loader />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
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
              value={programId}
              options={programs?.map((program: any) => ({
                value: program.id,
                label: program.name,
              }))}
              className="w-full h-10"
              onChange={(value: any) => setProgramId(value)}
              // style={{ width: "100%" }}
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
                ?.find((program: any) => program.id === programId)
                ?.groups.map((group: any) => ({
                  value: group.id,
                  label: group.name,
                }))}
              disabled={!programId}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm">
              Module <span className="text-red-500 text-sm">*</span>
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
              value={formData.moduleId}
              className="w-full h-10"
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  moduleId: value,
                })
              }
              options={programs
                ?.find((program: any) => program.id === programId)
                ?.modules.map((module: any) => ({
                  value: module.id,
                  label: module.name,
                }))}
              disabled={!programId}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm">
              Teacher <span className="text-red-500 text-sm">*</span>
            </label>
            <Select
              showSearch
              placeholder="Select a teaher"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .localeCompare(
                    (optionB?.label ?? "").toString().toLowerCase()
                  )
              }
              value={formData.teacherId}
              className="w-full h-10"
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  teacherId: value,
                })
              }
              options={programs
                ?.find((program: any) => program.id === programId)
                ?.modules.find((module: any) => module.id === formData.moduleId)
                ?.teachers.map((teacher: any) => ({
                  value: teacher.id,
                  label: teacher.firstName + " " + teacher.lastName,
                }))}
              disabled={!formData.moduleId}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm">
              Date
              <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={getDateForField(formData?.date)}
              onChange={handleChange}
              min={today}
              disabled={!formData.teacherId}
              className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="startTime" className="text-sm">
                Start time
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="time"
                name="startTime"
                id="startTime"
                value={formData.startTime}
                onChange={handleChange}
                disabled={!formData.date}
                placeholder="i.e. 60"
                className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="startTime" className="text-sm">
                End time
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="time"
                name="endTime"
                id="endTime"
                value={formData.endTime}
                onChange={handleChange}
                disabled={!formData.startTime}
                placeholder="i.e. 60"
                className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
              />
            </div>{" "}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="hidden md:flex border-2 rounded-2xl p-3  flex-col gap-2.5 text-[#606060]">
          <div className="w-full flex items-center gap-5">
            <span className="w-1/3">Program: </span>
            <span className=" font-medium">
              {programs?.find((program: any) => program.id === programId)
                ?.name || "--"}
            </span>
          </div>
          <hr />
          <div className="w-full flex items-center gap-5">
            <span className="w-1/3">Group: </span>
            <span className=" font-medium">
              {programs
                ?.find((program: any) => program.id === programId)
                ?.groups.find((group: any) => group.id === formData.groupId)
                ?.name || "--"}
            </span>
          </div>
          <hr />
          <div className="w-full flex items-center gap-5">
            <span className="w-1/3">Module: </span>
            <span className=" font-medium">
              {programs
                ?.find((program: any) => program.id === programId)
                ?.modules.find((module: any) => module.id === formData.moduleId)
                ?.name || "--"}
            </span>
          </div>
          <hr />
          <div className="w-full flex items-center gap-5">
            <span className="w-1/3">Teacher: </span>
            <span className=" font-medium">
              {formData?.teacherId &&
                programs
                  ?.find((program: any) => program.id === programId)
                  ?.modules.find(
                    (module: any) => module.id === formData.moduleId
                  )
                  ?.teachers.find(
                    (teacher: any) => teacher.id === formData.teacherId
                  )?.firstName}{" "}
              {(formData?.teacherId &&
                programs
                  ?.find((program: any) => program.id === programId)
                  ?.modules.find(
                    (module: any) => module.id === formData.moduleId
                  )
                  ?.teachers.find(
                    (teacher: any) => teacher.id === formData.teacherId
                  )?.lastName) ||
                "--"}
            </span>
          </div>
          <hr />
          <div className="w-full flex items-center gap-5">
            <span className="w-1/3">Date: </span>
            <span className=" font-medium">
              {formData.date ? formatDate(formData.date) : "--"}
            </span>
          </div>
          <hr />
          <div className="w-full flex items-center gap-5">
            <span className="w-1/3">Start time: </span>
            <span className=" font-medium">
              {formData.startTime ? formatTime(formData.startTime) : "--"}
            </span>
          </div>
          <hr />
          <div className="w-full flex items-center gap-5">
            <span className="w-1/3">End time: </span>
            <span className=" font-medium">
              {formData.endTime ? formatTime(formData.endTime) : "--"}
            </span>
          </div>
        </div>

        <div className="flex-grow"></div>

        {failedText && (
          <div className="col-span-2 w-full bg-red-100 rounded-lg p-3  text-red-500 text-sm text-center">
            {failedText}
          </div>
        )}

        <div className="w-full flex sm:justify-end flex-col lg:flex-row gap-4">
          <Link
            href={"/schedules"}
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
            {loading ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>

      {successModalStatus && (
        <Gamification
          isOpen={successModalStatus}
          closeModal={() => setSuccessModalStatus(false)}
          title="Successs"
          text="Class schedule modified successfully!"
          link={"/schedules"}
        />
      )}
    </div>
  );
};

export default EditSchedule;
