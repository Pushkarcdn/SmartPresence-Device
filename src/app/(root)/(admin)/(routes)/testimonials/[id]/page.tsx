/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import { getFileUrl } from "@/config";
import hitApi from "@/lib/axios";

import Gamification from "@/components/global/modals/Gamification";
import FailedModal from "@/components/global/modals/FailedModal";

export default function Page({ params }: any) {
  const id = params?.id;

  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, loading: loadingData } = useFetch(`/testimonials/${id}`) as any;

  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    designation: "",
    rating: 5,
  }) as any;

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

    // Send the form data to the server
    const res = await hitApi(`/testimonials/${id}`, "PUT", formData);

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        feedback: data.feedback,
        designation: data.designation,
        rating: data.rating,
      });
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Full name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            placeholder="Full name"
            className="w-full p-2.5 text-darkText placeholder-[#555555]   font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Designation
            <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="designation"
            required
            value={formData.designation}
            onChange={handleChange}
            placeholder="i.e. CEO, Manager"
            className="w-full p-2.5 text-darkText placeholder-[#555555]   font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Rating
          </label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal  rounded-lg outline-gray-400"
          >
            {[1, 2, 3, 4, 5].map((rating: any) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 lg:col-span-2">
          <label htmlFor="fullName" className="text-base">
            Feedback
            <span className="text-red-500 text-sm">*</span>
          </label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Feedback"
            rows={6}
            required
            className="w-full p-2.5 text-darkText placeholder-[#555555] resize-none font-normal component-paragraphs rounded-lg scrollbar outline-gray-400"
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/admin/testimonials"}
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
          {loading ? "Saving..." : "Save"}
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
          text="Testimonial saved successfully"
          link={"/admin/testimonials"}
        />
      )}

      {failedText && (
        <FailedModal
          isOpen={!!failedText}
          closeModal={() => setFailedText("")}
          title="Failed"
          text={failedText}
        />
      )}
    </form>
  );
}
