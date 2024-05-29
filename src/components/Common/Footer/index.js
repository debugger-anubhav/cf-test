import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {FooterIcons} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {useSelector} from "react-redux";
import {getLocalStorageString, setLocalStorage} from "@/constants/constant";

import {Skeleton} from "@mui/material";
import {useAuthentication} from "@/hooks/checkAuthentication";

const Footer = ({params}) => {
  const {checkAuthentication} = useAuthentication();
  const cityName = useSelector(state => state.homePagedata.cityName);
  const reduxLoginState = useSelector(state => state.homePagedata.isLogin);
  const currentYear = new Date().getFullYear();
  const text = `© Copyright ${currentYear} Cityfurnish. All Rights Reserved.`;
  const str = {
    why_furni: "Furniture Rental: An Affordable and Flexible Option",
    why_furni_desc:
      "Are you looking for a cost-effective and flexible way to furnish your home or office? Furniture rental may be the solution you've been searching for. CityFurnish, a leading furniture rental company, offers a wide range of home and office furniture for rent online, through their user-friendly furniture rental app.",
    contact: "080-66084700",
    time: "(09AM to 09PM)",
    go_to_top: "Go to top",
  };

  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    setIsLogin(reduxLoginState);
  }, [reduxLoginState]);

  const handleAuthentication = async () => {
    const isAuth = await checkAuthentication();
    setIsLogin(isAuth);
  };

  useEffect(() => {
    handleAuthentication();
  }, [isLogin]);

  const array = [
    {
      head: "Categories",
      points: [
        {
          text: "All",
          link: `/${cityName.replace(/\//g, "-")?.toLowerCase()}/rent`,
        },
        {
          text: "Home Furniture",
          link: `/${cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-furniture-rental`,
        },
        {
          text: "Appliances",
          link: `/${cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-appliances-rental`,
        },
        {
          text: "Workstations",
          link: `/${cityName.replace(/\//g, "-")?.toLowerCase()}/workstations`,
        },
        {
          text: "Combos",
          link: `/${cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/rental-packages`,
        },
        {
          text: "Discount Deals",
          link: `/${cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/discount-deals`,
        },
        {text: "Furniture Sale", link: "https://zior.in/"},
      ],
    },
    {
      head: "Cityfurnish",
      points: [
        {text: "About US", link: "/pages/about"},
        {
          text: "Refer a Friend",
          link: isLogin ? "/referral" : "/pages/refer-a-friend",
        },
        {text: "Career", link: "/pages/careers"},
        {
          text: "Contact US",
          link: "/pages/contact-us",
        },
      ],
    },

    {
      head: "Information",
      points: [
        {text: "Blog", link: "https://cityfurnish.com/blog/"},
        {text: "FAQ", link: "/pages/faq"},
        {
          text: "Sample Rental Agreement",
          link: "/pages/rentalagreement",
        },
        {text: "Offers", link: "/pages/offers"},
        {text: "Benefits", link: "/pages/benefits"},
      ],
    },

    {
      head: "Resources",
      points: [
        {
          text: "Privacy Policy",
          link: "/pages/privacy-policy",
        },
        {
          text: "Terms & Conditions",
          link: "/pages/terms-of-use",
        },
      ],
    },
  ];
  const [points, setPoints] = useState(array);

  const [content, setContent] = useState([]);
  const cityIdStr = getLocalStorageString("cityId")
    ?.toString()
    ?.replace(/"/g, "");
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
        .catch(err => console.log(err?.message || "some error"));
    }
  }, []);

  useEffect(() => {
    setPoints(array);
  }, [cityName]);

  return (
    <div className={styles.footer_wrapper}>
      {content.map((str, index) => {
        return (
          <div key={index.toString()}>
            <h2 className={styles.head}>{str.cat_heading}</h2>
            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{__html: str.cat_desc}}
            />
          </div>
        );
      })}

      <div className={styles.pointers_div}>
        {points?.map((item, index) => (
          <div key={index.toString()} className={styles.head_wrapper}>
            <h2 className={`!text-[#222] ${styles.head}`}>{item.head}</h2>
            <div className={styles.points_div}>
              {item?.points?.map((t, i) => (
                <a
                  key={index.toString()}
                  href={
                    t.text === "Refer a Friend"
                      ? isLogin
                        ? "/referral"
                        : "/pages/refer-a-friend"
                      : t.link
                  }
                  aria-label={t.text}
                  target={
                    t.text === "Furniture Sale" || t.text === "Blog"
                      ? "_blank"
                      : "_self"
                  }
                  rel="noopener  noreferrer">
                  <p
                    className={styles.points}
                    onClick={() => {
                      if (t?.text === "Workstations") {
                        setLocalStorage("subCategory", "Workstations");
                      } else {
                        setLocalStorage("subCategory", "All");
                      }
                    }}>
                    {t?.text}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.need_help_box}>
          <h2 className={`!text-[#222] ${styles.head}`}>Need Help</h2>
          <div className={styles.contact_div}>
            <Image
              loader={({src}) => src}
              className={`${styles.phoneImg} pointer-events-none`}
              alt="phone-icon"
              src={FooterIcons.Phone}
              loading="lazy"
            />
            <div>
              <p className={styles.contact}>
                {" "}
                <a
                  href={`tel:${str.contact}`}
                  target="_self"
                  rel="noopener  noreferrer">
                  {str.contact}
                </a>
              </p>
              <p className={styles.time}>{str.time}</p>
            </div>
          </div>
          <div className={styles.social_media_icons_div}>
            {FooterIcons?.social_media_icons?.map((item, index) => (
              <a
                key={index.toString()}
                href={item.link}
                target="_blank"
                rel="noopener  noreferrer"
                aria-label={item?.icon}>
                <img
                  alt={item?.icon}
                  src={item?.icon}
                  className="pointer-events-none"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.line}></div>
      <div className="xl:hidden">
        <div className={styles.contact_div}>
          <Image
            loader={({src}) => src}
            className={`${styles.phoneImg} pointer-events-none`}
            alt="phone-icon"
            src={FooterIcons.Phone}
            loading="lazy"
          />
          <div>
            <p className={styles.contact}>
              <a
                href={`tel:${str.contact}`}
                target="_self"
                rel="noopener  noreferrer">
                {str.contact}
              </a>
            </p>
            <p className={styles.time}>{str.time}</p>
          </div>
        </div>

        <div className={styles.social_media_icons_div}>
          {FooterIcons?.social_media_icons?.map((item, index) => (
            <a
              key={index.toString()}
              href={item.link}
              target="_blank"
              rel="noopener  noreferrer"
              aria-label={item?.icon}>
              <img
                alt={item?.icon}
                src={item?.icon}
                loading="lazy"
                className="pointer-events-none"
              />
            </a>
          ))}
        </div>
      </div>

      <div className={styles.copyRight_div}>
        <p className={styles.copyTxt}>{text}</p>
        <div
          className={styles.goToTopDiv}
          onClick={e => {
            e.preventDefault();
            window.scrollTo({top: 0, left: 0, behavior: "smooth"});
          }}>
          <Image
            loader={({src}) => src}
            src={
              "https://d3juy0zp6vqec8.cloudfront.net/images/icons/go-to-top.svg"
            }
            alt="go-to-top-icon"
            className={`${styles.goToTopIcon} pointer-events-none`}
            loading="lazy"
            width={20}
            height={20}
          />
          <p className={styles.goToTopTxt}>{str.go_to_top}</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;

export const FooterSkeleton = () => {
  return (
    <div className={styles.footer_wrapper_skeleton}>
      <div className={styles.skeleton_div_wrapper}>
        {[1, 2, 3, 4, 5, 6].map(item => {
          return (
            <div className={styles.pointers_div_skeleton} key={item.toString()}>
              <div className={styles.head_wrapper_skeleton}>
                <Skeleton variant="text" className={styles.full_width_height} />
              </div>
              {[1, 2, 3, 4]?.map(item => {
                return (
                  <div className={styles.points_skeleton} key={item.toString()}>
                    <Skeleton
                      variant="text"
                      className={styles.full_width_height}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className={styles.line}></div>

      <div className={styles.copyRight_div_skeleton}>
        <div className={styles.copyright_skeleton}>
          <Skeleton variant="text" className={styles.full_width_height} />
        </div>
        <div className={styles.goToTopDiv}>
          <Skeleton variant="circular" width={25} height={25} />
          <Skeleton variant="text" width={50} height={10} />
        </div>
      </div>
    </div>
  );
};
