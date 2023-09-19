import React, {useState} from "react";
import styles from "./DocMain.module.css";
import DocSidebar from "../Sidebar/DocSidebar";
import DropDown from "../DropDown/DropDown";

const DocMain = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = e => {
    setSelectedOption(e.target.value);
  };
  console.log(selectedOption);
  return (
    <div className={styles.mainContainer}>
      <DocSidebar />
      <div>
        <DropDown
          selectedOption={selectedOption}
          handleSelectChange={handleSelectChange}
          style={{}}
          useDefaultStyle={false}
        />
      </div>
    </div>
  );
};

export default DocMain;
