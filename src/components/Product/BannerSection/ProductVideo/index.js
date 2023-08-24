import React, {useEffect} from "react";
import styles from "./style.module.css";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {getProductVideos} from "@/store/Slices";
import {useDispatch, useSelector} from "react-redux";

const ProductVideo = ({params}) => {
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData.productVideos);

  // const videoRef = useRef(null);

  // const handlePlayButtonClick = () => {
  //   if (videoRef.current) {
  //     videoRef.current.play();
  //   }
  // };

  const getVideos = () => {
    axios
      .get(baseURL + endPoints.productPage.productVideos(params.productId))
      .then(res => {
        dispatch(getProductVideos(res?.data?.data));
        console.log(res, "banner video");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  if (pageData.length > 0) {
    return (
      <div className={styles.main_container}>
        <div className={styles.video}>
          <iframe
            className={styles.video}
            // src="https://www.youtube.com/embed/KAc3AEpQNSs?list=PLRheCL1cXHrtUJKNwE4Ksn6JEpOx5W_ye"
            src={pageData?.[0]?.video_name}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>

          {/* <div
          className={styles.play_button_container}
          onClick={() => handlePlayButtonClick()}></div> */}
        </div>
        <div>
          <p className={styles.head}>{pageData?.[0]?.file_title}</p>
          <p className={styles.desc}>{pageData?.[0]?.file_description}</p>
        </div>
      </div>
    );
  }
};

export default ProductVideo;
