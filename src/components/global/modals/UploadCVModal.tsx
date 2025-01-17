/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal } from "antd";
import hitApi from "@/lib/axios";
import FailedModal from "./FailedModal";
import Gamification from "./Gamification";

import { Poppins } from "next/font/google";

import { fileSizes } from "@/config";
import { PrimaryOutlineButton } from "../buttons/Buttons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  fetchData: () => void;
}

export default function UploadCVModal({
  isOpen,
  closeModal,
  fetchData,
}: ModuleModalProps) {
  const [failedModalStatus, setFailedModalStatus] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cv: null,
    description: "",
  }) as any;

  const handleChange = (e: any) => {
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const maxFileSize = fileSizes.cv * 1024 * 1024; // convert MB to bytes

        if (file) {
          if (file.size > maxFileSize) {
            setFailedText(
              `The selected file is too large. Please select a file smaller than ${fileSizes.cv} MB.`
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = (await hitApi(`/cvs`, "POST", formData, {
        "Content-Type": "multipart/form-data",
      })) as any;

      if (res?.success) {
        setSuccessModalStatus(true);
        fetchData();
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
      width={800}
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
      <div className="w-full flex flex-col gap-12 px-4 md:px-12 component-py items-center">
        <div className="w-full rounded-xl flex flex-col gap-6">
          <form
            onSubmit={handleSubmit}
            className="flex-grow flex flex-col gap-6 text-sm text-[#323232]"
          >
            <span className="font-bold text-xl">Upload CV</span>

            <div className="w-full grid grid-cols-1 gap-x-8 lg:gap-x-12 gap-y-5">
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
                  Description
                </label>

                <textarea
                  id="name"
                  name="description"
                  className="w-full p-3 border-2 bg-[#fafafa] transition outline-blue-300 rounded-lg resize-none"
                  placeholder="Description"
                  rows={6}
                  value={formData?.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-end md:items-center gap-x-6 gap-y-3">
              <PrimaryOutlineButton onClick={closeModal} title="Close" />

              <input
                type="submit"
                value={loading ? "Uploading..." : "Upload"}
                className="py-3 px-16 rounded-lg bg-primary hover:bg-darkGreen text-white font-medium hover:bg-primaryDark transition cursor-pointer"
                disabled={loading}
              />
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
            title="CV uploaded successfully."
            text="You have successfully uploaded your CV. You can now apply for jobs using this CV."
            action={() => {
              closeModal();
              setSuccessModalStatus(false);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
