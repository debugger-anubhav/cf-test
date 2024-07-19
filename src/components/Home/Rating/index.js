"use client";

import React, {memo, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import {GoogleIcon, EditIcon} from "@/assets/icon";
import Image from "@/components/Image";
import {useDispatch, useSelector} from "react-redux";
import {addGoogleReviews} from "@/store/Slices";
import {getLocalStorage} from "@/constants/constant";
import Worker from "worker-loader!./ratingWorker.js";
import Link from "next/link";

const sectionHeading = "See what people are saying";
const btntxt = "Write a review";

const CustomerRating = () => {
  const {reviews} = useSelector(state => state.homePagedata);
  const dispatch = useDispatch();

  const [reviewLink, setReviewLink] = useState("");

  const sliderRef = useRef(null);

  const subhead = `from ${reviews?.[0]?.fc_google_location_data[0]?.total_review} customers`;

  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const tempCityId = parseFloat(cityIdStr);
  const cityId = tempCityId === 52 ? 49 : tempCityId;

  const worker = new Worker();

  useEffect(() => {
    worker.postMessage({type: "ratingGoogleReviews", cityId});

    worker.onmessage = function ({data: {type, data, newReviewUri}}) {
      switch (type) {
        case "googleReviews":
          dispatch(addGoogleReviews(data));
          break;
        case "googleReviewLinks":
          setReviewLink(newReviewUri);
          break;
      }
    };
  }, [cityId]);

  useEffect(() => {
    worker.postMessage({
      type: "ratingGoogleReviewLinks",
      city: getLocalStorage("cityId"),
    });
  }, [getLocalStorage("cityId")]);

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
                src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/star-icon.svg"
                width={25}
                height={25}
                alt="ratting-star"
              />
            </span>
            rating
          </h3>

          <Link
            href={reviewLink ?? ""}
            target="_blank"
            rel="noreferrer"
            aria-label="write-a-review">
            <Image
              src={
                "https://d3juy0zp6vqec8.cloudfront.net/images/icons/edit-icon.svg"
              }
              alt="editIcon"
              className={styles.editIcon}
              width={40}
              height={40}
            />
          </Link>
          <Link
            href={reviewLink ?? ""}
            target="_blank"
            rel="noreferrer"
            aria-label="write-a-review-link"
            className={styles.editlink}>
            <div className={styles.editBtn}>
              <EditIcon size={25} />
              <p className="text-[#222] font-medium">{btntxt}</p>
            </div>
          </Link>
        </div>
        <h3 className={styles.subhead}>{subhead}</h3>
      </div>

      <div className={styles.card_wrapper} ref={sliderRef}>
        {reviews.length > 0 &&
          reviews.map(({user_image, user_name, comment, rate}, index) => (
            <div
              key={index.toString()}
              className={`${styles.card} ${
                index === reviews?.length - 1 ? "mr-[16px]" : ""
              }`.trim()}>
              <div className={styles.row}>
                <div className="flex">
                  <div>
                    <Image
                      src={`https://d3juy0zp6vqec8.cloudfront.net/images/google_review/${user_image}`}
                      alt="profile-pic"
                      className={`${styles.img} pointer-events-none`}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="ml-3 mr-7 w-full">
                    <h3 className={styles.name}>{user_name}</h3>
                    <div className={styles.rating_wrapper}>
                      {[...Array(rate)].map((_, index) => (
                        <Image
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
                <p className={styles.contentP}>{comment}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(CustomerRating);
