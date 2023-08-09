import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useRouter} from "next/navigation";
import {useQuery} from "@/hooks/useQuery";
import {endPoints} from "@/network/endPoints";

const RentNowBanner = () => {
  const router = useRouter();
  const [rentNowBanner, setRentNowBanner] = React.useState(null);
  const tabBox = document.querySelector("#rentNowSlider");

  let isDragging = false;

  const dragging = e => {
    if (!isDragging) return;
    tabBox.scrollLeft -= e.movementX;
  };
  const dragStop = () => {
    isDragging = false;
  };

  // if (tabBox) {
  tabBox?.addEventListener("mousedown", () => (isDragging = true));
  tabBox?.addEventListener("mousemove", dragging);
  // }
  document.addEventListener("mouseup", dragStop);
  const {refetch: getRentNowBanners} = useQuery(
    "rentNowBanners",
    endPoints.rentNowBanners,
  );
  useEffect(() => {
    getRentNowBanners()
      .then(res => {
        setRentNowBanner(res?.data?.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.rentNow_Banner_wrapper}>
      <div className={styles.banner_card}>
        {rentNowBanner?.map((item, index) => (
          <div className={styles.banner_wrapper} key={index.toString()}>
            <img
              src={`https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/${item?.image}`}
              alt={item?.image}
              className={styles.banner_img}
              onClick={() => router.push(item?.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentNowBanner;
