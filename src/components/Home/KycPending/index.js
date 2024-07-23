"use client";
import React, {useEffect, useState, useRef} from "react";
import style from "./index.module.css";
import Image from "next/image";
import link from "./Assets/link.svg";
import List from "@mui/material/List";
import {DownPopUpArrow, Close, IconLink} from "@/assets/icon";
import Drawer from "@mui/material/Drawer";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {useRouter} from "next/navigation";
import {Carousel} from "react-responsive-carousel";
import {statusToImageMap} from "../../MyOrders/common/CommonContainer";
import {format} from "date-fns";
import styled from "@emotion/styled";

const KycPending = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [sortOpen, setSortOpen] = useState(false);
  const dropDownRefSort = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [mobileSelecteData, setMobileSelecteData] = useState();
  const [isHeightGreaterThan600, setIsHeightGreaterThan600] = useState(false);
  const [extendedStatus, setExtendedStatus] = useState(false);
  const dropDownRefFilter = useRef(null);

  const StyledCarousel = styled(Carousel)`
    .control-dots {
      margin-top: 29px !important;
      bottom: -2px !important;
      background-color: #e2e4e8 !important;
      width: fit-content !important;
      border-radius: 10px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      padding: 4px !important;
    }
    .dot {
      margin: 3px 5px !important;
      &.selected {
        background-color: #5774ac !important;
        margin: 3px 5px !important;
      }
    }

    @media (min-width: 360px) {
      .control-dots {
        margin-top: 29px !important;
        bottom: -19px !important;
        background-color: #e2e4e8 !important;
        width: fit-content !important;
        border-radius: 10px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding: 4px !important;
      }
    }
    @media (min-width: 520px) {
      .control-dots {
        margin-top: 29px !important;
        bottom: -4px !important;
        background-color: #e2e4e8 !important;
        width: fit-content !important;
        border-radius: 10px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding: 4px !important;
      }
    }
  `;

  const handleClickAction = value => {
    if (value === "Swap product") {
      if (selectedOrder?.zoho_sub_status === "") {
        return false;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "kyc in progress"
      ) {
        return true;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund processed" ||
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund requested"
      ) {
        return false;
      } else if (selectedOrder?.zoho_sub_status.toLowerCase() === "delivered") {
        return true;
      } else {
        return false;
      }
    } else if (value === "Buy") {
      if (selectedOrder?.zoho_sub_status === "") {
        return false;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "kyc in progress"
      ) {
        return true;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund processed" ||
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund requested"
      ) {
        return true;
      } else if (selectedOrder?.zoho_sub_status.toLowerCase() === "delivered") {
        return true;
      } else {
        return false;
      }
    } else if (value === "Repair") {
      if (selectedOrder?.zoho_sub_status === "") {
        return false;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "kyc in progress"
      ) {
        return true;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund processed" ||
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund requested"
      ) {
        return false;
      } else if (selectedOrder?.zoho_sub_status.toLowerCase() === "delivered") {
        return true;
      } else {
        return false;
      }
    } else if (value === "Relocation") {
      if (selectedOrder?.zoho_sub_status === "") {
        return false;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "kyc in progress"
      ) {
        return true;
      } else if (
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund processed" ||
        selectedOrder?.zoho_sub_status.toLowerCase() === "refund requested"
      ) {
        return false;
      } else if (selectedOrder?.zoho_sub_status.toLowerCase() === "delivered") {
        return true;
      } else {
        return false;
      }
    }
  };

  const ExtendedKyc = async value => {
    try {
      const res = await baseInstance.get(
        `fc-zb-recurring-invoices/getExpirationByDealCodeNumber?dealCodeNumber=${8363239835}`,
      );
      setExtendedStatus(res?.data?.data);
      // next_invoice_date
      // extendDisplay
    } catch (error) {
      console.error(error);
    }
  };

  const dataArray = [
    {
      id: 1,
      label: "Swap product",
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/swap-product.svg",
      clickable: handleClickAction("Swap product"),
    },
    {
      id: 2,
      label: "Buy",
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/buy.svg",
      clickable: handleClickAction("Buy"),
    },
    {
      id: 3,
      label: "Repair",
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/repair.svg",
      clickable: handleClickAction("Repair"),
    },
    {
      id: 4,
      label: "Relocation",
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/relocation.svg",
      clickable: handleClickAction("Relocation"),
    },
  ];

  const userId = decrypt(getLocalStorage("_ga"));

  const handleKycData = async () => {
    const body = {
      userId,
    };
    try {
      const res = await baseInstance.post(
        endPoints.myOrdersPage.getAllOrders,
        body,
      );
      setData(res?.data?.data);
      handleSort(res?.data?.data[0]);
      handleSortMobile(res?.data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleKycData();
  }, []);

  // const imagesArray = selectedImage?.product_image
  //     ?.split(",")
  //     ?.slice(0, 3)
  //     .filter(item => item !== "");

  const toggleDropdownSort = () => {
    setSortOpen(!sortOpen);
  };

  const handleSort = (value, index) => {
    setSelectedOption(value?.dealCodeNumber);
    setSelectedOrder(value);
    setMobileSelecteData(value);
    const NewImagearray = JSON.parse(value?.fc_paymentData)?.map(item => {
      return item?.product_image?.split(",")?.slice(0, 1)[0];
    });

    setSelectedImage(NewImagearray);
    ExtendedKyc(value?.dealCodeNumber);
  };

  const handleSortMobile = value => {
    setMobileSelecteData(value);
    setSelectedOption(value?.dealCodeNumber);
    setSelectedOrder(value);

    const NewImagearray = JSON.parse(value?.fc_paymentData)?.map(item => {
      return item?.product_image?.split(",")?.slice(0, 1)[0];
    });

    setSelectedImage(NewImagearray);
    ExtendedKyc(value?.dealCodeNumber);
    setSortOpen(false);
  };

  useEffect(() => {
    const checkHeight = () => {
      if (window.innerWidth > 800) {
        setIsHeightGreaterThan600(true);
      } else {
        setIsHeightGreaterThan600(false);
      }
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => {
      window.removeEventListener("resize", checkHeight);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropDownRefSort.current &&
        !dropDownRefSort.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    data?.length > 0 && (
      <div className={style.MainContainer}>
        <div className={style.SubMainContainer}>
          <div className={style.Heading}>
            {"Hi" + "," + localStorage.getItem("user_name").replace(/"/g, "")}
          </div>
          <div className={style.BoxSection}>
            {!isHeightGreaterThan600 ? (
              <StyledCarousel
                className={"CarouselClass"}
                showStatus={false}
                showArrows={false}
                showThumbs={false}
                selectedItem={currentIndex}
                onChange={index => setCurrentIndex(index)}
                swipeable
                width={"100%"}>
                <div className={style.KycSection}>
                  <div className={style.KycDetails}>
                    <div className={style.KHeading}>
                      <span>
                        <img
                          className={style.HeaderIconImage}
                          width={30}
                          height={30}
                          src={
                            IconLink +
                            (statusToImageMap[
                              selectedOrder?.zoho_sub_status?.toLowerCase()
                            ] || "payment-failed.svg")
                          }
                        />
                      </span>
                      <span className={style.HeadingOfCard}>
                        {selectedOrder?.zoho_sub_status === ""
                          ? "Failed Payment"
                          : selectedOrder?.zoho_sub_status}
                      </span>
                    </div>
                    <div className={style.KNumber}>
                      <span>
                        <div className="relative flex">
                          <div className={`${style.filter} relative `}>
                            <div
                              className={style.filterbox}
                              onClick={() => {
                                // setSortOpen(!filterOpen);
                                toggleDropdownSort();
                              }}>
                              <div className={style.filter_text_container}>
                                <p
                                  className={`${style.filter_text} !text-[#597492] cursor-pointer`}>
                                  #{selectedOption}
                                </p>
                              </div>
                              <div>
                                <DownPopUpArrow
                                  size={20}
                                  color={"#597492"}
                                  className={`!text-[#597492] ${
                                    sortOpen ? style.arrow_up : style.arrow_down
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          {
                            <Drawer
                              anchor={"bottom"}
                              PaperProps={{
                                sx: {
                                  borderTopRightRadius: "20px",
                                  borderTopLeftRadius: "20px",
                                  position: "absolute",
                                },
                              }}
                              open={sortOpen}
                              onClose={() => setSortOpen(false)}
                              sx={{
                                borderTop: "20px",
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "20px",
                              }}>
                              <div
                                // className="relative top-4 right-[24px] flex w-full justify-end z-[111] "
                                className="fixed right-4 lg:right-8 w-8 h-8 bg-fff rounded-2xl cursor-pointer items-center flex justify-center -mt-12 lg:-mt-0"
                                onClick={() => setSortOpen(false)}>
                                <Close size={25} color={"#000"} />
                              </div>
                              <div
                                // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
                                role="presentation"
                                // onClick={toggleDrawer(anchor, false)}
                                onKeyDown={() => setSortOpen(false)}
                                className="relative">
                                <List>
                                  <div className="gap-6 shadow-md w-full bg-white px-4 pt-4 pb-8">
                                    <p className={style.headin_text}>
                                      {"Order Id"}
                                    </p>
                                    <div className="h-[1px] bg-EDEDEE" />
                                    <div
                                      className={`overflow-scroll ${style.mapped_filter_mobile}`}>
                                      {data?.map((ele, index) => {
                                        // {CategoryFilterData.slice(0).map((ele, index) => {
                                        return (
                                          <>
                                            {
                                              // index < itemCount &&
                                              <div
                                                className={
                                                  style.single_filter_text
                                                }
                                                key={index.toString()}
                                                onClick={() => {
                                                  setMobileSelecteData(ele);
                                                }}>
                                                <p
                                                  className={style.option_text}>
                                                  {ele?.dealCodeNumber}
                                                </p>
                                                {console.log(
                                                  mobileSelecteData,
                                                  "Hello",
                                                )}
                                                <input
                                                  type="checkbox"
                                                  id={index}
                                                  name={ele?.dealCodeNumber}
                                                  // checked={categoryPageReduxData?.filteredItems.includes(
                                                  //   ele?.filter_tag,
                                                  // )}
                                                  checked={
                                                    mobileSelecteData?.dealCodeNumber ===
                                                    ele?.dealCodeNumber
                                                  }
                                                  className="pr-1 cursor-pointer"
                                                  // onChange={e => handleFilteredItems(e)}
                                                />
                                              </div>
                                            }
                                          </>
                                        );
                                      })}
                                    </div>
                                    {/* {filtereData.length > itemCount && (
                                                            <p className={style.see_more_text} onClick={loadMoreItems}>
                                                                See more
                                                            </p>
                                                        )} */}
                                    <div className="mt-4 w-full flex justify-center">
                                      <div
                                        className={style.btn_container}
                                        onClick={() =>
                                          handleSortMobile(mobileSelecteData)
                                        }>
                                        <p
                                          style={{
                                            boxShadow: "rgba(0, 0, 0, 0.25)",
                                          }}
                                          className={style.apply_btn}>
                                          Apply
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </List>
                              </div>
                            </Drawer>
                          }
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className={style.orderDetails}>
                    <div className={style.ImageSection}>
                      <div className={style.images_wraper}>
                        {selectedImage
                          ?.slice(
                            0,
                            selectedImage?.length > 4
                              ? 3
                              : selectedImage?.length,
                          )
                          ?.map((ele, i) => {
                            return (
                              <div key={i.toString()}>
                                {ele && (
                                  <img
                                    src={
                                      ele &&
                                      productImageBaseUrl + "thumb/" + ele
                                    }
                                    alt={ele?.product_name}
                                    className={`${
                                      selectedImage?.length === 1
                                        ? "w-full h-full"
                                        : selectedImage?.length === 2
                                          ? `mobile:!w-[47px] mobile:!h-[47px] md1:w-[48px] md1:h-[48px] absolute ${
                                              i === 0
                                                ? "top-0 left-0"
                                                : "bottom-0 right-0"
                                            }`
                                          : " mobile:!w-[25px] mobile:!h-[25px]  md1:!w-[37px] md1:!h-[37px]"
                                    } rounded-lg object-cover`}
                                    loading="lazy"
                                  />
                                )}
                              </div>
                            );
                          })}
                        {selectedImage?.length > 4 && (
                          <div className={style.counter_box}>
                            +{selectedImage?.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={style.OrderLink}>
                      {selectedOrder.zoho_sub_status?.toLowerCase() ===
                        "kyc in progress" && (
                        <div
                          onClick={() =>
                            router.push(
                              `/documentation?order_id=${selectedOption}`,
                            )
                          }
                          className={
                            "flex items-center justify-center whitespace-nowrap !text-start"
                          }>
                          <span>
                            <span className={style.LinkText}>Complete KYC</span>{" "}
                            <span className={style.RestText}>
                              now to schedule your delivery{" "}
                            </span>
                          </span>
                        </div>
                      )}
                      {selectedOrder.zoho_sub_status === "" && (
                        <div
                          onClick={() => router.push(`/cart`)}
                          className={
                            "flex items-center justify-center whitespace-nowrap !text-start"
                          }>
                          <span>
                            <span className={style.LinkText}>
                              Retry Payment{" "}
                            </span>
                            <span className={style.RestText}>
                              to proceed with your order{" "}
                            </span>
                          </span>
                        </div>
                      )}
                      {extendedStatus?.extendDisplay &&
                        selectedOrder.zoho_sub_status === "Delivered" && (
                          <div
                            onClick={() =>
                              router.push(
                                `/upfront_tenure_extension/${extendedStatus?.recurring_zo_id}`,
                              )
                            }
                            className={
                              "flex items-center justify-center whitespace-nowrap !text-start"
                            }>
                            <span>
                              <span className={style.RestText}>
                                Your Subscription will expire on{" "}
                                {`${format(
                                  new Date(extendedStatus.next_invoice_date),
                                  "d MMMM, yyyy",
                                )}`}{" "}
                              </span>{" "}
                              <span className={style.LinkText}>
                                Extend Subscription{" "}
                              </span>
                            </span>
                          </div>
                        )}
                      <div
                        onClick={() =>
                          extendedStatus?.extendDisplay
                            ? router.push("/purchases")
                            : router.push("/purchases")
                        }
                        className={
                          "flex items-center justify-center whitespace-nowrap gap-1"
                        }>
                        <span className={style.LinkText}>
                          {extendedStatus?.extendDisplay
                            ? "My subscriptions"
                            : "My orders"}
                        </span>
                        <Image width={15} height={15} src={link} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.RaiseServicerequestSection}>
                  <div className={style.RHeadingSection}>
                    <div className={style.RHeading}>Raise Service request</div>
                    <a href="/service-requests" className={style.RLinkSection}>
                      All requests
                      <img
                        src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/right_icn.svg"
                        alt="Right Arrow Icon"
                        className={style.Icon}
                      />
                    </a>
                    {/* <div onClick={() => router.push('/service-requests')} className={style.RLinkSection}><a>All requests</a></div> */}
                  </div>
                  <div className={style.RIconsSection}>
                    {dataArray.map(item => {
                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            item?.clickable && router.push("/service-requests")
                          }
                          className={style.IconBox}>
                          <div className={style.IconBoxIcon}>
                            <Image width={40} height={40} src={item.icon} />
                          </div>
                          <div className={style.IconBoxText}>{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </StyledCarousel>
            ) : (
              <>
                <div className={style.KycSection}>
                  <div className={style.KycDetails}>
                    <div className={style.KHeading}>
                      <span>
                        <Image
                          width={30}
                          height={30}
                          src={
                            IconLink +
                            (statusToImageMap[
                              selectedOrder?.zoho_sub_status?.toLowerCase()
                            ] || "payment-failed.svg")
                          }
                        />
                      </span>
                      <span>
                        {selectedOrder?.zoho_sub_status === ""
                          ? "Failed Payment"
                          : selectedOrder?.zoho_sub_status}
                      </span>
                    </div>
                    <div className={style.KNumber}>
                      <span>
                        <div className="relative z-[1] flex">
                          <div className={`${style.filter} relative z-[2]`}>
                            <div
                              className={style.filterbox}
                              onClick={() => {
                                // setSortOpen(!filterOpen);
                                toggleDropdownSort();
                              }}
                              ref={dropDownRefSort}>
                              <div className={style.filter_text_container}>
                                <p
                                  className={`${style.filter_text} !text-[#597492] cursor-pointer`}>
                                  #{selectedOption}
                                </p>
                              </div>
                              <div>
                                <DownPopUpArrow
                                  size={20}
                                  color={"#597492"}
                                  className={`!text-[#597492] ${
                                    sortOpen ? style.arrow_up : style.arrow_down
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          {sortOpen && (
                            <div
                              ref={dropDownRefFilter}
                              className=" h-[180px] overflow-scroll gap-6 absolute z-[11332] top-12 right-0 w-[222px] rounded-[20px] border-[2px] border-71717A bg-white py-4">
                              {data?.map((ele, index) => {
                                return (
                                  <div
                                    className={`${style.sorted_text}`}
                                    key={index.toString()}
                                    onClick={() => {
                                      toggleDropdownSort();
                                      handleSort(ele, index);
                                    }}>
                                    <p className={style.option_text}>
                                      {ele?.dealCodeNumber}
                                    </p>
                                    <input
                                      type="radio"
                                      id={index}
                                      name="sortBy"
                                      value={ele?.dealCodeNumber}
                                      className="cursor-pointer"
                                      checked={
                                        selectedOption === ele?.dealCodeNumber
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className={style.orderDetails}>
                    <div className={style.ImageSection}>
                      <div className={style.images_wraper}>
                        {selectedImage
                          ?.slice(
                            0,
                            selectedImage.length > 4 ? 3 : selectedImage.length,
                          )
                          .map((ele, i) => {
                            return (
                              <div key={i.toString()}>
                                {ele && (
                                  <img
                                    src={
                                      ele &&
                                      productImageBaseUrl + "thumb/" + ele
                                    }
                                    alt={ele?.product_name}
                                    className={`${
                                      selectedImage?.length === 1
                                        ? "w-full h-full"
                                        : selectedImage?.length === 2
                                          ? `w-[48px] h-[48px] absolute ${
                                              i === 0
                                                ? "top-0 left-0"
                                                : "bottom-0 right-0"
                                            }`
                                          : "w-[37px] h-[37px]"
                                    } rounded-lg object-cover`}
                                    loading="lazy"
                                  />
                                )}
                              </div>
                            );
                          })}
                        {selectedImage?.length > 4 && (
                          <div className={style.counter_box}>
                            +{selectedImage?.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={style.OrderLink}>
                      {selectedOrder.zoho_sub_status?.toLowerCase() ===
                        "kyc in progress" && (
                        <div
                          onClick={() =>
                            router.push(
                              `/documentation?order_id=${selectedOption}`,
                            )
                          }
                          className={
                            "flex items-center justify-center whitespace-nowrap !text-start"
                          }>
                          <span>
                            <span className={style.LinkText}>Complete KYC</span>{" "}
                            <span className={style.RestText}>
                              now to schedule your delivery{" "}
                            </span>
                          </span>
                        </div>
                      )}
                      {selectedOrder.zoho_sub_status === "" && (
                        <div
                          onClick={() => router.push(`/cart`)}
                          className={
                            "flex items-center justify-center whitespace-nowrap !text-start"
                          }>
                          <span>
                            <span className={style.LinkText}>
                              Retry Payment
                            </span>{" "}
                            <span className={style.RestText}>
                              to proceed with your order{" "}
                            </span>
                          </span>
                        </div>
                      )}
                      {extendedStatus?.extendDisplay &&
                        selectedOrder.zoho_sub_status === "Delivered" && (
                          <div
                            onClick={() =>
                              router.push(
                                `/upfront_tenure_extension/${extendedStatus?.recurring_zo_id}`,
                              )
                            }
                            className={
                              "flex items-center justify-center whitespace-nowrap !text-start "
                            }>
                            <span>
                              <span className={style.RestText}>
                                Your Subscription will expire on{" "}
                                {`${format(
                                  new Date(extendedStatus.next_invoice_date),
                                  "d MMMM, yyyy",
                                )}`}{" "}
                              </span>{" "}
                              <span className={style.LinkText}>
                                <br />
                                Extend Subscription{" "}
                              </span>
                            </span>
                          </div>
                        )}
                      <div
                        onClick={() =>
                          extendedStatus?.extendDisplay
                            ? router.push("/purchases")
                            : router.push("/purchases")
                        }
                        className={
                          "flex items-center justify-center whitespace-nowrap !text-start gap-1"
                        }>
                        <span className={style.LinkText}>
                          {extendedStatus?.extendDisplay &&
                          selectedOrder.zoho_sub_status === "Delivered"
                            ? "My subscriptions " + " "
                            : "My orders " + " "}
                        </span>
                        <Image width={15} height={15} src={link} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.RaiseServicerequestSection}>
                  <div className={style.RHeadingSection}>
                    <div className={style.RHeading}>Raise Service request</div>
                    <a href="/service-requests" className={style.RLinkSection}>
                      All requests
                      <img
                        src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/right_icn.svg"
                        alt="Right Arrow Icon"
                        className={style.Icon}
                      />
                    </a>
                    {/* <div onClick={() => router.push('/service-requests')} className={style.RLinkSection}><a>All requests</a></div> */}
                  </div>
                  <div className={style.RIconsSection}>
                    {dataArray.map(item => {
                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            item?.clickable && router.push("/service-requests")
                          }
                          className={`${
                            item?.clickable
                              ? "!cursor-pointer"
                              : "!cursor-not-allowed"
                          } ${style.IconBox}`}>
                          <div className={style.IconBoxIcon}>
                            <Image
                              width={40}
                              height={40}
                              className={style.KycPendingICons}
                              src={item.icon}
                            />
                          </div>
                          <div className={style.IconBoxText}>{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default KycPending;
