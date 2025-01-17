/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { fileSizes, getFileUrl } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import hitApi from "@/lib/axios";
import { getDateForField } from "@/utils/dateFormatters";
import React, { useEffect, useState } from "react";

function PersonalInformations({ userData }: any) {
  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    dob: "",
    gender: "",
    bio: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setSuccessText("");

    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      const fileSize = fileSizes.profileImage; // in MB

      if (file) {
        const maxFileSize = fileSize * 1024 * 1024; // convert MB to bytes

        if (file) {
          if (file.size > maxFileSize) {
            setFailedText(
              `The selected file is too large. Please select a file smaller than ${fileSize} MB.`
            );

            // Clear the input
            (e.target as HTMLInputElement).value = "";
            return;
          }

          setFormData({
            ...formData,
            [e.target.name]: file,
          });
        }
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

    setIsEdited(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setFailedText("");
      setSuccessText("");

      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.dob ||
        !formData.gender
      ) {
        setFailedText("Please fill all the required fields.");
        return;
      }

      if (typeof formData.phone != "number" && formData.phone.length !== 10) {
        {
          setFailedText("Please enter a valid 10 digit phone number.");
          return;
        }
      }

      setLoading(true);

      const res = (await hitApi(`/job-seekers`, "PUT", formData, {
        "Content-Type": "multipart/form-data",
      })) as any;

      if (res?.success) {
        setSuccessText("Profile updated successfully.");
        setIsEdited(false);
      } else {
        setFailedText(res?.message || "Failed to update profile.");
      }

      setLoading(false);
    } catch (error: any) {
      console.error("error is :  ", error);
    }
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        profession: userData?.profession || "",
        dob: userData?.dob || "",
        gender: userData?.gender || "",
        bio: userData?.bio || "",
        description: userData?.description || "",
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 ">
      <div className="w-full flex flex-col gap-3">
        <span className="font-bold text-xl text-active">Profile picture</span>

        <Image
          src={getFileUrl(userData?.profileImage)}
          alt="Profile image"
          width={150}
          height={100}
          className="rounded-md"
        />

        {isEditable && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-5">
            <div className="flex flex-col gap-1.5">
              <input
                className="block w-full text-sm text-gray-900 border border-[#d9d9d9] rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="profileImage"
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-[#323232] flex flex-col gap-5">
        <span className="font-bold text-xl text-active">
          Personal informations
        </span>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              First name<span className="text-red-500 text-sm"> *</span>
            </label>

            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="First name"
              value={formData?.firstName}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Last name<span className="text-red-500 text-sm"> *</span>
            </label>

            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="Last name"
              value={formData?.lastName}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Profession
            </label>

            <input
              type="text"
              id="profession"
              name="profession"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="eg. Software Engineer"
              value={formData?.profession}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email<span className="text-red-500 text-sm"> *</span>
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="eg. example@mail.com"
              value={formData?.email}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Phone (without country code)
              <span className="text-red-500 text-sm"> *</span>
            </label>

            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="eg. 9812345678"
              value={formData?.phone}
              onChange={handleChange}
              maxLength={10}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Date of birth<span className="text-red-500 text-sm"> *</span>
            </label>

            <input
              type="date"
              id="dob"
              name="dob"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg select-none"
              placeholder="9812345678"
              value={formData?.dob ? getDateForField(formData?.dob) : ""}
              onChange={handleChange}
              // max date is 16 years ago
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() - 16))
                  .toISOString()
                  .split("T")[0]
              }
              // disable manual typing
              onKeyDown={(e) => e.preventDefault()}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-3 items-start select-none">
            <label htmlFor="gender" className="text-sm font-medium">
              Gender<span className="text-red-500 text-sm"> *</span>
            </label>

            {!isEditable && (
              <div className="bg-[#606060] py-1 px-3 rounded-full text-white">
                {formData?.gender?.toUpperCase()}
              </div>
            )}

            {isEditable && (
              <fieldset className="flex items-center gap-8 ">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={(e) =>
                      setFormData({ ...formData, gender: "male" })
                    }
                    checked={formData.gender === "male"}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={(e) =>
                      setFormData({ ...formData, gender: "female" })
                    }
                    checked={formData.gender === "female"}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="others"
                    name="gender"
                    value="others"
                    onChange={(e) =>
                      setFormData({ ...formData, gender: "others" })
                    }
                    checked={formData.gender === "others"}
                  />
                  <label htmlFor="others">Others</label>
                </div>
              </fieldset>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <span className="font-bold text-xl text-active">About</span>

        <div className="w-full grid grid-cols-1 gap-x-8 gap-y-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              className="w-full p-3 border-2 scrollbar border-blue-100 transition outline-blue-300 rounded-lg resize-none text-sm"
              placeholder="eg. I am a software engineer with 5 years of experience in the field."
              value={formData?.bio}
              onChange={handleChange}
              maxLength={64}
              rows={2}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              className="w-full p-3 border-2 scrollbar border-blue-100 transition outline-blue-300 rounded-lg resize-none text-sm"
              placeholder="eg. I am a software engineer with 5 years of experience in the field."
              value={formData?.description}
              onChange={handleChange}
              maxLength={512}
              rows={5}
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>

      {successText && (
        <p className="text-green-500 text-sm bg-green-100 p-3 rounded-lg text-center">
          {successText}
        </p>
      )}

      {failedText && (
        <p className="text-red-500 text-sm bg-red-100 p-3 rounded-lg text-center">
          {failedText}
        </p>
      )}

      {isEditable && (
        <div className="w-full flex items-center gap-4">
          <button
            type="submit"
            className="py-3 px-16 font-medium bg-primary hover:bg-darkGreen transition text-white rounded-lg disabled:bg-[#134564] disabled:cursor-not-allowed"
            disabled={loading || !isEdited}
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
}

export default PersonalInformations;
