/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import LogoutModal from "@/components/global/modals/LogoutModal";
import { useAuth } from "@/contexts/AuthContext";

const Logout = () => {
  const [logoutModalStatus, setLogoutModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signOut, isSignedIn } = useAuth();

  const logout = async () => {
    setLoading(true);
    const isLoggedout = await signOut();
  };

  return (
    <>
      <button
        onClick={(close) => {
          setLogoutModalStatus(true);
        }}
        className={`w-full flex items-center gap-2 2xl:gap-4 py-3 xl:py-3.5 px-3 2xl:px-5 bg-red-200 hover:bg-red-600 text-red-500 hover:text-white font-medium rounded-xl transition-all duration-300 ease-in-out cursor-pointer`}
        disabled={loading}
      >
        <HiOutlineLogout size={22} />
        <div>Logout</div>
      </button>
      {
        <LogoutModal
          isOpen={logoutModalStatus}
          closeModal={() => setLogoutModalStatus(false)}
          action={logout}
        />
      }
    </>
  );
};

export default Logout;
function useEffect(arg0: () => void, arg1: boolean[]) {
  throw new Error("Function not implemented.");
}
