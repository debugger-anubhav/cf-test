import React, {useState} from "react";
import styles from "./styles.module.css";
import {useParams, useRouter} from "next/navigation";
import {
  BackIcon,
  ForwardArrowWithLine,
  IconLink,
  Lock,
  Rupee,
  Sparkles,
} from "../../../assets/icon";
// import ProductsDrawer from "./ProductsDrawer/ProductsDrawer";
import {productImageBaseUrl} from "@/constants/constant";
import CitymaxDetailPageDrawer from "./CitymaxDetailPageDrawer/index";

const CitymaxPlanDetail = () => {
  const router = useRouter();
  const params = useParams();
  const [isHalfYearly, setHalfYearly] = useState(params.tenure === 6);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [roomId, setRoomId] = useState();
  const [slotId, setSlotId] = useState();
  const [drawerType, setDrawerType] = useState();

  const dummy = [
    {
      type: "Bedroom 1",
      roomId: 1,
      ameneties: [
        {
          icon: "",
          name: "Bed",
          slotId: 1,
        },
        {
          icon: "",
          name: "Bedside Table",
          slotId: 2,
        },
        {
          icon: "",
          name: "Matress",
          slotId: 3,
        },
      ],
    },
    {
      type: "Bedroom 2",
      roomId: 2,
      ameneties: [
        {
          icon: "",
          name: "Bed",
          slotId: 1,
        },
        {
          icon: "",
          name: "Bedside Table",
          slotId: 2,
        },
        {
          icon: "",
          name: "Matress",
          slotId: 3,
        },
      ],
    },
    {
      type: "Living Room",
      roomId: 3,
      ameneties: [
        {
          icon: "",
          name: "Sofa set",
          slotId: 1,
        },
        {
          icon: "",
          name: "Coffee Table",
          slotId: 2,
        },
        {
          icon: "",
          name: "Storage and organizers",
          slotId: 3,
        },
      ],
    },
  ];
  const [arr, setArr] = useState(dummy);

  const toggleDrawer = type => {
    setDrawerType(type);
    setOpenDrawer(!openDrawer);
  };

  const handleAddItem = imgurl => {
    console.log("innnn");
    const index = arr.findIndex(t => t.roomId === roomId);
    const indexOfCategory = arr[index].ameneties.findIndex(
      c => c.slotId === slotId,
    );
    console.log(index, indexOfCategory, "logicc");
    const newArr = [...arr];
    newArr[index].ameneties[indexOfCategory] = {
      ...newArr[index].ameneties[indexOfCategory],
      selectedProduct: imgurl,
    };
    setArr(newArr);
    toggleDrawer();
  };

  return (
    <div className={styles.main}>
      <div className={styles.left_div}>
        <div
          className={styles.header_wrapper}
          onClick={() => router.push(`/citymax`)}>
          <BackIcon className={styles.back_icon} />
          <h1 className={styles.head}>CityMax Pro</h1>
        </div>
        <p className={styles.tag_line}>Best suited for a 2BHK apartment</p>
        <p className={`!text-71717A !mt-8 ${styles.tag_line}`}>
          Click on the placeholders below and choose your desired products.
        </p>

        <div className={styles.plans_wrapper}>
          {arr.map((item, index) => (
            <div key={index}>
              <div className={styles.type_wrapper}>
                <p className={styles.type_txt}>{item.type}</p>
                <p className={styles.selected_text}>
                  0 out of 3 products selected
                </p>
              </div>
              <div className={styles.amen_wrapper}>
                {item.ameneties.map((t, i) => (
                  <div
                    onClick={() => {
                      toggleDrawer(1);
                      setRoomId(item.roomId);
                      setSlotId(t.slotId);
                    }}
                    key={i}
                    className={styles.amenity_box}>
                    {t.selectedProduct ? (
                      // <div>
                      <img
                        src={productImageBaseUrl + t.selectedProduct}
                        className="w-full h-full"
                      />
                    ) : (
                      // </div>
                      <>
                        <img
                          src={IconLink + t.icon}
                          className={styles.product_icon}
                        />
                        <p className={styles.product_name}>{t.name}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {openDrawer && (
        <CitymaxDetailPageDrawer
          open={openDrawer}
          toggleDrawer={toggleDrawer}
          handleAddItem={handleAddItem}
          type={drawerType}
        />
      )}

      <div className={styles.right_div}>
        <div className={styles.monthly_toggler}>
          <p
            onClick={() => {
              setHalfYearly(true);
            }}
            className={`${
              isHalfYearly
                ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                : "bg-transparent"
            } ${styles.pref_mode_text}`}>
            6 months
          </p>
          <p
            onClick={() => {
              setHalfYearly(false);
            }}
            className={`${
              isHalfYearly
                ? "bg-transparent"
                : "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
            } ${styles.pref_mode_text}`}>
            12 months
          </p>
        </div>
        <div
          onClick={() => toggleDrawer(2)}
          className={`${styles.plan_div} ${styles.right_div_content_wrapper}`}>
          <p className={styles.bold_text}>Current plan: CityMax Pro</p>
          <p className={styles.change_txt}>change</p>
        </div>
        <div
          className={`!flex-col ${styles.price_div} ${styles.right_div_content_wrapper}`}>
          <div className={styles.price_div}>
            <Rupee className={styles.icon} />
            <div>
              <p className={styles.price_type}>Monthly Rent</p>
              <p className={styles.bold_text}>
                <span className={styles.rupee}>₹</span>4599 /mo
              </p>
            </div>
          </div>
          <div className={styles.price_div}>
            <Sparkles className={styles.icon} />
            <div>
              <p className={styles.price_type}>Upgrades Rental Amount</p>
              <p className={styles.bold_text}>
                <span className={styles.rupee}>₹</span>4599 /mo
              </p>
            </div>
          </div>
          <div className={styles.price_div}>
            <Lock className={styles.icon} />
            <div>
              <p className={styles.price_type}>Refundable Security Deposit</p>
              <p className={styles.bold_text}>
                <span className={styles.rupee}>₹</span>0
              </p>
            </div>
          </div>
        </div>
        <button className={styles.proceed_btn}>
          Proceed
          <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
};

export default CitymaxPlanDetail;
