import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {BackIcon} from "../../../assets/icon";
import Dashboard from "../Dashboard";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import Image from "next/image";
import {Skeleton} from "@mui/material";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

export default function WorkProfession({backState, orderId}) {
  const userId = decrypt(getLocalStorage("_ga"));
  const [openDashboard, setOpenDashboard] = useState(false);
  const [professionList, setProfessionList] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_CLOUDFRONT_BASE_URL;

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
  const handleClickProfession = professionId => {
    setOpenDashboard(true);
    baseInstance.post(endPoints.kycPage.saveKycProfessions, {
      userId,
      orderId: orderId?.dealCodeNumber,
      professionId,
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
            {loadingSkeleton ? (
              <>
                {[1, 2, 3, 4]?.map(item => {
                  return (
                    <div key={item.toString()}>
                      <Skeleton
                        variant="rectangular"
                        width={156}
                        height={117}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {professionList?.map((item, index) => {
                  return (
                    <div
                      className={styles.box}
                      key={index.toString()}
                      onClick={() => {
                        handleClickProfession(item?.id);
                      }}>
                      <Image
                        src={imageUrl + item?.icon}
                        alt="icon"
                        width={40}
                        height={40}
                      />
                      <p className={styles.profession_type}>
                        {item?.professions}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
