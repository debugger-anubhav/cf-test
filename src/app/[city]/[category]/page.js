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
import {redirect} from "next/navigation";
import {BASEURL} from "../../../../appConfig";
import jwt from "jsonwebtoken";

const tempSecretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const plaintext = `${Date.now()}/Cityfurnish@India@123!/${Date.now()}`;
const createEncryptedHash = (text, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
};

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
    console.log("Error fetching data:", error?.message);
    return {
      props: {
        data: null,
      },
    };
  }
}

async function create(params) {
  // const tempSecretKey = "b3ad5950f7c555c664f19c9ec77bbfb943";
  const apiKey = createEncryptedHash(plaintext, tempSecretKey);
  const jwtToken = jwt.sign({payload: apiKey}, tempSecretKey, {
    expiresIn: "2m",
  });

  if (
    params.category === "appliances-rental" ||
    params.category === "furniture-rental"
  ) {
    const catId = params.category === "appliances-rental" ? 26 : 27;
    const data = await fetch(
      BASEURL + endPoints.seoMetaData(params.city?.toLowerCase(), catId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Apikey: jwtToken,
        },
      },
    );
    return data.json();
  } else {
    const data = await fetch(BASEURL + endPoints.categoryMetaData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Apikey: jwtToken,
      },
      body: JSON.stringify({
        cityName: params.city?.toLowerCase(),
        seourl: params.category,
      }),
    });
    return data.json();
  }
}

async function getAllCitiesList() {
  const apiKey = createEncryptedHash(plaintext, tempSecretKey);
  const jwtToken = jwt.sign({payload: apiKey}, tempSecretKey, {
    expiresIn: "2m",
  });

  try {
    const data = await fetch(BASEURL + endPoints.cityList, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Apikey: jwtToken,
      },
    });

    return data.json();
  } catch (error) {
    console.log(error?.message);
  }
}

export default async function Page(params) {
  const metaData = await create(params?.params);
  const propParams = params?.params;
  const pageName = params?.params?.category;
  const cityList = await getAllCitiesList();
  const cityFromURL = propParams?.city?.toLowerCase();
  const isCityValid = cityList?.data?.some(
    city => city?.list_value?.toLowerCase() === cityFromURL,
  );
  const isSpecialCityValid = cityFromURL?.toLowerCase() === "ghaziabad-noida";
  if (isCityValid || isSpecialCityValid) {
    return (
      <>
        {pageName === "rent" ? (
          <meta
            name="Title"
            content={`Rent Premium Furniture & Home Appliances in ${propParams?.city} - Cityfurnish`}
          />
        ) : (
          <meta name="Title" content={metaData?.data?.cat_meta_title} />
        )}
        <div class="large_layout">
          <CatAnnouncement />
          <CatHeader />
          <CatMenu />
          {pageName === "appliances-rental" ||
          pageName === "furniture-rental" ? (
            <div>
              <HeroBanner />
              <RentFurnitureAndAppliances params={propParams} />
              <RecentlyViewedProduct />
              <TrendingProducts params={propParams} />
              <OffersAndCoupons />
              <RentNowBanner params={propParams} />

              <DownloadForMobile />
              <PreDesignCombos />
              <HasselFreeServicesCards />
              <LimetedPreiodDiscount />
              <NewlyLaunched />

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
        </div>
      </>
    );
  } else {
    // console.log(metaData, data, "pp");
    redirect("/404");
  }
}

export async function generateMetadata({params}) {
  const data = await create(params);
  let metaTitle;
  let metaDescription;
  let canonicalLink;

  if (params?.category === "rent") {
    metaTitle = `Rent Premium Furniture & Home Appliances in ${params?.city} - Cityfurnish`;
    metaDescription = `Make your home with us. Rent furniture and home appliances online from ${params?.city}'s leading furniture rental company. Free home delivery and installation.`;
  } else {
    metaTitle = data?.data?.cat_meta_title;
    metaDescription = data?.data?.cat_meta_desc;
  }

  if (params?.category === "home-furniture-rental")
    canonicalLink = "furniture-rental";
  else if (params?.category === "home-appliances-rental")
    canonicalLink = "appliances-rental";
  else canonicalLink = params?.category;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `https://cityfurnish.com/${params.city}/${canonicalLink}`,
    },
    openGraph: {
      url: `https://cityfurnish.com/${params.city}/${canonicalLink}`,
      title: metaTitle,
      description: metaDescription,
      siteName: "Cityfurnish",
    },
  };
}

// when meta data is coming blank from api
// metaTitle = 'Rent Premium Furniture & Home Appliances Online - Cityfurnish';
// meta_description = 'Furniture rental made easy with CityFurnish. Rent home furniture online, including living room furniture, for as long as you need it. Available in major Indian cities like Noida, Delhi, Hyderabad, Mumbai, Gurgaon, Pune and Bangalore. Download our furniture rental app for convenience and flexibility.';
