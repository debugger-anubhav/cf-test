import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt} from "@/hooks/cryptoUtils";
import {useSelector} from "react-redux";
import styles from "../Dashboard/styles.module.css";

export default function SdkIntegration({item, status}) {
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const userId = decrypt(getLocalStorage("_ga"));
  const [selectedId, setSelectedId] = useState(data?.dealCodeNumber);

  // const hyperKycConfig = new window.HyperKycConfig(
  //    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6InNtbGNpNiIsImhhc2giOiIwYTk3OGM3ZjE5OWRhYzJiYzgzMDk5NzY3OTY0Y2Y1MzA1OTc5NmFlYTRiYjI3NjI3Yzg2M2U4ZjQyNzhkYzM0IiwiaWF0IjoxNzE5NTU3MzUzLCJleHAiOjE3MTk2MDA1NTMsImp0aSI6IjRiNDhkNmViLTY2YjQtNDdhMy1iYmZhLWNiZTlmNTdkNWFhNiJ9.ZKTgMXjM1ayb3Rqea6MvotH0zf6nV-U6Ju8ItYR0OT1Bq61cg433GYefinxceg_YzTFXCa7rNpegJ0Tp5gyklAM78L3-SMkxxiuCtjEdfdun0vaTwexsKQBTUcOGxLMCld6Sua-WYVtkUgY00Wm2G0EYlaS0OkxrpBTpF6WucaU ",
  //   "workflow_uZRJMIc",
  //   90035_902767639,
  // );

  const handler = HyperKycResult => {
    console.log(HyperKycResult, "ppppppppppppppppppp");
    switch (HyperKycResult.status) {
      // ----Incomplete workflow-----

      case "user_cancelled":
        // <<Insert code block 1>>
        <p>fdshfsdh</p>;
        break;
      case "error":
        // <<Insert code block 2>>
        <p>fdshfsdh</p>;
        break;

      // ----Complete workflow-----

      case "auto_approved":
        // <<Insert code block 3>>
        <p>fdshfsdh</p>;
        break;
      case "auto_declined":
        // <<Insert code block 4>>
        <p>fdshfsdh</p>;
        break;
      case "needs_review":
        // <<Insert code block 5>>
        break;
    }
  };

  const handleClick = () => {
    baseInstance
      .get(endPoints.hyperverge.getHypervergeToken(userId))
      .then(res => {
        const token = res?.data?.data?.result?.token;
        const config = new window.HyperKycConfig(
          token,
          // "pan_db",
          "poa_selfie",
          selectedId,
        );
        window.HyperKYCModule.launch(config, handler);
        // console.log(dddd)
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setSelectedId(`${userId}_${data?.dealCodeNumber}`);
  }, [data]);

  return (
    <div className={styles.details_box} onClick={handleClick}>
      <div className={styles.detail_heading}>{item?.stage_name}</div>
      <div className={styles.sub_heading}>{status}</div>
    </div>
  );
}
