const {baseInstance} = require("@/network/axios");
const {endPoints} = require("@/network/endPoints");

self.addEventListener("message", ({data: {params}}) => {
  if (params === "home-page") {
    baseInstance(endPoints.rentNowBanners).then(
      ({data: {data: rentNowBanners}}) => {
        self.postMessage({rentNowBanners});
      },
    );
  } else if (params?.category === "appliances-rental") {
    baseInstance
      .get(endPoints.seoApplianceBanners)
      .then(({data: {data: rentNowBanners}}) => {
        self.postMessage({rentNowBanners});
      });
  } else if (params?.category === "furniture-rental") {
    baseInstance
      .get(endPoints.seoFurnitureBanners)
      .then(({data: {data: rentNowBanners}}) => {
        self.postMessage({rentNowBanners});
      });
  }
});
