import React, {useEffect, useState} from "react";
import styles from "../../Category/categoryContent/style.module.css";
import Worker from "worker-loader!./textContentWorker";

export default function TextContent({params}) {
  const [data, setData] = useState();
  const [paramsCityId, setParamsCityId] = useState(46);

  const worker = new Worker();

  useEffect(() => {
    worker.postMessage({type: "city", params});
  }, [params?.city]);

  useEffect(() => {
    worker.postMessage({params, paramsCityId});

    worker.onmessage = function ({data: {data, cityId}}) {
      if (cityId) {
        setParamsCityId(cityId);
      }
      setData(data);
    };

    return () => {
      worker.terminate();
    };
  }, [paramsCityId]);

  return (
    <div className={styles.wrapper}>
      {params === "home-page" && (
        <>
          {data?.map((item, index) => (
            <div
              className={styles.dynamic_keyword}
              dangerouslySetInnerHTML={{__html: item.meta_keyword}}
              key={index.toString()}
            />
          ))}
        </>
      )}
      {params.category === "furniture-rental" && (
        <>
          <div
            dangerouslySetInnerHTML={{__html: data?.data?.cat_meta_keyword}}
            className={styles.dynamic_keyword}
          />
        </>
      )}
      {params.category === "appliances-rental" && (
        <div
          dangerouslySetInnerHTML={{__html: data?.cat_meta_keyword}}
          className={styles.dynamic_keyword}
        />
      )}
    </div>
  );
}
