import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";

const ShareModal = ({isModalOpen, closeModal, params, title}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  // const [copied, setCopied] = useState(false);
  // console.log(copied, "paramss");

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };
  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  const IconLink = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";
  const socialMediaIcons = [
    {
      icon: `${IconLink}facebook.svg`,
      link: `https://www.facebook.com/sharer.php?u=cityfurnish.com/things/${params.productId}/${params.productName}`,
    },
    {
      icon: `${IconLink}whatsapp_icon.svg`,
      link: `https://api.whatsapp.com/send?text=http://cityfurnish.com/things/${params.productId}/${params.productName}`,
    },

    {
      icon: `${IconLink}linkedin.svg`,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=cityfurnish.com/things/${params.productId}/${params.productName}&title=${title}`,
    },
    {
      icon: `${IconLink}reddit.svg`,
      link: `https://www.reddit.com/submit?url=cityfurnish.com/things/${params.productId}/${params.productName}&title=${title}`,
    },
    {
      icon: `${IconLink}pinterest.svg`,
      link: `https://pinterest.com/pin/create/button/?url=cityfurnish.com/things/${params.productId}/${params.productName}&media=IMAGE_URL&description=${title}`,
    },
    {
      icon: `${IconLink}twitter.svg`,
      link: `https://twitter.com/intent/tweet?url=cityfurnish.com/things/${params.productId}/${params.productName}`,
    },
    {icon: `${IconLink}clipboard.svg`, link: "link"},
  ];

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
    alert("Copied to clipboard!");
    input.value = "";
  };

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={closeModal}
          classes={{paper: styles.bottomDrawer}}
          transitionDuration={{enter: 200, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <div className={styles.share_drawer_wrapper}>
            <h1 className={styles.share_modal_head}>Share Product via:</h1>
            <div className={styles.share_modal_icons_wrapper}>
              {socialMediaIcons?.map((item, index) => (
                <a
                  href={item.link}
                  key={index.toString()}
                  target="_blank"
                  rel="noreferrer"
                  className="outline-none"
                  onClick={e => {
                    if (!item.link) {
                      e.preventDefault(); // Prevent navigation
                    } else if (index === socialMediaIcons.length - 1) {
                      e.preventDefault();
                      copyToClipboard(window.location.href);
                    }
                  }}>
                  <div className={`w-100 h-100 absolute z-10`} />
                  <img
                    alt={item?.icon}
                    src={item?.icon}
                    className="cursor-pointer relative z-[-1]"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </Drawer>
      ) : (
        <Modal
          styles={{}}
          open={isModalOpen}
          onClose={closeModal}
          // center={true}
          classNames={{
            modal: styles.customModal,
            overlay: styles.customOverlay,
            closeButton: styles.customCloseButton,
          }}>
          <h1 className={styles.share_modal_head}>Share Product via:</h1>
          <div className={styles.share_modal_icons_wrapper}>
            {socialMediaIcons?.map((item, index) => (
              <a
                href={item.link}
                key={index.toString()}
                target="_blank"
                rel="noreferrer"
                onClick={e => {
                  // Prevent the default link behavior for the last icon
                  if (index === socialMediaIcons.length - 1) {
                    e.preventDefault();
                    copyToClipboard(window.location.href);
                  }
                }}>
                <div className={`w-100 h-100 absolute z-10`} />
                <img
                  alt={item?.icon}
                  src={item?.icon}
                  className="cursor-pointer w-[30px] h-[30px] md:w-8 md:h-8 relative z-[-1]"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShareModal;
