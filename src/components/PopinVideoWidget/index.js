import React, { useEffect } from "react";
import styles from "./index.module.css"
import { BiSolidCameraMovie } from "react-icons/bi";

const PopinVideoWidget = () => {
    useEffect(() => {
        const popIn = document.createElement('script');
        popIn.setAttribute('src', 'https://widget01.popin.to/js/widget.js');
        document.body.appendChild(popIn);

        popIn.onload = () => {
            if (window.popInWidgetInit) {
                window.popInWidgetInit({
                    token: "12159",
                    mode: "hidden",
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
            onClick={() => window.Popin && window.Popin('open')}
            className={styles.btn1}
        // ref={addToCartButtonRef}
        >
            <BiSolidCameraMovie color="Red" size={22} />
            <span className="ml-2">Live Product Tour</span>
            {/* <div className={styles.spinner} /> */}
        </button>
    )
}


export default PopinVideoWidget