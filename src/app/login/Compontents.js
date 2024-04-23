"use client";

import React, {useEffect, useRef, useState} from "react";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";

import loadable from "@loadable/component";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";
import {NewlyLauncedSkeleton} from "@/components/Home/NewlyLaunched";
import {RentNowBannersSkeleton} from "@/components/Home/RentNowBanner";
import {TryCityMaxSkeleton} from "@/components/Home/TryCityMax";
import {FaqsSkeleton} from "@/components/Common/FrequentlyAskedQuestions";
import {useChatScript} from "../../../useChatScript";
import {ContentSkeleton} from "@/components/Common/ContentSkeleton";
import Notifications from "@/components/Common/Notifications/Notification";
import MenuList from "@/components/Common/MenuList";
import {FooterSkeleton} from "@/components/Common/Footer";
import LoginModal from "@/components/LoginPopups";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";

const TextContent = loadable(() => import("@/components/Common/TextContent"), {
  fallback: <ContentSkeleton />,
});
const RentFurnitureAndAppliances = loadable(
  () => import("@/components/Home/RentFurnitureAndAppliances"),
  {
    fallback: <RentFurnitureSkeleton />,
  },
);
const RecentlyViewedProduct = loadable(
  () => import("@/components/Home/RecentlyViewedProduct"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const TrendingProducts = loadable(
  () => import("@/components/Home/TrendingProducts"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const OffersAndCoupons = loadable(
  () => import("@/components/Home/OffersAndCoupons"),
  {fallback: <OffersSkeleton />},
);
const NewlyLaunched = loadable(
  () => import("@/components/Home/NewlyLaunched"),
  {fallback: <NewlyLauncedSkeleton />},
);

const DownloadForMobile = loadable(
  () => import("@/components/Home/DownloadForMobile"),
);
const PreDesignCombos = loadable(
  () => import("@/components/Home/PredesignCombos"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const HasselFreeServicesCards = loadable(
  () => import("@/components/Home/HasselFreeServicesCards"),
);
const LimetedPreiodDiscount = loadable(
  () => import("@/components/Home/LimetedPreiodDiscount"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const RentNowBanner = loadable(
  () => import("@/components/Home/RentNowBanner"),
  {fallback: <RentNowBannersSkeleton />},
);
const TryCityMax = loadable(() => import("@/components/Home/TryCityMax"), {
  fallback: <TryCityMaxSkeleton />,
});
const MediaCoverage = loadable(() => import("@/components/Home/MediaCoverage"));
const CustomerRating = loadable(() => import("@/components/Home/Rating"), {
  fallback: <ProductRowSkeleton />,
});
const HappySubscribers = loadable(
  () => import("@/components/Home/HappySubscribers"),
);
const FrequentlyAskedQuestions = loadable(
  () => import("@/components/Common/FrequentlyAskedQuestions"),
  {
    fallback: <FaqsSkeleton />,
  },
);
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
const CombineSection = loadable(
  () => import("@/components/Home/CombineSection"),
);

export default function LoginComponents() {
  const router = useRouter();
  const myElementRef = useRef();
  useEffect(() => {
    const handleTouchStart = event => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
  const homePageReduxData = useSelector(state => state.homePagedata);
  const isLoogedIn = decrypt(getLocalStorage("_ga"));

  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    if (isLoogedIn) {
      setLoginModal(false);
      router.push("/");
    } else {
      setLoginModal(true);
    }
  }, [isLoogedIn]);

  useEffect(() => {
    if (homePageReduxData?.loginPopupState) {
      router.push("/");
    }
  }, [homePageReduxData?.loginPopupState]);

  const toggleLoginModal = bool => {
    setLoginModal(bool);
    router.push("/");
  };
  return (
    <>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
      />
      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <div ref={myElementRef} className="large_layout">
        {useChatScript()}
        <AnnouncementBar />
        <Header page="login" />
        <MenuList />
        <div className="lg:min-h-[385px] min-h-[150px]">
          <HeroBanner />
        </div>
        <RentFurnitureAndAppliances params={"home-page"} />
        <RecentlyViewedProduct />
        <TrendingProducts params={"home-page"} />
        <OffersAndCoupons />
        <NewlyLaunched />
        <DownloadForMobile />
        <PreDesignCombos />
        <HasselFreeServicesCards />
        <LimetedPreiodDiscount />
        <RentNowBanner params={"home-page"} />
        <TryCityMax />
        <div className="xl:hidden block">
          <MediaCoverage />
        </div>
        <CustomerRating />
        <div className="hidden xl:block">
          <MediaCoverage />
        </div>
        <CombineSection />
        <HappySubscribers params={"home-page"} />
        <FrequentlyAskedQuestions params={"home-page"} />
        <TextContent params={"home-page"} />
        <Footer />
        <Notifications />
      </div>
    </>
  );
}
