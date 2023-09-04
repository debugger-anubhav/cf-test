"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {store} from "@/store";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
// import ShoppingCartSection from "@/components/Cart/ShoppingCartSection";
// import axios from "axios";
// import {endPoints} from "@/network/endPoints";
// import {baseURL} from "@/network/axios";
// import {getLocalStorage, setLocalStorage} from "@/constants/constant";
import CartSection from "@/components/Cart";

const CartPage = () => {
  const queryClient = new QueryClient();

  // useEffect(() => {
  //   const data = {
  //     userId: "",
  //     // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
  //     tempUserId: getLocalStorage("tempUserID") ?? "",
  //   };
  //   axios
  //     .post(baseURL + endPoints.sessionUserUrl, data)
  //     .then(res => {
  //       if (typeof window !== "undefined") {
  //         setLocalStorage("tempUserID", res?.data?.data?.tempUserId);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <AnnouncementBar />
          <Header />
          <MenuList />
          <CartSection />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default CartPage;
