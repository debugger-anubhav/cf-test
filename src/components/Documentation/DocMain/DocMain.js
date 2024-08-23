import React, {useState, useEffect} from "react";
import styles from "./DocMain.module.css";
import MenuList from "@/components/Common/MenuList";
import DocSidebar from "../Sidebar/DocSidebar";
import KycHeader from "../KycHeader/KycHeader";

import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import SearchLoader from "../../KycScreens/Dashboard/SearchLoader";
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
import PersonalDetails from "../../KycScreens/PersonalDetails/index";
import CurrentAddressProof from "../../KycScreens/CurrentAddProof/index";
import SocialMediaLogin from "../../KycScreens/SocialMediaLogin";
import HandleOldKyc from "../../KycScreens/HandleOldKyc";
import {useRouter} from "next/navigation";
import commonStyles from "../common.module.css";
import TermsAndConditionsDrawer from "../TermsAndConditionsDrawer";

// import ProgressSection from "@/components/KycScreens/ProgressBar";

const DocMain = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const orderIdFromOrderpage = useSelector(state => state.order.orderId);
  const kycScreen = useSelector(state => state.kycPage);
  // const progressPercentage = kycScreen?.progressPercent;
  const [kycState, setKycState] = useState();
  const [isUpfrontPayment, setIsUpfrontPayment] = useState(false);
  const [tenure, setTenure] = useState();
  const [creditScore, setCreditScore] = useState();
  const [cibilDocsData, setCibilDocsData] = useState();
  const [buttonName, setButtonName] = useState("Start my KYC now");
  const [termDrawerOpen, setTermDrawerOpen] = useState(false);
  const [acceptTermCondition, setAcceptTermCondition] = useState(false);

  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const urlParams = new URLSearchParams(currentURL.split("?")[1]);
  const orderIdFromUrl = urlParams.get("order_id");

  // const [isReupload, setIsReupload] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(
    kycScreen.selectedDataForKyc,
  );
  const [currentScreen, setCurrentScreen] = useState(kycScreen.kycScreenName);

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

  const userId = decrypt(getLocalStorage("_ga"));
  const fetchOrdersDetails = filter => {
    baseInstance
      .get(endPoints.kycPage.getOrderIds(userId))
      .then(res => {
        setOrdersData(res?.data?.data);

        if (orderIdFromUrl) {
          const filteredData = res?.data?.data?.filter(
            i => i.dealCodeNumber === orderIdFromUrl,
          );
          if (filteredData) {
            dispatch(setSelectedDataForKyc(filteredData?.[0]));
            const index = res?.data?.data?.findIndex(
              deal => deal.dealCodeNumber === filteredData?.[0]?.dealCodeNumber,
            );
            setSelectedOption(index);
          }
        }

        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setLoadingSkeleton(false);
      });
  };

  const handleStartKyc = () => {
    const order_id = selectedOrderId?.dealCodeNumber;

    if (order_id) {
      baseInstance
        .get(endPoints.kycPage.checkOldKyc(userId, order_id))
        .then(res => {
          if (res?.data?.data?.newKycStatus) {
            if (selectedOption === null) {
              setOpenDrawer(true);
            }

            if (buttonName === "Check KYC status") {
              dispatch(setKycScreenName("dashboard"));
            } else {
              dispatch(setKycScreenName("workProfession"));
            }
            window.scrollTo({top: 0, left: 0, behavior: "smooth"});
          } else {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"});
            dispatch(setKycScreenName("oldKycFlow"));
          }
        })
        .catch(err => console.log(err));
    } else {
      setOpenDrawer(true);
    }
  };

  const checkSelectedProfession = order_id => {
    baseInstance
      .get(endPoints.kycPage.checkProfessionSelected(userId, order_id))
      .then(res => {
        if (res?.data?.data?.status) {
          setButtonName("Check KYC status");
        } else {
          setButtonName("Start my KYC now");
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrdersDetails();
  }, []);

  useEffect(() => {
    if (ordersData)
      dispatch(setSelectedDataForKyc(ordersData?.[selectedOption]));
  }, [ordersData, selectedOption]);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  useEffect(() => {
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
    setSelectedOrderId(kycScreen.selectedDataForKyc);
  }, [kycScreen]);

  useEffect(() => {
    let order_id = selectedOrderId?.dealCodeNumber;
    if (orderIdFromUrl && !selectedOrderId) {
      order_id = orderIdFromUrl;
    }
    if (selectedOrderId) {
      const newURL = new URL(window?.location?.href);
      newURL?.searchParams?.set("order_id", order_id);
      window?.history?.pushState({}, "", newURL.toString());
    }

    if (order_id) {
      checkSelectedProfession(order_id);
    }
  }, [selectedOrderId]);

  return (
    <div>
      <MenuList hasMb={false} />
      <div className={styles.mainContainer}>
        <DocSidebar />

        <div className={`${styles.kycFormArea} mb-12`}>
          {currentScreen === "workProfession" && (
            <WorkProfession orderId={ordersData[selectedOption]} />
          )}

          {currentScreen === "selectOrderId" && (
            <>
              <TermsAndConditionsDrawer
                open={termDrawerOpen}
                toggleDrawer={bool => setTermDrawerOpen(bool)}
                isCivilScorePage
              />
              <KycHeader
                progress={progress[kycState] || 0}
                showBackIcon={showBackIcon[kycState]}
                setKycState={() => setKycState(prevState[kycState])}
              />
              {/* //Info box  */}
              <div className={styles.info_box}>
                <SearchLoader width={"40px"} height={"40px"} />
                <p className={styles.info}>
                  Complete your KYC quickly for faster product delivery.
                </p>
              </div>

              {/* insturction box  */}
              <div className={styles.instruction_box}>
                <div className={styles.instruction_heading}>
                  Keep your documents handy
                </div>
                <p className={`${styles.instruction_point} pb-2`}>
                  1. Pan card
                </p>
                <p className={styles.instruction_point}>
                  2. Adhar card/ Passport/ Driving license/ Voter ID
                </p>
              </div>

              <div className="flex text-71717A font-Poppins md:text-base text-14 pb-1">
                Select an order to view its documentation status
              </div>
              <div>
                <div
                  className="flex justify-between items-center outline-none font-Poppins border border-[#dddddf] rounded-xl px-4 py-3 text-14 text-71717A w-full lg:w-[502px] cursor-pointer"
                  onClick={() => setOpenDrawer(true)}>
                  {orderIdFromUrl && selectedOption === null ? (
                    <span>#{orderIdFromUrl}</span>
                  ) : (
                    <span>
                      {selectedOption !== null && "#"}
                      {selectedOption !== null
                        ? ordersData?.[selectedOption]?.dealCodeNumber
                        : "Select Order"}
                    </span>
                  )}

                  <DropDownArrow color={"#71717A"} size={20} />
                </div>
                {buttonName === "Start my KYC now" && (
                  <div className="mt-3">
                    <div className={`${styles.formTermsSection}`}>
                      <input
                        type="checkbox"
                        // checked={}
                        className={`${commonStyles.basicCheckBox}`}
                        onChange={e => {
                          setAcceptTermCondition(e.target.checked);
                        }}
                      />
                      <span className={`${commonStyles.termsTxt}`}>
                        I accept
                      </span>
                      <span
                        className={`cursor-pointer ${commonStyles.termsTxt} ${commonStyles.conditionsTxt}`}
                        onClick={() => {
                          setTermDrawerOpen(true);
                        }}>
                        Terms and Conditions
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* start kyc button  */}
              <button
                className={`${styles.start_kyc_btn}  ${
                  selectedOption === null
                    ? "bg-FFDF85 cursor-not-allowed"
                    : "bg-btn-primary cursor-pointer"
                }
                ${
                  buttonName === "Start my KYC now" && !acceptTermCondition
                    ? "!bg-FFDF85 !cursor-not-allowed"
                    : "bg-btn-primary cursor-pointer"
                }`}
                //  ${orderIdFromUrl && "bg-btn-primary"}
                onClick={() => {
                  if (buttonName === "Start my KYC now") {
                    if (acceptTermCondition) handleStartKyc();
                  } else handleStartKyc();
                }}>
                {buttonName}
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
                      className=" w-5 h-5 "
                      alt="mobile-icon"
                    />{" "}
                    Fast-Track Your Orders!
                  </div>
                  <p className={styles.track_detail}>
                    Download our app to quickly complete KYC. Enjoy a smoother,
                    faster service experience!{" "}
                    <Image
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
                  <button
                    className={styles.app_btn}
                    onClick={() =>
                      router.push(
                        "https://cityfurnish.com/v1/get-app-on-devices/getAppOnDevice",
                      )
                    }>
                    <img
                      src={
                        "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/ios-icn.svg"
                      }
                      alt="apple-icon"
                    />
                    ios
                  </button>
                  <button
                    className={styles.app_btn}
                    onClick={() =>
                      router.push(
                        "https://cityfurnish.com/v1/get-app-on-devices/getAppOnDevice",
                      )
                    }>
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

          {currentScreen === "currentAddress" && (
            <CurrentAddressProof cibilDocsData={cibilDocsData} />
          )}
          {currentScreen === "socialMedia" && <SocialMediaLogin />}

          {currentScreen === "personalDetails" && (
            <div className="mt-8">
              <PersonalDetails
                handleKycState={id => handleKycState(id)}
                cibilDocsData={cibilDocsData}
              />
            </div>
          )}

          {(currentScreen === "congratulation" ||
            currentScreen === "financialInfo" ||
            currentScreen === "educationalDetails" ||
            currentScreen === "professionalDetails" ||
            currentScreen === "autoPay" ||
            currentScreen === "dashboard") && <DashboardComponent />}
          {currentScreen === "oldKycFlow" && (
            <HandleOldKyc
              selectOrderIdForKyc={selectedOrderId?.dealCodeNumber}
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
              classes={{paper: styles.rightDrawer}}
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
