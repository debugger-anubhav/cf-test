// import {useCookies} from "react-cookie";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import Cookies from "universal-cookie";
// eslint-disable-next-line camelcase
// import cookie from "react-cookies";

export const useAuthentication = () => {
  // const [cookies, removeCookie] = useCookies(["authToken"]);
  // const token = cookies.authToken;

  const checkAuthentication = async () => {
    const cookies = new Cookies();
    const token = cookies.get("authToken");
    console.log(token, " token in authen func");
    // if (!token) {
    //   localStorage.removeItem("user_id");
    //   localStorage.removeItem("_ga");
    // }
    try {
      const response = await axios.post(
        baseURL + endPoints.login.isAuthenticate,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.data.message === true) {
        return true;
      } else {
        localStorage.removeItem("user_id");
        localStorage.removeItem("_ga");
        // removeCookie("authToken");
        cookies.remove("authToken", {path: "/"});

        return false;
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  };

  return {checkAuthentication};
};
