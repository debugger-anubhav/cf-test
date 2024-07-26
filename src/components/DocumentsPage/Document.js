import React, {useState, useEffect} from "react";
import style from "./style.module.css";
import {useParams} from "next/navigation";
import {FaCheck} from "react-icons/fa";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";
import {baseInstance} from "@/network/axios";
import KycCommonDrawer from "../KycScreens/KycCommonDrawer";

const Document = () => {
  const params = useParams();
  const orderId = params?.order_id;
  const [apiData, setApiData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openRejectDrawer, setOpenRejectDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectRejectedReason, setSelectRejectedReason] = useState(null);
  const handleViewButtonClick = imageUrl => {
    window?.open(imageUrl, "_blank");
  };

  const tabsData = [
    "Documents",
    "Additional Information",
    "Upload New Documents",
  ];

  const addtionalInformation = [
    {label: "Company email id", value: "pragati@cityfurnsh.com"},
    {label: "Company name", value: "Shethink India Pvt Ltd."},
    {label: "Guardian’s name", value: "peehu patel"},
    {label: "Guardian’s relation", value: "Mother"},
    {label: "Guardian’s phone number", value: "9826926758"},
    {label: "School/College Name", value: "Davv indore"},
  ];

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
      })
      .then(res => {
        documentApproveApiCall();
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    documentApproveApiCall();
  }, []);

  const drawerContent = () => {
    return (
      <div>
        <div className=" mt-6">
          {["sdsds", "fdsdfds", "dsfsd"]?.map((item, index) => {
            return (
              <div className={`${style.value_box} mb-2`} key={index.toString()}>
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

  return (
    <div className={style.conatiner_wrapper}>
      <div className={style.heading_row}>
        <h1 className={style.heading}>Order:#{orderId}</h1>
        <p className={style.sub_text}>Tenure: 6 months . Paid: Upfront</p>
      </div>
      <div className={style.sub_heading}>
        Documentation stage:
        {apiData?.autoPay === "true" ? (
          <span className="pl-1"> Autopay done</span>
        ) : (
          <span className="pl-1 text-[#D96060]">Documents still pending</span>
        )}
        {apiData?.autoPay === "true" && (
          <div className={style.success_icon_div}>
            <FaCheck color={"white"} size="16" />
          </div>
        )}
      </div>
      <div className={`${style.sub_heading} mt-2`}>
        Credit Score - {apiData?.cibilScore}
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
