import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";

const RentNowCard = ({cardImage, url, alt}) => {
  const router = useRouter();
  const [URL, setURL] = useState();

  const cityName = useSelector(state => state.homePagedata.cityName);
  const imageAlt = alt.replace(/\.webp$/, "");

  useEffect(() => {
    if (url.includes("[city]")) {
      setURL(
        url.replace(/\[city\]/g, cityName.replace(/\//g, "-").toLowerCase()),
      );
      // router.push(url); // Navigate to the URL
    } else {
      setURL(url); // Navigate to the URL
    }
  }, []);

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        router.push(URL);
      }}>
      <a
        href={URL}
        onClick={e => e.preventDefault()}
        aria-label={imageAlt}
        target="_self"
        rel="noopener">
        <img
          src={cardImage}
          className={styles?.banner_img}
          alt={imageAlt}
          loading="lazy"
        />
      </a>
    </div>
  );
};

export default RentNowCard;
