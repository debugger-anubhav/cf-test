import React, {useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close, FooterIcons} from "@/assets/icon";
import {Drawer} from "@mui/material";

const ShareModal = ({isModalOpen, closeModal}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 770) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };
  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={closeModal}
          transitionDuration={{enter: 400, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <div className={styles.share_drawer_wrapper}>
            <h1 className={styles.share_modal_head}>Share Product via:</h1>
            <div className={styles.share_modal_icons_wrapper}>
              {FooterIcons?.social_media_icons?.map((item, index) => (
                <img
                  key={index.toString()}
                  alt={item?.icon}
                  src={item?.icon}
                  // className={styles.sm_icon}
                  onClick={() => console.log("cliked")}
                />
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
            {FooterIcons?.social_media_icons?.map((item, index) => (
              <img
                key={index.toString()}
                alt={item?.icon}
                src={item?.icon}
                // className={styles.sm_icon}
                onClick={() => console.log("cliked")}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShareModal;
