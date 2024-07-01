import React from "react";
import styles from "./style.module.css";
import {ArrowForw} from "@/assets/icon";
import Link from "next/link";
// import {useRouter} from "next/navigation"; // Correct import statement

const NotFoundComponent = () => {
  // const router = useRouter();

  const handleRedirect = () => {
    // router.push("/");
  };

  return (
    <div className="relative">
      <div className="absolute top-234 left-122 gap-8 opacity-0 xl:w-[1191px] xl:h-[464px] xl:gap-32 xl:opacity-100 sm:w-[298px] sm:h-[322.57px] sm:top-176 sm:left-31 sm:gap-4 sm:opacity-100">
        <div className={styles.main_wrapper}>
          <div className={styles.notfound_img_wrapper} onClick={handleRedirect}>
            <img
              className={styles.img}
              src={`https://d3juy0zp6vqec8.cloudfront.net/images/404.webp`} // Make sure categoryIconsUrl ends with a slash if necessary
              loading="lazy"
              alt="Page-Not-Found"
            />
          </div>
          <div
            className={styles.notfound_text_wrapper}
            onClick={handleRedirect}>
            <p className={styles.head}>Oops... nothing to see here.</p>
            <p className={styles.desc}>404 page not found</p>
          </div>
          <Link href={`/`} target="_self" rel="noreferrer">
            <button className={styles.btn} onClick={handleRedirect}>
              <p className={styles.bold_text}>Start renting </p>
              <ArrowForw size={19} color={"#222"} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundComponent;
