import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener("message", async event => {
  console.log("event", event.data);
  const {
    data: {cityId, sessionData, fetchCategories},
  } = event;

  baseInstance
    .get(`/${endPoints.cityList}`)
    .then(({data: {data: cityData}}) => {
      const citiesData = {};
      citiesData.cityList = cityData;
      if (cityId) {
        const cityName = cityData.find(({id}) => id === cityId).list_value;
        citiesData.matchedCity = cityName;
      }
      self.postMessage({type: "cities", citiesData});
    });

  baseInstance
    .get(`/${endPoints.trendingSearchConstants}`)
    .then(({data: {data: trendingSearchData}}) => {
      self.postMessage({type: "trendingSearches", trendingSearchData});
    });

  baseInstance
    .get(`/${endPoints.sidebarMenuLists}`)
    .then(({data: {data: sidebarData}}) => {
      self.postMessage({type: "sidebarData", sidebarData});
    });

  baseInstance
    .post(endPoints.sessionUserUrl, sessionData)
    .then(({data: {data: userSessionData}}) => {
      self.postMessage({type: "session", userSessionData});
    });

  if (fetchCategories) {
    baseInstance(endPoints.category)
      .then(({data: {data: categoryData}}) => {
        self.postMessage({type: "categories", categoryData});
      })
      .catch(() => {
        self.postMessage({type: "categories", categoryData: []});
      });
  }
});
