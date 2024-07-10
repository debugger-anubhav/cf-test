import React from "react";
import styles from "./styles.module.css";
import {BackIcon, OutlineArrowRight} from "../../../assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {setKycScreenName} from "@/store/Slices";
import {cityUrl} from "../../../../appConfig";

export default function ProfessionalDetails() {
  const dispatch = useDispatch();
  const professionId = useSelector(state => state.kycPage.selectedProfessionId);
  const nomineeRelation = ["Spouse/Partner", "Parent", "Parent", "Other"];
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => dispatch(setKycScreenName("dashboard"))}
          className={"cursor-pointer"}
        />
        {professionId === 1
          ? "Professional details"
          : professionId === 2
          ? "GST certificate"
          : professionId === 3
          ? "Nominee’s details"
          : "Professional details"}
      </div>

      <div>
        {professionId === 1 && (
          <>
            <div className={styles.company_detail_wapper}>
              <label className={styles.label}>Company name</label>
              <input
                type="text"
                placeholder="lorem ipsum"
                className={styles.label_input_style}
              />
            </div>
            <div className={styles.company_detail_wapper}>
              <label className={styles.label}>Company email ID</label>
              <input
                type="email"
                placeholder="loremipsum@dummyemail.com"
                className={styles.label_input_style}
              />
            </div>
          </>
        )}

        {professionId === 2 && <>open gst sdk</>}

        {professionId === 3 && (
          <>
            <div className={styles.company_detail_wapper}>
              <label className={styles.label}>Nominee’s name</label>
              <input
                type="text"
                placeholder="Enter nominee’s name"
                className={styles.label_input_style}
              />
            </div>

            <div className={styles.company_detail_wapper}>
              <label className={styles.label}>Nominee’s relation</label>
              <div className="flex gap-4 flex-col">
                {nomineeRelation?.map((item, index) => {
                  return (
                    <div
                      className={`flex gap-3 items-center cursor-pointer w-full lg:w-[502px] `}
                      key={index.toString()}>
                      <input
                        type="radio"
                        className={styles.radio_button}
                        name="radioGroup"
                      />
                      <p className="border w-full border-DDDDDF p-4 rounded-xl text-16 font-Poppins tracking-0.3 leading-6 text-71717A">
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.company_detail_wapper}>
              <label className={styles.label}>Nominee’s number</label>

              <div
                className={`flex gap-2 items-center ${styles.label_input_style}`}>
                <img
                  src={`${cityUrl + "india-icon.svg"}`}
                  className={"w-6 h-6"}
                  loading="lazy"
                  alt="India-icon"
                />
                <input
                  type="number"
                  name="contactNumber"
                  placeholder="Enter nominee’s name"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <button className={styles.proceed}>
        proceed
        <OutlineArrowRight color={"#222222"} />
      </button>
    </div>
  );
}
