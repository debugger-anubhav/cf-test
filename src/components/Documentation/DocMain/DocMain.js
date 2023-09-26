import React from "react";
import styles from "./DocMain.module.css";
import DocSidebar from "../Sidebar/DocSidebar";
// import DropDown from "../DropDown/DropDown";
// import KYC90 from "../KYC90/KYC90";
import KycHeader from "../KycHeader/KycHeader";
// import KYC10 from "../KYC10/KYC10";
import KYC100 from "../KYC100/KYC100";

const DocMain = () => {
  // const [selectedOption] = useState("");

  // const handleSelectChange = e => {
  //   setSelectedOption(e.target.value);
  // };
  // const dummyArray = [
  //   {value: 1, label: "Option 1"},
  //   {value: 2, label: "Option 2"},
  //   {value: 3, label: "Option 3"},
  //   {value: 4, label: "Option 4"},
  //   {value: 5, label: "Option 5"},
  // ];

  return (
    <div className={styles.mainContainer}>
      <DocSidebar />
      <div className={styles.kycFormArea}>
        <KycHeader />
        {/* <KYC90 /> */}
        {/* <KYC10 /> */}
        <KYC100 />
        {/* <DropDown
          selectedOption={selectedOption}
          handleSelectChange={handleSelectChange}
          style={{}}
          useDefaultStyle={false}
          options={dummyArray}
        /> */}
      </div>
    </div>
  );
};

export default DocMain;
