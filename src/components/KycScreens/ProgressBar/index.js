import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import {useSelector} from "react-redux";
import dashboardStyles from "../Dashboard/styles.module.css";
// import {useDispatch} from "react-redux";
// import {setKycScreenName} from "@/store/Slices";

export default function ProgressSection() {
  const kycScreen = useSelector(state => state.kycPage);

  const progressNumber = kycScreen?.progressPercent;

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (progress === 100) {
  //     dispatch(setKycScreenName("congratulation"));
  //   }
  // }, []);
  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{width: `${progressNumber}%`}}></div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            {progressNumber}% KYC done
            <span>
              <Image
                loader={({src}) => src}
                src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                alt="paty_icon"
                className="ml-2 inline-block"
                loading="lazy"
                width={18}
                height={18}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="sm:w-[240px] w-[200px] hidden md:flex">
        <div className={dashboardStyles.progressBarContainer}>
          <div
            className={`${dashboardStyles.progressBar} ${
              progressNumber === 100 ? "rounded-xl" : "rounded-l-xl"
            }`}
            style={{width: `${progressNumber}%`}}>
            <div className={dashboardStyles.new_progress_bar_text}>
              {progressNumber}% KYC done
              <span>
                <Image
                  loader={({src}) => src}
                  src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                  alt="paty_icon"
                  className="ml-2 inline-block"
                  loading="lazy"
                  width={18}
                  height={18}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
