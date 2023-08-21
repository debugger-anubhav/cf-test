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
import {HasselFreeData, productPageImagesBaseUrl} from "@/constants/constant";
import ServiceCard from "./ServiceCard";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import "react-responsive-modal/styles.css";
import CityshieldDrawer from "./CityshieldDrawer/CityshieldDrawer";
import {FaRupeeSign} from "react-icons/fa";
import ShareModal from "./ShareDrawer/ShareModal";
import StickyBottomBar from "./StickyBottomBar";
import {format} from "date-fns";
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails} from "@/store/Slices";

// import ShareDrawer from "./ShareDrawer/ShareDrawer";
// import Modal from "react-responsive-modal";

const ProductDetails = ({category, params}) => {
  const str = string.product_page;
  const prodDetails = useSelector(
    state => state.productPageData.singleProductDetails,
  );

  const arr = ["Home", category, prodDetails?.[0]?.product_name];
  const dispatch = useDispatch();

  // dummy
  // const images = [
  //   "1583995987Alexa-queen-bed.jpg",
  //   "1583996030alexa-queen-bed-1.jpg",
  //   "1583995987Alexa-queen-bed.jpg",
  //   "1583995987Alexa-queen-bed.jpg",
  //   "1583995987Alexa-queen-bed.jpg",
  // ];

  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [duration, setDuration] = useState({currentIndex: 3, value: 12});
  const [inWishList, setInWishList] = React.useState(false);
  const [durationArray, setDurationArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [yourScrollThreshold, setYourScrollThreshold] = useState(0);

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
        baseURL + endPoints.productPage.singleProductDetails(params.productId),
      )
      .then(res => {
        dispatch(getProductDetails(res?.data?.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDurationRent = () => {
    axios
      .get(baseURL + endPoints.productPage.monthlyRent(params.productId))
      .then(res => {
        setDurationArray(res?.data?.data.reverse());
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDurationRent();
    GetProductDetails();
  }, []);

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

  const cityShieldDiscount = Math.round(
    ((cityShieldOriginalPrice - cityShieldCurrentPrice) * 100) /
      cityShieldOriginalPrice,
  ).toFixed(2);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const currentDate = new Date();
  // Add three days to the current date
  currentDate.setDate(currentDate.getDate() + 3);

  const pageData = useSelector(state => state.productPageData.customerReviews);
  const totalReviews = pageData.length;
  const totalRatingSum = pageData.reduce((sum, item) => {
    const rating = parseFloat(item.rating);
    return isNaN(rating) ? sum : sum + rating;
  }, 0);

  const averageRating = totalRatingSum / totalReviews;

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
      <ShareModal isModalOpen={isModalOpen} closeModal={closeModal} />
      {showBottomBar && (
        <StickyBottomBar
          productName={prodDetails?.[0]?.product_name}
          duration={duration}
          durationArray={durationArray}
          isLoading={isLoading}
          handleButtonClick={handleButtonClick}
        />
      )}
      <div className={styles.bread_crumps}>
        {arr.map((item, index) => (
          <div key={index} className="flex gap-2">
            <p
              className={` ${
                index === arr.length - 1 ? "font-medium" : "font-normal"
              } ${styles.crumpItem}`}>
              {item}
            </p>
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
            {prodDetails?.[0]?.image?.split(",")?.map((item, index) => (
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
                      <p>39 people ordered this in the last 24hrs</p>
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
            {HasselFreeData.map((item, index) => (
              <ServiceCard
                icon={item.icon}
                key={index}
                head={item.Heading}
                desc={item.text}
              />
            ))}
          </div>
        </div>

        <div className={styles.details_wrapper}>
          <div
            className={styles.header_div}
            style={{justifyContent: "space-between"}}>
            <h1 className={styles.item_name}>
              {prodDetails?.[0]?.product_name}
            </h1>
            <div className={styles.header_div}>
              <Heart
                className={
                  "w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] cursor-pointer"
                }
                color={inWishList ? "#D96060" : "#C0C0C6"}
                onClick={() => setInWishList(!inWishList)}
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
            <div className={styles.rating_wrapper}>
              <div className="flex gap-1">
                <p className={styles.rating_txt}>{averageRating.toFixed(1)}</p>
                <RatingStar color={"#F6B704"} size={16} />
              </div>
              <p className={styles.rating_txt}>{totalReviews} ratings</p>
            </div>
            <p className={styles.rating_txt} style={{color: "#63798D"}}>
              Get it by {`${format(new Date(currentDate), "d MMMM,")}`}
              <span>
                <DeliveryTruck size={16} color={"#63798D"} className={"ml-1"} />
              </span>
            </p>
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
                        ? "bg-[#597492] text-fff"
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
                    <FaRupeeSign />
                    {durationArray?.[duration.currentIndex]?.attr_price}
                  </p>
                  <p
                    className={styles.originalPrice}
                    style={{
                      display: duration.value === "3" ? "none" : "flex",
                    }}>
                    {durationArray?.[0]?.attr_price}
                  </p>
                  <div
                    className={styles.discount}
                    style={{
                      display: duration.value === "3" ? "none" : "flex",
                    }}>
                    {`${Math.round(
                      ((durationArray?.[0]?.attr_price -
                        durationArray?.[duration.currentIndex]?.attr_price) *
                        100) /
                        durationArray?.[0]?.attr_price,
                    ).toFixed(2)}%`}
                  </div>
                </div>
              </div>
              <span className="text-[#9C9C9C]">+</span>
              <div>
                <p className={styles.deposit_txt}>Security Deposit</p>
                <p className={styles.currentPrice}>
                  <FaRupeeSign />0
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className={styles.btn}
            ref={addToCartButtonRef}>
            {isLoading ? <div className={styles.spinner} /> : "Add to Cart"}
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

          <div
            className={`${styles.services_cards_container} ${styles.mobile}`}
            ref={sliderRef}>
            {HasselFreeData.map((item, index) => (
              <ServiceCard
                key={index}
                head={item.Heading}
                desc={item.text}
                icon={item.icon}
              />
            ))}
          </div>

          <div className={styles.city_shield_wrapper}>
            <div className={styles.getPeace_div}>
              <RiSparklingFill size={16} color={"#ffffff"} />
              <p className={styles.getPeace_text}>{str.get_peace}</p>
            </div>
            <div className={`${styles.flexx} justify-between`}>
              <div className={styles.flexx}>
                <VerifyIcon size={30} color={"#2D9469"} />
                <p className={styles.city_shield_head}>Cityshield </p>
              </div>
              <button onClick={toggleDrawer} className={styles.read_more}>
                Read More
              </button>

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
            <p className={styles.opt_for}>
              Opt for City Shield today and get covered for accidental damages
              at ONLY ₹{cityShieldCurrentPrice}
              /month!
            </p>
            <p className={styles.protect}>{str.protect}</p>

            <div className={styles.cityshield_prices}>
              <p className={styles.currentPrice}>
                <FaRupeeSign />
                {cityShieldCurrentPrice}/mo
              </p>
              <p className={styles.originalPrice}>
                <FaRupeeSign />
                {cityShieldOriginalPrice} / mo
              </p>
              <div className={styles.discount}>-60% OFF</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
