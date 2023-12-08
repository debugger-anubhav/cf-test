import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import {useParams, useRouter} from "next/navigation";
import {
  BackIcon,
  Close,
  ForwardArrowWithLine,
  // IconLink,
  Lock,
  Rupee,
  Sparkles,
} from "../../../assets/icon";
import {productImageBaseUrl} from "@/constants/constant";
import CitymaxDetailPageDrawer from "./CitymaxDetailPageDrawer/index";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

const CitymaxPlanDetail = () => {
  const router = useRouter();
  const params = useParams();
  const [isHalfYearly, setHalfYearly] = useState(params.tenure === "6");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [roomId, setRoomId] = useState();
  const [slotId, setSlotId] = useState();
  const [drawerType, setDrawerType] = useState();
  const [data, setData] = useState();
  const [planDetailsArray, setPlanDetailsArray] = useState();

  const toggleDrawer = type => {
    setDrawerType(type);
    setOpenDrawer(!openDrawer);
  };
  const getRoomData = () => {
    axios
      .get(
        baseURL +
          endPoints.cityMaxPage.getRoomData(params.planId, params.tenure),
      )
      .then(res => {
        setData(res?.data?.data);
        setPlanDetailsArray(
          res?.data?.data?.associatedProductsData?.[0]
            ?.fc_frp_room_associations,
        );
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getRoomData();
  }, []);

  console.log(planDetailsArray, "srrrrrr");
  console.log(data, "data");

  const handleAddItem = (imgurl, productName) => {
    const index = planDetailsArray.findIndex(t => t.fc_frp_room.id === roomId);
    const indexOfCategory = planDetailsArray[
      index
    ].fc_frp_room?.fc_frp_slot_associations?.findIndex(
      c => c.slot_id === slotId,
    );
    console.log(index, indexOfCategory, "logicc");
    const newArr = [...planDetailsArray];
    if (newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory]) {
      newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory] = {
        ...newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory],
        selectedProduct: imgurl,
        selectedProdName: productName,
      };
    }
    setPlanDetailsArray(newArr);
    toggleDrawer();
  };

  console.log(params, "paramsss");

  return (
    <div className={styles.main}>
      <div
        className={styles.header_wrapper}
        onClick={() => router.push(`/citymax`)}>
        <BackIcon className={styles.back_icon} />
        <h1 className={styles.head}>
          {data?.associatedProductsData?.[0]?.product_name}
        </h1>
      </div>
      <p className={styles.tag_line}>Best suited for a 2BHK apartment</p>

      <div className={styles.container}>
        <div className={styles.left_div}>
          <p className={`!text-71717A !mt-8 ${styles.tag_line}`}>
            Click on the placeholders below and choose your desired products.
          </p>

          <div className={styles.plans_wrapper}>
            {planDetailsArray?.map((item, index) => {
              const slotsLength =
                item?.fc_frp_room?.fc_frp_slot_associations.length;
              const selectedSlotsArray =
                item?.fc_frp_room?.fc_frp_slot_associations.filter(
                  slot => "selectedProduct" in slot,
                );
              const countOfSelectedSlots = selectedSlotsArray.length;
              return (
                <div key={index}>
                  <div className={styles.type_wrapper}>
                    <p className={styles.type_txt}>
                      {item?.fc_frp_room?.room_name}
                    </p>
                    <p className={styles.selected_text}>
                      <span className="hidden xl:block">
                        {countOfSelectedSlots} out of {slotsLength} products
                        selected
                      </span>
                      <span className="xl:hidden">
                        {countOfSelectedSlots}/{slotsLength}
                      </span>
                    </p>
                  </div>
                  <div className={styles.amen_wrapper}>
                    {item?.fc_frp_room?.fc_frp_slot_associations?.map(
                      (t, i) => (
                        <div
                          onClick={() => {
                            toggleDrawer(1);
                            setRoomId(item?.fc_frp_room?.id);
                            setSlotId(t.slot_id);
                          }}
                          key={i}
                          className={`${
                            t.selectedProduct && "!border-none hover:!bg-none"
                          } ${styles.amenity_box}`}>
                          {t.selectedProduct ? (
                            <div className="w-full">
                              <div className="relative">
                                <img
                                  src={productImageBaseUrl + t.selectedProduct}
                                  className={styles.selected_slot_img}
                                />
                                <Close
                                  className={styles.cross}
                                  onClick={() => toggleDrawer(1)}
                                />
                              </div>
                              <div className={styles.selected_box_lowerdiv}>
                                <p className={styles.selected_slot_name}>
                                  {t.selectedProdName}
                                </p>
                              </div>
                            </div>
                          ) : (
                            // </div>
                            <>
                              <img
                                src={
                                  "https://rentofurniture.com/images/frp_slots/" +
                                  t.fc_frp_slot.slot_image
                                }
                                className={styles.product_icon}
                              />
                              <p className={styles.product_name}>
                                {" "}
                                {t.fc_frp_slot.slot_name}
                              </p>
                            </>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {openDrawer && (
          <CitymaxDetailPageDrawer
            open={openDrawer}
            toggleDrawer={toggleDrawer}
            handleAddItem={handleAddItem}
            type={drawerType}
            isHalfYearly={isHalfYearly}
            slotId={slotId}
            roomId={roomId}
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
            <p className={styles.bold_text}>
              Current plan: {data?.associatedProductsData?.[0]?.product_name}
            </p>
            <p className={styles.change_txt}>change</p>
          </div>
          <div
            className={`!flex-col ${styles.price_div} ${styles.right_div_content_wrapper}`}>
            <div className={styles.price_div}>
              <Rupee className={styles.icon} />
              <div>
                <p className={styles.price_type}>Monthly Rent</p>
                <p className={styles.bold_text}>
                  <span className={styles.rupee}>₹</span>
                  {data?.PrdAttrArr?.[isHalfYearly ? "6" : "12"]?.price} /mo
                </p>
              </div>
            </div>
            <div className={styles.price_div}>
              <Sparkles className={styles.icon} />
              <div>
                <p className={styles.price_type}>Upgrades Rental Amount</p>
                <p className={styles.bold_text}>
                  <span className={styles.rupee}>₹</span>
                  {data?.tenure_additional_price} /mo
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
          <button className={`hidden xl:flex ${styles.proceed_btn}`}>
            Proceed
            <ForwardArrowWithLine />
          </button>
        </div>
      </div>

      <button className={`flex mt-8 xl:hidden ${styles.proceed_btn}`}>
        Proceed
        <ForwardArrowWithLine />
      </button>
    </div>
  );
};

export default CitymaxPlanDetail;
