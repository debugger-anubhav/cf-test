import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {FooterIcons} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {useSelector} from "react-redux";
import {setLocalStorage} from "@/constants/constant";

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
        {text: "All", link: "https://cityfurnish.com/bangalore/rent"},
        {text: "Home Furniture", link: `/${cityName}/home-furniture-rental`},
        {text: "Appliances", link: `/${cityName}/home-appliances-rental`},
        {text: "Workstations", link: `/${cityName}/workstations`},
        {text: "Combos", link: `/${cityName}/furniture-rental-packages`},
        {text: "Furniture Sale", link: "https://zior.in/"},
        // "points": [
        //   {"text": "All", "link": "https://cityfurnish.com/bangalore/rent"},
        //   {"text": "Categories", "link":`/`},
        //   {"text": "Home Furniture", "link": `${cityName}/home-furniture-rental`},
        //   {"text": "Appliances", "link": `${cityName}/home-appliances-rental`},
        //   {"text": "Workstations", "link": `${cityName}/workstations`},
        //   {"text": "Combos", "link": `${cityName}/furniture-rental-packages`},
        //   {"text": "Furniture Sale", "link": "https://zior.in/"}
      ],
    },
    {
      head: "Cityfurnish",
      points: [
        {text: "About US", link: "https://cityfurnish.com/pages/about"},
        {
          text: "Refer a Friend",
          link: "https://cityfurnish.com/pages/refer-a-friend",
        },
        {text: "Career", link: "https://cityfurnish.com/pages/careers"},
        {
          text: "Contact US",
          link: "https://cityfurnish.com/pages/contact-us",
        },
      ],
    },

    {
      head: "Information",
      points: [
        {text: "Blog", link: "https://cityfurnish.com/blog/"},
        {text: "FAQ", link: "https://cityfurnish.com/pages/faq"},
        {
          text: "Sample Rental Agreement",
          link: "https://cityfurnish.com/pages/rentalagreement",
        },
        {text: "Offers", link: "https://cityfurnish.com/pages/offers"},
      ],
    },

    {
      head: "Resources",
      points: [
        {
          text: "Privacy Policy",
          link: "https://cityfurnish.com/pages/privacy-policy",
        },
        {
          text: "Terms & Conditions",
          link: "https://cityfurnish.com/pages/terms-of-use",
        },
      ],
    },
  ];
  const [points, setPoints] = useState(array);

  const [content, setContent] = useState([]);
  const cityIdStr = localStorage
    .getItem("cityId")
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
                  target="_blank"
                  rel="noopener noreferrer">
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
              className={styles.phoneImg}
              alt="phone-icon"
              src={FooterIcons.Phone}
            />
            <div>
              <p className={styles.contact}>{str.contact}</p>
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
                console.log("item.link")}}
              />
            ))}
          </div> */}
          <div className={styles.social_media_icons_div}>
            {FooterIcons?.social_media_icons?.map((item, index) => (
              <a
                key={index.toString()}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer">
                <img
                  alt={item?.icon}
                  src={item?.icon}
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
            <a
              key={index.toString()}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer">
              <img
                alt={item?.icon}
                src={item?.icon}
                onClick={() => console.log("item.link")}
              />
            </a>
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
