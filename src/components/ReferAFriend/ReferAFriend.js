import React, {useState, useEffect} from "react";
import Header from "../Common/Header";
import loadable from "@loadable/component";
import MenuList from "../Common/MenuList";
import MainSection from "./MainSection/MainSection";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {DocSidebarSkeleton} from "../Documentation/Sidebar/DocSidebar";
import {FooterSkeleton} from "@/components/Common/Footer";
import styles from "./style.module.css";

const DocSidebar = loadable(() =>
  import("../Documentation/Sidebar/DocSidebar"),
);
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const ReferAFriend = ({login}) => {
  const [isLoogedIn, setisLoogedIn] = useState(false);
  const [loading, setloading] = useState(true);
  const isLoogedInfromStorage = decrypt(getLocalStorage("_ga"));

  useEffect(() => {
    if (isLoogedInfromStorage) {
      setisLoogedIn(isLoogedInfromStorage);
      setloading(false);
    } else {
      setloading(true);
    }
  }, [isLoogedInfromStorage]);

  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <div className={styles.wrapper}>
        <div className={styles.container} style={{height: "initial"}}>
          {loading && login ? (
            <DocSidebarSkeleton />
          ) : (
            isLoogedIn && <DocSidebar />
          )}
        </div>
        <div className={styles.full_width}>
          <MainSection login={login} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReferAFriend;
