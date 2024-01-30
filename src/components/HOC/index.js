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
      const isLogin = await checkAuthentication();
      setisAuthenticated(isLogin);
      if (isLogin === false) {
        router.push("/");
      }
    };

    useEffect(() => {
      validateAuth();
    }, []);

    // useEffect(() => {
    //   setTimeout(() => {
    //     if (isAuthenticated === false) {
    //       console.log("in baddd");
    //       router.push("/");
    //     }
    //   }, 1000);
    // }, []);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
