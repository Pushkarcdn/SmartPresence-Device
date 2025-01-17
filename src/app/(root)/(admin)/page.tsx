"use client";

import Loader from "@/components/global/ui/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignIn: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/live-attendance");
  }, []);

  return (
    <section className="component-px component-py min-h-[60vh] w-full flex justify-center items-center">
      <Loader />
    </section>
  );
};

export default SignIn;
