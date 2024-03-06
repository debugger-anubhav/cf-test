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
import Header from "@/components/Common/Header";
import CatMenu from "./CatMenu";

async function create() {
  const data = "hello";
  console.log("Data fetched:", data);
  return data;
}

export default async function Page() {
  const data = await create();

  return (
    <>
      <p>{data}</p>
      {/* <div>pageeeee {data}</div> */}
      <CatAnnouncement />
      <Header />
      <CatMenu />
    </>
  );
}
