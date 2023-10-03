"use client";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";
import BenefitsCta from "@/components/Product/BenefitsCta";
import CompleteTheLook from "@/components/Product/CompleteTheLook";
import CareInstruction from "@/components/Product/CareInstruction";
import CustomerRating from "@/components/Product/CustomerRatings";
import HappySubscribers from "@/components/Home/HappySubscribers";
import QuesAndAns from "@/components/Product/QnaSection";
import BannerSection from "@/components/Product/BannerSection";
import {useParams} from "next/navigation";
import loadable from "@loadable/component";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";
import {SkeletonForProductDetail} from "@/components/Product/ProductDetailsSection";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {ItemsIncludedSkeleton} from "@/components/Product/ProductsIncludedSection";
import Notifications from "@/components/Common/Notifications/Notification";
import {FooterSkeleton} from "@/components/Common/Footer";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
const ItemsIncluded = loadable(
  () => import("@/components/Product/ProductsIncludedSection"),
  {
    fallback: <ItemsIncludedSkeleton />,
  },
);
const YouMightLike = loadable(
  () => import("@/components/Product/YouMightLike"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const RecentlyViewedProduct = loadable(
  () => import("@/components/Home/RecentlyViewedProduct"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const ProductDetails = loadable(
  () => import("@/components/Product/ProductDetailsSection"),
  {
    fallback: <SkeletonForProductDetail />,
  },
);
const OffersAndCoupons = loadable(
  () => import("@/components/Home/OffersAndCoupons"),
  {
    fallback: <OffersSkeleton />,
  },
);
const ProductPage = () => {
  const params = useParams();

  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <ProductDetails category={"Home Furniture"} params={params} />
      <OffersAndCoupons page={"product"} />
      <ItemsIncluded noOfItems={5} />
      <BenefitsCta />
      <CompleteTheLook params={params} />
      <BannerSection params={params} />
      <CareInstruction params={params} />
      <RecentlyViewedProduct page={"product"} />
      <YouMightLike params={params} />
      <CustomerRating params={params} />
      <HappySubscribers page={"product"} params={params} />
      <QuesAndAns params={params} />
      <Footer />
      <Notifications type={3} />
    </div>
  );
};

export default ProductPage;
