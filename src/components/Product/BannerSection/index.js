import React, {useEffect} from "react";
import BannerOne from "./BannerOne";
import BannerTwo from "./BannerTwo";
import BannerThree from "./BannnerThree";
import BannerFive from "./BannerFive";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {useDispatch, useSelector} from "react-redux";
import {getBannerImages} from "@/store/Slices";
import ProductVideo from "./ProductVideo";

const BannerSection = () => {
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData);

  console.log(pageData, "bannneerrrrrrr");

  const getBannerImagesFunction = () => {
    axios
      .get(baseURL + endPoints.productPage.bannerImages)
      .then(res => {
        dispatch(getBannerImages(res?.data?.data));
        console.log(res, "bannerdata");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBannerImagesFunction();
  }, []);

  return (
    <div>
      <BannerOne />
      <BannerTwo />
      <BannerThree />
      <BannerFive />
      <ProductVideo />
    </div>
  );
};

export default BannerSection;
