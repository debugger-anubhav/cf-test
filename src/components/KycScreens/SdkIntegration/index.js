import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt} from "@/hooks/cryptoUtils";
import {useSelector} from "react-redux";

export default function SdkIntegration() {
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const userId = decrypt(getLocalStorage("_ga"));
  const [hypervergeToken, setHypervergeToken] = useState("");
  const [selectedId, setSelectedId] = useState(data?.dealCodeNumber);

  const HypervergeTokenApi = () => {
    baseInstance
      .get(endPoints.hyperverge.getHypervergeToken(userId))
      .then(res => {
        const token = (res?.data?.data.token).split(" ");
        setHypervergeToken(token[1]);
      })
      .catch(err => console.log(err));
  };

  const hyperKycConfig = new window.HyperKycConfig(
    hypervergeToken,
    "workflow_uZRJMIc",
    selectedId,
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
    window.HyperKYCModule.launch(hyperKycConfig, handler);
  };

  useEffect(() => {
    HypervergeTokenApi();
  }, []);

  useEffect(() => {
    setSelectedId(`${userId}_${data?.dealCodeNumber}`);
  }, [data]);

  useEffect(() => {
    console.log(
      hypervergeToken,
      "workflow_uZRJMIc",
      `${userId}_${data?.dealCodeNumber}`,
      "llll",
    );
  }, [data]);

  return (
    <div>
      <button onClick={handleClick}>clickkkkkkkkkkkk</button>
    </div>
  );
}
