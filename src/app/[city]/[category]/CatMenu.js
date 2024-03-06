import React from "react";
import styles from "@/components/Common/MenuList/style.module.css";
import PopOver from "@/components/Common/PopOver";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

export async function getServerSideProps() {
  try {
    console.log("Before API request");
    const res = await axios.get(
      `https://test.rentofurniture.com/api/fc-categories/getAllCategoriesAndSubCategories?cityId=46`,
    );

    console.log("After API request");
    if (!res.data) {
      throw new Error("No data received from the API");
    }
    const allAndSubCategoryData = res.data?.data || [];
    console.log("API Response:", res.data);
    return {
      props: {
        allAndSubCategoryData,
        hasMb: true,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        allAndSubCategoryData: [],
        hasMb: true,
      },
    };
  }
}

export default function MenuList({hasMb, allAndSubCategoryData}) {
  console.log(allAndSubCategoryData, "pppppppppppp");

  return (
    <div className={`${styles.menu_list_wrapper} ${hasMb ? "mb-6" : ""}`}>
      {allAndSubCategoryData ? (
        <div className={styles.menu_list_left}>
          {allAndSubCategoryData.map((list, index) => (
            <div className={styles.item_wrap} key={index.toString()}>
              <PopOver
                data={list}
                list={list?.sub_categories}
                item={list?.cat_name}
                parentCategoryId={list.id}
              />
            </div>
          ))}
          <a
            rel="noopener noreferrer"
            target="_self"
            aria-label="citymax"
            href="/citymax">
            <div className={styles.item_wrap}>CityMax</div>
          </a>
        </div>
      ) : (
        <div className="w-[80%]">
          <Skeleton />
        </div>
      )}
      <div className={styles.menu_list_right}>
        <a href={"/pages/offers"}>
          <p className={styles.item_wrap}>Offers</p>
        </a>
        <a href="/pages/bulkorder">
          <p className={`${styles.item_wrap}`} style={{marginRight: "0"}}>
            CF for business
          </p>
        </a>
      </div>
    </div>
  );
}
