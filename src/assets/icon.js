import React from "react";
import {IoClose} from "react-icons/io5";
import PropTypes from "prop-types";

export const Close = ({size, color}) => <IoClose size={size} color={color} />;

Close.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
