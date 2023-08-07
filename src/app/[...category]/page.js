"use client";

import React from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import MenuList from "@/components/Common/MenuList";
import SubHeader from "@/components/Category/SubHeader/SubHeader";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="last-screen:w-[2000px] mx-auto">
          <AnnouncementBar />
          <Header />
          <MenuList />
          <SubHeader />
          <Footer />
        </div>
      </Provider>
      {/* <ReactQueryDevtoolsPanel initialIsOpen={false} position={"bottom-left"} /> */}
    </QueryClientProvider>
  );
}
