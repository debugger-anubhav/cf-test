import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";

self.addEventListener("message", ({data: {page, params}}) => {
  if (page === "home-page") {
    baseInstance
      .get(endPoints.homePageHappySubscriber)
      .then(({data: {data}}) => {
        setTimeout(() => {
          self.postMessage({data});
        }, 1000);
      });
  } else if (page === "product") {
    baseInstance
      .get(endPoints.productPage.happySubscribers(params.productId))
      .then(({data: {data}}) => {
        self.postMessage({data, type: "product"});
      });
  } else if (page === "appliances-rental") {
    baseInstance
      .get(endPoints.seoApplianceHappyCustomer)
      .then(({data: {data}}) => {
        self.postMessage({data});
      });
  } else if (page === "category") {
    baseInstance
      .get(endPoints.categoryHappySubscriber(params))
      .then(({data: {data}}) => {
        self.postMessage({data});
      });
  } else if (page === "furniture-rental") {
    baseInstance
      .get(endPoints.seoFurnitureHappyCustomer)
      .then(({data: {data}}) => {
        self.postMessage({data});
      });
  } else {
    baseInstance
      .get(endPoints.homePageHappySubscriber)
      .then(({data: {data}}) => {
        setTimeout(() => {
          self.postMessage({data});
        }, 1000);
      });
  }
});
