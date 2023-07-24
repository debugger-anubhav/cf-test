import React from "react";
import {BiSolidMessage} from "react-icons/bi";
import {IoClose} from "react-icons/io5";
import {TbMailFilled} from "react-icons/tb";
import {VscHeartFilled} from "react-icons/vsc";
import {PiCopySimpleBold} from "react-icons/pi";
import {IoMdArrowDropdown} from "react-icons/io";
import {BsFillStarFill, BsGoogle} from "react-icons/bs";
import Favorite from "@/assets/header/favorite.svg";
import Menu from "@/assets/header/menu.svg";
import shoppingCard from "@/assets/header/shopping_cart.svg";
import CityFurnishLogo from "@/assets/cityFurnish-logo.svg";
import Profile from "@/assets/header/account_circle.svg";
import Search from "@/assets/header/search.svg";

export const Icons = {
  Favorite,
  Menu,
  shoppingCard,
  CityFurnishLogo,
  Profile,
  Search,
};

export const Close = ({size, color, className}) => (
  <IoClose size={size} color={color} className={className} />
);
export const DownArrow = ({size, color, className}) => (
  <IoMdArrowDropdown size={size} color={color} className={className} />
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

export const CopyIcon = ({size, color, className}) => (
  <PiCopySimpleBold size={size} color={color} className={className} />
);

export const RatingStar = ({size, color, className}) => (
  <BsFillStarFill size={size} color={color} className={className} />
);

export const GoogleIcon = ({size, color, className}) => (
  <BsGoogle size={size} color={color} className={className} />
);
