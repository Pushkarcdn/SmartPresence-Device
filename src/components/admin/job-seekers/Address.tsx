/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { fileSizes } from "@/config";
import hitApi from "@/lib/axios";
import React, { useEffect, useState } from "react";

export default function Address({ userData }: any) {
  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isSame, setIsSame] = useState(false);

  const [temporaryAddress, setTemporaryAddress] = useState({
    country: "",
    state: "",
    city: "",
    streetAddress: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    country: "",
    state: "",
    city: "",
    streetAddress: "",
  });

  const handleTemporaryChange = (e: any) => {
    setSuccessText("");

    setTemporaryAddress({
      ...temporaryAddress,
      [e.target.name]: e.target.value,
    });

    setIsEdited(true);
  };

  const handlePermanentChange = (e: any) => {
    setSuccessText("");

    setPermanentAddress({
      ...permanentAddress,
      [e.target.name]: e.target.value,
    });

    setIsEdited(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setFailedText("");
      setSuccessText("");

      let formData: {
        permanentAddress: {
          country: string;
          state: string;
          city: string;
          streetAddress: string;
        };
        temporaryAddress?: {
          country: string;
          state: string;
          city: string;
          streetAddress: string;
        };
      } = {
        permanentAddress,
        temporaryAddress,
      };

      if (isSame) {
        formData = {
          ...formData,
          temporaryAddress: permanentAddress,
        };
      }

      if (
        !formData?.temporaryAddress?.country ||
        !formData?.temporaryAddress?.state ||
        !formData?.temporaryAddress?.city ||
        !formData?.temporaryAddress?.streetAddress ||
        !formData?.permanentAddress?.country ||
        !formData?.permanentAddress?.state ||
        !formData?.permanentAddress?.city ||
        !formData?.permanentAddress?.streetAddress
      ) {
        setFailedText("Please fill all the required fields.");
        return;
      }

      setLoading(true);

      const res = (await hitApi(
        `/job-seekers`,
        "PUT",
        formData
        // {
        //   "Content-Type": "multipart/form-data",
        // }
      )) as any;

      if (res?.success) {
        setSuccessText("Profile updated successfully.");
        setIsEdited(false);
      } else {
        setFailedText(res?.message || "Failed to update profile.");
      }

      setLoading(false);
    } catch (error: any) {
      console.error("error is:  ", error);
    }
  };

  useEffect(() => {
    if (userData) {
      setPermanentAddress({
        country: userData?.permanentAddress?.country || "",
        state: userData?.permanentAddress?.state || "",
        city: userData?.permanentAddress?.city || "",
        streetAddress: userData?.permanentAddress?.streetAddress || "",
      });

      setTemporaryAddress({
        country: userData?.temporaryAddress?.country || "",
        state: userData?.temporaryAddress?.state || "",
        city: userData?.temporaryAddress?.city || "",
        streetAddress: userData?.temporaryAddress?.streetAddress || "",
      });

      if (
        JSON.stringify(userData?.temporaryAddress) ==
        JSON.stringify(userData?.permanentAddress)
      ) {
        setIsSame(true);
      }
    }
  }, [userData]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      <div className="text-sm text-[#323232] flex flex-col gap-5">
        <span className="font-bold text-xl text-active">Permanent address</span>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Country <span className="text-red-500 text-sm">*</span>
            </label>

            <input
              type="text"
              id="country"
              name="country"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="Country"
              value={permanentAddress?.country}
              onChange={handlePermanentChange}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              State/Province <span className="text-red-500 text-sm">*</span>
            </label>

            <input
              type="text"
              id="state"
              name="state"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="State"
              value={permanentAddress?.state}
              onChange={handlePermanentChange}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              City <span className="text-red-500 text-sm">*</span>
            </label>

            <input
              type="text"
              id="city"
              name="city"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="city"
              value={permanentAddress?.city}
              onChange={handlePermanentChange}
              disabled={!isEditable}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Street address <span className="text-red-500 text-sm">*</span>
            </label>

            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
              placeholder="Street address"
              value={permanentAddress?.streetAddress}
              onChange={handlePermanentChange}
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>

      <div className="text-sm text-[#323232] flex flex-col gap-5">
        <div className="flex items-center">
          <span className="font-bold text-xl text-active">Current address</span>
        </div>

        <div className="flex items-center gap-5">
          <input
            type="checkbox"
            id="sameAddress"
            name="sameAddress"
            className="w-5 h-5"
            checked={isSame}
            onChange={() => setIsSame(!isSame)}
            disabled={!isEditable}
          />
          <label htmlFor="sameAddress" className="text-sm font-medium">
            Same as permanent address
          </label>
        </div>

        {!isSame && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Country <span className="text-red-500 text-sm">*</span>
              </label>

              <input
                type="text"
                id="country"
                name="country"
                className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                placeholder="Country"
                value={temporaryAddress?.country}
                onChange={handleTemporaryChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                State/Province <span className="text-red-500 text-sm">*</span>
              </label>

              <input
                type="text"
                id="state"
                name="state"
                className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                placeholder="State"
                value={temporaryAddress?.state}
                onChange={handleTemporaryChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                City <span className="text-red-500 text-sm">*</span>
              </label>

              <input
                type="text"
                id="city"
                name="city"
                className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                placeholder="City"
                value={temporaryAddress?.city}
                onChange={handleTemporaryChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Street address <span className="text-red-500 text-sm">*</span>
              </label>

              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                className="w-full p-3 border-2 border-blue-100 transition outline-blue-300 rounded-lg"
                placeholder="Street address"
                value={temporaryAddress?.streetAddress}
                onChange={handleTemporaryChange}
                disabled={!isEditable}
              />
            </div>
          </div>
        )}
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
