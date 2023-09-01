import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Image from "next/image";
import {FooterIcons} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {getLocalStorage} from "@/constants/constant";

const Footer = ({params}) => {
  const currentYear = new Date().getFullYear();
  const text = `© Copyright ${currentYear} Cityfurnish. All Rights Reserved.`;
  const str = string.common_components.Footer;

  const [content, setContent] = useState([]);

  // const homePageReduxData = useSelector(state => state.homePagedata);
  // const cityIdStr = localStorage
  //   .getItem("cityId")
  //   ?.toString()
  //   ?.replace(/"/g, "");

  let cityIdStr;
  if (typeof window !== "undefined") {
    cityIdStr = getLocalStorage("cityId");
  }

  const cityId = parseFloat(cityIdStr);

  const {refetch: getcategoryContent} = useQuery(
    "category-content",
    endPoints.categoryContent,
    `?cityId=${cityId}&categoryId=27`,
  );

  useEffect(() => {
    if (params === "category") {
      getcategoryContent()
        .then(res => {
          setContent(res?.data?.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className={styles.footer_wrapper}>
      {content.map((str, index) => {
        return (
          <>
            <h2 className={styles.head}>{str.cat_heading}</h2>
            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{__html: str.cat_desc}}
            />
          </>
        );
      })}

      <div className={styles.pointers_div}>
        {str.array.map((item, index) => (
          <div key={index.toString()} className={styles.head_wrapper}>
            <h2 className={`!text-[#222] ${styles.head}`}>{item.head}</h2>
            <div className={styles.points_div}>
              {item.points.map((t, i) => (
                <p
                  key={i.toString()}
                  className={styles.points}
                  onClick={() => console.log("clicked")}>
                  {t?.text}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.need_help_box}>
          <h2 className={`!text-[#222] ${styles.head}`}>Need Help</h2>
          <div className={styles.contact_div}>
            <Image
              className={styles.phoneImg}
              alt="phone-icon"
              src={FooterIcons.Phone}
            />
            <div>
              <p className={styles.contact}>{str.contact}</p>
              <p className={styles.time}>{str.time}</p>
            </div>
          </div>
          <div className={styles.social_media_icons_div}>
            {FooterIcons.social_media_icons.map((item, index) => (
              <img
                key={index.toString()}
                alt={item?.icon}
                src={item?.icon}
                onClick={() => console.log("cliked")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.line}></div>

      <div className="xl:hidden">
        <div className={styles.contact_div}>
          <Image
            className={styles.phoneImg}
            alt="phone-icon"
            src={FooterIcons.Phone}
          />
          <div>
            <p className={styles.contact}>{str.contact}</p>
            <p className={styles.time}>{str.time}</p>
          </div>
        </div>

        <div className={styles.social_media_icons_div}>
          {FooterIcons?.social_media_icons?.map((item, index) => (
            <img
              key={index.toString()}
              alt={item?.icon}
              src={item?.icon}
              onClick={() => console.log("cliked")}
            />
          ))}
        </div>
      </div>

      <div className={styles.copyRight_div}>
        <p className={styles.copyTxt}>{text}</p>
        <div
          className={styles.goToTopDiv}
          onClick={() =>
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
          }>
          <Image
            src={FooterIcons.GoToTopIcon}
            alt="go-to-top-icon"
            className={styles.goToTopIcon}
          />
          <p className={styles.goToTopTxt}>{str.go_to_top}</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
