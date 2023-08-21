import React, {useEffect} from "react";
import styles from "./style.module.css";
import axios from "axios";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";

export default function TextContent({params}) {
  const [data, setData] = React.useState();
  const [paramsCityId, setParamsCityId] = React.useState(46);

  const HomePageText = () => {
    axios
      .get(baseURL + endPoints.homePageTextContent)
      .then(res => {
        setData(res?.data?.data);
        console.log("home");
      })
      .catch(err => console.log(err));
  };
  const SeoAppliancesPageText = () => {
    axios
      .get(
        baseURL +
          endPoints.seoAppliancesTextContent +
          `?cityId=${paramsCityId}&categoryId=26`,
      )
      .then(res => {
        setData(res?.data?.data);
        console.log("appliances-rental text-content");
      })
      .catch(err => console.log(err));
  };
  const SeoFurniturePageText = () => {
    axios
      .get(
        baseURL +
          endPoints.seoFurnitureTextContent +
          `?cityId=${paramsCityId}&categoryId=27`,
      )
      .then(res => {
        setData(res?.data);
        console.log("furniture-rental text content");
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    if (
      params?.category === "appliances-rental" ||
      params?.category === "furniture-rental"
    ) {
      axios
        .get(baseURL + endPoints.cityIdByCityName + params?.city)
        .then(res => setParamsCityId(res?.data?.data?.id))
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (params.category === "appliances-rental") SeoAppliancesPageText();
    else if (params.category === "furniture-rental") SeoFurniturePageText();
    else HomePageText();
  }, []);
  return (
    <div className={styles.wrapper}>
      {params === "home-page" && (
        <>
          {data?.map((item, index) => (
            <div
              dangerouslySetInnerHTML={{__html: item.meta_keyword}}
              className={styles.apiData}
              key={index.toString()}
            />
          ))}
        </>
      )}
      {params.category === "furniture-rental" && (
        <>
          {console.log(data, "data")}
          <div
            dangerouslySetInnerHTML={{__html: data?.data?.cat_meta_keyword}}
            className={styles.apiDataSeo}
          />
        </>
      )}
      {params.category === "appliances-rental" && (
        <div
          dangerouslySetInnerHTML={{__html: data?.cat_meta_keyword}}
          className={styles.apiDataSeo}
        />
      )}
    </div>
  );
}
