import React, {useState, useEffect} from "react";
import styles from "../Documentation/DocMain/DocMain.module.css";
import {endPoints} from "@/network/endPoints";

import {useDispatch, useSelector} from "react-redux";
import {getOrderId, setOrderIdFromOrderPage} from "@/store/Slices";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import KycHeader from "../Documentation/KycHeader/KycHeader";

import KYCGetCivilScore from "../Documentation/KYCGetCivilScore/KYCGetCivilScore";
import KYCSalary from "../Documentation/KYCSalary/KYCSalary";
import KYCAddress from "../Documentation/KYCAddress/KYCAddress";
import KYCCard from "../Documentation/KYCCard/KYCCard";
import KYC100 from "../Documentation/KYC100/KYC100";
import DocumentaionInitialScreen from "../Documentation/InitialScreen/Initialscreen";
import {baseInstance} from "@/network/axios";

const HandleOldKyc = ({selectOrderIdForKyc}) => {
  const [kycState, setKycState] = useState();
  const [isUpfrontPayment, setIsUpfrontPayment] = useState(false);
  const [tenure, setTenure] = useState();
  const [creditScore, setCreditScore] = useState();
  const [cibilDocsData, setCibilDocsData] = useState();
  const dispatch = useDispatch();
  const orderIdFromOrderpage = useSelector(state => state.order.orderId);

  const userid = decrypt(getLocalStorage("_ga"));

  const handleKycState = async orderId => {
    console.log("commmmmmmmmmmmmmmmmmm");
    try {
      const response = await baseInstance.get(
        endPoints.kycPage.getKycTrack(userid, orderId),
      );
      dispatch(getOrderId(orderId));
      setKycState(response?.data?.data?.state?.state);
      setIsUpfrontPayment(response?.data?.data?.isUpfrontPayment);
      setTenure(parseInt(response?.data?.data?.tenure));
      setCreditScore(parseInt(response?.data?.data?.credit_score));
      setCibilDocsData(response?.data?.data?.cibilDocsData);
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };

  useEffect(() => {
    if (orderIdFromOrderpage) {
      handleKycState(orderIdFromOrderpage);
      dispatch(setOrderIdFromOrderPage(null));
    }
  }, []);

  const progress = {
    0: 10,
    1: isUpfrontPayment ? 50 : 36.6,
    2: isUpfrontPayment ? 90 : 63.2,
    3: 90,
    4: 100,
  };

  const showBackIcon = {
    0: false,
    1: false,
    // 1: creditScore < 650,
    2: creditScore === null || !(isUpfrontPayment && tenure >= 9),
    3: true,
  };

  const prevState = {
    1: 0,
    2: creditScore >= 650 ? 0 : 1,
    3: 2,
  };

  return (
    <div className={`${styles.kycFormArea} !ml-0`}>
      <KycHeader
        progress={progress[kycState] || 0}
        showBackIcon={showBackIcon[kycState]}
        setKycState={() => setKycState(prevState[kycState])}
      />
      <div>
        {kycState === 0 ? (
          <KYCGetCivilScore handleKycState={id => handleKycState(id)} />
        ) : kycState === 1 ? (
          <KYCSalary
            cibilDocsData={cibilDocsData}
            handleKycState={id => handleKycState(id)}
          />
        ) : kycState === 2 ? (
          <KYCAddress
            handleKycState={id => handleKycState(id)}
            cibilDocsData={cibilDocsData}
            step={
              isUpfrontPayment
                ? tenure >= 9
                  ? 1
                  : creditScore < 650
                  ? 3
                  : 2
                : creditScore < 650
                ? 2
                : 3
            }
          />
        ) : kycState === 3 ? (
          <KYCCard handleKycState={id => handleKycState(id)} />
        ) : kycState === 4 ? (
          <KYC100 handleKycState={id => handleKycState(id)} />
        ) : (
          <DocumentaionInitialScreen
            selectOrderIdForKyc={selectOrderIdForKyc}
            handleKycState={handleKycState}
          />
        )}
      </div>
    </div>
  );
};

export default HandleOldKyc;
