/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import hitApi from "@/lib/axios";
import Gamification from "@/components/global/modals/Gamification";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    profileImage: null,
  }) as any;

  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const handleChange = (e: any) => {
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      const maxSize = 2 * 1024 * 1024; // file size in bytes

      if (file) {
        if (file.size > maxSize) {
          setFailedText(
            `The selected file is too large. Please select a file smaller than ${
              maxSize / 1024 / 1024
            } MB.`
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
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setFailedText("");

    // check password
    if (formData.password !== formData.confirmPassword) {
      setFailedText("Passwords do not match.");
      setLoading(false);
      return;
    } else {
      delete formData.confirmPassword;
    }

    // Send the form data to the server
    const res = await hitApi("/register/admin", "POST", formData, {
      "Content-Type": "multipart/form-data",
    });

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            First name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            required
            onChange={handleChange}
            placeholder="First name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Last name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
            placeholder="Last name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-base">
            Email <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-base">
            Phone <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            required
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-base">
            Address <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            required
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-base">
            Password <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-base">
            Confirm Password <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="profileImage" className="text-base">
            Profile Image <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            required
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg border-2 outline-gray-400"
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/admin/admin-accounts"}
          className="px-12 py-2 text-active hover:bg-active hover:text-white transition border-2 border-active rounded-lg text-center"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className={`px-16 py-3 bg-primary hover:bg-darkGreen transition text-white rounded-lg flex items-center justify-center text-center ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      {failedText && (
        <div className="w-full bg-red-100 rounded-lg p-3 mb-3 text-red-500 font-medium text-center">
          {failedText}
        </div>
      )}

      {successModalStatus && (
        <Gamification
          isOpen={successModalStatus}
          closeModal={() => setSuccessModalStatus(false)}
          title="Success"
          text="Admin account created successfully."
          link={"/admin/admin-accounts"}
        />
      )}
    </form>
  );
};

export default CreateAdmin;
