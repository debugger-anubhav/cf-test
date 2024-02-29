import React, {useEffect} from "react";
import styles from "./style.module.css";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";

export default function TextContent({params}) {
  const [data, setData] = React.useState();
  const [paramsCityId, setParamsCityId] = React.useState(46);

  const HomePageText = () => {
    baseInstance
      .get(endPoints.homePageTextContent)
      .then(res => {
        setData(res?.data?.data);
        // console.log("home");
      })
      .catch(err => console.log(err));
  };
  const SeoAppliancesPageText = () => {
    baseInstance
      .get(
        endPoints.seoAppliancesTextContent +
          `?cityId=${paramsCityId}&categoryId=26`,
      )
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };
  const SeoFurniturePageText = () => {
    baseInstance
      .get(
        endPoints.seoFurnitureTextContent +
          `?cityId=${paramsCityId}&categoryId=27`,
      )
      .then(res => {
        setData(res?.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    if (
      params?.category === "appliances-rental" ||
      params?.category === "furniture-rental"
    ) {
      baseInstance
        .get(endPoints.cityIdByCityName + params?.city)
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
          <div
            dangerouslySetInnerHTML={{__html: data?.data?.cat_meta_keyword}}
            // className={styles.apiDataSeo}
          />
        </>
      )}
      {params.category === "appliances-rental" && (
        <div
          dangerouslySetInnerHTML={{__html: data?.cat_meta_keyword}}
          // className={styles.apiDataSeo}
        />
      )}
    </div>
  );
}
