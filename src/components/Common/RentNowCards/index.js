import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import Image from "next/image";

const RentNowCard = ({cardImage, url, alt}) => {
  const router = useRouter();
  const [URL, setURL] = useState();

  const cityName = useSelector(state => state.homePagedata.cityName);
  const imageAlt = alt.replace(/\.webp$/, "");

  useEffect(() => {
    if (url.includes("[city]")) {
      setURL(
        url.replace(/\[city\]/g, cityName.replace(/\//g, "-")?.toLowerCase()),
      );
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
      <a href={URL} aria-label={imageAlt} target="_self" rel="noopener">
        <Image
          loader={({src}) => src}
          width={270}
          height={380}
          src={cardImage}
          className={styles?.banner_img}
          alt={imageAlt}
        />
      </a>
    </div>
  );
};

export default RentNowCard;
