import React, {useRef} from "react";
import styles from "./style.module.css";
// import bg from "../bgBanner.svg";

const BannerFour = () => {
  const videoRef = useRef(null);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.video}>
        <video className={styles.video_player} ref={videoRef}>
          <source src="" type="video/mp4" />
          {/* Add more <source> elements for different video formats (WebM, Ogg, etc.) */}
          Your browser does not support the video tag.
        </video>
        <div
          className={styles.play_button_container}
          onClick={() => handlePlayButtonClick()}></div>
      </div>
      <div>
        <p className={styles.head}>Lorem ipsum dolor sit amet consectetur.</p>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur. Commodo feugiat vehicula
          parturient tempus lobortis elit faucibus at. Ac justo facilisi varius
          tristique sit sed mauris diam vitae. Lorem ipsum dolor sit amet
          consectetur. Commodo feugiat vehicula parturient tempus lobortis elit
          faucibus at. Ac justo facilisi varius tristique sit sed mauris diam
          vitae.Lorem ipsum dolor sit amet consectetur. Commodo feugiat vehicula
          parturient tempus lobortis elit faucibus at. Ac justo facilisi varius
          tristique sit sed mauris diam vitae.
        </p>
      </div>
    </div>
  );
};

export default BannerFour;
