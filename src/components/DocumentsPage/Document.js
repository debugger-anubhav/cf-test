import React from "react";
import style from "./style.module.css";
import {useParams} from "next/navigation";
import {FaCheck} from "react-icons/fa";

const dummyData = [
  {
    id: 0,
    document: "cf_delivery_address_proof01697518898.pdf",
    type: "Employment proof on company letter-head",
    status: "pending",
  },
  {
    id: 1,
    document: "cf_delivery_address_proof01697518898.pdf",
    type: "Employment proof on company letter-head",
    status: "approved",
  },
  {
    id: 2,
    document: "cf_delivery_address_proof01697518898.pdf",
    type: "Employment proof on company letter-head",
    status: "pending",
  },
  {
    id: 3,
    document: "cf_delivery_address_proof01697518898.pdf",
    type: "Employment proof on company letter-head",
    status: "rejected",
  },
];

const Document = () => {
  const params = useParams();

  return (
    <div className={style.conatiner_wrapper}>
      <div className={style.heading}>Order:#{params?.order_id}</div>
      <div className={style.sub_heading}>
        Documentation stage: Autopay done
        <div className={style.success_icon_div}>
          <FaCheck color={"white"} size="16" />
        </div>
      </div>
      <div className={style.table}>
        <div className={style.table_headers}>
          <p className="col-span-5">Document Name</p>
          <p className="col-span-4">Document Type</p>
          <p className="col-span-2">Action</p>
          <p className="col-span-1">Status</p>
        </div>
        <div className={style.table_body}>
          {dummyData?.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`${style.table_data} ${
                  index < dummyData?.length - 1 &&
                  "border-b-[1px] border-EDEDEE"
                }`}>
                <div className={`col-span-5 mr-4 ${style.body_cell}`}>
                  {item.document}
                </div>
                <div className={`col-span-4 mr-4 ${style.body_cell}`}>
                  {item.type}
                </div>
                <div className={`col-span-2 ${style.action_cell}`}>
                  <button className={style.view_btn}>View</button>
                  <div className={style.decision_btns}>
                    <p className={style.approve_btn}>Approve</p>
                    <p className={style.reject_btn}>Reject</p>
                  </div>
                </div>
                <div className={`col-span-1 ${style.body_cell}`}>
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Document;
