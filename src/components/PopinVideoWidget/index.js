import React, { useEffect } from "react";
import styles from "./style.module.css";
import { BiSolidCameraMovie } from "react-icons/bi";

const PopinVideoWidget = ({ productID }) => {
    const userName = localStorage.getItem("user_name");
    const userNumber = localStorage.getItem("user_number");
    const userEmail = localStorage.getItem("user_email");

    useEffect(() => {
        const popIn = document.createElement("script");
        popIn.setAttribute("src", "https://widget01.popin.to/js/widget.js");
        document.body.appendChild(popIn);
        popIn.onload = () => {
            if (window.popInWidgetInit) {
                window.popInWidgetInit({
                    token: "12159",
                    mode: "hidden", //optional to hide widget icon
                    captured: {
                        name: userName,
                        mobile: userNumber,
                        email: userEmail,
                    }
                });
            }
        };
        return () => {
            if (popIn) {
                document.body.removeChild(popIn);
            }
        };
    }, []);
    return (
        <button
            onClick={() => window.Popin && window.Popin("open")} className={styles.btn1}>
            <BiSolidCameraMovie color="Red" size={22} />
            <span className="ml-2">Live Product Tour</span>
        </button>
    );
};

export default PopinVideoWidget;
