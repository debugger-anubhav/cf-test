import React from "react";
import CryptoJS from "crypto-js";
import ProductDetailComponents from "./SsrProductComponents";

export async function getServerSideProps(context) {
  const {productId} = context.params;
  console.log(context.params, "ooooooooooooooo");
  try {
    const data = await create(productId);
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
  const tempSecretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const plaintext = `${Date.now()}/Cityfurnish@India@123!/${Date.now()}`;
  const createEncryptedHash = (text, secretKey) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
  };
  const apiKey = createEncryptedHash(plaintext, tempSecretKey);

  const data = await fetch(
    // `http://3.109.156.217/v1/fc-products/getProductSeoData?productId=3847`,
    `http://3.109.156.217/v1/fc-products/getProductSeoData?productId=${params?.productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Apikey: apiKey,
      },
    },
  );
  return data.json();
}

export default async function Page(params) {
  const metaData = await create(params);
  return (
    <>
      <head>
        <meta name="Title" content={metaData?.data?.meta_title} />
      </head>
      <body>
        <ProductDetailComponents />
      </body>
    </>
  );
}

export async function generateMetadata({params}) {
  const data = await create(params);
  // console.log("metadtatadtdatdtadatatd", data.data);
  const Title = data?.data?.meta_title
    ? data?.data?.meta_title
    : `Rent Furniture Online - ${params.productName}`;
  const Description = data?.data?.meta_description
    ? data?.data?.meta_description
    : `Furniture Rental - Rent ${params.productName} Online in India - by Cityfurnish. Door Step Delivery, High-Quality Products, Easy Terms.`;
  return {
    title: Title,
    description: Description,
    alternates: {
      canonical: `https://cityfurnish.com/things/${params.productId}/${params.productName}`,
    },
    openGraph: {
      url: data?.data?.cat_header_code_snippet,
      title: Title,
      description: Description,
      siteName: "Cityfurnish",
      images: {
        url: "",
        width: 800,
        height: 600,
      },
    },
  };
}
