import React, {useState} from "react";
import DropDown from "../Documentation/DropDown/DropDown";
import styles from "../Documentation/KYCAddress/KYCAddress.module.css";
import commonStyles from "../Documentation/common.module.css";
import {CheckFillIcon} from "@/assets/icon";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";

function UploadNewDocs() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedOpt, setselectedOpt] = useState(0);
  return (
    <div className="px-6 pb-6">
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Current address proofs
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown
          options={["wew", "wewe", "wqewe"]?.map(i => ({label: i, value: i}))}
          setIsDDOpen={setOpenDropDown}
          isOpen={openDropDown}
          setSelectedOption={setselectedOpt}
          selectedOption={selectedOpt}
          //   maxWidth=""
          //   optionsActive="md:block hidden"
          //   docsData={docsData}
          //   setCurrAddModal={setCurrAddModal}
          //   setPerAddModal={setPerAddModal}
          //   handleOptionClickCur={handleOptionClickCur}
          //   handleOptionClickPer={handleOptionClickPer}
          //   selectedOptionCur={selectedOptionCur}
          //   selectedOptionPer={selectedOptionPer}
          //   addressScreen
          //   value={
          //     isReupload &&
          //     cibilDocsData?.cf_delivery_address_proof?.length > 0 &&
          //     formData?.currentAddressProofType
          //   }
        />
      </div>

      <div className={styles.map_row_wrapper}>
        <div className={`${styles.formInputFirst}  cursor-pointer`}>
          <div className="flex items-center">
            <label
              className={`${commonStyles.basicInputStyles} md:w-[232px] block  `}>
              <div
                className={`${commonStyles.flexICenter} gap-2 justify-between md:justify-normal`}>
                <Image
                  loader={({src}) => src}
                  src={uploading}
                  alt="Uploading Icon"
                  className={`${commonStyles.mdIBHidden}`}
                  loading="lazy"
                />
                <span className={`!pl-0 ${styles.chooseFile}`}>
                  {/* {item?.name || item?.doc_name} */}
                  upload
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
            </label>
            {/* {cibilDocsData?.cf_delivery_address_proof?.length === 0 && (
              <span
                onClick={e => {
                  handleDeleteFile("currentAddProof", item);
                }}>
                <DeleteIcon
                  color={"#71717A"}
                  className={`${commonStyles.mdHiddemIcons} ml-3`}
                />
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadNewDocs;
