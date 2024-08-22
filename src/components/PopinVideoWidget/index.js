import React, { useEffect } from "react";
import styles from "./style.module.css";
import { BiSolidCameraMovie } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";

const PopinVideoWidget = ({ productID }) => {
    const userName = localStorage.getItem("user_name");
    const userNumber = localStorage.getItem("user_number");
    const userEmail = localStorage.getItem("user_email");

    return (
        <>
            <script
                src="https://widget01.popin.to/js/widget.js"
                dangerouslySetInnerHTML={{
                    __html: `
            window.onload = function() {
              if (typeof popInWidgetInit === 'function') {
                popInWidgetInit({
                  token: "123456",
                  mode: "hidden", 
                  captured: { 
                    name: ${userName},
                    mobile: ${userNumber},
                    email:  ${userEmail}"
                  }
                });
              }
            };
          `,
                }}
            ></script>
            <button
                onClick={() => window.Popin && window.Popin("open")}
                className={styles.btn1}
            >
                <BiSolidCameraMovie color="#597491" size={22} />  <GoDotFill color="red" />|
                <span className="ml-2">Live Shop</span>
            </button>
        </>
    );
};

export default PopinVideoWidget;

