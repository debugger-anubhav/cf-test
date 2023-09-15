import React, {useState, useEffect, useRef} from "react";
import styles from "./style.module.css";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {CustomNextArrow, CustomPrevArrow} from "./CustomArrows";
import {
  DeliveryTruck,
  Heart,
  InformationIcon,
  RatingStar,
  ShareIcon,
  VerifyIcon,
} from "@/assets/icon";
import {RiSparklingFill} from "react-icons/ri";
import string from "@/constants/Constant.json";
import {ProductPageImages} from "@/assets/images";
import {
  HasselFreeDataForProductPage,
  getLocalStorage,
  getLocalStorageString,
  productPageImagesBaseUrl,
  setLocalStorage,
} from "@/constants/constant";
import ServiceCard from "./ServiceCard";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import "react-responsive-modal/styles.css";
import CityshieldDrawer from "./CityshieldDrawer/CityshieldDrawer";
import ShareModal from "./ShareDrawer/ShareModal";
import StickyBottomBar from "./StickyBottomBar";
import {format} from "date-fns";
import {useSelector, useDispatch} from "react-redux";
import {addItemsToCart, getProductDetails} from "@/store/Slices";
import {useMutation} from "@/hooks/useMutation";
import {useRouter} from "next/navigation";
import {useQuery} from "@/hooks/useQuery";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import SideDrawer from "../Drawer/Drawer";
import {LiaMoneyBillWaveSolid} from "react-icons/lia";
import {Skeleton} from "@mui/material";

const ProductDetails = ({params}) => {
  const str = string.product_page;
  const prodDetails = useSelector(
    state => state.productPageData.singleProductDetails,
  );
  const cartItems = useSelector(state => state.cartPageData.cartItems);
  const cityName = useSelector(state => state.homePagedata.cityName);
  const arr = [
    {name: "Home", link: "/"},
    {
      name: prodDetails?.[0]?.category_name,
      link: `/${cityName.replace(/\//g, "-").toLowerCase()}/${
        prodDetails?.[0]?.category_seourl
      }`,
    },
    {name: prodDetails?.[0]?.product_name.replace(/-/g, " ")},
  ];
  const dispatch = useDispatch();

  const carouselData = prodDetails?.[0]?.image?.split(",");
  const lastCaraouselElement = carouselData?.[carouselData?.length - 1];
  if (!lastCaraouselElement) carouselData?.pop();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [duration, setDuration] = useState({currentIndex: 0, value: ""});
  const [inWishList, setInWishList] = React.useState(false);
  const [durationArray, setDurationArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [yourScrollThreshold, setYourScrollThreshold] = useState(0);
  const [soldOut, setSoldOut] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 4;
  const startIndex = open ? (currentPage - 1) * reviewsPerPage : 0;
  const endIndex = open ? startIndex + reviewsPerPage : 3;

  const toggleRatingDrawer = () => {
    setOpen(!open);
  };

  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  // bottombar visibility conditiionally
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight) {
        setShowBottomBar(false);
      } else if (scrollPosition > yourScrollThreshold) {
        setShowBottomBar(true);
      } else {
        setShowBottomBar(false);
      }
    };

    const buttonPosition =
      addToCartButtonRef.current.getBoundingClientRect().bottom +
      window.scrollY;
    setYourScrollThreshold(buttonPosition);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBottomBar]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const GetProductDetails = () => {
    axios
      .get(
        baseURL +
          endPoints.productPage.singleProductDetails(params.productId, cityId),
      )
      .then(res => {
        dispatch(getProductDetails(res?.data?.data));
        if (res?.data?.data?.[0]?.pq_quantity <= 0) setSoldOut(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDurationRent = () => {
    axios
      .get(
        baseURL + endPoints.productPage.monthlyRent(params.productId, cityId),
      )
      .then(res => {
        setDurationArray(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const data = {
      // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
      tempUserId: getLocalStorage("tempUserID") ?? "",
      userId: getLocalStorage("userId") ?? "",

      // userId: JSON.parse(localStorage.getItem("user_id")) ?? "",
      productId: params?.productId,
    };
    axios
      .post(baseURL + endPoints.addRecentViewProduct, data)
      .then(res => {
        console.log(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (durationArray.length > 0) {
      const lastIndex = durationArray.length - 1;
      const lastValue = durationArray[lastIndex];
      setDuration({
        currentIndex: lastIndex,
        value: lastValue,
      });
    }
  }, [durationArray]);

  useEffect(() => {
    getDurationRent();
    GetProductDetails();
  }, []);

  useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(parseInt(params.productId)),
    );
  }, []);

  useEffect(() => {
    console.log(inWishList, "whishlist");
  }, [inWishList]);

  const router = useRouter();
  const cityIdStr = getLocalStorageString("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);
  const userId = getLocalStorageString("user_id");

  const handleWhislistCard = e => {
    e.stopPropagation();
    if (!userId) {
      router.push("https://test.rentofurniture.com/user_sign_up");
      return;
    }
    // dispatch(addRemoveWhishListitems(!inWishList));
    !inWishList
      ? addwhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
          })
          .catch(err => console.log(err))
      : removewhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
            console.log(res);
          })
          .catch(err => console.log(err));
  };

  const data = {
    // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",

    // userId: JSON.parse(localStorage.getItem("user_id")),
    // userId: JSON.parse(localStorage.getItem("user_id")),
    productId: params?.productId,
  };

  const {mutateAsync: addwhislistProduct} = useMutation(
    "add-wishlist",
    "POST",
    endPoints.addWishListProduct,
    data,
  );

  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    }`,
  );
  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    data,
  );

  const handleThumbnailClick = index => {
    setSelectedIndex(index);
  };

  const handleSliderChange = index => {
    setSelectedIndex(index);
  };

  const addToCartButtonRef = useRef(null);

  const cityShieldCurrentPrice =
    (durationArray[duration.currentIndex]?.attr_price * 6) / 100;

  const cityShieldOriginalPrice =
    (durationArray[duration.currentIndex]?.attr_price * 10) / 100;

  const cityShieldDiscount =
    cityShieldOriginalPrice > 0
      ? Math.round(
          ((cityShieldOriginalPrice - cityShieldCurrentPrice) * 100) /
            cityShieldOriginalPrice,
        ).toFixed(0)
      : 0;

  const isItemInCart = cartItems?.some(item => {
    return item?.fc_product?.id === parseInt(params.productId);
  });

  const handleAddToCart = () => {
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };
    const userId = getLocalStorage("userID");
    const tempUserId = getLocalStorage("tempUserID");
    const userIdToUse = userId || tempUserId;

    const body = {
      userId: parseInt(userIdToUse),
      sellId: 22,
      price: parseInt(durationArray[duration.currentIndex]?.attr_price),
      categoryId: prodDetails?.[0]?.category_id,
      productId: prodDetails?.[0]?.id,
      quantity: 1,
      attributeValue: durationArray[duration.currentIndex]?.pid,
      selectedTenure: parseInt(
        durationArray[duration.currentIndex]?.attr_name?.split(" ")[0],
      ),
    };
    axios
      .post(baseURL + endPoints.productPage.addToCart, body, headers)
      .then(res => {
        // console.log(res, "res in add to cart");
        const apiData = res?.data?.data;
        if (!isItemInCart) {
          dispatch(addItemsToCart(apiData));
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const currentDate = new Date();
  // Add three days to the current date
  currentDate.setDate(currentDate.getDate() + 3);

  const pageData = useSelector(state => state.productPageData.customerReviews);
  const totalReviews = pageData?.length;
  const totalRatingSum = pageData?.reduce((sum, item) => {
    const rating = parseFloat(item.rating);
    return isNaN(rating) ? sum : sum + rating;
  }, 0);

  const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = function () {
      mouseDown = false;
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
  }, []);

  return (
    <div className={styles.main_container}>
      <ShareModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        params={params}
        title={prodDetails?.[0]?.product_name}
      />
      {showBottomBar && (
        <StickyBottomBar
          productName={prodDetails?.[0]?.product_name}
          duration={duration}
          durationArray={durationArray}
          isLoading={isLoading}
          handleButtonClick={handleAddToCart}
          isItemInCart={isItemInCart}
          soldOut={soldOut}
        />
      )}
      <div className={styles.bread_crumps}>
        {arr?.map((item, index) => (
          <div key={index} className="flex gap-2">
            <a href={index !== 2 && `${item?.link}`}>
              <p
                className={` ${
                  index === arr.length - 1 ? "font-medium" : "font-normal"
                } ${styles.crumpItem}`}
                onClick={() => {
                  setLocalStorage("subCategory", "All");
                }}>
                {item.name}
              </p>
            </a>
            <p
              className={`${index === arr.length - 1 ? "hidden" : "flex"} ${
                styles.crumpItem
              }`}>{`>`}</p>
          </div>
        ))}
      </div>
      <div className={styles.main_section}>
        <div className={styles.carousel_wrapper}>
          <Carousel
            selectedItem={selectedIndex}
            showThumbs={false}
            showStatus={false}
            onChange={handleSliderChange}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && <CustomPrevArrow onClick={onClickHandler} />
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && <CustomNextArrow onClick={onClickHandler} />
            }
            renderIndicator={(onClickHandler, isSelected, index) => {
              return (
                <li
                  className={styles.indicatorStyle}
                  style={{background: isSelected ? "#597492" : "#ffffff"}}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                />
              );
            }}>
            {carouselData?.map((item, index) => (
              <>
                {item && (
                  <div key={index} className={styles.prod_img}>
                    <img
                      src={`${productPageImagesBaseUrl + item}`}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full"
                    />
                    <div className={styles.info}>
                      <InformationIcon color={"ffffff"} />
                      <p>
                        {soldOut
                          ? "SOLD OUT"
                          : "39 people ordered this in the last 24hrs"}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ))}
          </Carousel>

          <div className={styles.thumbnail_container}>
            {prodDetails?.[0]?.image?.split(",")?.map((image, index) => (
              <>
                {image && (
                  <div
                    className={`${styles.thumbnail_img} ${
                      index === selectedIndex
                        ? "border-[#5F789D]"
                        : "border-fff"
                    }`}
                    key={index}
                    onClick={() => handleThumbnailClick(index)}>
                    <img
                      src={`${productPageImagesBaseUrl + "thumb/" + image}`}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </>
            ))}
          </div>
          <div
            className={`${styles.services_cards_container} ${styles.web}`}
            ref={sliderRef}>
            {HasselFreeDataForProductPage.map((item, index) => (
              <ServiceCard
                key={index}
                head={item.Heading}
                desc={item.text}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        <div className={styles.details_wrapper}>
          <div
            className={styles.header_div}
            style={{justifyContent: "space-between"}}>
            <h1 className={styles.item_name}>
              {prodDetails?.[0]?.product_name.replace(/-/g, " ")}
            </h1>
            <div className={styles.header_div}>
              <Heart
                className={
                  "w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] cursor-pointer"
                }
                color={inWishList ? "#D96060" : "#C0C0C6"}
                // onClick={() => setInWishList(!inWishList)}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWhislistCard(e);
                }}
              />
              <div onClick={openModal}>
                <ShareIcon
                  className={
                    "w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] cursor-pointer"
                  }
                  color={"#C0C0C6"}
                />
              </div>
            </div>
          </div>

          <div className={styles.rating_div}>
            {totalReviews !== 0 && (
              <div className={styles.rating_wrapper}>
                <div className="flex gap-1">
                  <p className={styles.rating_txt}>
                    {averageRating.toFixed(1)}
                  </p>
                  <RatingStar color={"#F6B704"} size={16} />
                </div>
                <p
                  className={`underline ${styles.rating_txt}`}
                  onClick={toggleRatingDrawer}>
                  {totalReviews} ratings
                </p>
              </div>
            )}

            {soldOut ? (
              <div className={styles.sold_out_div}>
                <p className={styles.sold_out_txt}>Currently sold out</p>
                <img
                  className={styles.sold_out_icon}
                  src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/sold-out-icon.svg"
                />
              </div>
            ) : (
              <p className={styles.rating_txt} style={{color: "#63798D"}}>
                Get it by {`${format(new Date(currentDate), "d MMMM,")}`}
                <span>
                  <DeliveryTruck color={"#63798D"} className={"ml-1 w-6 h-6"} />
                </span>
              </p>
            )}
          </div>

          <div className={styles.duration}>
            <p className={styles.duration_text}>
              For how many months would you like to rent this?
            </p>

            <div className={styles.circle_div}>
              {durationArray.map((item, index) => (
                <div key={index}>
                  <div
                    className={`${
                      duration.currentIndex === index
                        ? "bg-[#597492] text-fff hover:!shadow-none"
                        : "text-[#597492]"
                    } ${styles.duration_circle}`}
                    onClick={() =>
                      setDuration({
                        value: item.attr_name?.split(" ")[0],
                        currentIndex: index,
                      })
                    }>
                    {item.attr_name?.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.deposit_div}>
              <div>
                <p className={styles.deposit_txt}>Monthly Rent</p>
                <div className={styles.flexx}>
                  <p className={styles.currentPrice}>
                    <span className={styles.rupeeIcon}>₹</span>
                    {durationArray?.[duration.currentIndex]?.attr_price}
                  </p>
                  {durationArray?.[0]?.attr_price >
                    durationArray?.[duration.currentIndex]?.attr_price && (
                    <p
                      className={styles.originalPrice}
                      style={{
                        display: duration.value === "3" ? "none" : "flex",
                      }}>
                      <span className={styles.rupeeIcon}>₹</span>
                      {durationArray?.[0]?.attr_price}
                    </p>
                  )}

                  {durationArray?.[0]?.attr_price >
                    durationArray?.[duration.currentIndex]?.attr_price && (
                    <div
                      className={styles.discount}
                      style={{
                        display: duration.value === "3" ? "none" : "flex",
                      }}>
                      {`-${Math.round(
                        ((durationArray?.[0]?.attr_price -
                          durationArray?.[duration.currentIndex]?.attr_price) *
                          100) /
                          durationArray?.[0]?.attr_price,
                      ).toFixed(0)}% OFF`}
                    </div>
                  )}
                </div>
              </div>
              {/* <span className="text-[#9C9C9C]">+</span>
              <div>
                <p className={styles.deposit_txt}>Security Deposit</p>
                <p className={styles.currentPrice}>
                 <span className={styles.rupeeIcon}>₹</span>0
                </p>
              </div> */}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isLoading || isItemInCart || soldOut}
            className={styles.btn}
            ref={addToCartButtonRef}>
            {isLoading ? (
              <div className={styles.spinner} />
            ) : soldOut ? (
              "Notify me"
            ) : isItemInCart ? (
              "In cart"
            ) : (
              "Add to Cart"
            )}
          </button>

          <div className={styles.emi_wrapper}>
            <RiSparklingFill size={16} color={"#597492"} />
            <p className={styles.emi_text}>
              Pay only {durationArray[duration.currentIndex]?.attr_price}/mo
              using No-Cost EMI (excluding GST)
            </p>
            <RiSparklingFill size={16} color={"#597492"} />
          </div>

          <div className={styles.kyc_wrapper}>
            {/* <BsPersonVcard size={24} /> */}
            <img src={ProductPageImages.KycDoc} alt="kyc" className="w-6 h-6" />
            <p className={styles.kyc_text}>{str.kyc}</p>
          </div>

          {prodDetails?.[0]?.installation_charge.replace(/-/g, " ") > 0 && (
            <div className={styles.installation_wrapper}>
              {/* <BsPersonVcard size={24} /> */}
              <LiaMoneyBillWaveSolid
                color={"#45454A"}
                className="min-w-[24px] min-h-[24px]"
              />
              <p className={styles.kyc_text}>
                <span className={styles.rupeeIcon}>₹</span>
                {str.installation}
              </p>
            </div>
          )}

          <div
            className={`${styles.services_cards_container} ${styles.mobile}`}
            ref={sliderRef}>
            {HasselFreeDataForProductPage.map((item, index) => (
              <ServiceCard
                key={index}
                head={item.Heading}
                desc={item.text}
                icon={item.icon}
              />
            ))}
          </div>

          <div onClick={toggleDrawer} className={styles.city_shield_wrapper}>
            <div className={styles.getPeace_div}>
              <RiSparklingFill size={16} color={"#ffffff"} />
              <p className={styles.getPeace_text}>{str.get_peace}</p>
            </div>
            <div className={`${styles.flexx} justify-between`}>
              <div className={styles.flexx}>
                <VerifyIcon size={30} color={"#2D9469"} />
                <p className={styles.city_shield_head}>Cityshield </p>
              </div>
              <button className={styles.read_more}>Read More</button>
            </div>
            <p className={styles.opt_for}>
              Opt for City Shield today and get covered for accidental damages
              at ONLY ₹{cityShieldCurrentPrice}
              /month!
            </p>
            <p className={styles.protect}>{str.protect}</p>

            <div className={styles.cityshield_prices}>
              <p className={styles.currentPrice}>
                <span className={styles.rupeeIcon}>₹</span>
                {cityShieldCurrentPrice}/mo
              </p>
              <p className={styles.originalPrice}>
                <span className={styles.rupeeIcon}>₹</span>
                {cityShieldOriginalPrice} / mo
              </p>
              <div className={styles.discount}>-{cityShieldDiscount}% OFF</div>
            </div>
          </div>

          {drawerOpen && (
            <CityshieldDrawer
              toggleDrawer={toggleDrawer}
              open={drawerOpen}
              cityShieldCurrentPrice={cityShieldCurrentPrice}
              cityShieldOriginalPrice={cityShieldOriginalPrice}
              cityShieldDiscount={cityShieldDiscount}
            />
          )}
        </div>
      </div>
      {open && (
        <SideDrawer
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          endIndex={endIndex}
          startIndex={startIndex}
          toggleDrawer={toggleRatingDrawer}
          open={open}
          totalReviews={totalReviews}
          drawerType={"ratings"}
        />
      )}
    </div>
  );
};

export default ProductDetails;

export const SkeletonForProductDetail = () => {
  return (
    <div className={styles.skeleton_wrapper}>
      <div className={styles.container_skeleton}>
        <div className={styles.left_part}>
          <Skeleton variant="rectangular" className="w-full" />
        </div>
        <div className={styles.right_part}>
          <div className="h-6 w-full">
            <Skeleton variant="text" className="w-full" />
          </div>
          <div className="h-3 w-1/2 my-4">
            <Skeleton variant="text" className="w-full" />
          </div>
          <div className="h-3 w-4/6 my-4">
            <Skeleton variant="text" className="w-full" />
          </div>
          <div className="my-4 flex">
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              className="mr-4"
            />
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              className="mr-4"
            />
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              className="mr-4"
            />
          </div>
          <div className="h-3 w-1/5 my-2">
            <Skeleton variant="text" className="w-full" />
          </div>
          <div className="h-8 w-4/5 my-2">
            <Skeleton variant="text" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
