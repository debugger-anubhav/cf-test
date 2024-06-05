import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine, ToggleOff} from "@/assets/icon";
import {BsToggleOn} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {CreateRequestPayload} from "@/constants/constant";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";
import {setRequestLoader} from "@/store/Slices";
import LoaderComponent from "../../components/Common/Loader/LoaderComponent";

function ChangeBillCycle({prevScreen, data, isHelpDrawer}) {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.serviceRequestData.requestLoader);
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const callFunctionFlag = useSelector(
    state => state.homePagedata.createRequestApiCalled,
  );

  const [istoggled, setIstoggled] = useState(true);
  const [description, setDescription] = useState("");
  const [billCycleDay, setBillCycleDay] = useState(null);
  const {CreateSRApiCall} = CommonCreateRequestApi();

  const handleCreateRequest = () => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      type: selectedType,
      description,
      billCycleDay: parseInt(billCycleDay),
    };
    callFunctionFlag && CreateSRApiCall(payload);
  };

  const handleBillCycleDayChange = e => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/^0+/, "");
    if (/^\d*$/.test(sanitizedValue)) {
      if (sanitizedValue === "") {
        setBillCycleDay("");
      } else {
        const intValue = parseInt(sanitizedValue);
        if (intValue >= 1 && intValue <= 28) {
          setBillCycleDay(intValue);
        } else {
          setBillCycleDay("");
        }
      }
    }
  };

  return (
    <div
      className={`${styles.content_wrapper} !overflow-visible !pb-0 ${
        isHelpDrawer && "!p-0"
      }`}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => prevScreen(true)}
          className={"cursor-pointer"}
        />
        Change bill cycle
      </div>
      <div className={`${styles.buy_info} !overflow-visible !mb-0`}>
        <div className={styles.change_bill_cycle_container}>
          <div
            className={styles.change_bill_cycle_toggle_wrapper}
            onClick={() => setIstoggled(!istoggled)}>
            {istoggled ? (
              <BsToggleOn
                color={"#5774AC"}
                size={28}
                className="cursor-pointer"
              />
            ) : (
              <ToggleOff
                size={28}
                color={"#E3E1DC"}
                className="cursor-pointer"
              />
            )}
            <p className={styles.desc}>Align Bill Cycle to 1st day of Month</p>
          </div>
          {!istoggled && (
            <div className="mt-8">
              <p className={styles.desc}>Suggest your preferred start day</p>
              <input
                type="number"
                placeholder="Enter a number"
                className={styles.form_input_textarea}
                onChange={handleBillCycleDayChange}
                value={billCycleDay}
                min="1"
                max="28"
              />
            </div>
          )}
        </div>
        <div className="mt-8">
          <p className={styles.desc}>Your comment (optional)</p>
          <textarea
            placeholder="Please share any specific instructions or provide feedback."
            className={styles.form_input_textarea}
            onChange={e => setDescription(e.target.value)}
            rows={2}
          />
        </div>
        {loader && <LoaderComponent loading={loader} />}

        <button
          className={`${styles.proceed_btn} !w-fit min-h-[3.5rem] !ml-0 ${
            callFunctionFlag ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={!callFunctionFlag}
          // ${!istoggled ? "!bg-[#FFDF85] !cursor-not-allowed" : ``} `
          onClick={() => {
            dispatch(setRequestLoader(true));
            handleCreateRequest();
          }}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default ChangeBillCycle;
