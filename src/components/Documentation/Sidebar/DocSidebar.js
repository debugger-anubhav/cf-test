import React, {useEffect, useState} from "react";
import Link from "next/link";
import styles from "./docSidebar.module.css";
import cookie from "react-cookies";
import {useRouter} from "next/navigation";
import {getLocalStorage} from "@/constants/constant";
import {Skeleton} from "@mui/material";
import Cookies from "universal-cookie";
import {setShoppingCartTab} from "@/store/Slices";
import {useDispatch} from "react-redux";

const DocSidebar = ({isOverviewSelected = false}) => {
  const [isActive, setIsActive] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const authCookies = new Cookies();
  const [userName, setUserName] = useState(null);

  const getUserNameFromLocalStorage = () => {
    const storedUserName = getLocalStorage("user_name");
    setUserName(storedUserName || "Hello User");
  };

  useEffect(() => {
    getUserNameFromLocalStorage();
  }, []);

  const url =
    typeof window !== "undefined" && window?.location.pathname.split("/")[1];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (url === "referral") {
        setIsActive("Referral Code");
      }
    }
  }, []);

  const firstContainerArr = [
    {heading: "My orders", link: "/purchases"},
    {
      heading: "My Service Requests",
      link: "/service-requests",
    },
    {heading: "My Payments", link: "/payments"},
    {heading: "My Invoices", link: "/invoices"},
  ];
  const secondContainerArr = [
    {heading: "CF coins", link: "/wallet"},
    {
      heading: "Referral Code",
      link: "/referral",
    },
  ];
  const thirdContainerArr = [
    {
      heading: "KYC & Documentation",
      link: "documentation",
    },
    {
      heading: "Profile Settings",
      link: "/profilesettings",
    },
    {heading: "Your Addresses", link: "/usersettings/yourAddresses"},
  ];

  const onLogout = () => {
    if (typeof window !== "undefined") {
      cookie.remove("ci_sessions");
      authCookies.remove("authToken", {path: "/"});
      localStorage.removeItem("tempUserID");
      localStorage.removeItem("user_id");
      localStorage.removeItem("_ga");
      localStorage.removeItem("user_name");
      localStorage.removeItem("ci_session");
      location.reload();
      dispatch(setShoppingCartTab(0));
      router.push("/");
    }
  };

  return (
    <div
      className={`${styles.mainContainer} ${
        url === "referral" && "pb-[220px]"
      }`}>
      <div className={styles.firstContainer}>
        <div className={styles.sectionHeadings}>Your Account,</div>
        <div className={styles.userNameText}>{userName}</div>
        <h2
          className={`${isOverviewSelected ? "!text-5774AC" : "!text-45454A"} ${
            styles.sectionItems
          } !mt-10 !mb-0`}>
          Overview
        </h2>
      </div>
      <MenuComp
        list={firstContainerArr}
        heading={"Orders"}
        setIsActive={setIsActive}
        isActive={isActive}
      />
      <MenuComp
        list={secondContainerArr}
        heading={"Benefits"}
        setIsActive={setIsActive}
        isActive={isActive}
      />
      <MenuComp
        list={thirdContainerArr}
        heading={"Account"}
        setIsActive={setIsActive}
        isActive={isActive}
      />
      <div className={styles.logoutTxt} onClick={onLogout}>
        Logout
      </div>
    </div>
  );
};

export default DocSidebar;

const MenuComp = ({list, heading, isActive, setIsActive}) => {
  const router = useRouter();

  return (
    <div
      className={`${heading === "Account" && styles.border_none} ${
        styles.secondContainer
      }`}>
      <h2 className={styles.sectionHeadings}>{heading}</h2>
      {list?.map((i, index) => {
        return (
          <Link
            key={index.toString()}
            href={i?.link}
            className={`${
              isActive === i.heading
                ? styles.sectionItemsActive
                : styles.sectionItems
            } block`}>
            <button
              className={styles.side_label}
              value={i.heading}
              onClick={e => {
                e.preventDefault();
                setIsActive(e.target.value);
                router.push(i?.link);
              }}>
              {i.heading}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export const DocSidebarSkeleton = () => {
  return (
    <div className={`${styles.mainContainer_skeleton}`}>
      <div className={styles.firstContainer}>
        <div className={styles.firstContainer_skeleton_div}>
          <Skeleton
            variant="text"
            className={styles.skeleton_full_width_height}
          />
        </div>
        <div className="w-20 h-4">
          <Skeleton
            variant="text"
            className={styles.skeleton_full_width_height}
          />
        </div>
      </div>
      <div className={styles.skeleton_menu_docsidebar}>
        <div>
          {[1, 2].map(ele => {
            return (
              <div
                className={styles.skeleton_menu_mapping}
                key={ele.toString()}>
                <div className="w-36 h-2 mb-6">
                  <Skeleton
                    variant="text"
                    className={styles.skeleton_full_width_height}
                  />
                </div>

                {[1, 2, 3, 4].map(item => {
                  return (
                    <div className="w-36 h-4 mb-3" key={item.toString}>
                      <Skeleton
                        variant="text"
                        className={styles.skeleton_full_width_height}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.logoutTxt_skeleton}>
        <Skeleton
          variant="text"
          className={styles.skeleton_full_width_height}
        />
      </div>
    </div>
  );
};
