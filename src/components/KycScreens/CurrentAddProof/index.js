import React, {useState, useEffect} from "react";
import styles from "@/components/Documentation/KYCAddress/KYCAddress.module.css";
import commonStyles from "@/components/Documentation/common.module.css";
import design from "./styles.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
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
import {useDispatch} from "react-redux";
import {setKycScreenName} from "@/store/Slices";
import RejectedDocsComponent from "@/components/Documentation/KYCAddress/RejectedDocsComponent";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

const CurrentAddressProof = ({
  cibilDocsData,
  showHeading,
  apiData,
  orderId,
  setActiveTab,
}) => {
  const dispatch = useDispatch();
  // const currentAddOptions = useSelector(state => state.kycPage.currentAddOpt);
  const isReupload = cibilDocsData?.userDocs?.length > 0;
  const [currAddModal, setCurrAddModal] = useState(false);
  const [perAddModal, setPerAddModal] = useState(false);
  const [docsData, setDocsData] = useState();
  const [selectedOptionCur, setSelectedOptionCur] = useState({});
  const [selectedOptionPer, setSelectedOptionPer] = useState({});
  // const [dropdownOpt, setDropdownOpt] = useState(
  //   currentAddOptions?.supported_docs?.split(","),
  // );
  console.log(docsData);
  // const dataForSelectDrawer = apiData?.map(item => item.doc_name);
  const dataForSelectDrawer = apiData.map(item => ({
    doc_name: item.doc_name,
    doc_id: item.doc_id,
  }));

  // useEffect(() => {
  //   setDropdownOpt(currentAddOptions?.supported_docs?.split(","));
  // }, [currentAddOptions]);

  const [formData, setFormData] = useState({
    addressProof: [],
    addressProofType: "",
    currentAddressProof: [],
    currentAddressProofType: "",
  });
  const [formErrors, setFormErrors] = useState({
    addressProof: "",
    addressProofType: "",
    currentAddressProof: "",
    currentAddressProofType: "",
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
  };

  const handleDeleteFile = (val, index) => {
    if (val === "addressProof") {
      const temp = [...formData.addressProof];
      temp.splice(index, 1);
      setFormData({...formData, addressProof: temp});
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

  const validateForm = () => {
    const error = formErrors;
    if (!formData?.addressProof?.length > 0) {
      error.addressProof = "Please upload the current address proof";
    } else {
      error.addressProof = "";
    }
    if (!formData?.addressProofType) {
      error.addressProofType = "Please select the current address proof type.";
    } else {
      error.addressProofType = "";
    }
    setFormErrors({...error});
    return !!Object.values(error).filter(Boolean).length;
  };

  const submitHandler = () => {
    const isError = validateForm();
    if (isError) {
      console.log(formErrors, "formErrors");
    }

    const allData = new FormData();

    for (let i = 0; i < formData.addressProof.length; i++) {
      allData.append("doc", formData.addressProof[i]);
    }
    const selectedDocId = dataForSelectDrawer?.find(
      option => option.doc_name === selectedOptionPer?.value,
    );
    allData.append(
      "docDetail",
      JSON.stringify({
        doc_id: selectedDocId?.doc_id,
        subDocType: selectedOptionPer?.value,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    allData.append("orderId", orderId);

    if (Object.values(formErrors).filter(Boolean).length === 0) {
      baseInstance
        .post(endPoints.kycPage.uploadManuallyDoc, allData)
        .then(res => {
          dispatch(setKycScreenName("dashboard"));
          if (res?.data?.data?.status) {
            showToastNotification(res?.data?.data?.message, 1);
            setActiveTab(0);
            window?.location?.reload();
          }
        })
        .catch(err => {
          showToastNotification(err?.message, 3);
          console.log(err?.message || "some error");
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
        addressProof,
        currentAddressProof,
        currentAddressProofType: currentAddressProof?.[0]?.sub_doc_type || "",
        addressProofType: addressProof?.[0]?.sub_doc_type || "",
      });
    } else {
      setFormData({
        addressProof: [],
        currentAddressProof: [],
        currentAddressProofType: "",
        addressProofType: "",
      });
      setFormErrors({
        addressProof: "",
        addressProofType: "",
        currentAddressProof: "",
        currentAddressProofType: "",
      });
    }
  }, [orderId, isReupload]);

  return (
    <div>
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

      {showHeading && (
        <div className={design.heading}>
          <BackIcon
            color={"#222222"}
            size={20}
            onClick={() => dispatch(setKycScreenName("dashboard"))}
            className={"cursor-pointer"}
          />
          Current address proof
        </div>
      )}
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Current address proof
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown
          options={dataForSelectDrawer?.map(i => ({
            label: i.doc_name,
            value: i.doc_name,
          }))}
          // options={docsData?.[1]?.supported_docs
          //   .split(",")
          //   ?.map(i => ({label: i, value: i}))}
          setIsDDOpen={setPerAddModal}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
          maxWidth=""
          optionsActive="md:block hidden"
          currAddModal={currAddModal}
          perAddModal={perAddModal}
          docsData={dataForSelectDrawer}
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

      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            onClick={() => {
              submitHandler();
            }}
            className={`${commonStyles.saveBtn} ${styles.saveBtn}`}>
            <span>Proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentAddressProof;
