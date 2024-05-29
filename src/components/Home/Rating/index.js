"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import {GoogleIcon, EditIcon} from "@/assets/icon";
import Image from "next/image";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addGoogleReviews} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
// import {FaStar} from "react-icons/fa";
// import Rating from "react-rating";
import {getLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";

const CustomerRating = () => {
  const {reviews} = useSelector(state => state.homePagedata);
  const sectionHeading = "See what people are saying";
  const subhead = `from ${reviews?.[0]?.fc_google_location_data[0]?.total_review} customers`;
  const btntxt = "Write a review";
  const [reviewLink, setReviewLink] = React.useState("");

  // const homePageReduxData = useSelector(state => state.homePagedata);
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const tempCityId = parseFloat(cityIdStr);
  const cityId = tempCityId === 52 ? 49 : tempCityId;

  const {refetch: getGoogleReviews} = useQuery(
    "google-reviews",
    endPoints.googleReviews,
    `?cityId=${cityId}`,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getGoogleReviews()
      .then(res => {
        dispatch(addGoogleReviews(res?.data?.data));
      })
      .catch(err => console.log(err?.message || "some error"));
  }, [cityId]);
  useEffect(() => {
    baseInstance
      .get(endPoints.googleReviewsLinks(getLocalStorage("cityId")))
      .then(res => {
        setReviewLink(res?.data?.data?.newReviewUri);
      })
      .catch(err => console.log(err?.message || "some error"));
  }, [getLocalStorage("cityId")]);

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
    return () => {
      slider.removeEventListener("mousemove", e => {
        e.preventDefault();
        if (!mouseDown) return;
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
      });
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.head}>{sectionHeading}</h2>
        <div className={styles.upper_div}>
          <h3 className={styles.rating_div}>
            {reviews?.[0]?.fc_google_location_data[0]?.average_review}
            <span className={styles.star}>
              <Image
                loader={({src}) => src}
                src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/star-icon.svg"
                width={25}
                height={25}
                alt="ratting-star"
              />
            </span>
            rating
          </h3>

          <a
            href={reviewLink}
            target="_blank"
            rel="noreferrer"
            aria-label="write-a-review">
            <Image
              loader={({src}) => src}
              src={
                "https://d3juy0zp6vqec8.cloudfront.net/images/icons/edit-icon.svg"
              }
              alt="editIcon"
              className={styles.editIcon}
              loading="lazy"
              width={40}
              height={40}
            />
          </a>
          <a
            href={reviewLink}
            target="_blank"
            rel="noreferrer"
            aria-label="write-a-review-link"
            className={styles.editlink}>
            <div className={styles.editBtn}>
              <EditIcon size={25} />
              <p className="text-[#222] font-medium">{btntxt}</p>
            </div>
          </a>
        </div>
        <h3 className={styles.subhead}>{subhead}</h3>
      </div>

      <div className={styles.card_wrapper} ref={sliderRef}>
        {reviews?.map((item, index) => (
          <div
            key={index.toString()}
            className={`${styles.card} ${
              index === reviews?.length - 1 && "mr-[16px]"
            }`}>
            <div className={styles.row}>
              <div className="flex">
                <div>
                  <img
                    src={`https://d3juy0zp6vqec8.cloudfront.net/images/google_review/${item?.user_image}`}
                    alt="profile-pic"
                    className={`${styles.img} pointer-events-none`}
                    loading="lazy"
                  />
                </div>
                <div className="ml-3 mr-7 w-full">
                  <h3 className={styles.name}>{item?.user_name}</h3>
                  <div className={styles.rating_wrapper}>
                    {/* <Rating
                      stop={item?.rate}
                      emptySymbol={
                        <FaStar
                          size={16}
                          color={"#fff"}
                          className="mr-1 w-full"
                        />
                      }
                      fullSymbol={
                        <img
                          src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/star-icon.svg"
                          width={"16px"}
                          alt="ratting-star"
                        />
                        // <FaStar
                        //   size={16}
                        //   color={"#FFCB45"}
                        //   className="mr-1 w-full"
                        // />
                      }
                      initialRating={
                        // item?.fc_google_location_data[0]?.average_review
                        item?.rate
                      }
                      readonly
                    /> */}
                    {[...Array(item?.rate)].map((_, index) => (
                      <Image
                        loader={({src}) => src}
                        src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/star-icon.svg"
                        width={16}
                        height={16}
                        alt={"ratting-icon" + index}
                        className="mt-1"
                        key={index.toString()}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <GoogleIcon color={"#5391F7"} size={30} />
            </div>

            <div className={styles.content}>
              <p className={styles.contentP}>{item?.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRating;
