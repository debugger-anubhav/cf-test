import React, {useState, useEffect} from "react";
import {getLocalStorage} from "@/constants/constant";
import {useRouter} from "next/navigation";

export function AuthProvider(WrappedComponent) {
  return props => {
    const router = useRouter();
    const login = getLocalStorage("_ga");
    const [isAuthenticated, setisAuthenticated] = useState(null);

    useEffect(() => {
      if (login) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
    }, [login]);

    useEffect(() => {
      if (!isAuthenticated && !login) {
        router.push("https://test.rentofurniture.com/user_sign_up");
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
