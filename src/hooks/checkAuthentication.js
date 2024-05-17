// import {baseInstance} from "@/network/axios";
// import {endPoints} from "@/network/endPoints";
import Cookies from "universal-cookie";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

// eslint-disable-next-line camelcase
// import cookie from "react-cookies";

export const useAuthentication = () => {
  // const [cookies, removeCookie] = useCookies(["authToken"]);
  // const token = cookies.authToken;

  const checkAuthentication = async () => {
    const cookies = new Cookies();
    const token = cookies.get("authToken");
    const userId = decrypt(getLocalStorage("_ga"));
    // if (!token) {
    //   localStorage.removeItem("user_id");
    //   localStorage.removeItem("_ga");
    // }
    try {
      // const response = await baseInstance.post(
      //   endPoints.login.isAuthenticate,
      //   {},
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   },
      // );

      // console.log(cookies.get("authToken"),userId,"ooooooooooo")

      if (token && userId) {
        return true;
      } else {
        cookies.remove("authToken", {path: "/"});
        localStorage.removeItem("user_id");
        localStorage.removeItem("_ga");
        // removeCookie("authToken");

        return false;
      }
    } catch {
      cookies.remove("authToken", {path: "/"});
      localStorage.removeItem("user_id");
      localStorage.removeItem("_ga");
      return false;
    }
  };

  return {checkAuthentication};
};
