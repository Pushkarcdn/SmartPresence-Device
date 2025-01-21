/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hitApi from "@/lib/axios";
import Navbar from "@/components/global/navbars/Navbar";
import Loader from "@/components/global/ui/Loader";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    // use hitApi() directly here
    const res = await hitApi("/current-user");

    if (!res?.success) {
      location.href = "/sign-in";
      // router.push("/sign-in");
    }

    if (res.success && res.data.role !== "teacher") {
      location.href = "/sign-in";
      // router.push("/sign-in");
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
