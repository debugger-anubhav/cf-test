import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {
  BackIcon,
  DownArrowUnfilled,
  ForwardArrow,
  ForwardArrowWithLine,
} from "@/assets/icon";
import {IoIosSwap} from "react-icons/io";
import {BsSearch} from "react-icons/bs";
import {
  getLocalStorage,
  productPageImagesBaseUrl,
  CreateRequestPayload,
} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useSelector} from "react-redux";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";

function SwapProduct({prevScreen, data}) {
  const [showSwapScreen, setShowSwapScreen] = useState(1);
  const [ProductInfo, setProductInfo] = useState(data);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductForSwap, setSelectedProductForSwap] = useState(null);
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const {trailCreateSR} = CommonCreateRequestApi();

  const handleCreateRequest = () => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      type: selectedType,
      upgrade_product: selectedProductForSwap?.product_name,
      selected_product_name: selectedProduct?.product_name,
    };
    trailCreateSR(payload);
  };

  useEffect(() => {
    setProductInfo(data);
  }, [data]);
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => {
            if (showSwapScreen === 2) setShowSwapScreen(1);
            else prevScreen(true);
          }}
          className={"cursor-pointer"}
        />
        Swap product
      </div>
      {showSwapScreen === 1 ? (
        <div
          className={`${styles.swap_first_screen} ${
            showSwapScreen === 1 ? "flex flex-col" : "hidden"
          } `}>
          <div className={styles.buy_info}>
            <p className={styles.desc}>Select products to swap</p>
            <div>
              {ProductInfo?.map((item, index) => (
                <div
                  key={index.toString()}
                  className={` ${
                    index !== ProductInfo.length - 1
                      ? " border-b border-EDEDEE"
                      : "border-0"
                  } ${styles.request_info_div}`}
                  onClick={() => {
                    setSelectedProduct(item);
                    setShowSwapScreen(2);
                  }}>
                  <div className="flex gap-2 items-center">
                    <img
                      className={styles.product_imge_thambnil}
                      src={`${
                        productPageImagesBaseUrl +
                        "thumb/" +
                        item.product_image?.split(",")[0]
                      }`}
                      alt={item.product_name}
                      loading="lazy"
                    />
                    <p className={styles.request_type}>{item.product_name}</p>
                  </div>
                  <div className="flex">
                    <ForwardArrow />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <SecondScreen
          data={selectedProduct}
          setSelectedProductForSwap={setSelectedProductForSwap}
        />
      )}

      <div className={styles.bottom_row}>
        {/* <div className={styles.bottom_line}></div> */}
        <button
          className={`${styles.proceed_btn} ${
            showSwapScreen === 1 || selectedProductForSwap === null
              ? "!bg-[#FFDF85] !cursor-not-allowed"
              : ""
          }`}
          onClick={() => handleCreateRequest()}
          disabled={showSwapScreen === 1 || selectedProductForSwap === null}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default SwapProduct;

const SecondScreen = ({data, setSelectedProductForSwap}) => {
  const city = getLocalStorage("cityId");
  const [searchModalOpen, setsearchModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [productData, setProductData] = useState(null);
  const searchApi = () => {
    axios
      .get(baseURL + endPoints.searchKey(inputKey, city))
      .then(res => setProductData(res?.data?.data?.products))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    searchApi();
  }, [inputKey]);
  return (
    <div className={`${styles.swap_second_screen} flex flex-col`}>
      <div className={styles.selected_product_info_wrapper}>
        <div className="flex flex-col">
          <p className={styles.desc}>Selected product:</p>
          <p className={`${styles.desc} !text-222`}>{data.product_name}</p>
        </div>
        <div className={styles.swap_info}>
          <img
            className={styles.product_imge_thambnil}
            src={`${
              productPageImagesBaseUrl +
              "thumb/" +
              data.product_image?.split(",")[0]
            }`}
            alt={"product-image"}
            loading="lazy"
          />
          <IoIosSwap color="#9A9AA2" size={22} />
        </div>
      </div>
      <p className={styles.swap_heading}>Select product to swap to</p>
      <div className="relative min-h-[40vh]">
        <div className={styles.search_wrapper}>
          <BsSearch />
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search for Furniture, Appliances, etc"
            // onClick={() => setsearchModalOpen(true)}
            onChange={e => {
              setsearchModalOpen(true);
              setInputKey(e.target.value);
            }}
            value={inputKey}
          />
          <DownArrowUnfilled />
        </div>
        {searchModalOpen && (
          <div className={`${styles.search_modal}`}>
            {productData?.map((item, index) => (
              <div
                className={"flex w-full gap-3 cursor-pointer items-center"}
                key={index.toString()}
                onClick={() => {
                  setInputKey(item?.product_name);
                  setSelectedProductForSwap(productData[index]);
                  setsearchModalOpen(false);
                }}>
                <img
                  src={`${
                    productPageImagesBaseUrl +
                    "thumb/" +
                    item?.image?.split(",")[0]
                  }`}
                  className={styles.product_imge_thambnil}
                  alt={item?.seourl}
                  loading="lazy"
                />
                <p className={styles.desc}>{item?.product_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
