"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {store} from "@/store";
import Footer from "@/components/Common/Footer";
import loadable from "@loadable/component";
import {SearchListSkeleton} from "@/components/Search/SearchList/SearchList";
import Notifications from "@/components/Common/Notifications/Notification";

const SearchList = loadable(
  () => import("@/components/Search/SearchList/SearchList"),
  {
    fallback: <SearchListSkeleton />,
  },
);
export default function SearchPage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <AnnouncementBar />
          <Header />
          <MenuList />
          <SearchList />
          <Footer />
        </div>
      </Provider>
      <Notifications />
    </QueryClientProvider>
  );
}
