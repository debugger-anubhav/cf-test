import {useCookies} from "react-cookie";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

export const useAuthentication = () => {
  const [cookies, removeCookie] = useCookies(["authToken"]);
  const token = cookies.authToken;
  console.log(token, "token");

  const checkAuthentication = async () => {
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
        removeCookie("authToken");

        return false;
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  };

  return {checkAuthentication};
};
