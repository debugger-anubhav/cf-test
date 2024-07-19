import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", ({data: {params, type, cityId}}) => {
  if (type) {
    const cityParam = `?cityId=${cityId}`;
    if (type === "predesignCombos") {
      baseInstance
        .get(`${endPoints.productCombos}${cityParam}`)
        .then(({data: {data}}) => {
          self.postMessage({data});
        });
    } else if (type === "limitedPeriodDiscount") {
      baseInstance
        .get(`${endPoints.limitedPreiod}${cityParam}`)
        .then(({data: {data}}) => {
          self.postMessage({data});
        });
    } else if (type === "newlyLaunched") {
      baseInstance
        .get(`${endPoints.newlylaunchedProduct}${cityParam}`)
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
