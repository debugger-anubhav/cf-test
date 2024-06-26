const {baseInstance} = require("@/network/axios");
const {endPoints} = require("@/network/endPoints");

self.addEventListener("message", async ({data: {cityId}}) => {
  baseInstance(`${endPoints.allAndSubCategory}?cityId=${cityId}`)
    .then(({data: {data: allCategoryAndSubCategoryData}}) =>
      self.postMessage({allCategoryAndSubCategoryData}),
    )
    .catch(() => self.postMessage({allCategoryAndSubCategoryData: []}));
});
