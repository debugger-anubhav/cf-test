import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {showToastNotification} from "../Common/Notifications/toastUtils";
import {useDispatch} from "react-redux";
import {setServiceRequestDrawer} from "@/store/Slices";
export const CommonCreateRequestApi = () => {
  const dispatch = useDispatch();

  const CreateSRApiCall = async CreateRequestPayload => {
    try {
      const response = await baseInstance.post(
        endPoints.serviceRequestPage.createRequest,
        CreateRequestPayload,
      );

      if (response?.data?.data?.msg) {
        dispatch(setServiceRequestDrawer(false));
        showToastNotification(
          response?.data?.data?.msg,
          response?.data?.data?.status === true ? 1 : 3,
        );
      }
    } catch (error) {
      console.log(error?.message || "some error");
    }
  };

  return {CreateSRApiCall};
};
