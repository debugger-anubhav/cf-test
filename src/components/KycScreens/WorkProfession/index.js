import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {BackIcon} from "../../../assets/icon";
import Dashboard from "../Dashboard";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

export default function WorkProfession({backState}) {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [professionList, setProfessionList] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const getProfessionList = () => {
    baseInstance
      .get(endPoints.kycPage.getKycProfessionList)
      .then(res => {
        setProfessionList(res?.data?.data);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setLoadingSkeleton(false);
      });
  };

  useEffect(() => {
    getProfessionList();
  }, []);

  useEffect(() => {
    console.log(professionList, loadingSkeleton);
  }, []);
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
            {professionList?.map((item, index) => {
              return (
                <div
                  className={styles.box}
                  key={index.toString()}
                  onClick={() => {
                    setOpenDashboard(true);
                  }}>
                  <img scr={""} alt="icon" />
                  <p className={styles.profession_type}>{item?.professions}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
