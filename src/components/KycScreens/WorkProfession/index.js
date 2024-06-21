import React, {useState} from "react";
import styles from "./styles.module.css";
import {BackIcon} from "../../../assets/icon";
import Dashboard from "../Dashboard";

export default function WorkProfession({backState}) {
  const [openDashboard, setOpenDashboard] = useState(false);
  return (
    <div className={styles.wrapper}>
      {openDashboard ? (
        <Dashboard setOpenDashboard={setOpenDashboard} />
      ) : (
        <div>
          <div className={styles.heading}>
            <BackIcon
              color={"#222222"}
              size={20}
              onClick={() => backState(false)}
              className={"cursor-pointer"}
            />
            Working profession
          </div>
          <div className={styles.sub_heading}>
            Let’s start with getting to know your profession
          </div>
          <div className={styles.profession_wrapper}>
            {[1, 2, 3, 4]?.map((item, index) => {
              return (
                <div
                  className={styles.box}
                  key={index.toString()}
                  onClick={() => {
                    setOpenDashboard(true);
                  }}>
                  <img scr={""} alt="icon" />
                  <p className={styles.profession_type}>Salaried</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
