// import React, {useState} from "react";
// import styles from "../EducationalDetails/styles.module.css";
// import {BackIcon, CheckFillIcon} from "@/assets/icon";
// import {useDispatch, useSelector} from "react-redux";
// import {setKycScreenName} from "@/store/Slices";
// import uploading from "@/assets/common_icons/uploading.jpg";
// import commonStyles from "@/components/Documentation/common.module.css";
// import Image from "next/image";
// import TermsAndConditionsDrawer from "../../Documentation/TermsAndConditionsDrawer";

// export default function CurrentAddProof() {
//   const dispatch = useDispatch();
//   const selectedOrderId = useSelector(state => state.kycPage.orderId);

//   const [currentAddressProof, setCurrentAddressProof] = useState([]);
//   const [currentAddressProofType, setCurrentAddressProofType] = useState("");
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   useEffect(() => {
//     if (isReupload) {
//       const {cf_delivery_address_proof} = cibilDocsData;
//       setCurrentAddressProof(cf_delivery_address_proof || []);
//       setCurrentAddressProofType(
//         cf_delivery_address_proof?.[0]?.sub_doc_type || "",
//       );
//     } else {
//       setCurrentAddressProof([]);
//       setCurrentAddressProofType("");
//     }
//   }, [selectedOrderId, isReupload]);

//   const toggleDoItLaterToggle = bool => {
//     setOpenModal(bool);
//     dispatch(reduxSetModalState(bool));
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.heading}>
//         <BackIcon
//           color={"#222222"}
//           size={20}
//           onClick={() => dispatch(setKycScreenName("selectOrderId"))}
//           className={"cursor-pointer"}
//         />
//         Current address proof
//       </div>
//       <TermsAndConditionsDrawer
//         open={drawerOpen}
//         toggleDrawer={bool => setDrawerOpen(bool)}
//       />

//       <div className={`${styles.detail_wapper}`}>
//         <label
//           className={`flex items-center gap-2 ${styles.label_input_style}`}
//           htmlFor={"collegeId"}>
//           <Image
//             loader={({src}) => src}
//             src={uploading}
//             alt="Uploading Icon"
//             className={`${commonStyles.mdIBHidden}`}
//           />
//           <span className={`!pl-0 ${styles.chooseFile}`}>
//             {/* {item?.name || item?.doc_name} */}
//             Upload document(s)
//           </span>
//         </label>

//         <input
//           type="file"
//           multiple
//           accept="image/jpeg,image/jpg,image/png,application/pdf"
//           name="currentAddProof"
//           id="currentAddProof"
//           style={{display: "none"}}
//           //   onChange={e => {
//           //     handleFileInputChange(e);
//           //   }}
//         />
//         <>
//           <div className={commonStyles.animate_check_icon}>
//             <CheckFillIcon
//               color={"#2D9469"}
//               className={`${commonStyles.mdHiddemIcons}`}
//             />
//           </div>
//         </>
//       </div>
//     </div>
//   );
// }
