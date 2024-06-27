import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {useSelector} from "react-redux";

export default function SdkIntegration() {
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const userId = decrypt(getLocalStorage("_ga"));
  const [hypervergeToken, setHypervergeToken] = useState("");

  const HypervergeToken = () => {
    baseInstance
      .get(endPoints.hyperverge.getHypervergeToken(userId))
      .then(res => {
        const token = decryptBase64(res?.data?.data.token);
        setHypervergeToken(token);
      })
      .catch(err => console.log(err));
  };

  const hyperKycConfig = new window.HyperKycConfig(
    hypervergeToken,
    "workflow_uZRJMIc",
    `${userId}_${data?.dealCodeNumber}`,
  );

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
    console.log("come");
    window?.HyperKYCModule.launch(hyperKycConfig, handler);
  };

  useEffect(() => {
    HypervergeToken();
  }, []);

  useEffect(() => {
    console.log(hypervergeToken, "hypervergeToken");
  }, [hypervergeToken]);

  return (
    <div>
      <button onClick={handleClick}>clickkkkkkkkkkkk</button>
    </div>
  );
}
