import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {FooterIcons} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {useSelector} from "react-redux";
import {getLocalStorageString, setLocalStorage} from "@/constants/constant";

const Footer = ({params}) => {
  const cityName = useSelector(state => state.homePagedata.cityName);
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

  const array = [
    {
      head: "Categories",
      points: [
        {text: "All", link: `/${cityName.toLowerCase()}/rent`},
        {
          text: "Home Furniture",
          link: `/${cityName.toLowerCase()}/home-furniture-rental`,
        },
        {
          text: "Appliances",
          link: `/${cityName.toLowerCase()}/home-appliances-rental`,
        },
        {text: "Workstations", link: `/${cityName.toLowerCase()}/workstations`},
        {
          text: "Combos",
          link: `/${cityName.toLowerCase()}/furniture-rental-packages`,
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
          link: "https://test.rentofurniture.com/pages/refer-a-friend",
        },
        {text: "Career", link: "https://test.rentofurniture.com/pages/careers"},
        {
          text: "Contact US",
          link: "https://test.rentofurniture.com/pages/contact-us",
        },
      ],
    },

    {
      head: "Information",
      points: [
        {text: "Blog", link: "https://test.rentofurniture.com/blog/"},
        {text: "FAQ", link: "https://test.rentofurniture.com/pages/faq"},
        {
          text: "Sample Rental Agreement",
          link: "https://test.rentofurniture.com/pages/rentalagreement",
        },
        {text: "Offers", link: "https://test.rentofurniture.com/pages/offers"},
      ],
    },

    {
      head: "Resources",
      points: [
        {
          text: "Privacy Policy",
          link: "https://test.rentofurniture.com/pages/privacy-policy",
        },
        {
          text: "Terms & Conditions",
          link: "https://test.rentofurniture.com/pages/terms-of-use",
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
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    setPoints(array);
  }, [cityName]);

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
        {points?.map((item, index) => (
          <div key={index.toString()} className={styles.head_wrapper}>
            <h2 className={`!text-[#222] ${styles.head}`}>{item.head}</h2>
            <div className={styles.points_div}>
              {item.points.map((t, i) => (
                <a
                  key={index.toString()}
                  href={t.link}
                  aria-label={t.text}
                  target={t.text === "Furniture Sale" ? "_blank" : "_self"}
                  rel="noopener  noreferrer">
                  <p
                    className={styles.points}
                    onClick={() => {
                      if (t?.text === "Workstations") {
                        setLocalStorage("subCategory", "Workstations");
                      } else {
                        setLocalStorage("subCategory", "All");
                      }
                      // router.push(t?.link);
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
              className={`${styles.phoneImg} pointer-events-none`}
              alt="phone-icon"
              src={FooterIcons.Phone}
            />
            <div>
              <p className={styles.contact}>
                {" "}
                <a
                  href={`tel:${str.contact}`}
                  target="_blank"
                  rel="noopener  noreferrer">
                  {str.contact}
                </a>
              </p>
              <p className={styles.time}>{str.time}</p>
            </div>
          </div>
          {/* <div className={styles.social_media_icons_div}>
            {FooterIcons?.social_media_icons?.map((item, index) => (
              <img
                key={index.toString()}
                alt={item?.icon}
                src={item?.icon}
                onClick={() =>{ router.push(item.link)
              />
            ))}
          </div> */}
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
                  onClick={() => console.log("item.link")}
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
            className={`${styles.phoneImg} pointer-events-none`}
            alt="phone-icon"
            src={FooterIcons.Phone}
          />
          <div>
            <p className={styles.contact}>
              <a
                href={`tel:${str.contact}`}
                target="_blank"
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
            src={FooterIcons.GoToTopIcon}
            alt="go-to-top-icon"
            className={`${styles.goToTopIcon} pointer-events-none`}
          />
          <p className={styles.goToTopTxt}>{str.go_to_top}</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
