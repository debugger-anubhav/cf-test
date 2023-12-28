import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import {FaInfoCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";

const PostCityshield = () => {
  const router = useRouter();
  return (
    <div className={commonStyles.main_container}>
      <BreadCrumbsCommon currentPage={"Citysheild"} />
      <div>
        <FaInfoCircle className={styles.icon} />
        <p className={commonStyles.head}>
          Looks like City Shield is already active for your order.
        </p>
        <p className={styles.desc}>
          If you have any confusion or want more assistance, you can contact us
          at{" "}
          <a
            className={styles.tele}
            href={`tel:080-66084700`}
            target="_self"
            rel="noopener  noreferrer"
            aria-label="080-66084700">
            080-66084700
          </a>
        </p>
        <button
          onClick={() => router.push("/cityfurnish")}
          className={styles.btn}>
          Return to home page
        </button>
      </div>
    </div>
  );
};

export default PostCityshield;
