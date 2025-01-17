/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import useFetch from "@/hooks/useFetch";

import PersonalInformations from "@/components/admin/job-seekers/PersonalInformations";
import Address from "@/components/admin/job-seekers/Address";
import CV from "@/components/admin/job-seekers/CV";
import Loader from "@/components/global/ui/Loader";

export default function Page({ params }: any) {
  const id = params?.id;

  const { data: userData, loading } = useFetch(`/job-seekers/${id}`);

  if (loading) return <Loader />;

  if (!userData?.id) return null;

  return (
    <div className="w-full flex flex-col gap-8 sm:p-3">
      <PersonalInformations userData={userData} />
      <hr />
      <Address userData={userData} />
      <hr />
      <CV id={id} />
    </div>
  );
}
