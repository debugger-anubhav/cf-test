import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", ({data: {params, paramsCityId, type}}) => {
  if (!type) {
    if (
      params?.category === "appliances-rental" ||
      params?.category === "furniture-rental"
    ) {
      baseInstance.get(endPoints.cityIdByCityName + params?.city).then(
        ({
          data: {
            data: {id},
          },
        }) => {
          self.postMessage({cityId: id});
        },
      );
    }
  } else {
    if (params?.category === "appliances-rental") {
      baseInstance
        .get(
          `${endPoints.seoAppliancesTextContent}?cityId=${paramsCityId}&categoryId=26`,
        )
        .then(({data: {data}}) => {
          self.postMessage({data});
        });
    } else if (params?.category === "furniture-rental") {
      baseInstance
        .get(
          `${endPoints.seoFurnitureTextContent}?cityId=${paramsCityId}&categoryId=27`,
        )
        .then(({data}) => {
          self.postMessage({data});
        });
    } else {
      baseInstance.get(endPoints.homePageTextContent).then(({data: {data}}) => {
        self.postMessage({data});
      });
    }
  }
});
