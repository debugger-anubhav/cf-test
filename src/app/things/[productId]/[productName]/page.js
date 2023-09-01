"use client";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React, {useEffect} from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProductDetails from "@/components/Product/ProductDetailsSection";
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
import axios from "axios";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import {setLocalStorage} from "@/constants/constant";

const ProductPage = () => {
  const queryClient = new QueryClient();
  const params = useParams();

  // if (typeof window !== "undefined") {
  //   tempUserID = getLocalStorage("tempUserID");
  // }

  useEffect(() => {
    const data = {
      userId: "",
      tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    };
    axios
      .post(baseURL + endPoints.sessionUserUrl, data)
      .then(res => {
        if (typeof window !== "undefined") {
          setLocalStorage("tempUserID", res?.data?.data?.tempUserId);
        }
      })
      .catch(err => console.log(err));
  }, []);

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
