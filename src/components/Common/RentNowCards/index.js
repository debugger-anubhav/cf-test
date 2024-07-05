import React, {memo, useEffect, useState} from "react";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import Image from "@/components/Image";
import Link from "next/link";

const RentNowCard = ({cardImage, url, alt}) => {
  const [URL, setURL] = useState();

  const cityName = useSelector(state => state.homePagedata.cityName);
  const imageAlt = alt.replace(/\.webp$/, "");

  useEffect(() => {
    if (url) {
      if (url.includes("[city]")) {
        setURL(
          url.replace(/\[city\]/g, cityName.replace(/\//g, "-")?.toLowerCase()),
        );
      } else {
        setURL(url);
      }
    }
  }, [url]);

  return (
    <div className={styles.wrapper}>
      <Link
        href={URL ?? ""}
        aria-label={imageAlt}
        target="_self"
        rel="noopener">
        <Image
          loader={({src}) => src}
          width={270}
          height={380}
          src={cardImage}
          className={styles?.banner_img}
          alt={imageAlt}
        />
      </Link>
    </div>
  );
};

export default memo(RentNowCard);
