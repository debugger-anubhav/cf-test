// export async function getServerSideProps() {
//   try {
//     const data = await create();
//     return {
//       props: {
//         data
//       }
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         data: null
//       }
//     };
//   }
// }
import React from "react";
import CatAnnouncement from "./CatAnnouncement";
import CatHeader from "./CatHeader";
import CatMenu from "./CatMenu";
import CatSubHeader from "./CatSubHeader";

async function create() {
  const data = "hello";
  return data;
}

export default async function Page() {
  const data = await create();
  console.log(data);
  return (
    <>
      <CatAnnouncement />
      <CatHeader />
      <CatMenu />
      <CatSubHeader />
    </>
  );
}
