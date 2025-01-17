"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.push("/programs");
  return <div>page</div>;
};

export default Page;
