import {useEffect, useState} from "react";
import {useWindowSize} from "./useWindowSize";

export const useIsOnMobile = () => {
  const windowResize = useWindowSize();
  const [isOnMobile, setisOnMobile] = useState(false);
  useEffect(() => {
    setisOnMobile(windowResize.width <= 780);
  }, [windowResize]);
  return isOnMobile;
};
