import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";
import Rating from "react-rating";
import {ArrowForw, RatingStar} from "@/assets/icon";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import formStyles from "@/components/Cart/AddressSection/styles.module.css";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useParams, useRouter} from "next/navigation";
import {showToastNotification} from "../../Common/Notifications/toastUtils";

export default function MainSection() {
  const params = useParams();
  const router = useRouter();
  const Heading = "Feedback";
  const Subheading =
    " Getting your words about Cityfurnish is great. Rate us on our recent  interaction and give your valuable feedback.";
  const [isHovered, setIsHovered] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = values => {
    // console.log("sbmit", values);
    axios
      .post(baseURL + endPoints.feedback, {
        feedback_url: "https://test.rentofurniture.com/fb/KLAisk1",
        customer_contact_no: params.mobilenumber,
        rating: values.ratingnumber,
        comment: values.textarea,
        msgTime: params.unixtimestamp,
      })
      .then(res => {
        // console.log(res, "response");
        showToastNotification(
          "Your Feedback is sent to our team. Thank you for your response.",
          1,
        );
        setTimeout(() => {
          router.push("/cityfurnish");
        }, 3000);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    console.log(isHovered, "state");
  }, [isHovered]);

  const validationSchema = Yup.object({
    textarea: Yup.string().required(
      "Your Feedback is important to us! Please let us know how we can improve ourselves?",
    ),
    ratingnumber: Yup.string().required(
      "Please rate the feedback out of 5 stars",
    ),
  });

  return (
    <div className={styles.wrapper}>
      <BreadCrumbsCommon currentPage={"Feedback"} />
      <div className={styles.main_heading}>{Heading}</div>
      <div className={styles.sub_heading}>{Subheading}</div>

      <Formik
        initialValues={{
          ratingnumber: "",
          textarea: "",
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          handleSubmit(values);
        }}>
        {formik => (
          <Form className={styles.form_wrapper}>
            <div>
              <div className={styles.rating_row}>
                <Rating
                  emptySymbol={
                    <RatingStar color={"#CACACC"} className={styles.star} />
                  }
                  fullSymbol={
                    rating > 0 ? (
                      <RatingStar color={"#F6B704"} className={styles.star} />
                    ) : isHovered ? (
                      <RatingStar color={"#EAD18A"} className={styles.star} />
                    ) : (
                      <RatingStar color={"#F6B704"} className={styles.star} />
                    )
                  }
                  onClick={ratingValue => {
                    formik.setFieldValue("ratingnumber", ratingValue);
                    setRating(ratingValue);
                    setIsHovered(false);
                  }}
                  onHover={() => {
                    setIsHovered(true);
                  }}
                  initialRating={rating}
                  name="ratingnumber"
                />
                <ErrorMessage name="ratingnumber">
                  {msg =>
                    formik.touched.ratingnumber && (
                      <p className={formStyles.error}>{msg} </p>
                    )
                  }
                </ErrorMessage>
              </div>
              <div className={styles.input_wrapper}>
                <Field
                  name="textarea"
                  as="textarea"
                  placeholder="Let us know how we can improve ourselves?"
                  className={styles.textarea}
                  values="textarea"></Field>
                <ErrorMessage name="textarea">
                  {msg =>
                    formik.touched.textarea && (
                      <p className={formStyles.error}>{msg} </p>
                    )
                  }
                </ErrorMessage>
              </div>
              <button className={styles.submit_btn} type="submit">
                Submit <ArrowForw size={20} color={"#222"} />{" "}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
