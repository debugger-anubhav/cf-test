"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {store} from "@/store";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import ShoppingCartSection from "@/components/Cart/ShoppingCartSection";

const Cart = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <AnnouncementBar />
          <Header />
          <MenuList />
          <ShoppingCartSection />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default Cart;
