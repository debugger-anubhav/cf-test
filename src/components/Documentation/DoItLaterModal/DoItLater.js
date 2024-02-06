import React, {useState} from "react";
import styles from "./styles.module.css";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {useRouter} from "next/navigation";

const DoItLater = ({isModalOpen, closeModal}) => {
  const router = useRouter;
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
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

  const Content = () => (
    <>
      <h1 className={styles.head}>Your Progress will be Saved!</h1>
      <p className={styles.desc}>
        Just visit the{" "}
        <span className="font-medium">"KYC & Documentation"</span> page whenever
        you're ready to pick up where you left off.
      </p>
      <div className={styles.btn_wrapper}>
        <button
          onClick={closeModal}
          className={`${styles.white_btn} ${styles.btn}`}>
          Go back
        </button>
        <button
          className={`${styles.yellow_btn} ${styles.btn}`}
          onClick={() => router.push("/")}>
          Okay, proceed
        </button>
      </div>
    </>
  );

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={closeModal}
          classes={{paper: styles.bottomDrawer}}
          transitionDuration={{enter: 400, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <Content />
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
          <Content />
        </Modal>
      )}
    </div>
  );
};

export default DoItLater;
