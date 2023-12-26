import React, {useState, useEffect} from "react";
// import {getLocalStorage} from "@/constants/constant";
import {useRouter} from "next/navigation";
import {useAuthentication} from "@/hooks/checkAuthentication";

export function AuthProvider(WrappedComponent) {
  return props => {
    const {checkAuthentication} = useAuthentication();
    const router = useRouter();
    // const login = getLocalStorage("_ga");
    const [isAuthenticated, setisAuthenticated] = useState(null);

    const validateAuth = async () => {
      const isAuthenticated = await checkAuthentication();
      console.log(isAuthenticated, "response from isauthencate");
      if (isAuthenticated === true) {
        setisAuthenticated(true);
      } else setisAuthenticated(false);
    };

    useEffect(() => {
      validateAuth();
    }, []);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
