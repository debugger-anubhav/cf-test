import React from "react";
import CatAnnouncement from "./CatAnnouncement";
import CatHeader from "./CatHeader";
import CatMenu from "./CatMenu";
import CatSubHeader from "./CatSubHeader";
import {endPoints} from "@/network/endPoints";
import CryptoJS from "crypto-js";
import HeroBanner from "../../../components/SSRPageSeo/SsrHeroBanner";
import RentFurnitureAndAppliances from "@/components/SSRPageSeo/SsrRentFurnitureAndAppliances";
import RecentlyViewedProduct from "@/components/SSRPageSeo/SsrRecentlyViewedProduct";
import TrendingProducts from "@/components/SSRPageSeo/SsrTrendingProducts";
import OffersAndCoupons from "@/components/SSRPageSeo/SsrOffersAndCoupons";
import NewlyLaunched from "@/components/SSRPageSeo/SsrNewlyLaunched";
import DownloadForMobile from "@/components/SSRPageSeo/SsrDownloadForMobile";
import PreDesignCombos from "@/components/SSRPageSeo/SsrPreDesignCombos";
import HasselFreeServicesCards from "@/components/SSRPageSeo/SsrHasselFreeServicesCards";
import LimetedPreiodDiscount from "@/components/SSRPageSeo/SsrLimetedPreiodDiscount";
import RentNowBanner from "@/components/SSRPageSeo/SsrRentNowBanner";
import TryCityMax from "@/components/SSRPageSeo/SsrTryCityMax";
import CustomerRating from "@/components/SSRPageSeo/SsrCustomerRating";
import MediaCoverage from "@/components/SSRPageSeo/SsrMediaCoverage";
import CombineSection from "@/components/SSRPageSeo/SsrCombineSection";
import HappySubscribers from "@/components/SSRPageSeo/SsrHappySubscribers";
import FrequentlyAskedQuestions from "@/components/SSRPageSeo/SsrFrequentlyAskedQuestions";
import TextContent from "@/components/SSRPageSeo/SsrTextContent";
import Footer from "@/components/SSRPageSeo/SsrFooter";
import Subproduct from "./RentAllProducts";

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
  const tempSecretKey = "b3ad5950f7c555c664f19c9ec77bbfb943";
  const plaintext = `${Date.now()}/Cityfurnish@India@123!/${Date.now()}`;
  const createEncryptedHash = (text, secretKey) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
  };
  const apiKey = createEncryptedHash(plaintext, tempSecretKey);

  if (
    params.category === "appliances-rental" ||
    params.category === "furniture-rental"
  ) {
    const catId = params.category === "appliances-rental" ? 26 : 27;
    const data = await fetch(
      "https://test.rentofurniture.com/api/" +
        endPoints.seoMetaData(params.city?.toLowerCase(), catId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Apikey: apiKey,
        },
      },
    );
    return data.json();
  } else {
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
}

export default async function Page(params) {
  const propParams = params?.params;
  const pageName = params?.params?.category;
  return (
    <>
      <CatAnnouncement />
      <CatHeader />
      <CatMenu />
      {pageName === "appliances-rental" || pageName === "furniture-rental" ? (
        <div>
          <HeroBanner />
          <RentFurnitureAndAppliances params={propParams} />
          <RecentlyViewedProduct />
          <TrendingProducts params={propParams} />
          <OffersAndCoupons />
          <NewlyLaunched />
          <DownloadForMobile />
          <PreDesignCombos />
          <HasselFreeServicesCards />
          <LimetedPreiodDiscount />
          <RentNowBanner params={propParams} />
          <TryCityMax />
          <CustomerRating />
          <MediaCoverage />
          <CombineSection />
          <HappySubscribers params={propParams} page={pageName} />
          <FrequentlyAskedQuestions params={propParams} />
          <TextContent params={propParams} />
          <Footer />
        </div>
      ) : pageName === "rent" ? (
        <div>
          <Subproduct />
        </div>
      ) : (
        <div>
          <CatSubHeader params={params?.params} />
        </div>
      )}
    </>
  );
}

export async function generateMetadata({params}) {
  const data = await create(params);
  // console.log("metadtatadtdatdtadatatd", data.data);

  return {
    title: data?.data?.cat_meta_title,
    description: data?.data?.cat_meta_desc,
    alternates: {
      canonical: data?.data?.cat_header_code_snippet,
    },
    openGraph: {
      url: data?.data?.cat_header_code_snippet,
      title: data?.data?.cat_meta_title,
      description: data?.data?.cat_meta_desc,
      siteName: "Cityfurnish",
      images: {
        url: "",
        width: 800,
        height: 600,
      },
    },
  };
}
