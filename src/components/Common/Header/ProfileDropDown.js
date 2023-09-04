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
      className="flex p-4 rounded-lg"
      style={{boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.25)"}}>
      {items?.map((ele, index) => (
        <div
          className="flex mb-4 text-base font-Poppins"
          key={index.toString()}>
          {ele}
        </div>
      ))}
    </div>
  );
}
