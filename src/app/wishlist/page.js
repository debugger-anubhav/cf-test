"use client";

import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import loadable from "@loadable/component";
import MenuList from "@/components/Common/MenuList";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {getLocalStorage, setLocalStorage} from "@/constants/constant";
// import ProductList from "@/components/Wishlist/ProductList/ProductList";

const Footer = loadable(() => import("@/components/Common/Footer"));
const ProductList = loadable(() =>
  import("@/components/Wishlist/ProductList/ProductList"),
);

export default function Wishlist() {
  const queryClient = new QueryClient();
  const params = useParams();
  useEffect(() => {
    const data = {
      userId: "",
      tempUserId: JSON.parse(getLocalStorage("tempUserID")) ?? "",
    };
    axios
      .post(baseURL + endPoints.sessionUserUrl, data)
      .then(res => {
        if (typeof window !== "undefined") {
          setLocalStorage(
            "tempUserID",
            JSON.parse(res?.data?.data?.tempUserId),
          );
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
          <ProductList params={params} />
          <Footer />
        </div>
      </Provider>
      {/* <ReactQueryDevtoolsPanel initialIsOpen={false} position={"bottom-left"} /> */}
    </QueryClientProvider>
  );
}
