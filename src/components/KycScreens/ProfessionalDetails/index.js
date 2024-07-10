import React from "react";
import styles from "./styles.module.css";
import {BackIcon, OutlineArrowRight} from "../../../assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {setKycScreenName} from "@/store/Slices";
import {cityUrl} from "../../../../appConfig";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

export default function ProfessionalDetails() {
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const kycSliceData = useSelector(state => state.kycPage);
  const professionId = kycSliceData.selectedProfessionId;
  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;
  const stageId = kycSliceData.stageId;

  const nomineeRelation = ["Spouse/Partner", "Parent", "Parent", "Other"];

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
      .then(res => dispatch(setKycScreenName("dashboard")))
      .catch(err => console.log(err));
  };

  const handleSubmit = values => {
    console.log(values); // Handle form submission logic here
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
    saveProfessionalDetails(payload);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => dispatch(setKycScreenName("dashboard"))}
          className={"cursor-pointer"}
        />
        {professionId === 1
          ? "Professional details"
          : professionId === 2
          ? "GST certificate"
          : professionId === 3 || professionId === 4
          ? "Nominee’s details"
          : "Professional details"}
      </div>

      <Formik
        initialValues={initialValues()}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}>
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
                  <Field
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    placeholder="Enter company email"
                    className={styles.label_input_style}
                  />
                  <ErrorMessage
                    name="companyEmail"
                    component="div"
                    className="error-message"
                  />
                </div>
              </>
            )}

            {professionId === 2 && <>open gst sdk</>}

            {(professionId === 3 || professionId === 4) && (
              <>
                <div className={styles.company_detail_wapper}>
                  <label className={styles.label}>Nominee’s name</label>
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
                  <label className={styles.label}>Nominee’s relation</label>
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

          <button type="submit" className={styles.proceed}>
            proceed
            <OutlineArrowRight color={"#222222"} />
          </button>
        </Form>
      </Formik>
    </div>
  );
}
