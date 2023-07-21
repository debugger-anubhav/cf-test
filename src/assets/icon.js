import React from "react";
import {IoClose} from "react-icons/io5";

// home page icons
import {VscHeartFilled} from "react-icons/vsc";
import {PiCopySimpleBold} from "react-icons/pi";
import {BsFillStarFill, BsGoogle} from "react-icons/bs";

export const Close = ({size, color, className}) => (
  <IoClose size={size} color={color} className={className} />
);

export const Heart = ({size, color, className}) => (
  <VscHeartFilled size={size} color={color} className={className} />
);

export const CopyIcon = ({size, color, className}) => (
  <PiCopySimpleBold size={size} color={color} className={className} />
);

export const RatingStar = ({size, color, className}) => (
  <BsFillStarFill size={size} color={color} className={className} />
);

export const GoogleIcon = ({size, color, className}) => (
  <BsGoogle size={size} color={color} className={className} />
);
