import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", ({data: {cityId, type, city}}) => {
  if (type) {
    if (type === "ratingGoogleReviews") {
      baseInstance
        .get(`${endPoints.googleReviews}?cityId=${cityId}`)
        .then(({data: {data}}) => {
          self.postMessage({data, type: "googleReviews"});
        });
    } else if (type === "ratingGoogleReviewLinks") {
      baseInstance.get(endPoints.googleReviewsLinks(city)).then(({data}) => {
        self.postMessage({
          newReviewUri: data?.data?.newReviewUri,
          type: "googleReviewLinks",
        });
      });
    }
  }
});
