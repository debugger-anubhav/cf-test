import {baseInstance, staticHeaders} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

self.addEventListener(
  "message",
  async ({data: {inWishList, productData, authToken, cityId, userId}}) => {
    console.log("triggering worker");
    const getSavedItems = async () => {
      return await baseInstance
        .get(`${endPoints.savedItems}?cityId=${cityId}&userId=${userId}`, {
          headers: {Authorization: authToken},
        })
        .then(({data: {data: wishlistedItems}}) => {
          const savedItemIds = wishlistedItems.map(item => item?.id);
          return {
            savedItemIds,
            wishlistedItems,
          };
        });
    };

    if (!inWishList) {
      baseInstance({
        method: "POST",
        url: endPoints.addWishListProduct,
        data: productData,
        headers: {...staticHeaders(), Authorization: authToken},
      }).then(async () => {
        const {savedItemIds, wishlistedItems} = await getSavedItems();
        self.postMessage({
          type: "addedToWishlist",
          wishlistedItems,
          savedItemIds,
        });
      });
    } else {
      baseInstance({
        method: "DELETE",
        url: endPoints.deleteWishListProduct,
        data: productData,
        headers: {...staticHeaders(), Authorization: authToken},
      }).then(async () => {
        const {savedItemIds, wishlistedItems} = await getSavedItems();
        self.postMessage({
          type: "removedFromWishlist",
          wishlistedItems,
          savedItemIds,
        });
      });
    }
  },
);
