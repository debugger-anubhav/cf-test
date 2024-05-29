import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine, ToggleOff} from "@/assets/icon";
import {BsToggleOn} from "react-icons/bs";
import {customStylesForSelect} from "./CancelOrder";
import Select from "react-select";
import {CreateRequestPayload} from "@/constants/constant";
import {useSelector} from "react-redux";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

function Repair({prevScreen, data, isHelpDrawer}) {
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const callFunctionFlag = useSelector(
    state => state.homePagedata.createRequestApiCalled,
  );
  const [toggleStates, setToggleStates] = useState(
    data.map(() => ({
      istoggled: false,
      selected: null,
      detail: null,
      options: false,
      name: "",
    })),
  );
  const {CreateSRApiCall} = CommonCreateRequestApi();
  const [repairOptions, setRepairOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [description, setDescription] = useState("");

  const getRepairOption = (productName, index) => {
    baseInstance
      .get(endPoints.serviceRequestPage.getRepairOptions(productName))
      .then(res => {
        setRepairOptions(res?.data?.data);

        setToggleStates(prevStates =>
          prevStates.map((state, i) =>
            i === index
              ? {...state, options: res?.data?.data?.length > 0}
              : state,
          ),
        );
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const handleChange = (selectedOption, index) => {
    setToggleStates(prevStates =>
      prevStates.map((state, i) =>
        i === index ? {...state, selected: selectedOption} : state,
      ),
    );
  };

  // const handleDetailChange = (e, index) => {
  //   setToggleStates(prevStates =>
  //     prevStates.map((state, i) =>
  //       i === index ? {...state, detail: e.target.value} : state,
  //     ),
  //   );
  // };

  const handleCreateRequest = () => {
    const selectedData = toggleStates
      .filter(state => state.istoggled && state.selected !== null)
      .map((state, index) => ({
        product_name: data[index]?.product_name,
        repair_reason: `${data[index]?.product_name} : ${
          state.selected.label || "NA"
        }  `,
        repair_details: state.detail || " ",
      }));

    const tempSelectedProductName = selectedData?.map(item => {
      return item.product_name;
    });
    const singleSelectedProduct = toggleStates?.map(item => {
      return item.name;
    });

    const tempRepairReason = selectedData?.map(item => {
      return item.repair_reason;
    });

    const tempRepairDetails = selectedData?.map(item => {
      return item.repair_details;
    });

    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      type: selectedType,
      selected_product_name: tempSelectedProductName.length
        ? tempSelectedProductName.join(", ")
        : singleSelectedProduct.join(", "),
      repair_reason: tempRepairReason.join(", "),
      repair_details: tempRepairDetails.join(", "),
      description,
    };
    // console.log( payload,"payyyyyyyy")
    callFunctionFlag && CreateSRApiCall(payload);
    setToggleStates(data.map(() => ({istoggled: false, selected: null})));
  };

  const handleToggle = index => {
    setToggleStates(prevStates =>
      prevStates?.map((state, i) =>
        i === index ? {...state, istoggled: !state.istoggled} : state,
      ),
    );

    if (!toggleStates[index].istoggled) {
      getRepairOption(data[index]?.product_name, index);
    }
  };

  return (
    <>
      <div className={`${styles.content_wrapper} ${isHelpDrawer && "!p-0"}`}>
        <div className={styles.main_heading}>
          <BackIcon
            onClick={() => prevScreen(true)}
            className={"cursor-pointer"}
          />
          Repair
        </div>
        <div className={`${styles.buy_info}`}>
          <p className={styles.desc}>Select products to repair</p>
          {data?.map((item, index) => (
            <div
              className={`${styles.repair_info} ${
                index === data.length - 1 &&
                repairOptions &&
                repairOptions?.length > 4 &&
                isDropdownOpen &&
                "!mb-[11rem]"
              } `}
              key={index.toString()}>
              <div
                className={styles.repair_toggle_wrapper}
                onClick={() => {
                  setToggleStates(prevStates =>
                    prevStates.map((state, i) =>
                      i === index
                        ? {...state, name: item?.product_name}
                        : state,
                    ),
                  );
                  handleToggle(index);
                  if (!toggleStates[index].istoggled) {
                    getRepairOption(item?.product_name, index);
                  }
                }}>
                {toggleStates[index].istoggled ? (
                  <BsToggleOn
                    color={"#5774AC"}
                    size={28}
                    className={styles.repair_toggle_icon}
                  />
                ) : (
                  <ToggleOff
                    size={28}
                    color={"#E3E1DC"}
                    className={styles.repair_toggle_icon}
                  />
                )}
                <p className={styles.desc}>{item?.product_name}</p>
              </div>
              {toggleStates[index].istoggled && (
                <div>
                  {toggleStates[index].options && (
                    <div className={styles.reson_for_repair_wrapper}>
                      <p className={styles.desc}>Reason for repair</p>
                      <Select
                        options={repairOptions}
                        styles={customStylesForSelect}
                        onChange={selectedOption =>
                          handleChange(selectedOption, index)
                        }
                        placeholder="Select a reason for repair"
                        isSearchable={false}
                        onMenuOpen={() => setIsDropdownOpen(true)}
                        onMenuClose={() => setIsDropdownOpen(false)}
                        className="font-Poppins placeholder:!text-71717A text-71717A"
                      />
                    </div>
                  )}
                  <div className="mt-4">
                    <p className={styles.desc}>Repair details</p>

                    <textarea
                      placeholder="Enter repair details"
                      className={styles.form_input_textarea}
                      onChange={e => setDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom_row}>
        <button
          className={`${styles.proceed_btn}  ${
            toggleStates.some(state => state.istoggled)
              ? ""
              : "!bg-[#FFDF85] !cursor-not-allowed"
          }
          ${callFunctionFlag ? "cursor-pointer" : "cursor-not-allowed"}`}
          disabled={!toggleStates.some(state => state.istoggled)}
          onClick={handleCreateRequest}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </>
  );
}

export default Repair;
