import React from "react";
import {IoClose} from "react-icons/io5";
import PropTypes from "prop-types";

export const Close = ({size, color, className}) => (
  <IoClose size={size} color={color} className={className} />
);

Close.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.any,
};
