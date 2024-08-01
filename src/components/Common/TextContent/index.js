import React, { useEffect, useState, useRef } from "react";
import styles from "../../Category/categoryContent/style.module.css";
import Worker from "worker-loader!./textContentWorker";

export default function TextContent({ params }) {
  const [data, setData] = useState([]);
  const [paramsCityId, setParamsCityId] = useState(46);
  const workerRef = useRef(null);

  useEffect(() => {
    // Create worker instance and store it in a ref
    workerRef.current = new Worker();

    workerRef.current.onmessage = function ({ data: { data, cityId } }) {
      if (cityId) {
        setParamsCityId(cityId);
      }
      setData(data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "city", params });
    }
  }, [params?.city]);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ params, paramsCityId });
    }
  }, [params, paramsCityId]);

  return (
    <div className={styles.wrapper}>
      {params === "home-page" && (
        <>
          {data.map((item, index) => (
            <div
              className={styles.dynamic_keyword}
              dangerouslySetInnerHTML={{ __html: item.meta_keyword }}
              key={index.toString()}
            />
          ))}
        </>
      )}
      {params.category === "furniture-rental" && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: data?.data?.cat_meta_keyword }}
            className={styles.dynamic_keyword}
          />
        </>
      )}
      {params.category === "appliances-rental" && (
        <div
          dangerouslySetInnerHTML={{ __html: data?.cat_meta_keyword }}
          className={styles.dynamic_keyword}
        />
      )}
    </div>
  );
}
