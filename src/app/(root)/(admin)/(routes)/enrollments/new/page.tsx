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

const Enroll = () => {
  const [formData, setFormData] = useState({
    moduleId: "",
    groupId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    role: "student",
  }) as any;

  const roles = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];

  const [programId, setProgramId] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingWebcam, setLoadingWebcam] = useState(true);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  // Camera Management

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const enableVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setMediaStream(stream);
    } catch (err: any) {
      setFailedText(`Unable to access the webcam: ${err.message}`);
      console.error("Error accessing webcam", err);
    } finally {
      setLoadingWebcam(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Set canvas dimensions to match the video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to the canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the image as a data URL and set it to the captured image state
        const image = canvas.toDataURL("image/png");
        setCapturedImage(image);
      } else {
        console.error("Error capturing image: Canvas context not found");
        setFailedText("Error capturing image. Please try again.");
      }
    }
  };

  const sendImageToApi = async () => {
    try {
      // Define the payload
      const payload = {
        image: capturedImage, // Base64 image string
      };

      // own function to hit the api
      // const res = await hitApi(
      //   `${config.PYTHON_BE_URL}/api/register-face`,
      //   "POST",
      //   formData,
      //   {
      //     "Content-Type": "application/json",
      //   }
      // );

      // Default fetch method
      let res = (await fetch(`${config.PYTHON_BE_URL}/api/register-face`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })) as any;

      res = await res.json();

      if (res?.success) {
        return res.unique_id;
      } else {
        setFailedText(res?.message || "An error occured. Please try again.");
        return null;
      }
    } catch (error: any) {
      console.error("Error uploading image to Python-BE:", error);
      setFailedText("Error uploading image. Please try again.");
      return null;
    }
  };

  const deleteRegisteredImage = async (id: string) => {
    try {
      await fetch(`${config.PYTHON_BE_URL}/api/delete-face/${id}`, {
        method: "DELETE",
      });
    } catch (error: any) {
      console.error("Error deleting image from Python-BE:", error);
    }
  };

  useEffect(() => {
    enableVideoStream();
  }, []);

  useEffect(() => {
    if (
      videoRef.current &&
      mediaStream &&
      videoRef.current.srcObject !== mediaStream
    ) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [videoRef, mediaStream]);

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  // Form Management

  const { data: programs, loading: programsLoading } = useFetch(
    "/programs"
  ) as any;

  const changeRole = (role: any) => {
    if (role === formData.role) return;

    setFormData({
      ...formData,
      role,
      moduleId: "",
      groupId: "",
    });
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setFailedText("");

    // Check if all required fields are filled
    if (formData.role === "student" && !formData.groupId) {
      setFailedText("Please select a group.");
      return;
    }

    if (
      formData.role === "teacher" &&
      !(formData.moduleId && formData.password)
    ) {
      setFailedText("Please select all required fields.");
      return;
    }

    if (
      !(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone &&
        formData.address
      )
    ) {
      setFailedText("Please fill all the required fields.");
      return;
    }

    if (!capturedImage) {
      setFailedText("Please capture image to enroll.");
      return;
    }

    setLoading(true);

    // first sent the image to the api
    const id = await sendImageToApi();

    if (formData.role === "teacher") delete formData.groupId;

    if (formData.role === "student") delete formData.moduleId;

    // Send the form data to the server
    const res = await hitApi("/register", "POST", {
      ...formData,
      id,
    });

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
      // delete the image from the api
      deleteRegisteredImage(id);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (programId) {
      setFormData({
        ...formData,
        groupId: "",
        moduleId: "",
      });
    }
  }, [programId]);

  if (programsLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-y-4 text-left">
          <div className="flex items-center gap-6">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => changeRole(role.value)}
                className={`px-6 py-2.5 rounded-lg text-sm transition ${
                  formData.role === role.value
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-darkText"
                }`}
              >
                {role.label}
              </button>
            ))}
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

          {formData.role === "student" && (
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
          )}

          {formData.role === "teacher" && (
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
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm">
                First name
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="i.e. John the Don"
                className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm">
                Last name
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="i.e. Doe"
                className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Email
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="i.e. example@mail.com"
                className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm">
                Phone
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="i.e. 1234567890"
                className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
              />
            </div>
          </div>

          {formData.role === "teacher" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm">
                Password
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-sm">
              Address
              <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="i.e. Kathmandu, Nepal"
              className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal border border-gray-300 rounded-md outline-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="w-full flex flex-col  flex-grow gap-4">
          {loadingWebcam && <Loader />}

          {!loadingWebcam && (
            <>
              {!capturedImage && (
                <div className="relative w-full flex flex-col gap-4 items-end">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="rounded-2xl bg-black w-full max-h-80 object-center object-cover"
                  />
                  <PrimaryButton title="Capture Image" onClick={captureImage} />
                </div>
              )}
              {capturedImage && (
                <div className="relative w-full flex flex-col gap-4 items-end">
                  <Image
                    width={1200}
                    height={1200}
                    src={capturedImage}
                    alt="Captured"
                    className="rounded-lg w-full max-h-80 object-cover object-center"
                  />
                  <PrimaryOutlineButton
                    title="Retake"
                    onClick={() => {
                      enableVideoStream();
                      setCapturedImage(null);
                    }}
                  />
                </div>
              )}

              {/* <button
                onClick={captureImage}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Capture Image
              </button> */}

              {/* <br />
              {capturedImage && (
                <PrimaryOutlineButton
                  onClick={() => {
                    enableVideoStream();
                    setCapturedImage(null);
                    setUploadStatus(null);
                  }}
                  title="Retake"
                />
              )} */}
            </>
          )}

          {/* Hidden canvas for capturing the video frame */}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>

        <div className="flex-grow"></div>

        {failedText && (
          <div className="col-span-2 w-full bg-red-100 rounded-lg p-3  text-red-500 text-sm text-center">
            {failedText}
          </div>
        )}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={"/enrollments/students"}
            className="px-12 py-2 text-secondary hover:bg-secondary hover:text-white transition border-2 border-secondary rounded-lg text-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className={`px-16 py-3 bg-primary hover:bg-primaryDark transition text-white rounded-lg flex items-center justify-center text-center disabled:bg-primaryDark ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={loading || !capturedImage}
          >
            {loading ? "Enrolling..." : "Enroll"}
          </button>
        </div>
      </div>

      {successModalStatus && (
        <Gamification
          isOpen={successModalStatus}
          closeModal={() => setSuccessModalStatus(false)}
          title="Successs"
          text={`${
            formData.role === "student" ? "Student" : "Teacher"
          } enrolled successfully!`}
          link={`/enrollments/${formData.role}s`}
        />
      )}
    </div>
  );
};

export default Enroll;
