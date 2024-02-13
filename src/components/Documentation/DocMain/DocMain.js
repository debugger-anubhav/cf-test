import React, {useState, useEffect} from "react";
import styles from "./DocMain.module.css";
import MenuList from "@/components/Common/MenuList";

import DocumentaionInitialScreen from "../InitialScreen/Initialscreen";
import DocSidebar from "../Sidebar/DocSidebar";
import KycHeader from "../KycHeader/KycHeader";
import KYCGetCivilScore from "../KYCGetCivilScore/KYCGetCivilScore";
import KYCSalary from "../KYCSalary/KYCSalary";
import KYCAddress from "../KYCAddress/KYCAddress";
import KYCCard from "../KYCCard/KYCCard";
import KYC100 from "../KYC100/KYC100";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getOrderId, setOrderIdFromOrderPage} from "@/store/Slices";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const DocMain = () => {
  const [kycState, setKycState] = useState();
  const [isUpfrontPayment, setIsUpfrontPayment] = useState(false);
  const [tenure, setTenure] = useState();
  const [creditScore, setCreditScore] = useState();
  const [cibilDocsData, setCibilDocsData] = useState();
  // const [isReupload, setIsReupload] = useState(false);

  const dispatch = useDispatch();
  const orderIdFromOrderpage = useSelector(state => state.order.orderId);

  // const handleGetOrderId = option => {
  //   console.log(option, "opti[ojjoij");
  //   dispatch(getOrderId(option?.dealCodeNumber));
  //   handleKycState(option?.dealCodeNumber);
  // };

  const userid = decrypt(getLocalStorage("_ga"));

  const handleKycState = async orderId => {
    try {
      const response = await axios.get(
        baseURL + endPoints.kycPage.getKycTrack(userid, orderId),
      );
      // console.log(response, "responsee");
      dispatch(getOrderId(orderId));
      setKycState(response?.data?.data?.state?.state);
      setIsUpfrontPayment(response?.data?.data?.isUpfrontPayment);
      setTenure(parseInt(response?.data?.data?.tenure));
      setCreditScore(parseInt(response?.data?.data?.credit_score));
      setCibilDocsData(response?.data?.data?.cibilDocsData);
    } catch (err) {
      console.log(err);
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
    1: creditScore < 650,
    2: creditScore === null || !(isUpfrontPayment && tenure >= 9),
    3: true,
  };

  const prevState = {
    1: 0,
    2: creditScore >= 650 ? 0 : 1,
    3: 2,
  };

  return (
    <div>
      <MenuList hasMb={false} />
      <div className={styles.mainContainer}>
        <DocSidebar />
        <div className={styles.kycFormArea}>
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
                handleKycState={option =>
                  handleKycState(option?.dealCodeNumber)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocMain;
