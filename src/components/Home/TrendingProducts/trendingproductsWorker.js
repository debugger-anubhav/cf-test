import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener(
  "message",
  async ({data: {params, paramsCityId, cityId}}) => {
    if (
      params?.category === "appliances-rental" ||
      params?.category === "furniture-rental"
    ) {
      baseInstance(endPoints.cityIdByCityName + params?.city).then(
        ({
          data: {
            data: {id},
          },
        }) => {
          self.postMessage({type: "cityId", id});
        },
      );
    }

    if (params?.category === "appliances-rental") {
      baseInstance(
        `${endPoints.seoApplianceTtrendingProduct}${paramsCityId}`,
      ).then(({data: {data: applianceTrendingProducts}}) => {
        self.postMessage({
          type: "applianceTrendingProducts",
          applianceTrendingProducts,
        });
      });
    } else if (params?.category === "furniture-rental") {
      baseInstance(
        `${endPoints.seoFurnitureTtrendingProduct}${paramsCityId}`,
      ).then(({data: {data: furnitureTrendingProducts}}) => {
        self.postMessage({
          type: "furnitureTrendingProducts",
          furnitureTrendingProducts,
        });
      });
    } else {
      baseInstance
        .get(endPoints.trendingProduct + `?cityId=${cityId}`)
        .then(({data: {data: trendingProducts}}) => {
          self.postMessage({type: "trendingProducts", trendingProducts});
        });
    }
  },
);
