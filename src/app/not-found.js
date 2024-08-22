"use client";
import React, {useEffect} from "react";
// // import MainFile from "../components/NotFound/MainFile";
// import RootLayout from "./layout";
// import NotFoundCatchAll from "./[...not_found]/page";

// export default function NotFound() {
//   return (
//     <RootLayout>
//       <NotFoundCatchAll />
//     </RootLayout>
//   );
// }

import NotFoundCatchAll from "./[...not_found]/page";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
const NotFoundPage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalPushState = window.history.pushState;
      window.history.pushState = function (...args) {
        originalPushState.apply(window.history, args);
        window.history.replaceState({...window.history.state, statusCode: 200});
      };
    }
  }, []);
  return (
    <ReduxProvider>
      <QueryProvider>
        <NotFoundCatchAll />
      </QueryProvider>
    </ReduxProvider>
  );
};

export default NotFoundPage;
