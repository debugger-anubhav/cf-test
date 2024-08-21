import React from "react";
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
  return (
    <ReduxProvider>
      <QueryProvider>
        <NotFoundCatchAll />
      </QueryProvider>
    </ReduxProvider>
  );
};

export default NotFoundPage;
