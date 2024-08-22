"use client";
import React, {useEffect, useState} from "react";
import "react-responsive-modal/styles.css";
import {Modal} from "react-responsive-modal";
import styles from "../LoginPopups/style.module.css";
import {handleWheel} from "@/constants/constant";
import design from "./style.module.css";
import {useDispatch} from "react-redux";
import {reduxSetModalState} from "@/store/Slices";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {showToastNotification} from "../Common/Notifications/toastUtils";
import LoaderComponent from "../Common/Loader/LoaderComponent";
import Cookies from "universal-cookie";

export default function Signin({orderId, setShowLogin}) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInOpen, setSignInOpen] = useState(true);
  const [errors, setErrors] = useState({email: "", password: ""});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (signInOpen) {
      dispatch(reduxSetModalState(false));
    }
  }, [signInOpen]);

  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = event => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = {email: "", password: ""};

    if (!email) {
      newErrors.email = "Email is required.";
      formIsValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      // Handle form submission (e.g., API call)
      singInApiCall(email, password);
      setLoader(true);
    }
  };

  const singInApiCall = (email, password) => {
    baseInstance
      .post(endPoints.loginAdmin, {
        email,
        password,
      })
      .then(res => {
        if (res?.data?.data?.data?.token) {
          cookies.set("adminToken", res?.data?.data?.data?.token);
          setShowLogin(false);
        } else {
          showToastNotification(res?.data?.data?.message, 3);
        }
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  };
  const onClose = () => {
    setSignInOpen(true);
  };

  return (
    <div>
      <Modal
        open={signInOpen}
        onClose={onClose}
        classNames={{
          modal: styles.verifyEmailCustomModal,
          overlay: styles.customOverlay,
          closeButton: styles.customCloseButton,
        }}>
        <div className="font-Poppins text-222 text-[22px] mb-4 font-medium">
          Sign in
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.company_detail_wapper}>
            <label className={design.label}>Email</label>
            <div className={`${design.label_input_style} flex justify-between`}>
              <input
                type="email"
                name="email"
                placeholder="Enter email id"
                className="outline-none w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 mt-2 font-Poppins text-12">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mt-8">
            <label className={design.label}>Password</label>
            <div className={`!mt-1 ${styles.form_input}`}>
              <input
                type="password"
                onWheel={handleWheel}
                className={styles.contact_input}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 mt-2 font-Poppins text-12">
                {errors.password}
              </p>
            )}
            <button
              type="submit"
              className="items-center w-full bg-F6B704 text-222 font-medium font-Poppins flex rounded-lg justify-center mt-8 h-[48px]">
              Proceed
            </button>
          </div>
        </form>
      </Modal>
      {loader && <LoaderComponent loading={loader} />}
    </div>
  );
}
