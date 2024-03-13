import {getLocalStorage} from "@/constants/constant";
import {setShoppingCartTab} from "@/store/Slices";
import {useRouter} from "next/navigation";
import React from "react";
import cookie from "react-cookies";
import {useDispatch} from "react-redux";
import Cookies from "universal-cookie";

export default function ProfileDropDown({setShowProfileDropdown}) {
  const authCookies = new Cookies();

  const items = [
    {item: "My Orders", link: "/purchases"},
    {
      item: "My Service Requests",
      link: "/service-requests",
    },
    {item: "My Payments", link: "/payments"},
    {item: "CF Coins", link: "/wallet"},
    {item: "My Invoices", link: "/invoices"},
    {
      item: "Documentation",
      link: "/documentation",
    },
    {
      item: "Profile Settings",
      link: "/profilesettings",
    },
    {item: "Logout"},
  ];
  const router = useRouter();
  const dispatch = useDispatch();

  const userName = getLocalStorage("user_name") ?? "";
  return (
    <div
      onMouseEnter={() => {
        setShowProfileDropdown(true);
      }}
      onMouseLeave={() => {
        setShowProfileDropdown(false);
      }}
      className="flex px-6 py-4 pr-8 rounded-t-lg absolute top-10 right-0 bg-white flex-col mt-[14px]"
      style={{boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.25)"}}>
      <div>
        <p className="text-sm text-6A6A6A">Your Account,</p>
        <p className="text-sm font-medium text-45454A">
          {userName || "Hello User"}
        </p>
        <p className="bg-EDEDEE h-[1px] w-full my-4"></p>
      </div>
      {items?.map((ele, index) => (
        <a
          href={ele?.link}
          rel="noopener"
          tabIndex="_blank"
          aria-label={ele?.item}
          key={index.toString()}>
          <div
            className={`flex mb-4 text-base font-Poppins cursor-pointer whitespace-nowrap hover:text-5774AC hover:underline ${
              index === items.length - 1 &&
              "text-[#D96060] hover:text-[#D96060] mb-0"
            }`}
            onClick={() => {
              if (index !== items.length - 1) {
                router.push(ele?.link);
              } else {
                // remove userid
                cookie.remove("ci_sessions");
                authCookies.remove("authToken", {path: "/"});
                authCookies.remove("userId", {path: "/"});
                localStorage.removeItem("tempUserID");
                localStorage.removeItem("user_id");
                localStorage.removeItem("_ga");
                localStorage.removeItem("user_name");
                localStorage.removeItem("ci_session");
                setShowProfileDropdown(false);
                dispatch(setShoppingCartTab(0));
                // router.push("/");
                window.open("/", "_self");
              }
            }}>
            {ele.item}
          </div>
        </a>
      ))}
    </div>
  );
}
