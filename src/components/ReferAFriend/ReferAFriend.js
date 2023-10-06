import React from "react";
import Header from "../Common/Header";
import loadable from "@loadable/component";
import MenuList from "../Common/MenuList";
import MainSection from "./MainSection/MainSection";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const Footer = loadable(() => import("@/components/Common/Footer"));

const ReferAFriend = () => {
  const isLoogedIn = decrypt(getLocalStorage("_ga"));
  return (
    <div>
      <Header />
      <MenuList />
      {/* @apply hidden font-Poppins lg:flex gap-16 pr-[70px] xl:pr-[90px]macbook:pr-[122px] 3xl:pr-[160px] 4xl:pr-[160px] -mt-6; */}
      <div className="large_layout flex -mt-6">
        {isLoogedIn && (
          <div className="min-w-fit hidden lg:flex h-full">
            <DocSidebar />
          </div>
        )}
        <MainSection />
      </div>
      <Footer />
    </div>
  );
};

export default ReferAFriend;
