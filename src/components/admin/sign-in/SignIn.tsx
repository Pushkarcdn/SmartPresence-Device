"use client";

import { PrimaryButton } from "@/components/global/buttons/Buttons";
import { useAuth } from "@/contexts/AuthContext";
import hitApi from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn: React.FC = () => {
  const router = useRouter();

  const { refetch } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    const res = await hitApi("/signin", "POST", formData);

    console.log(res);

    if (!res?.success) {
      setErr(res?.message);
      setLoading(false);
      return;
    }

    setErr("");
    refetch();
    setSuccess(true);

    // location.href = "/";
    router.push("/");

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="component-px">
      <div
        className="relative min-h-screen flex items-center justify-center bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/backgrounds/auth.png')" }}
      >
        <section className="w-full max-w-lg component-px py-10  bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl text-center font-semibold mb-3 text-primary">
            Sign in
          </h2>
          <p className="text-sm text-center text-[#606060]">
            Enter your login credentials.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col border-gray-300 gap-4 my-4 text-[#606060]"
          >
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="floating-input py-2.5 px-5 text-sm rounded-md w-full outline-none border border-primary "
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="email"
                className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="floating-input py-2.5 px-5 text-sm rounded-md w-full outline-none border border-primary "
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="password"
                className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-4 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEye className="h-5 w-5 text-gray-700" />
                ) : (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-gray-700" />
                )}
              </span>
            </div>
            {/* <div className="flex justify-start mb-2">
              <Link
                href="/admin/forgot-password"
                className="text-sm text-primary font-normal hover:underline"
              >
                Forgot Password?
              </Link>
            </div> */}

            <PrimaryButton
              type="submit"
              title={loading ? "Signing in..." : "Sign in"}
            />

            {/* <input
              type="submit"
              className="bg-primary hover:bg-darkGreen transition text-white font-bold py-2 px-4 rounded cursor-pointer"
              value={loading ? "Signing in..." : "Sign in"}
              disabled={loading || success}
            /> */}
            {/* <p className="pt-4 text-secondary text-sm font-normal text-center">
              New to SmartPresence?{" "}
              <Link
                href="/sign-up"
                className="text-active font-bold hover:underline"
              >
                Register
              </Link>
            </p> */}
          </form>
          {err && (
            <p className="w-full bg-red-100 text-red-500 text-center text-sm font-medium rounded-md p-2.5 sm:p-3 max-sm:text-sm">
              {err}
            </p>
          )}
          {success && (
            <p className="w-full bg-green-100 text-green-500 text-center text-sm font-medium rounded-md p-2.5 sm:p-3 max-sm:text-sm">
              Sign in successful! Redirecting...
            </p>
          )}
          {/* Sign in with Google button */}
          {/* <div className="flex justify-between mb-2 mt-4 gap-x-6">
              <button
                type="button"
                className="bg-white py-2 px-4 rounded-2xl w-full flex items-center justify-center text-center border"
              >
                <Image
                  src="/google.png"
                  alt="Google Logo"
                  width={40}
                  height={40}
                  className="mr-2 object-contain"
                />
              </button>

              <button
                type="button"
                className="bg-white py-2 px-4 rounded-2xl w-full flex items-center justify-center text-center border"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook Logo"
                  width={40}
                  height={40}
                  className="mr-2 object-cover"
                />
              </button>

              <button
                type="button"
                className="bg-white py-2 px-4 rounded-2xl w-full flex items-center justify-center text-center border"
              >
                <Image
                  src="/linkedln.png"
                  alt="Linkedln Logo"
                  width={40}
                  height={40}
                  className="mr-2 object-cover"
                />
              </button>
            </div> */}
        </section>
      </div>
      <style jsx>{`
        .floating-input {
          padding-top: 20px;
        }

        .floating-label {
          pointer-events: none;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          transition: 0.2s ease all;
        }

        .floating-input:focus ~ .floating-label,
        .floating-input:not(:placeholder-shown) ~ .floating-label {
          top: 0;
          transform: translateY(-50%) scale(0.9);
          background-color: white;
          padding: 0 5px;
          color: #8ba5ff;
        }

        .floating-input:focus {
          border-color: #8ba5ff;
        }
      `}</style>
    </section>
  );
};

export default SignIn;
