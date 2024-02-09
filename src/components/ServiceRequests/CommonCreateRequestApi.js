import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {showToastNotification} from "../Common/Notifications/toastUtils";
import {useDispatch} from "react-redux";
import {setServiceRequestDrawer} from "@/store/Slices";
export const CommonCreateRequestApi = () => {
  const dispatch = useDispatch();

  const trailCreateSR = async CreateRequestPayload => {
    try {
      const response = await axios.post(
        baseURL + endPoints.serviceRequestPage.createRequest,
        CreateRequestPayload,
      );

      if (response?.data?.data?.msg) {
        dispatch(setServiceRequestDrawer(false));
        showToastNotification(
          response?.data?.data?.msg,
          response?.data?.data?.status === true ? 2 : 3,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {trailCreateSR};
};