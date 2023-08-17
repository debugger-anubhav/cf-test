import React, {useEffect} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import SingleQuestion from "./singleQuestion";
import {ForwardArrow} from "@/assets/icon";
import {useQuery} from "@/hooks/useQuery";
import {endPoints} from "@/network/endPoints";

// h2 h3 p

const FrequentlyAskedQuestions = ({params}) => {
  const str = string.common_components.FAQ;
  const [faqs, setFaqs] = React.useState(null);
  const {refetch: getFaqsLandingPage} = useQuery(
    "faqsLandingPage",
    endPoints.faqsLandingPage,
  );
  const {refetch: getFaqsSeoAppliancePage} = useQuery(
    "faqsSeoAppliancePage",
    endPoints.seoApplianceFaqs,
  );
  const {refetch: getFaqsSeoFurniturePage} = useQuery(
    "faqsSeoFurniturePage",
    endPoints.seoFurnitureFaqs,
  );

  useEffect(() => {
    if (params?.category === "appliances-rental") {
      getFaqsSeoAppliancePage()
        .then(res => {
          setFaqs(res?.data?.data);
        })
        .catch(err => console.log(err));
    } else if (params?.category === "furniture-rental") {
      getFaqsSeoFurniturePage()
        .then(res => {
          setFaqs(res?.data?.data);
        })
        .catch(err => console.log(err));
    } else {
      getFaqsLandingPage()
        .then(res => {
          setFaqs(res?.data?.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className={styles.freq_asked_que_wrapper}>
      <h2 className={styles.head}>{str.header}</h2>
      <div>
        <div className={styles.QuesAnsArray_div}>
          {faqs?.map((item, index) => {
            return (
              index < 7 && (
                <div key={index.toString()}>
                  <SingleQuestion ques={item?.question} ans={item?.answer} />
                </div>
              )
            );
          })}
        </div>
        <div className={styles.btn}>
          <p className={styles.btn_txt}>{str.btn_txt}</p>
          <ForwardArrow className={styles.forword_icon} />
        </div>
      </div>
    </div>
  );
};
export default FrequentlyAskedQuestions;
