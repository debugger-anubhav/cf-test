"use client";

import React, {useState} from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
// import Footer from "@/components/Common/Footer";
import MenuList from "@/components/Common/MenuList";
// import SingleProduct from "@/components/Category/SingleProduct/SingleProduct";
// import ProductSet from "@/components/Category/ProductSet/ProductSet";
// import SoldOutProduct from "@/components/Category/SoldOutProduct/SoldOutProduct";
// import RecentlyViewedProduct from "@/components/Home/RecentlyViewedProduct";
// import SavedItem from "@/components/Category/SavedItem/SavedItem";
import SubHeader from "@/components/Category/SubHeader/Subheader/SubHeader";
// import TrendingItem from "@/components/Category/TrendingItem/TrendingItem";
// import Instruction from "@/components/Category/Instructions/Instruction";
// import HappySubscribers from "@/components/Home/HappySubscribers";
// import CustomerRating from "@/components/Home/Rating";
// import HasselFreeServicesCards from "@/components/Home/HasselFreeServicesCards";
// import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
// import { addPrdoucWithFilter } from "@/store/Slices/categorySlice";

export default function Home() {
  const queryClient = new QueryClient();

  const [showRemainingComponents, setShowRemainingComponents] = useState(false);

  console.log(showRemainingComponents);
  // const dispatch = useDispatch()
  // const homePageReduxData = useSelector(state => state.CategoryPageSlice);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="last-screen:w-[2000px] mx-auto">
          <AnnouncementBar />
          <Header />
          <MenuList />
          <SubHeader setShowRemainingComponents={setShowRemainingComponents} />
          {/* {
            showRemainingComponents ? (
              <>
                <RecentlyViewedProduct />
                <SavedItem />
                <TrendingItem />
                <Instruction />
                <HappySubscribers />
                <CustomerRating />
                <HasselFreeServicesCards />
                <FrequentlyAskedQuestions />
                <Footer />
              </>
            ) : null

          } */}
          {/* // <RecentlyViewedProduct />
          // <SavedItem />
          // <TrendingItem />
          // <Instruction />
          // <HappySubscribers />
          // <CustomerRating />
          // <HasselFreeServicesCards />
          // <FrequentlyAskedQuestions />
          // <Footer /> */}
        </div>
      </Provider>
      {/* <ReactQueryDevtoolsPanel initialIsOpen={false} position={"bottom-left"} /> */}
    </QueryClientProvider>
  );
}
