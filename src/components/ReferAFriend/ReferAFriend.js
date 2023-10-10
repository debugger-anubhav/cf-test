import React, {useState, useEffect} from "react";
import Header from "../Common/Header";
import loadable from "@loadable/component";
import MenuList from "../Common/MenuList";
import MainSection from "./MainSection/MainSection";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {DocSidebarSkeleton} from "../Documentation/Sidebar/DocSidebar";

const DocSidebar = loadable(() =>
  import("../Documentation/Sidebar/DocSidebar"),
);
const Footer = loadable(() => import("@/components/Common/Footer"));

const ReferAFriend = ({login}) => {
  const [isLoogedIn, setisLoogedIn] = useState(false);
  const [loading, setloading] = useState(true);
  const isLoogedInfromStorage = decrypt(getLocalStorage("_ga"));

  console.log(login, "hai ya nahiii ye bata");

  useEffect(() => {
    if (isLoogedInfromStorage) {
      setisLoogedIn(isLoogedInfromStorage);
      setloading(false);
    } else {
      setloading(true);
    }
  }, [isLoogedInfromStorage]);

  return (
    <div>
      <Header />
      <MenuList />
      {/* @apply hidden font-Poppins lg:flex gap-16 pr-[70px] xl:pr-[90px]macbook:pr-[122px] 3xl:pr-[160px] 4xl:pr-[160px] -mt-6; */}
      <div className="large_layout flex -mt-6 w-full">
        <div className="min-w-fit hidden lg:flex h-full">
          {loading && login ? (
            <DocSidebarSkeleton />
          ) : (
            isLoogedIn && <DocSidebar />
          )}
        </div>
        <div className="w-full">
          <MainSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReferAFriend;
