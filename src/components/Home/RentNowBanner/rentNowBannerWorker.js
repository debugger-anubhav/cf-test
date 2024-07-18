import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", ({data: {params, type, cityId}}) => {
  if (type) {
    if (type === "predesignCombos") {
      baseInstance
        .get(`${endPoints.productCombos}?cityId=${cityId}`)
        .then(({data: {data}}) => {
          self.postMessage({data});
        });
    } else if (type === "limitedPeriodDiscount") {
      baseInstance
        .get(`${endPoints.limitedPreiod}?cityId=${cityId}`)
        .then(({data: {data}}) => {
          self.postMessage({data});
        });
    }
  } else {
    if (params === "home-page") {
      baseInstance.get(endPoints.rentNowBanners).then(({data: {data}}) => {
        self.postMessage({data});
      });
    } else if (params?.category === "appliances-rental") {
      baseInstance.get(endPoints.seoApplianceBanners).then(({data: {data}}) => {
        self.postMessage({data});
      });
    } else if (params?.category === "furniture-rental") {
      baseInstance.get(endPoints.seoFurnitureBanners).then(({data: {data}}) => {
        self.postMessage({data});
      });
    }
  }
});
