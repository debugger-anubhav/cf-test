import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { GoogleIcon, RatingStar, EditIcon } from "@/assets/icon";
import Image from "next/image";
import { HomePageImages } from "@/assets/images";
import { endPoints } from "@/network/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { addGoogleReviews } from "@/store/Slices";
import { useQuery } from "@/hooks/useQuery";
import Rating from "react-rating";
import { BsFillStarFill } from "react-icons/bs";

// h2 h3 h3 h3 p

const CustomerRating = () => {
  const sectionHeading = "See what people are saying";
  const subhead = "from 1968 customers";
  const btntxt = "Write a review";

  const cityId = localStorage.getItem("city-Seleted");

  const { refetch: getGoogleReviews } = useQuery(
    "google-reviews",
    endPoints.googleReviews,
    `?cityId=${cityId}`,
  );

  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state.homePagedata);

  const [googleReviews, setGooglereviews] = useState([]);

  useEffect(() => {
    getGoogleReviews()
      .then(res => {
        setGooglereviews(res?.data?.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    gooeleReviewData();
  }, [googleReviews]);


  const gooeleReviewData = () => {
    dispatch(addGoogleReviews(googleReviews));
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.head}>{sectionHeading}</h2>
        <div className={styles.upper_div}>
          <h3 className={styles.rating_div}>
            4.4
            <span className={styles.star}>
              <RatingStar color={"#FFCB45"} size={24} />
            </span>
            rating
          </h3>
          <Image
            src={HomePageImages.editIcon}
            alt="editIcon"
            className={styles.editIcon}
          />
          <div className={styles.editBtn}>
            <EditIcon size={25} />
            <p className="text-[#222] font-medium">{btntxt}</p>
          </div>
        </div>
        <h3 className={styles.subhead}>{subhead}</h3>
      </div>

      <div className={styles.card_wrapper}>
        {reviews?.map((item, index) => (
          // {CustomerRatingsCard.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.row}>
              <div className="flex">
                <Image
                  src={`https://d3juy0zp6vqec8.cloudfront.net/images/google_review/${item.user_image}`}
                  width={12}
                  height={48}
                  alt=""
                  className={styles.img}
                />
                <div className="ml-3 mr-7">
                  <h3 className={styles.name}>{item.user_name}</h3>
                  <div className="flex gap-2">
                    {/* {[{}, {}, {}, {}, {}].map((item, index) => ( */}
                    {/* <div key={index}> */}
                    {/* <RatingStar size={16} color={"#FFCB45"} /> */}
                    <Rating
                      stop={5}
                      emptySymbol={
                        <BsFillStarFill
                          size={16}
                          color={"#fff"}
                          className="mr-1"
                        />
                      }
                      fullSymbol={
                        <BsFillStarFill
                          size={16}
                          color={"#FFCB45"}
                          className="mr-1"
                        />
                      }
                      initialRating={
                        item.fc_google_location_data[0]?.average_review
                      }
                      readonly
                    />
                    {/* </div>
                    ))} */}
                  </div>
                </div>
              </div>
              <GoogleIcon color={"#5391F7"} size={30} />
            </div>

            <div className={styles.content}>
              <p className={styles.contentP}>{item.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRating;
