import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./styles.module.css";
// import gif from "./loader.gif";
// import Image from "next/image";

const LoaderComponent = ({loading}) => {
  return (
    <div className={` ${styles.loader_container}`}>
      {/* <Image src={gif} alt="loading" height={"200"} width={"200"} /> */}
      <BeatLoader
        color={"#EFF5FF"}
        loading={loading}
        //   cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default LoaderComponent;
