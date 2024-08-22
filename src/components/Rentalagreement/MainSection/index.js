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
      <h1 className={`${styles.main_heading} !tracking-[-0.48px]`}>
        {Heading}
      </h1>
      <div className={styles.detail}>{Subheading}</div>

      <div>
        {Data?.map((item, index) => {
          return (
            <div className={styles.data_box} key={index.toString()}>
              <p className={styles.heading}>{item.heading}</p>
              <p className={styles.detail}>
                {item.heading === "And" ? (
                  <span>
                    {item.decription1}
                    {item.decription2}
                  </span>
                ) : (
                  item.decription
                )}
              </p>

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
              <h2 className={styles.heading}>{item.heading}</h2>
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
                          <span className={styles.speacial_heading}>
                            {i === 4
                              ? "Governing Law and Jurisdiction"
                              : i === 6
                                ? "Entire Agreement:"
                                : i !== 7
                                  ? words[0]
                                  : ""}
                          </span>{" "}
                          {words.slice(1).join(" ")}
                        </p>
                      ) : (
                        <p className={styles.points_wrraper}>{point}</p>
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
              <h2 className={styles.heading}>{item.heading}</h2>
              <p className={styles.special_subheading}>{item.subheading}</p>
              <div className="mt-4">
                {item.points?.map((point, i) => {
                  return (
                    <p key={i.toString()} className={styles.list_point}>
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
