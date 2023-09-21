import React from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notifications() {
  const added = () => toast.success("Item added to the wishlist");
  const remove = () => toast.error("Item removed from the wishlist");
  const removed = () => toast.warning("Item removed from the wishlist");

  const contextClass = {
    success: "bg-[#67AF7B]",
    error: "bg-[#D96060]",
    warning: "bg-[#FD6]",
    default: "bg-indigo-600",
  };
  return (
    <div>
      <button onClick={removed}>removed!</button>
      <button onClick={added}>added!</button>
      <button onClick={remove}>remove!</button>

      <ToastContainer
        toastClassName={({type}) =>
          contextClass[type || "default"] +
          " relative flex px-3 py-1 my-2 font-normal min-h-10 rounded-md justify-between overflow-hidden cursor-pointer items-center"
        }
        bodyClassName={() => "text-base text-white leading-[20px] p-3 mr-12"}
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}
