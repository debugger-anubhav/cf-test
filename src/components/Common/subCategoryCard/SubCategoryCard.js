import React, {useState} from "react";
import style from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch} from "react-redux";
import {getLocalStorage, getLocalStorageString} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {useQuery} from "@/hooks/useQuery";
import {useRouter} from "next/navigation";

const SubCategoryCard = ({productID}) => {
  const [inWishList, setInWishList] = useState(false);

  // const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const dispatch = useDispatch();
  const router = useRouter();
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const data = {
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",
    productId: productID,
  };

  const {mutateAsync: addwhislistProduct} = useMutation(
    "add-wishlist",
    "POST",
    endPoints.addWishListProduct,
    data,
  );

  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    data,
  );
  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    }`,
  );
  const userId = getLocalStorageString("user_id");
  const includedItem = [
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png",
    },
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png",
    },
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png",
    },
  ];

  const handleWhislistCard = e => {
    e.stopPropagation();
    if (!userId) {
      router.push("https://test.rentofurniture.com/user_sign_up");
      return;
    }
    // dispatch(addRemoveWhishListitems(!inWishList));
    !inWishList
      ? addwhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
            console.log(res?.data?.dat);
          })
          .catch(err => console.log(err))
      : removewhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
            console.log(res);
          })
          .catch(err => console.log(err));
  };
  return (
    <div className={style.main_card_container}>
      <div className={style.product_img_container}>
        <div className={style.image_section}>
          <img
            src={
              "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png"
            }
            className="w-[290px]"
          />
          <span className={style.new_launched}>New Launched</span>
          <span className={style.like}>
            <Heart
              size={15}
              color={inWishList ? "#FF0000" : "#C0C0C6"}
              onClick={e => handleWhislistCard(e)}
            />
          </span>
        </div>
        <div className={style.description_section}>
          <div className={style.product_descriptiom_wrapper}>
            <h2 className={style.product_title}>Jade King Size Double Bed</h2>
            <div className={style.price_section}>
              <p className={style.original_price}>₹ 999</p>
              <p className={style.current_price}>₹ 988 / month</p>
            </div>
            <div className={style.end_line}></div>
            <div className={style.included_item_container}>
              <h4 className={style.item_included_text}>1 Item Included</h4>
              <div className={style.included_item_listing}>
                {includedItem?.map((item, index) => {
                  return (
                    <div className={style.single_img} key={index.toString()}>
                      <img src={item?.img} className="w-[40px] h-[40px]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
