import React, {useState} from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import HowItWorksDrawer from "../HowItWorksDrawer/HowItWorksDrawer";
import FAQQuestion from "./FAQQuestion";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

const FAQ = [
  {
    id: 0,
    question: "Who Can Refer?",
    answer:
      "Only Cityfurnish customers can use referral program to refer their friends and family",
  },
  {
    id: 1,
    question: "How Can I Refer?",
    answer:
      "You can share your referral code on any social platform such as Facebook, Twitter etc from our Referral Page or you can even mail your link to your friends and family.",
  },
  {
    id: 2,
    question: "How Can I Use Referral Code?",
    answer:
      'If you have a referral code, please enter it in the "Referral Code" box while sign-up.',
  },
  {
    id: 3,
    question: "How Can I Claim The Referral Benefit?",
    answer:
      "The referrer gets a mail notification once their referral code is used by any of their friends. Contact our customer care via email or phone on receipt of notification to get applicable discount. Amount will be adjusted against remaining rental. No cashbacks are permitted against referral benifit.",
  },
  {
    id: 4,
    question: "Is There A Limit On Benefit?",
    answer:
      "- You can refer as many friends as you want. You get benefit on every successful conversion.<br/>- Referred customer can not club referral benefit with any other offer",
  },
  {
    id: 5,
    question: "Can I Use My Own Referral Code?",
    answer:
      "You can not use your own referral code. Cityfurnish reserves the right to revoke referral benefits availed by individuals who share a common address with the referrer",
  },
  {
    id: 6,
    question: "Other Terms And Conditions",
    answer:
      "- Referral program is not appliable on fitness equipments and office furniture. <br/> - Referrer should place an order of min 1000 Rs monthly rental to avail benefit of referral program.<br/>- Cityfurnish reserves the right to revoke referral benefits if they were earned against our terms or close the referral program anytime without any prior intimation",
  },
];

const IconLink = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";
const socialMediaIcons = [
  {
    icon: `${IconLink}facebook.svg`,
    // link: `https://www.facebook.com/sharer.php?u=cityfurnish.com/things/${params.productId}/${params.productName}`,
  },
  {
    icon: `${IconLink}linkedin.svg`,
    // link: `https://www.linkedin.com/shareArticle?mini=true&url=cityfurnish.com/things/${params.productId}/${params.productName}&title=${title}`,
  },
  {
    icon: `${IconLink}mail.svg`,
    // link: `https://api.whatsapp.com/send?text=http://cityfurnish.com/things/${params.productId}/${params.productName}`,
  },
  {
    icon: `${IconLink}whatsapp_icon.svg`,
    // link: `https://api.whatsapp.com/send?text=http://cityfurnish.com/things/${params.productId}/${params.productName}`,
  },
];

const MainSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const userId = decrypt(getLocalStorage("_ga"));

  const HandleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const copyToClipboard = text => {
    if (!text) return;

    // Create a temporary input element to copy text
    const input = document.createElement("input");
    input.style.position = "fixed";
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showToastNotification("Copied to clipboard!", 1);
    input.value = "";
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.heading}>Referral Code</h1>
      {userId && <div className={styles.line_web}></div>}
      <div
        // className={userId ? styles.content_wrapper : styles.content_wrapper1}>
        className={styles.content_wrapper1}>
        <div
          className={
            userId ? styles.section1_wrapper : styles.section1_wrapper1
          }>
          <p className={styles.detail_heading}>
            Get Rewarded with 500 CF Coins for Every Referral!
          </p>
          <p className={styles.detail_desc}>
            Share your Referral Code with friends, both you and your friend get
            500 CF Coins.
          </p>
          <p className={`${styles.detail_heading} mt-6 md:mt-10`}>
            {userId
              ? "Share your Referral via:"
              : "Your unique Referral Code is ready and waiting for you! 🎉"}
          </p>
          {userId ? (
            <div className={styles.referral_wrapper}>
              <div className={styles.referral_section}>
                <div className={styles.code}>CF1234567890</div>
                <div
                  className={styles.copy_section}
                  onClick={e => {
                    e.preventDefault();
                    copyToClipboard("CF1234567890");
                  }}>
                  <img
                    src={`${IconLink}clipboard.svg`}
                    alt="copy"
                    className="mr-2"
                  />
                  <span>copy</span>
                </div>
              </div>
              <div className={styles.share_modal_icons_wrapper}>
                {socialMediaIcons?.map((item, index) => (
                  <a
                    href={item.link}
                    key={index.toString()}
                    target="_blank"
                    rel="noreferrer"
                    className="outline-none"
                    onClick={e => {
                      e.preventDefault();
                    }}>
                    <img
                      alt={item?.icon}
                      src={item?.icon}
                      className="cursor-pointer"
                    />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p className={styles.detail_desc}>
              Simply log in to access it now:
            </p>
          )}
          {!userId && (
            <button className={styles.login_btn}>{`Login ->`}</button>
          )}
          <div className={styles.how_it_works_button_wrapper}>
            <button
              className={styles.how_it_works_button}
              onClick={HandleToggleDrawer}>
              <p className={styles.how_it_works_paragraph}>How it works</p>
              <ForwardArrow
                size={18}
                color={"#597492"}
                className={styles.forward_arrow}
              />
            </button>
          </div>
        </div>
        <div
          className={
            userId ? styles.section2_wrapper : styles.section2_wrapper1
          }>
          <img
            src="https://d3juy0zp6vqec8.cloudfront.net/images/refer-a-friend.webp"
            alt="refer-a-friend"
            className={styles.refer_a_friend_image}
          />
        </div>
      </div>
      {/* <div className={styles.how_it_works_button_wrapper}>
        <button
          className={styles.how_it_works_button}
          onClick={HandleToggleDrawer}>
          <p className={styles.how_it_works_paragraph}>How it works</p>
          <ForwardArrow
            size={18}
            color={"#597492"}
            className={styles.forward_arrow}
          />
        </button>
      </div> */}
      {isDrawerOpen && (
        <HowItWorksDrawer
          toggleDrawer={HandleToggleDrawer}
          open={isDrawerOpen}
        />
      )}
      {/* <hr className={styles.underline} /> */}

      <div className={styles.section1_wrapper}>
        <div className={styles.freq_asked_que_wrapper}>
          <h2 className={styles.head}>
            For all other questions regarding Referrals:
          </h2>
          <div>
            <div className={styles.QuesAnsArray_div}>
              {FAQ?.map((item, index) => {
                return (
                  <div key={index.toString()}>
                    <FAQQuestion
                      ques={item?.question}
                      ans={item?.answer}
                      isOpen={index === openIndex}
                      toggleQuestion={() => toggleQuestion(index)}
                    />
                    {index < FAQ?.length - 1 && (
                      <div className="bg-EDEDEE h-[1px] w-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
