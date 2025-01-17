/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import hitApi from "@/lib/axios";

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  signOut: () => Promise<boolean>;
  userData: any;
  loading: boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signOut = async () => {
    try {
      const res = await hitApi("/signout");
      if (res?.success) {
        setIsSignedIn(false);
        router.push("/");
      }
      return res?.success;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const {
    data: userData,
    fetchData: refetch,
    loading,
  } = useFetch("/current-user") as any;

  useEffect(() => {
    if (userData) setIsSignedIn(!!userData);
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isSignedIn,
        userData,
        signOut,
        setIsSignedIn,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
