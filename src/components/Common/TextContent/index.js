import React, {useEffect} from "react";
import styles from "./style.module.css";
import axios from "axios";
import {endPoints} from "@/network/endPoints";

export default function TextContent({params}) {
  const [data, setData] = React.useState();

  // const HomePageText = () => {
  //   axios
  //     .get(endPoints.homePageTextContent)
  //     .then(res => {
  //       setData(res?.data);
  //     })
  //     .catch(err => console.log(err));
  // };
  const SeoAppliancesPageText = () => {
    axios
      .get(endPoints.seoAppliancesTextContent)
      .then(res => {
        setData(res?.data);
        console.log(res.data, "shdsjk");
      })
      .catch(err => console.log(err));
  };
  // const SeoFurniturePageText = () => {
  //   axios
  //     .get(endPoints.seoFurnitureTextContent)
  //     .then(res => {
  //       setData(res?.data);
  //       console.log(data, "data hhhhhhhhhhhhhhhhhh");
  //     })
  //     .catch(err => console.log(err));
  // };

  useEffect(() => {
    // if (params.category === "appliances-rental") SeoAppliancesPageText()
    // else if (params.category === "furniture-rental") SeoFurniturePageText()
    // else HomePageText()
    SeoAppliancesPageText();
  }, []);
  return (
    <div className={styles.wrapper}>
      <p>jxbcjdsbfjksd</p>
      {console.log(data, "lllllllllllllllll")}
      {/* {data?.map((item, index) => 
            <div dangerouslySetInnerHTML={{ __html: item.meta_keyword }}
            key={index.toString()} />
            )}
        */}

      {/* <div dangerouslySetInnerHTML={{__html: data}} /> */}
    </div>
  );
}
