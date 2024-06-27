const {baseInstance} = require("@/network/axios");
const {endPoints} = require("@/network/endPoints");

self.addEventListener("message", ({data: {cityId}}) => {
  baseInstance(`${endPoints.offersAndCupons}?cityId=${cityId}`).then(
    ({data: {data}}) => self.postMessage({data}),
  );
});
