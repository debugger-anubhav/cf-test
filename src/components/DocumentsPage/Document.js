import React, {useState, useEffect} from "react";
import style from "./style.module.css";
import {useParams} from "next/navigation";
import {FaCheck} from "react-icons/fa";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";
import {baseInstance} from "@/network/axios";
import KycCommonDrawer from "../KycScreens/KycCommonDrawer";
// import UploadNewDocs from "./UploadNewDocs";
import CurrentAddressProof from "../KycScreens/CurrentAddProof";
import Image from "next/image";

const Document = () => {
  const professionIconLink = process.env.NEXT_PUBLIC_IMAGE_CLOUDFRONT_BASE_URL;
  const params = useParams();
  const orderId = params?.order_id;
  const [apiData, setApiData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openRejectDrawer, setOpenRejectDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectRejectedReason, setSelectRejectedReason] = useState(null);
  const [otherReasonForRejection, setOtherReasonForRejection] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);
  const [otherReasonInput, setOtherReasonInput] = useState("");
  const handleViewButtonClick = imageUrl => {
    window?.open(imageUrl, "_blank");
  };

  const tabsData = [
    "Documents",
    "Additional Information",
    "Upload New Documents",
  ];
  const [addtionalInformation, setAddtionalInformation] = useState([]);

  const documentApproveApiCall = () => {
    baseInstance
      .get(endPoints.documentationApprove(orderId))
      .then(res => {
        setApiData(res?.data?.data);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const statusUpdateApiCall = (item, updatedStatus) => {
    baseInstance
      .patch(endPoints.documentationApproveStatusUpdate, {
        status: updatedStatus,
        id: item?.id,
        reason: otherReasonForRejection
          ? otherReasonInput
          : selectRejectedReason,
      })
      .then(res => {
        documentApproveApiCall();
      })
      .catch(err => console.log(err?.message || "some error"));
    setOpenRejectDrawer(false);
  };

  useEffect(() => {
    if (selectRejectedReason === "Other") {
      setOtherReasonForRejection(true);
    } else {
      setOtherReasonForRejection(false);
    }
  }, [selectRejectedReason]);

  const drawerContent = () => {
    return (
      <div>
        <div className=" mt-6">
          {[
            "Document Blurred",
            "Incomplete Document",
            "Mismatched Name",
            "Incorrect Document",
            "Invalid Date",
            "Account Details Hidden",
            "Altered Documents",
            "Low Balance",
            "Unverified Bank",
            "Other",
          ]?.map((item, index) => {
            return (
              <div
                className={`${style.value_box} mb-2`}
                key={index.toString()}
                onClick={() => setSelectRejectedReason(item)}>
                <label className={style.radio_container}>
                  <input
                    type="radio"
                    name="value"
                    value={item}
                    checked={selectRejectedReason === item}
                    onChange={() => setSelectRejectedReason(item)}
                    className={style.radio_input}
                  />
                  <span className={style.radio_checkmark}></span>
                  {item}
                </label>
              </div>
            );
          })}
        </div>
        {otherReasonForRejection && (
          <input
            type="text"
            className={`${style.value_box} mb-2`}
            placeholder="Type here"
            onChange={e => {
              setOtherReasonInput(e.target.value);
            }}
          />
        )}
        <div className={style.btn_wrapper}>
          <button
            className={style.white_btn}
            onClick={() => {
              setOpenRejectDrawer(false);
            }}>
            Cancel
          </button>
          <button
            disabled={!selectRejectedReason}
            className={`${style.yellow_btn} ${selectRejectedReason ? "bg-F6B704" : "bg-FFDF85 !cursor-not-allowed"}`}
            onClick={() => statusUpdateApiCall(selectedItem, 2)}>
            Reject
          </button>
        </div>
      </div>
    );
  };
  const additionalDetailsApi = () => {
    baseInstance
      .get(endPoints.getUserAdditionalDetails(orderId))
      .then(res => {
        setAdditionalData(res?.data?.data?.kycData);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    documentApproveApiCall();
    additionalDetailsApi();
  }, []);

  useEffect(() => {
    setAddtionalInformation([
      {
        label: "Company email id",
        value: additionalData?.company_email_id || "--",
      },
      {label: "Company name", value: additionalData?.company_name || "--"},
      {label: "Guardian’s name", value: additionalData?.nominee_name || "--"},
      {
        label: "Guardian’s relation",
        value: additionalData?.nominee_relation || "--",
      },
      {
        label: "Guardian’s phone number",
        value: additionalData?.nominee_contact_no || "--",
      },
      {
        label: "School/College Name",
        value: additionalData?.education_details || "--",
      },
    ]);
  }, [additionalData]);

  return (
    <div className={style.conatiner_wrapper}>
      <div className={`mt-[44px] ${style.top_div_wrapper}`}>
        <div className={style.heading_row}>
          <h1 className={style.heading}>Order: #{orderId}</h1>
          <p className={style.sub_text}>
            Tenure:{" "}
            <span className="text-222 pl-1">
              {apiData?.userData?.fc_subproducts?.attr_name}
            </span>
            . Paid:
            <span className="text-222 pl-1">
              {apiData?.userData?.is_upfront === 0 ? "Monthly" : "Upfront"}
            </span>
          </p>
        </div>
        <div className={style.profession_row}>
          <div className={style.profession_left}>
            <Image
              src={professionIconLink + additionalData?.profession_icon}
              alt="icon"
              width={24}
              height={24}
            />
            Profession: {additionalData?.profession_name}
          </div>
        </div>
      </div>

      <div className={`${style.top_div_wrapper} !items-end `}>
        <div>
          <div className={style.sub_heading}>
            Documentation stage:
            {apiData?.autoPay === "true" ? (
              <span className="pl-1"> Autopay done</span>
            ) : (
              <span className="pl-1 text-[#D96060]">
                Documents still pending
              </span>
            )}
            {apiData?.autoPay === "true" && (
              <div className={style.success_icon_div}>
                <FaCheck color={"white"} size="16" />
              </div>
            )}
          </div>
          {apiData?.autoPay && (
            <div className={`${style.user_detail_box} mt-2`}>
              <p className={style.sub_text}>
                Token Id:
                <span className="text-222 pl-1"> {apiData?.tokenId}</span>
              </p>
              <p className={style.sub_text}>
                ENACH status:
                <span className="text-222 pl-1">
                  {apiData?.autoPay ? (
                    <span className="text-[#2D9469]">Done</span>
                  ) : (
                    "Pending"
                  )}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className={style.user_detail_box}>
          <p className={style.sub_text}>
            Name:{" "}
            <span className="text-222 pl-1">
              {apiData?.userData?.fc_user?.full_name}
            </span>
          </p>
          <p className={style.sub_text}>
            Contact no:{" "}
            <span className="text-222 pl-1">
              {apiData?.userData?.fc_user?.phone_no}
            </span>
          </p>
          <p className={style.sub_text}>
            Email Id:{" "}
            <span className="text-222 pl-1">
              {" "}
              {apiData?.userData?.fc_user?.email}
            </span>
          </p>
          <p className={style.sub_text}>
            Credit Score:
            <span className="text-222 pl-1">{apiData?.cibilScore}</span> -
            <a
              href={apiData?.siteUrl}
              target="_blank"
              className={`${style.credit_link}`}
              rel="noreferrer">
              Report link
            </a>
          </p>
        </div>
      </div>

      <div className={style.table}>
        <div className={style.tab_row}>
          {tabsData?.map((item, index) => {
            return (
              <div
                key={index.toString()}
                className={`${index === activeTab ? style.active_tab_item : style.tab_item}`}
                onClick={() => {
                  setActiveTab(index);
                }}>
                {item}
              </div>
            );
          })}
        </div>

        {activeTab === 0 && (
          <>
            <div className={style.table_headers}>
              <p className="col-span-5">Document Name</p>
              <p className="col-span-4">Document Type</p>
              <p className="col-span-2">Action</p>
              <p className="col-span-1">Status</p>
            </div>
            <div className={style.table_body}>
              {apiData ? (
                <>
                  {apiData?.docsData?.map((item, index) => {
                    return (
                      <div
                        key={item?.id}
                        className={`${style.table_data} ${
                          index < apiData?.docsData?.length - 1 &&
                          "border-b-[1px] border-EDEDEE"
                        }`}>
                        <div className={`col-span-5 mr-4 ${style.body_cell}`}>
                          {item?.doc_name}
                        </div>
                        <div className={`col-span-4 mr-4 ${style.body_cell}`}>
                          {item?.doc_type}
                        </div>
                        <div className={`col-span-2 ${style.action_cell}`}>
                          <button
                            className={style.view_btn}
                            onClick={() => handleViewButtonClick(item?.image)}>
                            View
                          </button>
                          {item?.status === 0 && (
                            <div className={style.decision_btns}>
                              <p
                                className={style.approve_btn}
                                onClick={() => statusUpdateApiCall(item, 1)}>
                                Approve
                              </p>
                              <p
                                className={style.reject_btn}
                                onClick={() => {
                                  setOpenRejectDrawer(true);
                                  setSelectedItem(item);
                                }}>
                                Reject
                              </p>
                            </div>
                          )}
                        </div>
                        <div className={`col-span-1 ${style.body_cell}`}>
                          <p className={style.final_status}>
                            {item?.status === 0
                              ? "Pending"
                              : item?.status === 1
                                ? "Approved"
                                : "Rejected"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <TableSkeleton />
              )}
            </div>
          </>
        )}
        {activeTab === 1 && (
          <div className={style.additional_detail}>
            {addtionalInformation?.map((item, index) => {
              return (
                <div className={style.container} key={index.toString()}>
                  <label className={style.label}>{item?.label}</label>
                  <div className={style.value_box}>{item?.value}</div>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === 2 && (
          <div className="px-6 pb-6">
            <CurrentAddressProof
              showHeading={false}
              apiData={apiData?.uploadingDocs}
              orderId={orderId}
              setActiveTab={setActiveTab}
            />
          </div>
        )}
        {openRejectDrawer && (
          <KycCommonDrawer
            content={drawerContent()}
            changeState={setOpenRejectDrawer}
            heading={"Reason for rejection"}
          />
        )}
      </div>
    </div>
  );
};

export default Document;

export const TableSkeleton = () => {
  return (
    <div className={style.table_body}>
      {[1, 2, 3, 4, 5]?.map(item => {
        return (
          <div key={item.toString()} className="w-full">
            <div className={style.table_data}>
              <div className={`col-span-5 mr-4 ${style.body_cell}`}>
                <Skeleton variant="text" width={300} />
              </div>
              <div className={`col-span-4 mr-4 ${style.body_cell}`}>
                <Skeleton variant="text" width={300} />
              </div>
              <div className={`col-span-2 ${style.action_cell}`}>
                <Skeleton variant="text" width={100} />
              </div>
              <div className={`col-span-1 ${style.body_cell}`}>
                <Skeleton variant="text" width={100} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
