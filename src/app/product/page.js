"use client";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProductDetails from "@/components/Product/ProductDetailsSection";

const ProductPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <AnnouncementBar />
          <Header />
          <MenuList />
          <ProductDetails
            category={"Home Furniture"}
            itemName={"  Belle Single Bed with Storage"}
          />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default ProductPage;
