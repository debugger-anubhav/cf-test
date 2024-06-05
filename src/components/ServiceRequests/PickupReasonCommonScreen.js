import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {CreateRequestPayload} from "@/constants/constant";
import Repair from "./Repair";
import Relocation from "./Relocation";
import SwapProduct from "./SwapProduct";
import Buy from "./Buy";
import TransferOwnership from "./TransferOwnership";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";
import {setRequestLoader} from "@/store/Slices";
import LoaderComponent from "../../components/Common/Loader/LoaderComponent";

function PickupReasonCommonScreen({
  reason,
  subTitle,
  setCurrentScreen,
  selectedProducts,
  data,
  pickupRequestType,
}) {
  const dispatch = useDispatch();
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const callFunctionFlag = useSelector(
    state => state.homePagedata.createRequestApiCalled,
  );
  const loader = useSelector(state => state.serviceRequestData.requestLoader);
  const [description, setDescription] = useState("");
  const [showScreenName, setShowScreenName] = useState(null);
  const {CreateSRApiCall} = CommonCreateRequestApi();

  const handleCreateRequest = () => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      selected_product_name: selectedProducts.join(", "),
      type: selectedType,
      Pickup_Request_Type: pickupRequestType,
      pickup_reason: reason.title,
      description,
    };
    callFunctionFlag && CreateSRApiCall(payload);
  };
  return (
    <div>
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
        <div
          className={`${styles.content_wrapper} max-w-full !pb-0 !overflow-auto`}>
          <div className={styles.main_heading}>
            <BackIcon
              onClick={() => setCurrentScreen(1)}
              className={"cursor-pointer"}
            />
            {reason.title}
          </div>
          <div className={styles.pickup_reason_subtitle}>
            <p className={styles.desc}>{subTitle}</p>
          </div>
          {(reason.title === "Other" ||
            reason.title === "Requirement Fulfilled") && (
            <div>
              <p className={styles.desc}>Your comment (optional)</p>
              <textarea
                placeholder="Please share any specific instructions or provide feedback."
                className={styles.form_input_textarea}
                onChange={e => setDescription(e.target.value)}
                rows={2}
              />
            </div>
          )}
          {loader && <LoaderComponent loading={loader} />}

          <button
            className={`${styles.proceed_btn} ${
              reason.title !== "Other" &&
              reason.title !== "Requirement Fulfilled"
                ? "!mt-0"
                : ""
            } !mx-auto !w-full lg:w-full`}
            onClick={() => {
              if (reason.btnName === "Create request") {
                dispatch(setRequestLoader(true));
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
            <div className={styles.pickup_reason_btn_wrapper}>
              <button
                className={`${styles.plain_btn} !mt-0 justify-center !w-full lg:w-full`}
                onClick={() => {
                  dispatch(setRequestLoader(true));
                  handleCreateRequest();
                }}>
                No, let me proceed with pickup
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default PickupReasonCommonScreen;
