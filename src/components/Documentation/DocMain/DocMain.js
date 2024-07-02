import React, {useState, useEffect} from "react";
import styles from "./DocMain.module.css";
import MenuList from "@/components/Common/MenuList";

// import DocumentaionInitialScreen from "../InitialScreen/Initialscreen";
import DocSidebar from "../Sidebar/DocSidebar";
import KycHeader from "../KycHeader/KycHeader";
// import KYCGetCivilScore from "../KYCGetCivilScore/KYCGetCivilScore";
// import KYCSalary from "../KYCSalary/KYCSalary";
// import KYCAddress from "../KYCAddress/KYCAddress";
// import KYCCard from "../KYCCard/KYCCard";
// import KYC100 from "../KYC100/KYC100";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {
  getOrderId,
  setKycScreenName,
  setOrderIdFromOrderPage,
  setSelectedDataForKyc,
} from "@/store/Slices";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {ArrowForw, DropDownArrow} from "../../../assets/icon";
import Image from "next/image";
import SelectOptDrawer from "../../KycScreens/SelecOptDrawer";
import {Drawer} from "@mui/material";
import WorkProfession from "../../KycScreens/WorkProfession";
import DashboardComponent from "@/components/KycScreens/Dashboard/index";
import FinancialInfo from "@/components/KycScreens/FinancialInformation/index";
import PersonalDetails from "../../KycScreens/PersonalDetails/index";

const DocMain = () => {
  const [kycState, setKycState] = useState();
  const [isUpfrontPayment, setIsUpfrontPayment] = useState(false);
  const [tenure, setTenure] = useState();
  const [creditScore, setCreditScore] = useState();
  const [cibilDocsData, setCibilDocsData] = useState();
  // const [isReupload, setIsReupload] = useState(false);

  const dispatch = useDispatch();
  const orderIdFromOrderpage = useSelector(state => state.order.orderId);
  const kycScreen = useSelector(state => state.kycPage);
  const [currentScreen, setCurrentScreen] = useState(kycScreen.kycScreenName);

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

  const [openDrawer, setOpenDrawer] = useState(false);
  const [ordersData, setOrdersData] = useState(null);
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  // const openModal = () => {
  //   setOpenDrawer(true);
  // };
  const userId = decrypt(getLocalStorage("_ga"));

  const fetchOrdersDetails = filter => {
    baseInstance
      .get(endPoints.kycPage.getOrderIds(userId))
      .then(res => {
        setOrdersData(res?.data?.data);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setLoadingSkeleton(false);
      });
  };

  const checkSelectedProfession = () => {
    baseInstance
      .get(
        endPoints.kycPage.checkProfessionSelected(
          userId,
          ordersData[selectedOption],
        ),
      )
      .then(res => {
        if (res?.data?.data?.status) {
          dispatch(setKycScreenName("dashboard"));
        } else {
          dispatch(setKycScreenName("workProfession"));
        }
      })
      .catch(err => console.log(err));
  };

  const handleStartKyc = () => {
    checkSelectedProfession();
  };

  useEffect(() => {
    fetchOrdersDetails();
  }, []);

  useEffect(() => {
    if (ordersData) dispatch(setSelectedDataForKyc(ordersData[selectedOption]));
  }, [ordersData, selectedOption]);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };
  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const closeModal = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    setCurrentScreen(kycScreen.kycScreenName);
  }, [kycScreen]);

  return (
    <div>
      <MenuList hasMb={false} />
      <div className={styles.mainContainer}>
        <DocSidebar />

        <div className={styles.kycFormArea}>
          {currentScreen === "workProfession" && (
            <WorkProfession orderId={ordersData[selectedOption]} />
          )}

          {currentScreen === "selectOrderId" && (
            <>
              <KycHeader
                progress={progress[kycState] || 0}
                showBackIcon={showBackIcon[kycState]}
                setKycState={() => setKycState(prevState[kycState])}
              />
              {/* //Info box  */}
              <div className={styles.info_box}>
                <p className={styles.info}>
                  Complete your KYC quickly for faster product delivery.
                </p>
              </div>

              {/* select box  */}
              {/* <div onClick={() => setOpenDrawer(true)}>
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
          </div> */}

              <div onClick={() => setOpenDrawer(true)}>
                <div className="flex justify-between items-center outline-none font-Poppins border border-[#dddddf] rounded-xl px-4 py-3 text-14 text-71717A w-full lg:w-[502px] cursor-pointer">
                  {selectedOption ? (
                    <>#{ordersData[selectedOption]?.dealCodeNumber}</>
                  ) : (
                    " Select order"
                  )}
                  <DropDownArrow color={"#71717A"} size={20} />
                </div>
              </div>

              {/* start kyc button  */}
              <button
                className={`${styles.start_kyc_btn} ${
                  selectedOption
                    ? "bg-btn-primary cursor-pointer"
                    : "bg-FFDF85 cursor-not-allowed"
                }`}
                disabled={selectedOption === null}
                onClick={() => {
                  handleStartKyc();
                }}>
                Start my KYC now{" "}
                <ArrowForw
                  color={"#222222"}
                  size={20}
                  className={"hidden md:flex"}
                />
              </button>

              <div className={styles.track_box}>
                <div className={styles.qr_img}>
                  <Image
                    src={
                      "https://d3juy0zp6vqec8.cloudfront.net/images/qr-code.webp"
                    }
                    alt="scan-and-download"
                    width={120}
                    height={120}
                  />
                </div>
                <div className={styles.track_info}>
                  <div className={styles.track_heading}>
                    <Image
                      src={
                        "https://d3juy0zp6vqec8.cloudfront.net/images/mobile-icon.webp"
                      }
                      width={40}
                      height={20}
                      alt="mobile-icon"
                    />{" "}
                    Fast-Track Your Orders!
                  </div>
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
                  <button className={styles.app_btn}>
                    <img
                      src={
                        "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/ios-icn.svg"
                      }
                      alt="apple-icon"
                    />
                    ios
                  </button>
                  <button className={styles.app_btn}>
                    <img
                      src={
                        "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/android-icn.svg"
                      }
                      alt="android-icon"
                    />
                    Android
                  </button>
                </div>
              </div>
            </>
          )}
          {currentScreen === "dashboard" && <DashboardComponent />}

          {currentScreen === "personalDetails" && (
            <PersonalDetails
              handleKycState={id => handleKycState(id)}
              cibilDocsData={cibilDocsData}
            />
          )}

          {currentScreen === "financialInfo" && (
            <FinancialInfo
              handleKycState={id => handleKycState(id)}
              cibilDocsData={cibilDocsData}
            />
          )}
        </div>

        <div>
          {openDrawer && (
            <Drawer
              anchor={isBottomDrawer ? "bottom" : "right"}
              open={openDrawer}
              onClose={() => {
                closeModal();
                setOpenDrawer(false);
              }}
              classes={{
                paper: `${styles.common_drawer_wrapper} pt-6 md:p-0 md:w-[530px] 3xl:w-[680px] w-full rounded-t-[20px] md:rounded-none max-h-[90%] md:max-h-full overflow-visible`,
              }}
              transitionDuration={{enter: 400, exit: 200}}>
              <SelectOptDrawer
                loadingSkeleton={loadingSkeleton}
                optionsData={ordersData}
                setOpenDrawer={setOpenDrawer}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            </Drawer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocMain;
