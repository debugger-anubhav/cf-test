// import React from "react";
// import {BiSolidMessage, BiMinus} from "react-icons/bi";
// import {IoClose} from "react-icons/io5";
// import {TbMailFilled} from "react-icons/tb";
// import {VscHeartFilled} from "react-icons/vsc";
// import {PiCopySimpleBold} from "react-icons/pi";
// import {IoMdArrowDropdown, IoIosArrowForward} from "react-icons/io";
// import {BsFillStarFill, BsGoogle} from "react-icons/bs";
// import {GoPlus} from "react-icons/go";
// import Favorite from "@/assets/header/favorite.svg";
// import Menu from "@/assets/header/menu.svg";
// import shoppingCard from "@/assets/header/shopping_cart.svg";
// import CityFurnishLogo from "@/assets/cityFurnish-logo.svg";
// import Profile from "@/assets/header/account_circle.svg";
// import Search from "@/assets/header/search.svg";

// export const Icons = {
//   Favorite,
//   Menu,
//   shoppingCard,
//   CityFurnishLogo,
//   Profile,
//   Search,
// };

// export const Close = ({size, color, className}) => (
//   <IoClose size={size} color={color} className={className} />
// );
// export const DownArrow = ({size, color, className}) => (
//   <IoMdArrowDropdown size={size} color={color} className={className} />
// );

// export const Heart = ({size, color, className}) => (
//   <VscHeartFilled size={size} color={color} className={className} />
// );
// export const Mail = ({size, color, className}) => (
//   <TbMailFilled size={size} color={color} className={className} />
// );
// export const Message = ({size, color, className}) => (
//   <BiSolidMessage size={size} color={color} className={className} />
// );

// export const CopyIcon = ({size, color, className}) => (
//   <PiCopySimpleBold size={size} color={color} className={className} />
// );

// export const RatingStar = ({size, color, className}) => (
//   <BsFillStarFill size={size} color={color} className={className} />
// );

// export const GoogleIcon = ({size, color, className}) => (
//   <BsGoogle size={size} color={color} className={className} />
// );

// export const Plus = ({size, color, className}) => (
//   <GoPlus size={size} color={color} className={className} />
// );

// export const Minus = ({size, color, className}) => (
//   <BiMinus size={size} color={color} className={className} />
// );

// export const ForwardArrow = ({size, color, className}) => (
//   <IoIosArrowForward size={size} color={color} className={className} />
// );

import React from "react";
import {BiSolidMessage, BiMinus} from "react-icons/bi";
import {IoClose} from "react-icons/io5";
import {TbMailFilled} from "react-icons/tb";
import {VscHeartFilled} from "react-icons/vsc";
import {PiCopySimpleBold} from "react-icons/pi";
import {IoMdArrowDropdown, IoIosArrowForward} from "react-icons/io";
import {BsFillStarFill, BsGoogle} from "react-icons/bs";
import {GoPlus} from "react-icons/go";
import Favorite from "@/assets/header/favorite.svg";
import Menu from "@/assets/header/menu.svg";
import shoppingCard from "@/assets/header/shopping_cart.svg";
import CityFurnishLogo from "@/assets/cityFurnish-logo.svg";
import Profile from "@/assets/header/account_circle.svg";
import Search from "@/assets/header/search.svg";

// footer icons
import Phone from "@/assets/footer_icons/phoneIcon.svg";
import Fb from "@/assets/footer_icons/fb.svg";
import YouTube from "@/assets/footer_icons/youtube.svg";
import Insta from "@/assets/footer_icons/insta.svg";
import Linkedin from "@/assets/footer_icons/linkedin.svg";
import Twitter from "@/assets/footer_icons/twitter.svg";
import Pinterest from "@/assets/footer_icons/pinterest.svg";
import GoToTopIcon from "@/assets/footer_icons/goToTopIcon.svg";

export const FooterIcons = {
  Phone,
  GoToTopIcon,
  social_media_icons: [
    {icon: Fb, link: "link"},
    {icon: YouTube, link: "link"},
    {icon: Insta, link: "link"},
    {icon: Linkedin, link: "link"},
    {icon: Twitter, link: "link"},
    {icon: Pinterest, link: "link"},
  ],
};
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

export const Plus = ({size, color, className}) => (
  <GoPlus size={size} color={color} className={className} />
);

export const Minus = ({size, color, className}) => (
  <BiMinus size={size} color={color} className={className} />
);

export const ForwardArrow = ({size, color, className}) => (
  <IoIosArrowForward size={size} color={color} className={className} />
);
