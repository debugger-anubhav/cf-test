import React from "react";

export default function ProfileDropDown() {
  const items = [
    {item: "My Orders", link: "link"},
    {item: "My Service Requests", link: "link"},
    {item: "My Payments", link: "link"},
    {item: "CF Coins", link: "link"},
    {item: "My Invoices", link: "link"},
    {item: "Documentation", link: "link"},
    {item: "Profile Settings", link: "link"},
    {item: "Logout", link: "link"},
  ];
  return (
    <div
      className="flex px-6 py-4 pr-8 rounded-t-lg absolute top-10 right-0 bg-white flex-col"
      style={{boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.25)"}}>
      {items?.map((ele, index) => (
        <div
          className="flex mb-4 text-base font-Poppins cursor-pointer whitespace-nowrap"
          key={index.toString()}>
          {ele.item}
        </div>
      ))}
    </div>
  );
}
