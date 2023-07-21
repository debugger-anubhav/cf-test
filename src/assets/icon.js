import React from "react";
import {BiSolidMessage} from "react-icons/bi";
import {IoClose} from "react-icons/io5";
import {TbMailFilled} from "react-icons/tb";
import {VscHeartFilled} from "react-icons/vsc";

export const Close = ({size, color, className}) => (
  <IoClose size={size} color={color} className={className} />
);

export const Heart = ({size, color, className}) => (
  <VscHeartFilled size={size} color={color} className={className} />
);
export const Mail = ({size, color, className}) => (
  <TbMailFilled size={size} color={color} className={className} />
);
export const Message = ({size, color, className}) => (
  <BiSolidMessage size={size} color={color} className={className} />
);
