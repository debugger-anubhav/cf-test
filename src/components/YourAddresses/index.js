import React, {useState} from "react";
import styles from "./styles.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import SavedAddress from "./SavedAddresses";
import FormAddress from "./FormAddress";

const YourAddressesSection = () => {
  const [tab, setTab] = useState(0);
  const [id, setId] = useState();
  const editAddress = id => {
    setId(id);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        {tab === 0 ? (
          <SavedAddress
            editAddress={id => editAddress(id)}
            setTab={val => setTab(val)}
          />
        ) : (
          <FormAddress id={id} tab={tab} setTab={() => setTab(0)} />
        )}
      </div>
    </div>
  );
};

export default YourAddressesSection;
