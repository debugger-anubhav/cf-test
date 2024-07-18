import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", ({data: {params, domain}}) => {
  if (params?.category === "appliances-rental") {
    baseInstance.get(endPoints.seoApplianceFaqs).then(({data: {data}}) => {
      self.postMessage({data});
    });
  } else if (params?.category === "furniture-rental") {
    baseInstance.get(endPoints.seoFurnitureFaqs).then(({data: {data}}) => {
      self.postMessage({data});
    });
  } else if (params === "category") {
    baseInstance(`${endPoints.categortFaq}?parentCategoryId=27`).then(
      ({data: {data}}) => {
        self.postMessage({data});
      },
    );
  } else if (params === "citymax") {
    baseInstance.get(`${domain}/ajxapi/frp_faq_details`).then(
      ({
        data: {
          data: {content},
        },
      }) => {
        self.postMessage({data: content});
      },
    );
  } else {
    baseInstance.get(endPoints.faqsLandingPage).then(({data: {data}}) => {
      self.postMessage({data});
    });
  }
});
