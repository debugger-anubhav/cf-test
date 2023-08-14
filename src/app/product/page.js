"use client";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProductDetails from "@/components/Product/ProductDetailsSection";
import OffersAndCoupons from "@/components/Home/OffersAndCoupons";
import ItemsIncluded from "@/components/Product/ProductsIncludedSection";
import BenefitsCta from "@/components/Product/BenefitsCta";
import CompleteTheLook from "@/components/Product/CompleteTheLook";
import CareInstruction from "@/components/Product/CareInstruction";
// import RecentlyViewedProduct from "@/components/Home/RecentlyViewedProduct";
// import CustomerRating from "@/components/Product/CustomerRatings";
import HappySubscribers from "@/components/Home/HappySubscribers";
import QuesAndAns from "@/components/Product/QnaSection";
import Footer from "@/components/Common/Footer";

const ProductPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="large_layout">
          <AnnouncementBar />
          <Header />
          <MenuList />
          <ProductDetails
            category={"Home Furniture"}
            itemName={"  Belle Single Bed with Storage"}
          />
          <OffersAndCoupons />
          <ItemsIncluded noOfItems={5} />
          <BenefitsCta />
          <CompleteTheLook heading={"Complete The Look"} isbg={false} />
          <CareInstruction />
          {/* <RecentlyViewedProduct /> */}
          {/* <CompleteTheLook heading={"You might also like"} isbg /> */}
          {/* <CustomerRating /> */}
          <HappySubscribers />
          <QuesAndAns />
          <Footer />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default ProductPage;
