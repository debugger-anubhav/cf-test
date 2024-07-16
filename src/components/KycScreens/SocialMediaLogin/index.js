import React from "react";
import styles from "./styles.module.css";
import {BackIcon} from "@/assets/icon";
import {useDispatch} from "react-redux";
import {setKycScreenName} from "../../../store/Slices";
import {signIn} from "next-auth/react";

export default function SocialMediaLogin() {
  const dispatch = useDispatch();

  const handleConnect = async () => {
    await signIn("facebook");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => dispatch(setKycScreenName("selectOrderId"))}
          className={"cursor-pointer"}
        />
        Personal details
      </div>
      <div className="flex w-full flex-col gap-6 my-8">
        {["Facebook", "X (Twitter)", "LinkedIn"]?.map((item, index) => {
          return (
            <div className={styles.content_wrapper} key={index.toString()}>
              <p className={styles.item}>{item}</p>
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
