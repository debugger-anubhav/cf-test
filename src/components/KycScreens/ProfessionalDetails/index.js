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
import GstSdk from "../GstSdk";

export default function ProfessionalDetails({getDashboardDetailsApi}) {
  const dispatch = useDispatch();

  const kycSliceData = useSelector(state => state.kycPage);
  const professionId = kycSliceData.selectedProfessionId;
  const pendingDashboardDetail = kycSliceData.pendingDashboardDetail;

  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;
  const stageId = kycSliceData.stageId;
  const userId = decrypt(getLocalStorage("_ga"));

  const nomineeRelation = [
    "Spouse/Partner",
    "Parent",
    "Legal Guardian",
    "Other",
  ];
  const [email, setEmail] = useState("");
  const [recievedOtp, setRecievedOtp] = useState(null);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [openGstSdk, setOpenGstSdk] = useState(false);

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
          .required("Email is required"),
      });
    } else if (professionId === 3 || professionId === 4) {
      return Yup.object().shape({
        nomineeName: Yup.string().required("Nominee name is required"),
        nomineeRelation: Yup.string().required("Nominee relation is required"),
        nomineeNumber: Yup.string()
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
          .required("Nominee number is required"),
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
        nomineeRelation: "",
        nomineeNumber: "",
      };
    }
  };

  const saveProfessionalDetails = payload => {
    baseInstance
      .post(endPoints.kycPage.saveKycProfessionalDetails, payload)
      .then(res => {
        getDashboardDetailsApi();
        setTimeout(() => {
          const pendingStage = pendingDashboardDetail?.filter(
            i => i.stage_status === 0 || i.stage_status === 1,
          );
          console.log(pendingStage, "pendingStage");

          if (pendingStage.length > 0) {
            const ID = pendingStage?.[0]?.id;
            if (ID === 2) {
              dispatch(setKycScreenName("financialInfo"));
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
        }, 1500);
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = values => {
    const payload = {
      userId,
      orderId,
      stageId,
      nomineeName: values?.nomineeName,
      nomineeRelation: values?.nomineeRelation,
      nomineePhoneNo: values?.nomineeNumber,
      companyName: values?.companyName,
      companyEmailId: values?.companyEmail,
    };
    if (professionId === 1 && !verifiedEmail) {
      showToastNotification("verify email first", 3);
    } else {
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
        } else {
          showToastNotification(res?.data?.data?.message, 3);
        }
        console.log(res?.data?.data?.status, "pppppppppp");
      });
  };

  return (
    <div className={styles.wrapper}>
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
                        <label className={styles.label}>Company email ID</label>
                        <div
                          className={`${styles.label_input_style} flex justify-between`}>
                          <Field
                            type="email"
                            id="companyEmail"
                            name="companyEmail"
                            placeholder="Enter company email"
                            className="outline-none"
                            onChange={e => {
                              setFieldValue("companyEmail", e.target.value);
                              setEmail(e.target.value);
                            }}
                          />
                          <p
                            className={`${styles.verifyTxt}
                      ${!email ? "cursor-not-allowed" : "cursor-pointer"}`}
                            onClick={email ? handleEmailVerify : null}>
                            Verify
                          </p>
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
                          placeholder="Enter nominee’s name"
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
                                className={`flex gap-3 items-center cursor-pointer w-full lg:w-[502px] `}
                                key={index.toString()}>
                                <Field
                                  type="radio"
                                  name="nomineeRelation"
                                  value={item}
                                  className={styles.radio_button}
                                />
                                <p className="border w-full border-DDDDDF md:p-4 p-3 rounded-xl md:text-16 text-14 font-Poppins tracking-0.3 leading-6 text-71717A">
                                  {item}
                                </p>
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
                        <label className={styles.label}>Nominee’s number</label>

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
                            placeholder="Enter nominee’s number"
                            className="outline-none"
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
                  className={`${styles.proceed} 
            `}>
                  proceed
                  <OutlineArrowRight color={"#222222"} />
                </button>
              </Form>
            )}
          </Formik>
        </>
      )}

      {professionId === 2 && openGstSdk && (
        <GstSdk openGstSdk={openGstSdk} setOpenGstSdk={setOpenGstSdk} />
      )}
      <VerfiEmail
        openModal={openModal}
        setOpenModal={setOpenModal}
        email={email}
        recievedOtp={recievedOtp}
        setVerifiedEmail={setVerifiedEmail}
      />
    </div>
  );
}
