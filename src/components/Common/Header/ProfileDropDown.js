import {getLocalStorage} from "@/constants/constant";
import {useRouter} from "next/navigation";
import React from "react";
import cookie from "react-cookies";

export default function ProfileDropDown({setShowProfileDropdown}) {
  const items = [
    {item: "My Orders", link: "https://test.rentofurniture.com/purchases"},
    {
      item: "My Service Requests",
      link: "https://test.rentofurniture.com/service-requests",
    },
    {item: "My Payments", link: "https://test.rentofurniture.com/payments"},
    {item: "CF Coins", link: "https://test.rentofurniture.com/wallet"},
    {item: "My Invoices", link: "https://test.rentofurniture.com/invoices"},
    {
      item: "Documentation",
      link: "https://test.rentofurniture.com/documentation",
    },
    {
      item: "Profile Settings",
      link: "https://test.rentofurniture.com/usersettings",
    },
    {item: "Logout", link: "link"},
  ];
  const router = useRouter();

  const userName = getLocalStorage("user_name") ?? "";

  return (
    <div
      className="flex px-6 py-4 pr-8 rounded-t-lg absolute top-10 right-0 bg-white flex-col"
      style={{boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.25)"}}>
      <div>
        <p className="text-sm text-6A6A6A">Your Account,</p>
        <p className="text-sm font-medium text-45454A">
          {userName || "Hello User"}
        </p>
        <p className="bg-EDEDEE h-[1px] w-full my-4"></p>
      </div>
      {items?.map((ele, index) => (
        <div
          className={`flex mb-4 text-base font-Poppins cursor-pointer whitespace-nowrap hover:text-5774AC hover:underline ${
            index === items.length - 1 &&
            "text-[#D96060] hover:text-[#D96060] mb-0"
          }`}
          key={index.toString()}
          onClick={() => {
            if (index !== items.length - 1) {
              router.push(ele.link);
            } else {
              // remove userid
              cookie.remove("ci_sessions");
              localStorage.removeItem("tempUserID");
              localStorage.removeItem("user_id");
              localStorage.removeItem("_ga");
              localStorage.removeItem("user_name");
              localStorage.removeItem("ci_session");
              setShowProfileDropdown(false);
              router.push("https://test.rentofurniture.com/logout");
            }
          }}>
          {ele.item}
        </div>
      ))}
    </div>
  );
}
