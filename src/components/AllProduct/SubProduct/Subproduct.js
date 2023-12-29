import React from "react";
import styles from "./style.module.css";
import SubCategorySection from "../section/SubCategorySection";
import {ForwardArrow} from "@/assets/icon";
import HasselFreeServicesCards from "@/components/Home/HasselFreeServicesCards";
import {useRouter} from "next/navigation";
import loadable from "@loadable/component";
import {ContentSkeleton} from "@/components/Common/ContentSkeleton";
import {Skeleton} from "@mui/material";
import {FooterSkeleton} from "@/components/Common/Footer";

const TextContent = loadable(() => import("@/components/Common/TextContent"), {
  fallback: <ContentSkeleton />,
});
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const Subproduct = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <ul className={styles.listings}>
            <li className={styles.list}>
              <a
                href={"/"}
                className={styles.route_text}
                onClick={() => {
                  router.push("/");
                }}>
                Home
              </a>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              <p className={`${styles.route_text} !font-medium`}>All Product</p>
            </li>
          </ul>
        </div>
        <div className={styles.product_wrapper}>
          <SubCategorySection />
        </div>
      </div>
      <HasselFreeServicesCards />
      <TextContent params={"home-page"} />
      <Footer />
    </>
  );
};

export default Subproduct;

export const SubproductSkeleton = () => {
  return (
    <>
      <div className={styles.main_container}>
        <div className="w-[30%]">
          <Skeleton variant="text" className="w-full" />
        </div>

        <div className="my-4 w-full">
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <div className="w-full flex flex-col my-4" key={index.toString()}>
                <div className=" my-4 flex justify-between">
                  <div className="w-[40%] h-[20px] ms:h-full">
                    <Skeleton variant="text" className="w-full h-full" />
                  </div>
                  <div className="ms:w-[10%] w-[15%] h-[15px]">
                    <Skeleton variant="text" className="w-full h-full" />
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4].map((item, index) => {
                    return (
                      <div
                        className={styles.card_container_skeleton}
                        key={index.toString()}>
                        <Skeleton
                          variant="rectangular"
                          className="w-full h-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ContentSkeleton />
    </>
  );
};
