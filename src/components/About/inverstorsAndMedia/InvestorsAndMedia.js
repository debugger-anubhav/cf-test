import React from "react";
import styles from "./style.module.css";
import {AboutUs} from "@/assets/images";
import {TbExternalLink} from "react-icons/tb";
const investor = [
  {link: `${AboutUs}/venture-highway.webp`, altText: "Venture Highway"},
  {link: `${AboutUs}/y-combinator.webp`, altText: "Y Combinator"},
  {link: `${AboutUs}/gfc.webp`, altText: "Global Founders Capital"},
  {link: `${AboutUs}/soma-capital.webp`, altText: "Soma Capital"},
  {link: `${AboutUs}/scm-advisors.webp`, altText: "SCM Advisors"},
];

const Media = [
  {
    link: `${AboutUs}/zee-business.webp`,
    altText: "zee business",
    navigation:
      "https://www.zeebiz.com/agencies/furniture-rental-startup-cityfurnish-raises-25-million-in-debt-funds-225153",
  },
  {
    link: `${AboutUs}/business-standard.webp`,
    altText: "business standard",
    navigation:
      "https://www.business-standard.com/content/press-releases-ani/cityfurnish-launches-its-furniture-subscription-service-citymax-121112600397_1.html",
  },
  {
    link: `${AboutUs}/techstory.webp`,
    altText: "Techstory coverage",
    navigation: "https://techstory.in/cityfurnish-acquires-funding-24122015/",
  },
  {
    link: `${AboutUs}/vccircle.webp`,
    altText: "VCcircle coverage",
    navigation:
      "https://www.vccircle.com/exclusive-citrus-pays-gupta-backs-furniture-rental-venture-cityfurnish",
  },
  {
    link: `${AboutUs}/the-economict-times-wealth.webp`,
    altText: "economic-wealth",
    navigation:
      "https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/cityfurnish-gets-5-million-from-youtube-founder-others/articleshow/69684428.cms",
  },
  {
    link: `${AboutUs}/businessline.webp`,
    altText: "thehindu-businessline",
    navigation:
      "https://www.thehindubusinessline.com/companies/furniture-rental-firm-cityfurnish-scouting-for-4-m/article9876274.ece",
  },
  {
    link: `${AboutUs}/business-today.webp`,
    altText: "business-today",
    navigation:
      "https://www.businesstoday.in/magazine/the-buzz/story/cityfurnish-easy-and-affordable-furniture-rental-106225-2018-05-28",
  },
  {
    link: `${AboutUs}/yourstory.webp`,
    altText: "your story coverage for furniture rental",
    navigation: "https://yourstory.com/2016/02/cityfurnish",
  },
];

const InverstorAndMedia = () => {
  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Our Investors & Advisors</h2>
      <div className="mr-4 md:mr-6 xl:mr-0 mb-8 lg:mb-[88px]">
        {/* <div className={styles.investors_wrapper}>
          {investor.map((ele, index) => {
            return (
              <div className={styles.investor_container} key={index.toString()}>
                <img
                  className="object-cover"
                  src={ele.link}
                  alt={ele.altText}
                />
              </div>
            );
          })}
        </div> */}
        <InvestorsCards />
      </div>
      <h2 className={styles.heading}>Media also loves us</h2>
      <div className="mr-4 md:mr-6 xl:mr-0 mb-8 lg:mb-[88px]">
        {/* <div className={`${styles.investors_wrapper} xl:flex-wrap`}>
          {Media.map((ele, index) => {
            return (
              // <a
              //    href={ele.navigation}
              //   className={`${styles.investor_container} relative`}
              //   key={index.toString()}
              //   rel="noopener"
              //   target="_blank">
              //   <img className="object-fit" src={ele.link} alt={ele.altText} />
              //   <div
              //     className="absolute left-[5px] bottom-[5px] w-[16px] text-[#7A7A71]">
              //     <TbExternalLink />
              //   </div>
              // </a>
              <Card  />
            );
          })}
        </div> */}
        <MediaCard />
      </div>
    </div>
  );
};

const MediaCard = () => {
  const refElement = React.useRef(null);
  const [isDumy, setIsDumy] = React.useState(false);

  const handleScrolling = () => {
    const slider = refElement.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsDragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    slider.addEventListener("mousemove", toggleIsDragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsDragging);
    };
  };

  return (
    <div
      className={`${styles.investors_wrapper} xl:flex-wrap`}
      ref={refElement}
      onMouseOver={() => {
        handleScrolling();
      }}>
      {Media.map((ele, index) => {
        return (
          <a
            href={ele.navigation}
            className={`${styles.investor_container} relative ${
              isDumy && "pointer-events-none"
            }`}
            key={index.toString()}
            rel="noopener noreferrer"
            target="_blank">
            <img className="object-fit" src={ele.link} alt={ele.altText} />
            <div className="absolute left-[5px] bottom-[5px] w-[16px] text-[#7A7A71]">
              <TbExternalLink />
            </div>
          </a>
        );
      })}
    </div>
  );
};

const InvestorsCards = () => {
  const investorRef = React.useRef(null);
  const [isDumy, setIsDumy] = React.useState(false);

  const handleScrolling = () => {
    const slider = investorRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsDragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    slider.addEventListener("mousemove", toggleIsDragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsDragging);
    };
  };

  return (
    <div
      className={styles.investors_wrapper}
      ref={investorRef}
      onMouseOver={() => {
        handleScrolling();
      }}>
      {investor.map((ele, index) => {
        return (
          <div
            className={`${styles.investor_container} ${
              isDumy && "pointer-events-none"
            }`}
            key={index.toString()}>
            <img className="object-cover" src={ele.link} alt={ele.altText} />
          </div>
        );
      })}
    </div>
  );
};

export default InverstorAndMedia;
