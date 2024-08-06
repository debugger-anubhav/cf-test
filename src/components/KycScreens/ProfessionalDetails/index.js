import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {BackIcon, OutlineArrowRight} from "../../../assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {reduxSetModalState, setKycScreenName} from "@/store/Slices";
import {cityUrl} from "../../../../appConfig";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import VerfiEmail from "./VerfiEmail";
import docStyle from "../../DocumentsPage/style.module.css";
import GstSdk from "../GstSdk";
import LoaderComponent from "@/components/Common/Loader/LoaderComponent";

export default function ProfessionalDetails({
  getDashboardDetailsApi,
  phoneNumber,
  getDocsDetails,
}) {
  const dispatch = useDispatch();

  const kycSliceData = useSelector(state => state.kycPage);
  const professionId = kycSliceData.selectedProfessionId;
  // const pendingDashboardDetail = kycSliceData.pendingDashboardDetail;

  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;
  const userId = decrypt(getLocalStorage("_ga"));

  const nomineeRelation = [
    "Spouse/Partner",
    "Parent",
    "Legal Guardian",
    "Other",
  ];
  const [email, setEmail] = useState("");
  const [recievedOtp, setRecievedOtp] = useState(null);
  const [verifiedEmail, setVerifiedEmail] = useState("no");
  const [openGstSdk, setOpenGstSdk] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [storeValues, setStoreValues] = useState(null);
  const [showSimpleLoader, setShowSimpleLoader] = useState(false);

  useEffect(() => {
    if (professionId === 2) {
      setOpenGstSdk(true);
    }
  }, [professionId]);

  const getValidationSchema = () => {
    if (professionId === 1) {
      return Yup.object().shape({
        companyName: Yup.string().required("Company name is required"),
        companyEmail: Yup.string()
          .email("Invalid email address")
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
          .required("Company email id is required"),
      });
    } else if (professionId === 3 || professionId === 4) {
      return Yup.object().shape({
        nomineeName: Yup.string().required("Guardian’s name is required"),
        nomineeRelation: Yup.string().required(
          "Guardian’s relation is required",
        ),
        nomineeNumber: Yup.string()
          .test(
            "not-same-as-phoneNumber",
            "Guardian’s number should not be the same as the registered number",
            function (value) {
              return value !== phoneNumber;
            },
          )
          .test(
            "no-spaces-special-characters",
            "Please enter a valid 10 digit phone number without spaces or special characters",
            value => {
              return /^[0-9]*$/.test(value);
            },
          )
          .min(
            10,
            "Oops! Looks like you missed some digits. Please enter complete 10 digit number.",
          )
          .max(
            10,
            "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.",
          )
          .required("Guardian’s number is required"),
      });
    }
  };

  const initialValues = () => {
    if (professionId === 1) {
      return {
        companyName: "",
        companyEmail: "",
      };
    } else if (professionId === 3 || professionId === 4) {
      return {
        nomineeName: "",
        nomineeRelation: selectedOption,
        nomineeNumber: "",
      };
    }
  };

  const saveProfessionalDetails = payload => {
    baseInstance
      .post(endPoints.kycPage.saveKycProfessionalDetails, payload)
      .then(res => {
        setOpenModal(false);
        getDashboardDetailsApi().then(res => {
          const pendingStage = res.allKycStages?.filter(
            i => i.stage_status === 0 || i.stage_status === 3,
          );
          // console.log(pendingStage, "pendingStage");
          showToastNotification(
            "Additional information updated successfully.",
            1,
          );
          if (pendingStage.length > 0) {
            const ID = pendingStage?.[0]?.id;
            if (ID === 2) {
              getDocsDetails(2);
              dispatch(setKycScreenName("dashboard"));
            }
            if (ID === 6) {
              dispatch(setKycScreenName("autoPay"));
            }
            if (ID === 7) {
              dispatch(setKycScreenName("educationalDetails"));
            }
          } else {
            dispatch(setKycScreenName("congratulation"));
          }
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (verifiedEmail === "yes") {
      handleSubmit(storeValues);
    }
  }, [verifiedEmail]);

  const handleSubmit = values => {
    setShowSimpleLoader(true);
    setStoreValues(values);
    if (professionId === 1 && verifiedEmail === "no") {
      handleEmailVerify();
    } else {
      setOpenModal(false);
      const payload = {
        userId,
        orderId,
        stageId: 3,
        nomineeName: values?.nomineeName,
        nomineeRelation: values?.nomineeRelation,
        nomineePhoneNo: values?.nomineeNumber,
        companyName: values?.companyName,
        companyEmailId: values?.companyEmail,
      };
      saveProfessionalDetails(payload);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const handleEmailVerify = () => {
    dispatch(reduxSetModalState(true));
    baseInstance
      .post(endPoints.kycPage.verifyCompanyEmail, {
        email,
        otp: "",
        userId,
        orderId,
      })
      .then(res => {
        setRecievedOtp(res?.data?.data);
        if (res?.data?.data?.status) {
          setOpenModal(true);
          setShowSimpleLoader(false);
        } else {
          showToastNotification(res?.data?.data?.message, 3);
          setOpenModal(false);
          setShowSimpleLoader(false);
        }
      })
      .catch(err => {
        console.log(err);
        setShowSimpleLoader(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      {showSimpleLoader && <LoaderComponent loading={showSimpleLoader} />}

      {professionId !== 2 && (
        <>
          <div className={styles.heading}>
            <BackIcon
              color={"#222222"}
              size={20}
              onClick={() => dispatch(setKycScreenName("dashboard"))}
              className={"cursor-pointer"}
            />
            Additional information
          </div>

          <Formik
            initialValues={initialValues()}
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}>
            {({setFieldValue, values}) => (
              <Form>
                <div>
                  {professionId === 1 && (
                    <>
                      <div className={styles.company_detail_wapper}>
                        <label className={styles.label}>Company name</label>
                        <Field
                          type="text"
                          id="companyName"
                          name="companyName"
                          placeholder="Enter company name"
                          className={styles.label_input_style}
                        />
                        <ErrorMessage
                          name="companyName"
                          component="div"
                          className="error-message"
                        />
                      </div>
                      <div className={styles.company_detail_wapper}>
                        <label className={styles.label}>
                          {" "}
                          Company Email Id
                        </label>
                        <div
                          className={`${styles.label_input_style} flex justify-between`}>
                          <Field
                            type="email"
                            id="companyEmail"
                            name="companyEmail"
                            placeholder="Enter company email id"
                            className="outline-none w-full"
                            onChange={e => {
                              setFieldValue("companyEmail", e.target.value);
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="companyEmail"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </>
                  )}

                  {(professionId === 3 || professionId === 4) && (
                    <>
                      <div className={styles.company_detail_wapper}>
                        <label className={styles.label}>Guardian’s name</label>
                        <Field
                          type="text"
                          id="nomineeName"
                          name="nomineeName"
                          placeholder="Enter Guardian’s name"
                          className={styles.label_input_style}
                        />
                        <ErrorMessage
                          name="nomineeName"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div className={styles.company_detail_wapper}>
                        <label className={styles.label}>
                          Guardian’s relation
                        </label>
                        <div className="flex gap-4 flex-col">
                          {nomineeRelation?.map((item, index) => {
                            return (
                              <div
                                className={`${styles.label_input_style}`}
                                key={index.toString()}>
                                <label className={docStyle.radio_container}>
                                  <input
                                    type="radio"
                                    name="nomineeRelation"
                                    value={item}
                                    checked={selectedOption === item}
                                    onChange={() => {
                                      setSelectedOption(item);
                                      setFieldValue("nomineeRelation", item);
                                    }}
                                    className={docStyle.radio_input}
                                  />
                                  <span
                                    className={`${docStyle.radio_checkmark} `}></span>
                                  <span
                                    className={`${selectedOption === item ? "!text-222" : "!text-71717A"}`}>
                                    {item}
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        <ErrorMessage
                          name="nomineeRelation"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div className={styles.company_detail_wapper}>
                        <label className={styles.label}>
                          Guardian’s number
                        </label>

                        <div
                          className={`flex gap-2 items-center ${styles.label_input_style}`}>
                          <img
                            src={`${cityUrl + "india-icon.svg"}`}
                            className={"w-6 h-6"}
                            loading="lazy"
                            alt="India-icon"
                          />
                          <Field
                            type="number"
                            id="nomineeNumber"
                            name="nomineeNumber"
                            placeholder="Enter 10 digit number"
                            className="outline-none placeholder:text-71717A"
                          />
                        </div>
                        <ErrorMessage
                          name="nomineeNumber"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${styles.proceed} !hidden md:!flex`}>
                  Proceed
                  <OutlineArrowRight color={"#222222"} />
                </button>

                <div className={styles.sticky_btn_wrapper}>
                  <button
                    type="submit"
                    // onClick={() => {
                    //   if (professionId === 1 && !verifiedEmail) {
                    //     // showToastNotification("verify email first", 3);
                    //     handleEmailVerify();
                    //   }
                    // }}
                    className={`${styles.proceed} `}>
                    Proceed
                    <OutlineArrowRight color={"#222222"} />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {professionId === 2 && openGstSdk && (
        <GstSdk
          openGstSdk={openGstSdk}
          setOpenGstSdk={setOpenGstSdk}
          getDashboardDetailsApi={getDashboardDetailsApi}
        />
      )}
      {openModal && (
        <VerfiEmail
          openModal={openModal}
          setOpenModal={setOpenModal}
          email={email}
          recievedOtp={recievedOtp}
          setVerifiedEmail={setVerifiedEmail}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
