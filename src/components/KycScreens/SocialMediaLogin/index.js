import React from "react";
import styles from "./styles.module.css";
import {BackIcon} from "@/assets/icon";
import {useDispatch} from "react-redux";
import {setKycScreenName} from "../../../store/Slices";
import {signIn} from "next-auth/react";

export default function SocialMediaLogin() {
  const dispatch = useDispatch();

  const data = [
    {
      item: "Facebook",
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/facebook-icn.svg",
    },
    {
      item: "X (Twitter)",
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/twitter-icn.svg",
    },
    {
      item: "LinkedIn",
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/linkedin-icn.svg",
    },
  ];

  const handleConnect = async () => {
    await signIn("facebook");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => dispatch(setKycScreenName("dashboard"))}
          className={"cursor-pointer"}
        />
        Social media login
      </div>
      <div className="flex w-full flex-col gap-6 my-8">
        {data?.map((item, index) => {
          return (
            <div className={styles.content_wrapper} key={index.toString()}>
              <div className="flex items-center gap-2">
                <img src={item.icon} alt={item.item} />
                <p className={styles.item}>{item?.item}</p>
              </div>
              <button className={styles.connect_btn} onClick={handleConnect}>
                Connect
              </button>
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
}
