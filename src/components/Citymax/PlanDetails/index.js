import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import {useParams, useRouter} from "next/navigation";
import {
  BackIcon,
  CheckedBox,
  Close,
  ForwardArrowWithLine,
  // IconLink,
  Lock,
  Rupee,
  Sparkles,
  UncheckedBox,
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
  const [headType, setHeadType] = useState(1);
  const [swapProductDetails, setSwapProductDetails] = useState({
    img: "",
    name: "",
  });
  // const [isChecked, setIsChecked] = useState(false);
  const [isCheckedMap, setIsCheckedMap] = useState({});
  // const [selectedProductsBedroom1, setSelectedProductsBedroom1] = useState({});

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

  const handleSelectItem = (item, slot, headType) => {
    setRoomId(item?.fc_frp_room?.id);
    setSlotId(slot.slot_id);
    setHeadType(headType);
    setSwapProductDetails({
      img: slot.selectedProduct || "",
      name: slot.selectedProdName || "",
    });

    // if (item.fc_frp_room.room_name.includes("Bedroom") && headType === 1) {
    //   setSelectedProductsBedroom1(prev => ({
    //     ...prev,
    //     [slot.slot_id]: {
    //       selectedProdName: slot.selectedProdName,
    //       selectedProduct: slot.selectedProduct,
    //     },
    //   }));
    // }
    toggleDrawer(1);
  };

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

    // if (
    //   planDetailsArray[index].fc_frp_room.room_name.includes("Bedroom") &&
    //   headType === 1
    // ) {
    //   setSelectedProductsBedroom1(prev => ({
    //     ...prev,
    //     [planDetailsArray[index].fc_frp_room.fc_frp_slot_associations[
    //       indexOfCategory
    //     ].slot_id]: {
    //       selectedProdName:
    //         planDetailsArray[index].fc_frp_room.fc_frp_slot_associations[
    //           indexOfCategory
    //         ].slot_id.selectedProdName,
    //       selectedProduct:
    //         planDetailsArray[index].fc_frp_room.fc_frp_slot_associations[
    //           indexOfCategory
    //         ].slot_id.selectedProduct,
    //     },
    //   }));
    // }
    toggleDrawer();
  };

  // const handleDeleteSelectedItem = (e, item, selectedItem) => {
  //   console.log("innn delete");
  //   e.stopPropagation();
  //   delete selectedItem.selectedProdName;
  //   delete selectedItem.selectedProduct;
  // };

  const handleDeleteSelectedItem = (e, item, selectedItem) => {
    e.stopPropagation();
    // Delete the keys directly within the function
    delete selectedItem.selectedProdName;
    delete selectedItem.selectedProduct;

    // Update the state to trigger a re-render
    setPlanDetailsArray(prevPlanDetailsArray => {
      const updatedArray = prevPlanDetailsArray.map(room => {
        console.log(room.room_id, item.fc_frp_room.id, "iuieij");
        if (room.id === item.fc_frp_room.id) {
          const updatedAssociations =
            room.fc_frp_room.fc_frp_slot_associations.map(association => {
              if (association.id === selectedItem.id) {
                return {
                  ...association,
                  selectedProdName: undefined,
                  selectedProduct: undefined,
                };
              }
              return association;
            });
          return {...room, fc_frp_slot_associations: updatedAssociations};
        }
        return room;
      });
      return updatedArray;
    });
  };

  const handleCheckRepeat = (item, index) => {
    console.log("isme aaa raha h");
    setIsCheckedMap(prevIsCheckedMap => {
      const updatedIsCheckedMap = {...prevIsCheckedMap};
      updatedIsCheckedMap[item.fc_frp_room.id] =
        !prevIsCheckedMap[item.fc_frp_room.id];
      return updatedIsCheckedMap;
    });

    if (!isCheckedMap[item.room_id]) {
      console.log("innnns");

      const newArr = [...planDetailsArray];
      newArr[index].fc_frp_room.fc_frp_slot_associations = [
        ...newArr[index - 1].fc_frp_room.fc_frp_slot_associations,
      ];
      setPlanDetailsArray([...newArr]);
      console.log(newArr, "fsdfiyushsjkfnvb");
      // newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory] = {
      //   ...newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory],
      //   selectedProduct: imgurl,
      //   selectedProdName: productName,
      // };

      // const updateAssociation = newArr[
      //   index
      // ].fc_frp_room.fc_frp_slot_associations.map(element => ({
      //   selectedProduct: "Alexa Queen Bed",
      //   selectedProdName: "lalalala",
      //   ...element,
      // }));

      // newArr[index].fc_frp_room.fc_frp_slot_associations = updateAssociation;
      // setPlanDetailsArray(newArr);
    }
  };

  console.log(isCheckedMap, "ejkwejwui");
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
                <>
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
                    {(item?.fc_frp_room?.room_name === "Bedroom 1" ||
                      item?.fc_frp_room?.room_name === "Bedroom 2") && (
                      <div className="flex gap-1 mt-8 -mb-4 items-center">
                        {isCheckedMap[item.room_id] ? (
                          <div onClick={() => handleCheckRepeat(item)}>
                            <CheckedBox
                              color={"#5774AC"}
                              className={styles.checkbox}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              // setIsChecked(true);
                              handleCheckRepeat(item, index);
                            }}>
                            <UncheckedBox
                              color={"#5774AC"}
                              className={styles.checkbox}
                            />
                          </div>
                        )}
                        <p className={styles.same_above_txt}>
                          Same as above bedroom
                        </p>
                      </div>
                    )}
                    <div className={styles.amen_wrapper}>
                      {item?.fc_frp_room?.fc_frp_slot_associations?.map(
                        (t, i) => (
                          <div key={i} className={styles.slot}>
                            {t.selectedProduct ? (
                              <div
                                className={`w-full h-full ${
                                  !isCheckedMap[item.room_id] &&
                                  "cursor-pointer"
                                }`}
                                onClick={e => {
                                  !isCheckedMap[item.room_id] &&
                                    handleSelectItem(item, t, 2);
                                }}>
                                <div
                                  className={`relative ${
                                    isCheckedMap[item.room_id] && "opacity-60"
                                  }`}>
                                  <img
                                    src={
                                      productImageBaseUrl + t.selectedProduct
                                    }
                                    className={styles.selected_slot_img}
                                  />
                                  <div
                                    onClick={e =>
                                      !isCheckedMap[item.room_id] &&
                                      handleDeleteSelectedItem(e, item, t)
                                    }>
                                    <Close className={styles.cross} />
                                  </div>
                                </div>
                                <div
                                  className={`${
                                    !isCheckedMap[item.room_id] &&
                                    "bg-[#E3E1DC]"
                                  } ${styles.selected_box_lowerdiv}`}>
                                  <p
                                    className={`${
                                      isCheckedMap[item.room_id] &&
                                      "!text-71717A"
                                    } ${styles.selected_slot_name}`}>
                                    {t.selectedProdName}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={styles.amenity_box}
                                onClick={() => {
                                  handleSelectItem(item, t, 1);
                                }}>
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
                              </div>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </>
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
            headType={headType}
            swapProductDetails={swapProductDetails}
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
