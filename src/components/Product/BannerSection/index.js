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

const BannerSection = ({params}) => {
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData.bannerImages);

  const getBannerImagesFunction = () => {
    axios
      .get(baseURL + endPoints.productPage.bannerImages(params.productId))
      .then(res => {
        dispatch(getBannerImages(res?.data?.data));
      })
      .catch(err => {
        console.log(err);
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
