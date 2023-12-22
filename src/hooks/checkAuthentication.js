import {useCookies} from "react-cookie";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

export const useAuthentication = () => {
  const [cookies, removeCookie] = useCookies(["authToken"]);
  const token = cookies.authToken;

  const checkAuthentication = async () => {
    if (!token) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("_ga");
    }
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

  // useEffect(() => {
  //   checkAuthentication(); // You can call this on component mount or as needed
  // }, [token]);

  return {checkAuthentication};
};

// // import React from "react";
// import {baseURL} from "@/network/axios";
// import {endPoints} from "@/network/endPoints";
// import axios from "axios";
// import {useEffect, useState} from "react";
// import {useCookies} from "react-cookie";

// const useCheckAuthentication = () => {
//   // const [cookies, removeCookie] = useCookies(["authToken"]);
//   const [isAuthenticate, setIsAuthenticate] = useState();
//     console.log(cookies, "cookies");
//   const token = cookies.authToken;

//   const checkAuthenticate = async () => {
//     if (!token) {
//       localStorage.removeItem("user_id");
//       localStorage.removeItem("_ga");
//       setIsAuthenticate(false);
//     }
//     try {
//       const response = await axios.post(
//         baseURL + endPoints.login.isAuthenticate,
//         {},
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       );

//       if (response.data.message === true) {
//         setIsAuthenticate(true);
//       } else {
//         localStorage.removeItem("user_id");
//         localStorage.removeItem("_ga");
//         removeCookie("authToken");
//         setIsAuthenticate(false);
//       }
//     } catch (error) {
//       console.error("Error checking authentication:", error);
//       setIsAuthenticate(false);
//     }
//   };

//   useEffect(() => {
//     checkAuthenticate();
//   }, [token]);

//   return {isAuthenticate};
// };

// export default useCheckAuthentication;
