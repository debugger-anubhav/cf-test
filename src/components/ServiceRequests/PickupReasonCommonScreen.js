import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {CreateRequest, CreateRequestPayload} from "@/constants/constant";
import {setServiceRequestDrawer} from "@/store/Slices";
import Repair from "./Repair";
import Relocation from "./Relocation";
import SwapProduct from "./SwapProduct";
import Buy from "./Buy";
import TransferOwnership from "./TransferOwnership";

function PickupReasonCommonScreen({
  reason,
  subTitle,
  setCurrentScreen,
  selectedProducts,
  data,
}) {
  const dispatch = useDispatch();
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );

  const [description, setDescription] = useState("");
  const [showScreenName, setShowScreenName] = useState(null);

  const handleCreateRequest = () => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      selected_product_name: selectedProducts.join(", "),
      type: selectedType,
      pickup_reason: reason.title,
      description,
    };
    CreateRequest(payload);
    dispatch(setServiceRequestDrawer(false));
  };
  return (
    <>
      {showScreenName === reason.btnName ? (
        <>
          {showScreenName === "Repair product(s)" && (
            <Repair prevScreen={setShowScreenName} data={data} />
          )}
          {showScreenName === "Ownership transfer" && (
            <TransferOwnership prevScreen={setShowScreenName} data={data} />
          )}
          {showScreenName === "Relocation" && (
            <Relocation prevScreen={setShowScreenName} data={data} />
          )}
          {showScreenName === "Swap product(s)" && (
            <SwapProduct prevScreen={setShowScreenName} data={data} />
          )}
          {showScreenName === "Buy product(s)" && (
            <Buy prevScreen={setShowScreenName} data={data} heading={"Buy"} />
          )}
        </>
      ) : (
        <div className={styles.content_wrapper}>
          <div className={styles.main_heading}>
            <BackIcon
              onClick={() => setCurrentScreen(1)}
              className={"cursor-pointer"}
            />
            {reason.title}
          </div>
          <div className={"flex flex-col w-full my-8"}>
            <p className={styles.desc}>{subTitle}</p>
          </div>
          {(reason.title === "Other" ||
            reason.title === "Requirement Fulfilled") && (
            <div>
              <p className={styles.desc}>Your comment (optional)</p>
              <input
                type="text"
                placeholder="Please share any specific instructions or provide feedback."
                className={styles.form_input_textarea}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          )}

          <button
            className={`${styles.proceed_btn} ${
              reason.title !== "Other" &&
              reason.title !== "Requirement Fulfilled"
                ? "!mt-0"
                : ""
            }`}
            onClick={() => {
              if (reason.btnName === "Create request") {
                handleCreateRequest();
              } else {
                setShowScreenName(reason.btnName);
              }
            }}>
            {reason.btnName}
            <ForwardArrowWithLine />
          </button>

          {reason.title !== "Other" &&
          reason.title !== "Requirement Fulfilled" ? (
            <div className="flex justify-center">
              <button
                className={`${styles.plain_btn} !mt-0 justify-center`}
                onClick={handleCreateRequest}>
                No, let me proceed with pickup <ForwardArrowWithLine />
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default PickupReasonCommonScreen;
