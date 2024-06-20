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
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getOrderId, setOrderIdFromOrderPage} from "@/store/Slices";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {ArrowForw} from "../../../assets/icon";
import Image from "next/image";

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
  //   dispatch(getOrderId(option?.dealCodeNumber));
  //   handleKycState(option?.dealCodeNumber);
  // };

  const userid = decrypt(getLocalStorage("_ga"));

  const handleKycState = async orderId => {
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
          <div className={styles.info_box}>
            <p className={styles.info}>
              Complete your KYC quickly for faster product delivery.
            </p>
          </div>

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

          <button className={styles.start_kyc_btn}>
            Start my KYC now{" "}
            <ArrowForw
              color={"#222222"}
              size={20}
              className={"hidden md:flex"}
            />
          </button>

          <div className={styles.track_box}>
            <div className={styles.qr_img}>QR image</div>
            <div className={styles.track_info}>
              <p className={styles.track_heading}>📲 Fast-Track Your Orders!</p>
              <p className={styles.track_detail}>
                Download our app to quickly complete KYC. Enjoy a smoother,
                faster service experience!{" "}
                <Image
                  loader={({src}) => src}
                  src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                  alt="paty_icon"
                  className=" inline-block"
                  loading="lazy"
                  width={16}
                  height={16}
                />
              </p>
            </div>
            <div className={styles.track_btn_wrapper}>
              <button className={styles.app_btn}>ios</button>
              <button className={styles.app_btn}>Android</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocMain;
