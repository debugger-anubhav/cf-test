"use client";

import React from "react";
import {useParams} from "next/navigation";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import loadable from "@loadable/component";
import MenuList from "@/components/Common/MenuList";

const Footer = loadable(() => import("@/components/Common/Footer"));
const ProductList = loadable(() =>
  import("@/components/Wishlist/ProductList/ProductList"),
);

export default function Wishlist() {
  const queryClient = new QueryClient();
  const params = useParams();

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
