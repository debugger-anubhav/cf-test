import React from "react";
import styles from "./style.module.css";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";
import {AnnexureData, Data, Points} from "../Data";

function MainSection() {
  const Heading = "Rental Agreement";
  const Subheading =
    'This Subscription Agreement ("Agreement") is made and deemed executed on the date _____________ ("Subscription Date")by the Company at _____________ ("City").';
  return (
    <div className={styles.wrapper}>
      <BreadCrumbsCommon currentPage={"Rental Agreement"} />
      <div className={styles.main_heading}>{Heading}</div>
      <div className={styles.detail}>{Subheading}</div>

      <div>
        {Data?.map((item, index) => {
          return (
            <div className={styles.data_box} key={index.toString()}>
              <p className={styles.heading}>{item.heading}</p>
              <p className={styles.detail}>{item.decription}</p>
              {index === Data.length - 1 && (
                <>
                  <p className={`${styles.detail} !mt-4`}>{item.lastDesc}</p>
                  <p className={`${styles.special_subheading} !mt-4`}>
                    {item.sepcialHeading}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div>
        {Points?.map((item, index) => {
          return (
            <div className={styles.data_box} key={index.toString()}>
              <p className={styles.heading}>{item.heading}</p>
              {index === 0 && (
                <p className={styles.special_subheading}>
                  In this Agreement, unless the context otherwise requires, the
                  following capitalized words and expressions shall bear the
                  meaning ascribed to them here-in-below:
                </p>
              )}
              {index === 9 && (
                <>
                  <p className={styles.special_subheading}>
                    {item?.specialHeading1}
                  </p>
                  <li className={styles.detail}>{item?.specialPoint}</li>
                  <p className={styles.special_subheading}>
                    {item?.specialHeading2}
                  </p>
                </>
              )}
              <div className={styles.detail}>
                {item.pointList?.map((point, i) => {
                  const words = point.split(" ");

                  return (
                    <div key={i.toString()} className={styles.list_point}>
                      <div className={` mt-2`}>
                        <p className={styles.dot}></p>
                      </div>
                      {index === 20 ? (
                        <p className="ml-3">
                          <span
                            className={` ${
                              words[0] !== "The"
                                ? "text-45454A font-medium"
                                : "font-normal text-71717A"
                            }`}>
                            {words[0]}
                          </span>{" "}
                          {words.slice(1).join(" ")}
                        </p>
                      ) : (
                        <p className="ml-3">{point}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {AnnexureData?.map((item, index) => {
          return (
            <div key={index.toString()}>
              <p className={styles.heading}>{item.heading}</p>
              <p className={styles.special_subheading}>{item.subheading}</p>
              <div className="mt-4">
                {item.points?.map((point, i) => {
                  return (
                    <p key={i.toString()} className={styles.list_point}>
                      <span className="mr-2">{i + 1}.</span>
                      {point}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainSection;
