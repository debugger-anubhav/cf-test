import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", async event => {
  const {
    data: {params},
  } = event;

  if (params?.category === "appliances-rental") {
    baseInstance
      .get(endPoints.seoApplianceRentalSubCategory)
      .then(({data: {data: applianceSubCategory}}) => {
        self.postMessage({type: "appliance", data: applianceSubCategory});
      })
      .catch(() => self.postMessage({type: "appliance", data: []}));
  } else if (params?.category === "furniture-rental") {
    baseInstance
      .get(endPoints.seoFurnitureRentalSubCategory)
      .then(({data: {data: furnitureData}}) => {
        self.postMessage({type: "furniture", data: furnitureData});
      })
      .catch(() => self.postMessage({type: "furniture", data: []}));
  } else {
    baseInstance
      .get(endPoints.category)
      .then(({data: {data: categoryData}}) => {
        self.postMessage({type: "category", data: categoryData});
      })
      .catch(() => self.postMessage({type: "category", data: []}));
  }
});
