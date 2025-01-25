"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/global/ui/Loader";

const Page = () => {
  const router = useRouter();
  router.push("/programs");
  return <Loader />;
};

export default Page;
