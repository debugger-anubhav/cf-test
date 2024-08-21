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

const NotFoundPage = () => {
  return <NotFoundCatchAll />;
};

export default NotFoundPage;
