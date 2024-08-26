import React, {useState, useEffect} from "react";
import styles from "@/components/Documentation/KYCAddress/KYCAddress.module.css";
import design from "./styles.module.css";
import commonStyles from "@/components/Documentation/common.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import {cityUrl} from "../../../../appConfig";
import DropDown from "@/components/Documentation/DropDown/DropDown";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  BackIcon,
  CheckFillIcon,
  DeleteIcon,
  DeleteIconFilled,
  InformationIcon,
  OutlineArrowRight,
} from "@/assets/icon";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import DoItLater from "@/components/Documentation/DoItLaterModal/DoItLater";
import {reduxSetModalState, setKycScreenName} from "@/store/Slices";
import RejectedDocsComponent from "@/components/Documentation/KYCAddress/RejectedDocsComponent";
import ProgressSection from "../ProgressBar/index";
const PersonalDetails = ({handleKycState, cibilDocsData}) => {
  const dispatch = useDispatch();

  const selectedOrderId = useSelector(state => state.kycPage.orderId);
  const isReupload = cibilDocsData?.userDocs?.length > 0;

  const [currAddModal, setCurrAddModal] = useState(false);
  const [perAddModal, setPerAddModal] = useState(false);
  const [docsData, setDocsData] = useState();
  const [orderId] = useState(selectedOrderId);
  const [selectedOptionCur, setSelectedOptionCur] = useState({});
  const [selectedOptionPer, setSelectedOptionPer] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [formData, setFormData] = useState({
    contactNumber: "",
    addressProof: [], // You can add more fields as needed
    addressProofType: "",
    currentAddressProof: [],
    currentAddressProofType: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({
    contactNumber: "",
    addressProof: "",
    addressProofType: "",
    currentAddressProof: "",
    currentAddressProofType: "",
    termsAccepted: "",
  });

  const getAddProofList = () => {
    baseInstance
      .get(endPoints.addressProofList)
      .then(res => {
        setDocsData(res?.data?.data);
      })
      .catch(err => console.log(err?.message || "some error"));
  };
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const handleFileInputChange = e => {
    const file = e.target.files;
    const temp =
      e.target.name === "addressProof"
        ? [...formData.addressProof]
        : [...formData.currentAddressProof];

    const fileArray = Object.keys(file).map(key => {
      return file[key];
    });
    const newArr = temp.concat(fileArray);
    if (e.target.name === "addressProof") {
      if (file) {
        setFormData(prev => {
          return {...prev, addressProof: newArr};
        });
        if (!allowedFileTypes.includes(newArr?.[0]?.type)) {
          setFormErrors(prev => ({
            ...prev,
            addressProof: "Please select jpg,png, pdf or jpeg file",
          }));
        } else {
          setFormErrors(prev => ({
            ...prev,
            addressProof: "",
          }));
        }
      }
    }
    if (e.target.name === "currrentAdd") {
      if (file) {
        setFormData(prev => {
          return {...prev, currentAddressProof: newArr};
        });
        if (!allowedFileTypes.includes(newArr?.[0]?.type)) {
          setFormErrors(prev => ({
            ...prev,
            currentAddressProof: "Please select jpg,png, pdf or jpeg file",
          }));
        } else {
          setFormErrors(prev => ({
            ...prev,
            currentAddressProof: "",
          }));
        }
      }
    }
  };

  const handleDeleteFile = (val, index) => {
    if (val === "addressProof") {
      const temp = [...formData.addressProof];
      temp.splice(index, 1);
      setFormData({...formData, addressProof: temp});
    }
    if (val === "currentAddProof") {
      const temp = [...formData.currentAddressProof];
      temp.splice(index, 1);
      setFormData({...formData, currentAddressProof: temp});
    }
  };

  const handleOptionClickPer = option => {
    setFormErrors({...formErrors, addressProofType: ""});
    setFormData({...formData, addressProofType: option?.value});
    setSelectedOptionPer(option);
    setPerAddModal(false);
    setCurrAddModal(false);
  };
  const handleOptionClickCur = option => {
    setFormErrors({...formErrors, currentAddressProofType: ""});
    setFormData({...formData, currentAddressProofType: option?.value});
    setSelectedOptionCur(option);
    setCurrAddModal(false);
    setPerAddModal(false);
  };

  const handleContactBlur = () => {
    const regPat = /[!@#$%^&*()_+{}:;<>,.?~\\/\s]/;
    if (formData?.contactNumber?.length < 10) {
      setFormErrors(prev => ({
        ...prev,
        contactNumber:
          "Oops! Looks like you missed some digits. Please enter complete 10 digit number.",
      }));
    } else if (
      formData?.contactNumber?.length > 10 &&
      regPat.test(formData?.contactNumber)
    ) {
      setFormErrors(prev => ({
        ...prev,
        contactNumber:
          "Please enter a valid 10 digit phone number without spaces or special characters.",
      }));
      return null;
    } else if (formData?.contactNumber?.length > 10) {
      setFormErrors(prev => ({
        ...prev,
        contactNumber:
          "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.",
      }));
      return null;
    } else {
      setFormErrors(prev => ({
        ...prev,
        contactNumber: "",
      }));
      return null;
    }
  };

  const validateForm = () => {
    const regPat = /[!@#$%^&*()_+{}:;<>,.?~\\/\s]/;
    const error = formErrors;

    if (!formData?.addressProof?.length > 0) {
      error.addressProof = "Please upload the address proof";
    } else {
      error.addressProof = "";
    }
    if (!formData?.currentAddressProof?.length > 0) {
      error.currentAddressProof = "Please upload the address proof";
    } else {
      error.currentAddressProof = "";
    }
    if (!formData?.termsAccepted) {
      error.termsAccepted = "You must accept the terms and conditions.";
    } else {
      error.termsAccepted = "";
    }
    if (!formData?.addressProofType) {
      error.addressProofType = "Please select the address proof type.";
    } else {
      error.addressProofType = "";
    }
    if (!formData?.currentAddressProofType) {
      error.currentAddressProofType = "Please select the address proof type.";
    } else {
      error.currentAddressProofType = "";
    }
    if (formData?.contactNumber?.length < 10) {
      error.contactNumber =
        "Oops! Looks like you missed some digits. Please enter complete 10 digit number.";
    } else if (
      formData?.contactNumber?.length > 10 &&
      regPat.test(formData?.contactNumber)
    ) {
      error.contactNumber =
        "Please enter a valid 10 digit phone number without spaces or special characters.";
    } else if (formData?.contactNumber?.length > 10) {
      error.contactNumber =
        "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.";
    } else {
      error.contactNumber = "";
    }
    setFormErrors({...error});
    // handleContactBlur();
    return !!Object.values(error).filter(Boolean).length;
  };

  const submitHandler = () => {
    const isError = validateForm();
    if (isError) {
      return;
    }
    for (const key in formErrors) {
      if (Object.hasOwnProperty.call(formErrors, key)) {
        const element = formErrors[key];
        if (element) {
          return;
        }
      }
    }
    setDisableButton(true);
    const allData = new FormData();
    allData.append(
      "permanentAddressProof",
      JSON.stringify({
        doc_id: "cf_permanent_address_proof",
        subDocType: selectedOptionPer?.value,
        // docImageName: formData?.addressProof?.name,
      }),
    );
    allData.append(
      "currentAddressProof",
      JSON.stringify({
        doc_id: "cf_delivery_address_proof",
        subDocType: selectedOptionCur?.value,
        // docImageName: formData?.addressProof?.name,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    allData.append("alternateMobNo", formData?.contactNumber);
    for (let i = 0; i < formData.addressProof.length; i++) {
      allData.append("cf_permanent_address_proof", formData.addressProof[i]);
    }
    for (let i = 0; i < formData.currentAddressProof.length; i++) {
      allData.append(
        "cf_delivery_address_proof",
        formData.currentAddressProof[i],
      );
    }
    // allData.append("cf_delivery_address_proof", formData.currentAddressProof);
    allData.append("orderId", orderId);
    if (Object.values(formErrors).filter(Boolean).length === 0) {
      baseInstance
        .post(endPoints.uploadAddressDocs, allData)
        .then(res => {
          handleKycState(selectedOrderId);
          setDisableButton(false);
        })
        .catch(err => {
          console.log(err?.message || "some error");
          setDisableButton(false);
        });
    }
  };

  useEffect(() => {
    getAddProofList();
  }, []);

  useEffect(() => {
    if (isReupload) {
      const addressProof = cibilDocsData?.cf_permanent_address_proof;
      const currentAddressProof = cibilDocsData?.cf_delivery_address_proof;

      setFormData({
        ...formData,
        contactNumber: cibilDocsData?.userDocs?.[0]?.ownercontact,
        addressProof,
        currentAddressProof,
        currentAddressProofType: currentAddressProof?.[0]?.sub_doc_type || "",
        addressProofType: addressProof?.[0]?.sub_doc_type || "",
      });
    } else {
      setFormData({
        contactNumber: "",
        addressProof: [],
        currentAddressProof: [],
        currentAddressProofType: "",
        addressProofType: "",
      });
      setFormErrors({
        contactNumber: "",
        addressProof: "",
        addressProofType: "",
        currentAddressProof: "",
        currentAddressProofType: "",
        termsAccepted: "",
      });
    }
  }, [selectedOrderId, isReupload]);

  const toggleDoItLaterToggle = bool => {
    setOpenModal(bool);
    dispatch(reduxSetModalState(bool));
  };

  return (
    <div>
      <DoItLater
        closeModal={() => toggleDoItLaterToggle(false)}
        isModalOpen={openModal}
      />
      {isReupload && (
        <div className={commonStyles.reupload_note_wrapper}>
          <InformationIcon className={`mt-0.5 ${commonStyles.reupload_icon}`} />
          <p className={commonStyles.reupload_note_txt}>
            Your document(s) have been rejected by our team for not meeting the
            necessary standards. Please re-upload them to proceed with KYC
            process.
          </p>
        </div>
      )}
      <div className="flex w-full justify-between items-center">
        <div className={design.heading}>
          <BackIcon
            color={"#222222"}
            size={20}
            onClick={() => dispatch(setKycScreenName("selectOrderId"))}
            className={"cursor-pointer"}
          />
          Personal details
        </div>
        <div>
          <ProgressSection />
        </div>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Alternative number
        </span>
      </div>
      <div className={`${styles.formInputFirst} sm:w-[505px] `}>
        <div
          className={`flex gap-2 items-center ${
            isReupload && "!cursor-not-allowed"
          } ${styles.form_input} `}>
          <img
            src={`${cityUrl + "india-icon.svg"}`}
            className={styles.flag}
            alt="India-icon"
            loading="lazy"
          />
          <input
            type="text"
            readOnly={isReupload}
            value={formData.contactNumber}
            name="contactNumber"
            placeholder="Enter 10 digit number "
            className={`${isReupload && "!cursor-not-allowed"} ${
              styles.contact_input
            }`}
            onChange={e => {
              setFormData(prev => ({...prev, contactNumber: e.target.value}));
            }}
            onBlur={() => {
              handleContactBlur();
            }}
          />
        </div>
      </div>
      {formErrors.contactNumber && (
        <div className={`${commonStyles.basicErrorStyles}`}>
          {formErrors.contactNumber}
        </div>
      )}
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Permanent address proof
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown
          options={docsData?.[1]?.supported_docs
            .split(",")
            ?.map(i => ({label: i, value: i}))}
          setIsDDOpen={setPerAddModal}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
          maxWidth=""
          optionsActive="md:block hidden"
          currAddModal={currAddModal}
          perAddModal={perAddModal}
          docsData={docsData}
          setCurrAddModal={setCurrAddModal}
          setPerAddModal={setPerAddModal}
          handleOptionClickCur={handleOptionClickCur}
          handleOptionClickPer={handleOptionClickPer}
          selectedOptionPer={selectedOptionPer}
          selectedOptionCur={selectedOptionCur}
          addressScreen
          value={
            isReupload &&
            cibilDocsData?.cf_permanent_address_proof?.length > 0 &&
            formData?.addressProofType
          }
        />
      </div>
      {formErrors.addressProofType && (
        <div className={`${commonStyles.basicErrorStyles}`}>
          {formErrors.addressProofType}
        </div>
      )}

      {formData?.addressProof?.length > 0 &&
        formData?.addressProof?.map((item, index) => (
          <div key={index} className={styles.map_row_wrapper}>
            <div className={`${styles.formInputFirst}`}>
              <div className="flex items-center">
                <label
                  className={`${
                    commonStyles.basicInputStyles
                  } md:w-[232px] block  ${
                    !formErrors.addressProof &&
                    formData.addressProof?.length > 0
                      ? "text-black"
                      : "text-[#71717a] "
                  }`}>
                  <div
                    className={`${commonStyles.flexICenter} gap-2 justify-between md:justify-normal`}>
                    <Image
                      loader={({src}) => src}
                      src={uploading}
                      alt="Uploading Icon"
                      className={`${commonStyles.mdIBHidden}`}
                    />
                    <span className={`!pl-0 ${styles.chooseFile}`}>
                      {item?.name || item?.doc_name}
                    </span>
                    <>
                      <div className={commonStyles.animate_check_icon}>
                        <CheckFillIcon
                          color={"#2D9469"}
                          className={`${commonStyles.mdHiddemIcons}`}
                        />
                      </div>
                    </>
                  </div>
                  {isReupload &&
                  cibilDocsData?.cf_permanent_address_proof?.length > 0 ? (
                    <></>
                  ) : !formErrors.addressProof &&
                    formData.addressProof?.length > 0 ? (
                    <div className={`${commonStyles.correctFile}`}></div>
                  ) : (
                    <></>
                  )}
                </label>
                {cibilDocsData?.cf_permanent_address_proof?.length === 0 && (
                  <span
                    onClick={e => {
                      handleDeleteFile("addressProof", item);
                    }}>
                    <DeleteIcon
                      color={"#71717A"}
                      className={`${commonStyles.mdHiddemIcons} ml-3`}
                    />
                  </span>
                )}
              </div>
            </div>
            {isReupload &&
            cibilDocsData?.cf_permanent_address_proof?.length > 0 ? (
              <div className="hidden md:flex ml-2">
                <CheckFillIcon
                  color={"#2D9469"}
                  className="w-[18px] h-[18px]"
                />
              </div>
            ) : (
              <div className={`hidden md:flex ${styles.check_wrapper}`}>
                <div className={styles.showCheckCircle} id="showCheckCircle">
                  <CheckFillIcon color="#2D9469" className="w-full h-full" />
                </div>
                <div
                  id="showDeleteIcon"
                  className={styles.showDeleteIcon}
                  onClick={() => handleDeleteFile("addressProof", index)}>
                  <DeleteIconFilled
                    color={"#ffffff"}
                    className={styles.delete_icon_filled}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

      {isReupload &&
        cibilDocsData?.cf_permanent_address_proof?.length === 0 && (
          <RejectedDocsComponent
            array={cibilDocsData?.userDocs}
            docType={"cf_permanent_address_proof"}
          />
        )}

      <div className={`${styles.formInputFirst} !mt-2`}>
        <div className="flex items-center">
          <label
            htmlFor="addressProof"
            className={`${
              isReupload &&
              cibilDocsData?.cf_permanent_address_proof?.length > 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } ${
              commonStyles.basicInputStyles
            } md:w-[232px] block  text-[#71717a]`}>
            <div className={`${commonStyles.flexICenter}`}>
              <Image
                loader={({src}) => src}
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdHiddenIB}`}
                loading="lazy"
              />

              <Image
                loader={({src}) => src}
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdIBHidden}`}
                loading="lazy"
              />
              <span className={`${styles.chooseFile}`}>Choose file(s)</span>
            </div>
          </label>
        </div>

        <input
          disabled={
            isReupload
              ? cibilDocsData?.cf_permanent_address_proof?.length > 0
              : false
          }
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          name="addressProof"
          id="addressProof"
          style={{display: "none"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
        />
      </div>

      {formErrors.addressProof && (
        <div className={`${commonStyles.basicErrorStyles} `}>
          {formErrors.addressProof}
        </div>
      )}

      {isReupload && cibilDocsData?.cf_delivery_address_proof?.length === 0 && (
        <RejectedDocsComponent
          array={cibilDocsData?.userDocs}
          docType={"cf_delivery_address_proof"}
        />
      )}

      <div className={`${styles.formInputFirst} !mt-2`}>
        <div className="flex items-center">
          <label
            htmlFor="currrentAdd"
            className={`${
              isReupload && cibilDocsData?.cf_delivery_address_proof?.length > 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } ${
              commonStyles.basicInputStyles
            } md:w-[232px] block ${"text-[#71717a] "}`}>
            <div className={`${commonStyles.flexICenter} `}>
              <Image
                loader={({src}) => src}
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdHiddenIB}`}
                loading="lazy"
              />

              <Image
                loader={({src}) => src}
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdIBHidden}`}
                loading="lazy"
              />
              <span className={`${styles.chooseFile}`}>Choose file(s)</span>
            </div>
          </label>
        </div>

        <input
          type="file"
          disabled={
            isReupload
              ? cibilDocsData?.cf_delivery_address_proof?.length > 0
              : false
          }
          multiple
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          name="currrentAdd"
          id="currrentAdd"
          style={{display: "none", cursor: "pointer"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
        />
      </div>

      {formErrors.currentAddressProof && (
        <div className={`${commonStyles.basicErrorStyles} `}>
          {formErrors.currentAddressProof}
        </div>
      )}

      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            disabled={disableButton}
            onClick={() => {
              submitHandler();
            }}
            className={`${commonStyles.saveBtn} ${styles.saveBtn} ${
              disableButton && "!bg-[#FFDF85]"
            } `}>
            <span>Proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
