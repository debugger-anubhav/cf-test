import React from "react";
import CatAnnouncement from "./CatAnnouncement";
import CatHeader from "./CatHeader";
import CatMenu from "./CatMenu";
import CatSubHeader from "./CatSubHeader";
import {endPoints} from "@/network/endPoints";
import CryptoJS from "crypto-js";
export async function getServerSideProps(context) {
  const {nameOfCity, category} = context.params;
  try {
    const data = await create(nameOfCity, category);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: null,
      },
    };
  }
}

async function create(params) {
  console.log("dhfsdhfsd", params);

  const tempSecretKey = "b3ad5950f7c555c664f19c9ec77bbfb943";
  const plaintext = `${Date.now()}/Cityfurnish@India@123!/${Date.now()}`;
  const createEncryptedHash = (text, secretKey) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
  };
  const apiKey = createEncryptedHash(plaintext, tempSecretKey);

  const data = await fetch(
    "https://test.rentofurniture.com/api/" + endPoints.categoryMetaData,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Apikey: apiKey,
      },
      body: JSON.stringify({
        cityName: params.city?.toLowerCase(),
        seourl: params.category,
      }),
    },
  );
  return data.json();
}

export default async function Page() {
  return (
    <>
      <CatAnnouncement />
      <CatHeader />
      <CatMenu />
      <CatSubHeader />
    </>
  );
}

export async function generateMetadata({params}) {
  const data = await create(params);
  console.log("metadtatadtdatdtadatatd", data.data);
  return {
    title: data?.data?.cat_meta_title,
    description: data?.data?.cat_meta_desc,
  };
}
