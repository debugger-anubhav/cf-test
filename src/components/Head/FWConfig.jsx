import Script from "next/script";
import React from "react";

const FWConfig = () => {
  return (
    <Script
      defer
      async
      type="text/javascript"
      id="fcWidgetMessengerConfig"
      dangerouslySetInnerHTML={{
        __html: `
            const userId = localStorage.getItem("_ga");
            const userName= localStorage.getItem("user_name")
            fetch("https://cityfurnish.com/ajxapi/getDecryptedUserId", {
            method: "POST",
            body: JSON.stringify({
                userId: JSON.parse(userId)
            }),
            })
            .then(res => res.json())
            .then(res => {
                setTimeout(() => {
                  window.dataLayer.push({
                    "event":"logged_in_user",
                    "userid":res.data.userId
                  })

                  window.gtag(
                    'config',
                    'G-XWKD9DJ015', {
                      "transport_url" : "https://p.easyinsights.in/ga4/MELZbvDkdcy7s0yP1zhp9YoLBnaAIMux"
                    }
                  );
                  window.gtag(
                    'event',
                    'page_view', {
                      'send_to': 'G-XWKD9DJ015',
                      "eiuid" : res.data.userId
                    }
                  );
                }, 3000)
                window.fcWidgetMessengerConfig = {
                  cf_userid: res.data.userId,
                  firstName : userName,
                  tags: ["cf_web_dev"], 
                  meta: {
                    cf_userid: res.data.userId,
                  },
                }
            })
            .catch(e => console.log('e',e))
        `,
      }}
    />
  );
};

export default FWConfig;
