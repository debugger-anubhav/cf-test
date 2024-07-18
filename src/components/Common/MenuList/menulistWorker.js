import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", async ({data: {cityId}}) => {
  baseInstance(`${endPoints.allAndSubCategory}?cityId=${cityId}`)
    .then(({data: {data: allCategoryAndSubCategoryData}}) =>
      self.postMessage({allCategoryAndSubCategoryData}),
    )
    .catch(() => self.postMessage({allCategoryAndSubCategoryData: []}));
});
