// "use client";

import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import PropTypes from "prop-types";

const PrimaryButton = ({desc, className, extraStyles, onClick}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <button
      style={extraStyles}
      onClick={onClick}
      className={`${styles.btn} ${className}`}>
      {desc}
    </button>
  );
};

export default PrimaryButton;

PrimaryButton.propTypes = {
  desc: PropTypes.string,
  className: PropTypes.string,
  extraStyles: PropTypes.any,
  onClick: PropTypes.func,
};
