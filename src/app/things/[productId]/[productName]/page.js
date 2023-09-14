"use client";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import OffersAndCoupons from "@/components/Home/OffersAndCoupons";
import ItemsIncluded from "@/components/Product/ProductsIncludedSection";
import BenefitsCta from "@/components/Product/BenefitsCta";
import CompleteTheLook from "@/components/Product/CompleteTheLook";
import CareInstruction from "@/components/Product/CareInstruction";
import RecentlyViewedProduct from "@/components/Home/RecentlyViewedProduct";
import CustomerRating from "@/components/Product/CustomerRatings";
import HappySubscribers from "@/components/Home/HappySubscribers";
import QuesAndAns from "@/components/Product/QnaSection";
import Footer from "@/components/Common/Footer";
import YouMightLike from "@/components/Product/YouMightLike";
import BannerSection from "@/components/Product/BannerSection";
import {useParams} from "next/navigation";
// import ProductDetails from "@/components/Product/ProductDetailsSection";
import loadable from "@loadable/component";
import {SkeletonForProductDetail} from "@/components/Product/ProductDetailsSection";
const ProductDetails = loadable(
  () => import("@/components/Product/ProductDetailsSection"),
  {
    fallback: <SkeletonForProductDetail />,
  },
);
const ProductPage = () => {
  const queryClient = new QueryClient();
  const params = useParams();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
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
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default ProductPage;
