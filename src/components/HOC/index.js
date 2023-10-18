import React, {useState, useEffect} from "react";
import {getLocalStorage} from "@/constants/constant";
import {useRouter} from "next/navigation";

export function AuthProvider(WrappedComponent) {
  return props => {
    const router = useRouter();
    const login = getLocalStorage("_ga");
    const [isAuthenticated, setisAuthenticated] = useState(null);

    useEffect(() => {
      console.log(login, isAuthenticated, "statusssssssss");
    }, [login, isAuthenticated]);
    useEffect(() => {
      if (login) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
      console.log("first");
    }, [login]);

    useEffect(() => {
      if (!isAuthenticated && !login) {
        console.log(isAuthenticated, "isAuthenticated");
        router.push("/");
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
