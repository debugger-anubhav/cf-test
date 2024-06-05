import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {showToastNotification} from "../Common/Notifications/toastUtils";
import {useDispatch} from "react-redux";
import {
  setCreateRequestApiCalled,
  setRequestLoader,
  setServiceRequestDrawer,
} from "@/store/Slices";
export const CommonCreateRequestApi = () => {
  const dispatch = useDispatch();

  const CreateSRApiCall = async CreateRequestPayload => {
    dispatch(setCreateRequestApiCalled(false));

    try {
      const response = await baseInstance.post(
        endPoints.serviceRequestPage.createRequest,
        CreateRequestPayload,
      );

      if (response?.data?.data?.msg) {
        dispatch(setRequestLoader(false));
        dispatch(setServiceRequestDrawer(false));
        showToastNotification(
          response?.data?.data?.msg,
          response?.data?.data?.status === true ? 1 : 3,
        );
        dispatch(setCreateRequestApiCalled(true));
      }
    } catch (error) {
      dispatch(setRequestLoader(false));
    }
  };

  return {CreateSRApiCall};
};
