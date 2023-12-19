import React, {useState} from "react";
import styles from "../style.module.css";

const ModalContentForMultipleEmails = ({
  contact,
  setModalCategory,
  setStartCountdown,
  handleMultipleEmails,
}) => {
  const data = [
    "dummyemaildummyemaildummyemail@abc.com",
    "dummyemail@abc.com",
    "dummyemail@aboc.com",
  ];
  const [selectedEmail, setSelectedEmail] = useState(data[0]);

  return (
    <div>
      <p className={styles.desc}>You are signing in with this number:</p>
      <div className="flex gap-2">
        <p className={`!text-222 ${styles.desc}`}>{contact}</p>
        <p
          onClick={() => {
            setModalCategory("changeNumber");
            setStartCountdown(false);
          }}
          className={styles.blue_txt}>
          change?
        </p>
      </div>
      <div className="mt-8">
        <p className={styles.desc}>
          Looks like your mobile number is linked to 3 different email
          addresses.
        </p>
        <p className={`font-medium ${styles.desc}`}>
          Please select and verify your email email from the list below:
        </p>
        <div className={styles.radio_emails}>
          {data?.map((item, index) => (
            <div key={index} className={styles.email_row}>
              <div
                className={styles.radio_outer_circle}
                onClick={() => setSelectedEmail(item)}>
                <div
                  className={`${
                    selectedEmail === item ? styles.radio_inner_circle : ""
                  }`}></div>
              </div>
              <p className={`!font-normal ${styles.blue_txt}`}>{item}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleMultipleEmails(selectedEmail)}
          className={styles.proceed_btn}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ModalContentForMultipleEmails;
