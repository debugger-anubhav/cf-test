import {useRouter} from "next/navigation";
import React from "react";
import cookie from "react-cookies";

export default function ProfileDropDown({
  setShowProfileDropdown,
  showProfileDropdown,
}) {
  const items = [
    {item: "My Orders", link: "https://cityfurnish.com/purchases"},
    {
      item: "My Service Requests",
      link: "https://cityfurnish.com/service-requests",
    },
    {item: "My Payments", link: "https://cityfurnish.com/payments"},
    {item: "CF Coins", link: "https://cityfurnish.com/wallet"},
    {item: "My Invoices", link: "https://cityfurnish.com/invoices"},
    {item: "Documentation", link: "https://cityfurnish.com/documentation"},
    {item: "Profile Settings", link: "https://cityfurnish.com/usersettings"},
    {item: "Logout", link: "link"},
  ];
  const router = useRouter();
  return (
    <div
      className={
        "absolute top-10 right-0 px-6 py-4 pr-8 rounded-t-lg select-none flex  bg-white flex-col z-2"
      }
      style={
        showProfileDropdown
          ? {boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.25)"}
          : "hidden"
      }>
      <div>
        <p className="text-sm text-6A6A6A">Your Account,</p>
        <p className="text-sm font-medium text-45454A">Pratyush</p>
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
            console.log(index, items.length);
            if (index !== items.length - 1) {
              router.push(ele.link);
            } else {
              // remove userid
              localStorage.removeItem("tempUserID");
              localStorage.removeItem("user_id");
              localStorage.removeItem("ci_session");
              cookie.remove("ci_sessions");
              setShowProfileDropdown(false);
            }
          }}>
          {ele.item}
        </div>
      ))}
    </div>
  );
}
