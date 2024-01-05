import React from "react";
import {BiSolidMessage, BiMinus, BiRupee} from "react-icons/bi";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiFillCheckCircle,
  AiFillHome,
} from "react-icons/ai";
import {FiChevronDown, FiChevronUp, FiEdit, FiLock} from "react-icons/fi";
import {
  IoClose,
  IoCloseOutline,
  IoArrowForward,
  IoArrowBack,
  IoPerson,
  IoArrowForwardSharp,
  IoChevronDown,
  IoWarning,
  IoSwapHorizontalSharp,
} from "react-icons/io5";
import {
  FaArrowRight,
  FaCirclePlus,
  FaLocationDot,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa6";
import {TbMailFilled, TbReload, TbSparkles} from "react-icons/tb";
import {VscHeartFilled} from "react-icons/vsc";
import {PiCopySimpleBold} from "react-icons/pi";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdOpen,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import {
  BsFillStarFill,
  BsGoogle,
  BsCheckLg,
  BsWhatsapp,
  BsExclamationCircleFill,
} from "react-icons/bs";
import {GoPlus} from "react-icons/go";
import {
  MdModeEdit,
  MdVerifiedUser,
  MdCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdEmail,
} from "react-icons/md";

import {HiOutlineShare} from "react-icons/hi";
import {LiaTruckMovingSolid} from "react-icons/lia";
import {RiInformationLine} from "react-icons/ri";
import Favorite from "@/assets/header/favorite.svg";
import Menu from "@/assets/header/menu.svg";
import shoppingCard from "@/assets/header/shopping_cart.svg";
import Profile from "@/assets/header/account_circle.svg";
import Search from "@/assets/header/search.svg";

// footer icons
import Phone from "@/assets/footer_icons/phoneIcon.svg";
import GoToTopIcon from "@/assets/footer_icons/goToTopIcon.svg";

// homepage citymax component card icons
import Icon1 from "@/assets/home_page_assets/tryCityMax/v6-icon1.svg";
import Icon2 from "@/assets/home_page_assets/tryCityMax/v6-icon2.svg";
import Icon3 from "@/assets/home_page_assets/tryCityMax/v6-icon3.svg";
import Icon4 from "@/assets/home_page_assets/tryCityMax/v6-icon4.svg";

// menubar search modal icons
import {LuRefreshCcw, LuVerified} from "react-icons/lu";
import {HiArrowTrendingUp} from "react-icons/hi2";

import {FaRegCalendar} from "react-icons/fa";

export const IconLink = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";

export const FooterIcons = {
  Phone,
  GoToTopIcon,
  social_media_icons: [
    {
      icon: `${IconLink}facebook.svg`,
      link: "https://www.facebook.com/cityFurnishRental/",
    },
    {
      icon: `${IconLink}instagram.svg`,
      link: "https://www.instagram.com/cityfurnish/?hl=en",
    },
    {
      icon: `${IconLink}youtube.svg`,
      link: "https://www.youtube.com/channel/UCPxgx4WxU86cbr38oqGu-OQ",
    },
    {
      icon: `${IconLink}linkedin.svg`,
      link: "https://www.linkedin.com/company/cityfurnish/",
    },
    {icon: `${IconLink}twitter.svg`, link: "https://twitter.com/CityFurnish"},
    {
      icon: `${IconLink}pinterest.svg`,
      link: "https://in.pinterest.com/cityfurnish/",
    },
  ],
};

export const ShareIconsForProductPage = {
  social_media_icons: [
    {
      icon: `${IconLink}facebook.svg`,
      link: "https://www.facebook.com/cityFurnishRental/",
      shareLink: "",
    },
    {
      icon: `${IconLink}whatsapp_icon.svg`,
      link: "https://api.whatsapp.com/send?text=http://cityfurnish.com",
      shareLink: "https://api.whatsapp.com/send?text=http://cityfurnish.com",
    },
    {
      icon: `${IconLink}instagram.svg`,
      link: "https://www.instagram.com/cityfurnish/?hl=en",
      shareLink: "",
    },
    {
      icon: `${IconLink}linkedin.svg`,
      link: "https://www.linkedin.com/company/cityfurnish/",
      shareLink: "",
    },
    {
      icon: `${IconLink}twitter.svg`,
      link: "https://twitter.com/CityFurnish",
      shareLink: "",
    },
    {icon: `${IconLink}clipboard.svg`, link: "link", shareLink: ""},
  ],
};

export const CityMaxIcons = {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
};

export const Icons = {
  Favorite,
  Menu,
  shoppingCard,
  // CityFurnishLogo,
  Profile,
  Search,
};

export const Close = ({size, color, className, onClick}) => (
  <IoClose
    size={size}
    color={color}
    className={className}
    onClick={() => onClick}
  />
);
export const CloseOutline = ({size, color, className}) => (
  <IoCloseOutline size={size} color={color} className={className} />
);
export const DownArrow = ({size, color, className}) => (
  <IoMdArrowDropdown size={size} color={color} className={className} />
);
export const UpArrow = ({size, color, className}) => (
  <IoMdArrowDropup size={size} color={color} className={className} />
);
export const DropDownArrow = ({size, color, className}) => (
  <IoIosArrowDown size={size} color={color} className={className} />
);
export const DropUpArrow = ({size, color, className}) => (
  <IoIosArrowUp size={size} color={color} className={className} />
);

export const Heart = ({size, color, className, onClick}) => (
  <VscHeartFilled
    size={size}
    color={color}
    className={className}
    onClick={onClick}
  />
);
export const Mail = ({size, color, className}) => (
  <TbMailFilled size={size} color={color} className={className} />
);
export const Message = ({size, color, className}) => (
  <BiSolidMessage size={size} color={color} className={className} />
);
export const Rupee = ({size, color, className}) => (
  <BiRupee size={size} color={color} className={className} />
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

export const ForwardArrowWithLine = ({size, color, className}) => (
  <IoArrowForwardSharp size={size} color={color} className={className} />
);
export const ForwardArrowWithLineBold = ({size, color, className}) => (
  <FaArrowRight size={size} color={color} className={className} />
);

export const BackwardArrow = ({size, color, className}) => (
  <IoIosArrowBack size={size} color={color} className={className} />
);

export const EditIcon = ({size, color, className}) => (
  <MdModeEdit size={size} color={color} className={className} />
);

export const EditIcon1 = ({size, color, className}) => (
  <FiEdit size={size} color={color} className={className} />
);

export const TrendingIcon = ({size, color, className}) => (
  <HiArrowTrendingUp size={size} color={color} className={className} />
);

export const RecentIcon = ({size, color, className}) => (
  <LuRefreshCcw size={size} color={color} className={className} />
);
export const DownPopUpArrow = ({size, color, className, onMouseOver}) => (
  <FiChevronDown
    size={size}
    color={color}
    className={className}
    onMouseOver={onMouseOver}
  />
);

export const PopUpArrow = ({size, color, className, onMouseOver}) => (
  <FiChevronUp
    size={size}
    color={color}
    className={className}
    onMouseOver={onMouseOver}
  />
);

export const ShareIcon = ({size, color, className}) => (
  <HiOutlineShare size={size} color={color} className={className} />
);

export const DeliveryTruck = ({size, color, className}) => (
  <LiaTruckMovingSolid size={size} color={color} className={className} />
);

export const VerifyIcon = ({size, color, className}) => (
  <MdVerifiedUser size={size} color={color} className={className} />
);

export const InformationIcon = ({size, color, className}) => (
  <RiInformationLine size={size} color={color} className={className} />
);

export const DeleteIcon = ({size, color, className}) => (
  <AiOutlineDelete size={size} color={color} className={className} />
);
export const CheckCircleIcon = ({size, color, className}) => (
  <AiFillCheckCircle size={size} color={color} className={className} />
);
export const ReloadIcon = ({size, color, className}) => (
  <TbReload size={size} color={color} className={className} />
);

export const ArrowForw = ({size, color, className}) => (
  <IoArrowForward size={size} color={color} className={className} />
);
export const LocationIcon = ({size, color, className}) => (
  <FaLocationDot size={size} color={color} className={className} />
);

export const CheckedBox = ({size, color, className, onClick}) => (
  <MdCheckBox
    size={size}
    color={color}
    className={className}
    onClick={onClick}
  />
);

export const UncheckedBox = ({size, color, className, onClick}) => (
  <MdOutlineCheckBoxOutlineBlank
    size={size}
    color={color}
    className={className}
    onClick={onClick}
  />
);

export const RightIcon = ({size, color, className}) => (
  <BsCheckLg size={size} color={color} className={className} />
);

export const BackIcon = ({size, color, className, onClick}) => (
  <IoArrowBack
    size={size}
    color={color}
    className={className}
    onClick={onClick}
  />
);

export const PersonIcon = ({size, color, className}) => (
  <IoPerson size={size} color={color} className={className} />
);

export const WhatsappIcon = ({size, color, className}) => (
  <BsWhatsapp size={size} color={color} className={className} />
);
export const ExclamationCircleFill = ({size, color, className}) => (
  <BsExclamationCircleFill size={size} color={color} className={className} />
);

export const CalendarIcon = ({size, color, className}) => (
  <FaRegCalendar size={size} color={color} className={className} />
);

export const VerifiedIcon = ({size, color, className}) => (
  <LuVerified size={size} color={color} className={className} />
);

export const EmailIcon = ({size, color, className}) => (
  <MdEmail size={size} color={color} className={className} />
);
export const OutlineArrowRight = ({size, color, className}) => (
  <AiOutlineArrowRight size={size} color={color} className={className} />
);
export const AddIcon = ({size, color, className}) => (
  <FaCirclePlus size={size} color={color} className={className} />
);

export const OpenIcon = ({size, color, className}) => (
  <IoMdOpen size={size} color={color} className={className} />
);

export const DownArrowUnfilled = ({size, color, className}) => (
  <IoChevronDown size={size} color={color} className={className} />
);

export const WarningIcon = ({size, color, className}) => (
  <IoWarning size={size} color={color} className={className} />
);

export const ToggleOff = ({size, color, className, onClick}) => (
  <FaToggleOff
    size={size}
    color={color}
    className={className}
    onClick={onClick}
  />
);
export const ToggleOn = ({size, color, className, onClick}) => (
  <FaToggleOn
    size={size}
    color={color}
    className={className}
    onClick={onClick}
  />
);

export const Home = ({size, color, className}) => (
  <AiFillHome size={size} color={color} className={className} />
);

export const Sparkles = ({size, color, className}) => (
  <TbSparkles size={size} color={color} className={className} />
);

export const Lock = ({size, color, className}) => (
  <FiLock size={size} color={color} className={className} />
);

export const SwapIcon = ({size, color, className}) => (
  <IoSwapHorizontalSharp size={size} color={color} className={className} />
);
