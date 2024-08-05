import React from "react";
import commonStyles from "../common.module.css";
import {OpenIcon} from "@/assets/icon";

const RejectedDocsComponent = ({array, docType}) => {
  console.log(array, "pppppppp");
  const fileBaseUrl = "https://d3juy0zp6vqec8.cloudfront.net/";
  const handleOpenFile = (dirName, fileName) => {
    const imageUrl = fileBaseUrl + dirName + "/" + fileName;
    window?.open(imageUrl, "_blank");
  };

  return (
    <div className={commonStyles.rejected_docs_wrapper}>
      <p className={commonStyles.rejected_head}>Rejected documents</p>
      <div className={commonStyles.rejected_array}>
        {array
          ?.filter(item => item.doc_type === docType)
          .map((t, index) => (
            <div
              onClick={() => handleOpenFile(t.dir_name, t.doc_name)}
              key={index}
              className={commonStyles.rejected_doc_map_row}>
              <p className={commonStyles.rejected_doc_name}>{t?.doc_name}</p>
              <div>
                <OpenIcon className={commonStyles.download_file_arrow} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RejectedDocsComponent;
