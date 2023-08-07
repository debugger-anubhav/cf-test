"use client";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const ProductPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <AnnouncementBar />
          <Header />
          <MenuList />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default ProductPage;
