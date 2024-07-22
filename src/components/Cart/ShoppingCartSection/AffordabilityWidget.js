import React, {useEffect} from "react";

const AffordabilityWidget = ({razorpayKey, billBreakup}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/razorpay.js";
    script.async = true;

    const amount = billBreakup * 100; // amount in paise

    script.onload = () => {
      if (typeof RazorpayAffordabilitySuite !== "undefined") {
        const widgetConfig = {
          key: razorpayKey, // Replace with your Test Key ID generated from the Dashboard
          amount,
        };

        const rzpAffordabilitySuite = new window.RazorpayAffordabilitySuite(
          widgetConfig,
        );
        rzpAffordabilitySuite.render();
      } else {
        console.error("RazorpayAffordabilitySuite is not defined.");
      }
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, [razorpayKey, billBreakup]);

  return <div id="razorpay-affordability-widget"></div>;
};

export default AffordabilityWidget;
