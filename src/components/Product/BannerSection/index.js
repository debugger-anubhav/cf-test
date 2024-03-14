import React, {useEffect} from "react";
import BannerOne from "./BannerOne";
import BannerTwo from "./BannerTwo";
import BannerThree from "./BannnerThree";
import BannerFive from "./BannerFive";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getBannerImages} from "@/store/Slices";
import ProductVideo from "./ProductVideo";
import {baseInstance} from "@/network/axios";

const BannerSection = ({params}) => {
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData.bannerImages);

  const getBannerImagesFunction = () => {
    baseInstance
      .get(endPoints.productPage.bannerImages(params.productId))
      .then(res => {
        dispatch(getBannerImages(res?.data?.data));
      })
      .catch(err => {
        console.log(err?.message || "some error");
      });
  };

  useEffect(() => {
    getBannerImagesFunction();
  }, []);

  if (pageData.length > 0) {
    return (
      <div>
        <BannerOne />
        <BannerTwo />
        <ProductVideo params={params} />
        <BannerThree />
        <BannerFive />
      </div>
    );
  }
};

export default BannerSection;
