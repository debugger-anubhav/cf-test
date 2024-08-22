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
  }
});
