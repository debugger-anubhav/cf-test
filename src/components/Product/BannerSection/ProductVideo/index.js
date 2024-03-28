import React, {useEffect} from "react";
import styles from "./style.module.css";
import {endPoints} from "@/network/endPoints";
import {getProductVideos} from "@/store/Slices";
import {useDispatch, useSelector} from "react-redux";
import {baseInstance} from "@/network/axios";

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
    baseInstance
      .get(endPoints.productPage.productVideos(params.productId))
      .then(res => {
        dispatch(getProductVideos(res?.data?.data));
      })
      .catch(err => {
        console.log(err?.message || "some error");
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
            src={pageData?.[0]?.video_name}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
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
