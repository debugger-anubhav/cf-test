import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine, ToggleOff} from "@/assets/icon";
import {BsToggleOn} from "react-icons/bs";
import {customStylesForSelect} from "./CancelOrder";
import Select from "react-select";
import {CreateRequest, CreateRequestPayload} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import {setServiceRequestDrawer} from "@/store/Slices";

function Repair({prevScreen, data}) {
  const dispatch = useDispatch();
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );

  const [toggleStates, setToggleStates] = useState(
    data?.map(() => ({istoggled: false, selected: null, detail: null})),
  );

  const repairOptions = [
    {value: "1", label: "Wrong items selected"},
    {value: "2", label: "Late delivery"},
    {value: "3", label: "Want to buy items"},
    {value: "4", label: "Items not required anymore"},
    {value: "5", label: "Other"},
  ];

  const handleChange = (selectedOption, index) => {
    setToggleStates(prevStates =>
      prevStates.map((state, i) =>
        i === index ? {...state, selected: selectedOption} : state,
      ),
    );
  };
  const handleDetailChange = (e, index) => {
    setToggleStates(prevStates =>
      prevStates.map((state, i) =>
        i === index ? {...state, detail: e.target.value} : state,
      ),
    );
  };

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
      selected_product_name: tempSelectedProductName.join(", "),
      repair_reason: tempRepairReason.join(", "),
      repair_details: tempRepairDetails.join(", "),
    };
    CreateRequest(payload);
    dispatch(setServiceRequestDrawer(false));
    setToggleStates(data.map(() => ({istoggled: false, selected: null})));
  };

  const handleToggle = index => {
    setToggleStates(prevStates =>
      prevStates.map((state, i) =>
        i === index
          ? {...state, istoggled: !state.istoggled, selected: "NA"}
          : state,
      ),
    );
  };

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => prevScreen(true)}
          className={"cursor-pointer"}
        />
        Repair
      </div>
      <div className={styles.buy_info}>
        <p className={styles.desc}>Select products to repair</p>
        {data?.map((item, index) => (
          <div className={styles.repair_info} key={index.toString()}>
            <div className="flex gap-2 items-center">
              {toggleStates[index].istoggled ? (
                <BsToggleOn
                  color={"#5774AC"}
                  size={28}
                  onClick={() => handleToggle(index)}
                  className="cursor-pointer"
                />
              ) : (
                <ToggleOff
                  size={28}
                  color={"#E3E1DC"}
                  onClick={() => handleToggle(index)}
                  className="cursor-pointer"
                />
              )}
              <p className={styles.desc}>{item?.product_name}</p>
            </div>
            {toggleStates[index].istoggled && (
              <div>
                <div className="mt-4 flex flex-col">
                  <p className={styles.desc}>Reason for repair</p>
                  <Select
                    options={repairOptions}
                    styles={customStylesForSelect}
                    onChange={selectedOption =>
                      handleChange(selectedOption, index)
                    }
                    placeholder="Select a reason for repair"
                  />
                </div>
                <div className="mt-4">
                  <p className={styles.desc}>Repair details</p>
                  <input
                    type="text"
                    placeholder="Enter repair details"
                    className={styles.form_input_textarea}
                    onChange={e => handleDetailChange(e, index)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className={styles.bottom_row}>
          <div className={styles.bottom_line}></div>

          <button
            className={`${styles.proceed_btn}  ${
              toggleStates.some(state => state.istoggled && state.selected)
                ? ""
                : "!bg-[#FFDF85] !cursor-not-allowed"
            }`}
            disabled={!toggleStates.some(state => state.istoggled)}
            onClick={handleCreateRequest}>
            Create request <ForwardArrowWithLine />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Repair;
