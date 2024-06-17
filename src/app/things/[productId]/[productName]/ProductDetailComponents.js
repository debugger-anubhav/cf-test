"use client";
import React, {useEffect} from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import BenefitsCta from "@/components/Product/BenefitsCta";
import CompleteTheLook from "@/components/Product/CompleteTheLook";
import CareInstruction from "@/components/Product/CareInstruction";
import CustomerRating from "@/components/Product/CustomerRatings";
import HappySubscribers from "@/components/Home/HappySubscribers";
import QuesAndAns from "@/components/Product/QnaSection";
import BannerSection from "@/components/Product/BannerSection";
import loadable from "@loadable/component";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";
import {SkeletonForProductDetail} from "@/components/Product/ProductDetailsSection";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {ItemsIncludedSkeleton} from "@/components/Product/ProductsIncludedSection";
import Notifications from "@/components/Common/Notifications/Notification";
import {FooterSkeleton} from "@/components/Common/Footer";
import {useParams, useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails} from "@/store/Slices";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {getLocalStorageString} from "@/constants/constant";

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
export default function ProductDetailComponents() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const prodDetails = useSelector(
    state => state.productPageData.singleProductDetails,
  );
  const cityIdStr = getLocalStorageString("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const GetProductDetails = () => {
    baseInstance
      .get(endPoints.productPage.singleProductDetails(params.productId, cityId))
      .then(res => {
        dispatch(getProductDetails(res?.data?.data));
        router.push(`${prodDetails?.[0]?.seourl}`);
      })
      .catch(err => {
        console.log(err?.message || "some message");
      });
  };

  useEffect(() => {
    if (
      params?.productName !== undefined &&
      prodDetails?.[0]?.seourl !== undefined &&
      params?.productName !== prodDetails?.[0]?.seourl
    ) {
      GetProductDetails();
    }
  }, [params]);

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
      <Notifications />
    </div>
  );
}
