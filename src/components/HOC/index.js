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
      console.log(isLogin, "response from isauthencate");
      setisAuthenticated(isLogin);
      if (isLogin === false) {
        console.log("in baddd");
        router.push("/cityfurnish");
      }
    };

    useEffect(() => {
      validateAuth();
    }, []);

    // useEffect(() => {
    //   setTimeout(() => {
    //     if (isAuthenticated === false) {
    //       console.log("in baddd");
    //       router.push("/cityfurnish");
    //     }
    //   }, 1000);
    // }, []);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
