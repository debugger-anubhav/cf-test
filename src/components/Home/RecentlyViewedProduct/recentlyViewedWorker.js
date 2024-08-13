import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", ({data: {cityId, userId}}) => {
  baseInstance
    .get(`${endPoints.recentlyViewedProduct}?cityId=${cityId}&userId=${userId}`)
    .then(({data: {data: recentlyViewedProducts}}) => {
      self.postMessage({recentlyViewedProducts});
    });
});
