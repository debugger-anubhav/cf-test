import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import loader from "@/assets/lottie-files/pageScanning.json";
import {Modal} from "@mui/material";
import styles from "./DocLoader.module.css";
const DocLoader = ({height, width, open, setOpen}) => {
  console.log(loader);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableRestoreFocus
        disableEnforceFocus
        disableAutoFocus>
        <div className={`${styles.container}`}>
          <div className="">
            <Player autoplay loop src={loader} style={{height, width}}></Player>
          </div>
          <div className={`${styles.heading}`}>Hold on!</div>
          <p className={`${styles.para}`}>
            We are fetching your credit score. This shouldn&apos;t take too
            long.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default DocLoader;
