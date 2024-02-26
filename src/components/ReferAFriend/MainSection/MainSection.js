import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import HowItWorksDrawer from "../HowItWorksDrawer/HowItWorksDrawer";
import FAQQuestion from "./FAQQuestion";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {reduxSetModalState} from "@/store/Slices";
import LoginModal from "@/components/LoginPopups";
import "react-responsive-modal/styles.css";
import {useRouter} from "next/navigation";
import {FaArrowRight} from "react-icons/fa";

const FAQ = [
  {
    id: 0,
    question: "Who Can Refer?",
    answer:
      "Only Cityfurnish customers can use referral program to refer their friends and family.",
  },
  {
    id: 1,
    question: "How Can I Refer?",
    answer:
      "You can share your referral code on any social platform such as Facebook, Twitter, WhatsApp, etc. from our Referral Page or you can even mail your link to your friends and family.",
    // answer:
    //   "You can share your referral code on any social platform such as Facebook, Twitter, WhatsApp, etc. from our Referral Page or you can even mail your link to your friends and family.",
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
      "The referrer gets a mail notification once their referral code is used by any of their friends. Contact our customer care via email or phone on receipt of notification to get applicable discount. Amount will be adjusted against remaining rental. No cashbacks are permitted against referral benefit.",
  },
  {
    id: 4,
    question: "Is There A Limit On Benefit?",
    answer:
      "- You can refer as many friends as you want. You get benefit on every successful conversion.<br/>- Referred customer can not club referral benefit with any other offer.",
  },
  {
    id: 5,
    question: "Can I Use My Own Referral Code?",
    answer:
      "You can not use your own referral code. Cityfurnish reserves the right to revoke referral benefits availed by individuals who share a common address with the referrer.",
  },
  {
    id: 6,
    question: "Other Terms And Conditions",
    answer:
      "- Referral program is not appliable on fitness equipments and office furniture. <br/> -Referrer should place an order of min <span style='font-family:Inter'>₹</span>1000 monthly rental to avail benefit of referral program.<br/>-Cityfurnish reserves the right to revoke referral benefits if they were earned against our terms or close the referral program anytime without any prior intimation.",
    // "."
  },
];

const IconLink = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";

const MainSection = ({login}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [code, setCode] = useState();
  const [userId, setuserId] = useState();
  const [loading, setloading] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);

  const userIdFromStorage = decrypt(getLocalStorage("_ga"));

  const HandleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleLoginModal = () => {
    dispatch(reduxSetModalState(!modalStateFromRedux));
    setLoginModal(!loginModal);
  };

  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    if (userIdFromStorage) {
      axios
        .get(baseURL + endPoints.referAFreind(userIdFromStorage))
        .then(res => {
          setCode(res?.data?.data);
        })
        .catch(err => console.log(err, "err in referal code"));
    }
    setuserId(userIdFromStorage);
    setloading(false);
  }, [userIdFromStorage]);

  const socialMediaIcons = [
    {
      icon: `${IconLink}facebook.svg`,
      link: `https://www.facebook.com/sharer.php?u=https://rentofurniture.com&quote=${code?.url_string}`,
    },
    {
      icon: `${IconLink}linkedin.svg`,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=https://cityfurnish.com/&title=${code?.url_string}`,
    },
    {
      icon: `${IconLink}mail.svg`,
      link: `mailto:?subject=Cityfurnish&body=${code?.url_string}`,
    },
    {
      icon: `${IconLink}whatsapp_icon.svg`,
      link: `https://api.whatsapp.com/send?text=${code?.url_string}`,
    },
  ];

  // const copyToClipboard = text => {
  //   if (!text) return;

  //   // Create a temporary input element to copy text
  //   const input = document.createElement("input");
  //   input.style.position = "fixed";
  //   input.style.opacity = 0;
  //   input.value = text;
  //   document.body.appendChild(input);
  //   input.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(input);
  //   showToastNotification("Copied to clipboard!", 1);
  //   input.value = "";
  // };

  const copyToClipboard = text => {
    if (!text) return;
    const input = document.createElement("input");
    input.style.position = "fixed";
    input.style.opacity = 0;
    input.value = text.referral_code;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showToastNotification("Copied to clipboard!", 1);
  };

  const HandleLogin = () => {
    // router.push("https://test.rentofurniture.com/user_sign_up");
    toggleLoginModal();
  };

  const shareBtn = link => {
    const url = link;
    typeof window !== "undefined" && window?.open(url, "_blank");
  };

  return (
    <div className={`${styles.main_container} ${userId && "lg:!pl-[64px]"}`}>
      <LoginModal
        closeModal={toggleLoginModal}
        isModalOpen={loginModal}
        // setIsLogin={bool => {
        //   setIsLogin(bool);
        // }}
        handleChangeRoute={() => router.push("/referral")}
      />
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
          <div className={`${styles.detail_heading} mt-6 md:mt-10`}>
            {userId ? (
              "Share your Referral via:"
            ) : (
              <>
                <div className="flex">
                  <p>
                    Your unique Referral Code is ready and waiting for you!{" "}
                    <span>
                      <img
                        src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                        alt="paty_icon"
                        className="w-[24px] h-[24px] ml-2 inline-block"
                        loading="lazy"
                      />
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>

          {loading && login && (
            <div className={`${styles.referral_wrapper_skeleton} `}>
              <div className="flex w-full">
                <Skeleton
                  variant="text"
                  className={styles.skeleton_full_width_height}
                />
              </div>
              <div className=" flex items-center">
                <div className="w-[60%] h-12 mt-4">
                  <Skeleton
                    variant="rectangular"
                    className={styles.skeleton_full_width_height}
                  />
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4].map(item => {
                    return (
                      <div key={item.toString()} className="w-6 h-6 ml-2">
                        <Skeleton
                          variant="circular"
                          className={styles.skeleton_full_width_height}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {userId && (
            <div className={styles.referral_wrapper}>
              <div className={styles.referral_section}>
                <div className={styles.code}>{code?.referral_code}</div>
                <div
                  className={styles.copy_section}
                  onClick={e => {
                    e.preventDefault();
                    copyToClipboard(code);
                  }}>
                  <img
                    src={`${IconLink}clipboard.svg`}
                    alt="copy"
                    className="mr-2"
                    loading="lazy"
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
                      shareBtn(item.link);
                    }}>
                    <img
                      alt={item?.icon}
                      src={item?.icon}
                      className="cursor-pointer pointer-events-none"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {!login && (
            <p className={styles.detail_desc}>
              Simply log in to access it now:
            </p>
          )}

          {!login && (
            // <a
            //   // href="https://test.rentofurniture.com/user_sign_up"
            //   target="_blank"
            //   rel="noopner noreferrer">
            <button className={styles.login_btn} onClick={HandleLogin}>
              Login
              <FaArrowRight />
            </button>
            // </a>
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
            // userId ? styles.section2_wrapper : styles.section2_wrapper1
            styles.img_wrapper_wl
          }>
          <img
            src="https://d3juy0zp6vqec8.cloudfront.net/images/refer-a-friend.webp"
            alt="refer-a-friend"
            className="w-full h-full"
            // className={styles.refer_a_friend_image}
            loading="lazy"
          />
        </div>
      </div>

      {isDrawerOpen && (
        <HowItWorksDrawer
          toggleDrawer={HandleToggleDrawer}
          open={isDrawerOpen}
        />
      )}
      {/* <hr className={styles.underline} /> */}

      <div
        className={`${styles.section1_wrapper} ${userId && "4xl:!mt-[-20px]"}`}>
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
