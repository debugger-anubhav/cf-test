import React from "react";
import {IoClose} from "react-icons/io5";
import {VscHeartFilled} from "react-icons/vsc";

export const Close = ({size, color, className}) => (
  <IoClose size={size} color={color} className={className} />
);

export const Heart = ({size, color, className}) => (
  <VscHeartFilled size={size} color={color} className={className} />
);
