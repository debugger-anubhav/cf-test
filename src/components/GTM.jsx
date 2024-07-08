"use client";

import React from "react";
import Script from "next/script";

let currentDataLayerName;

export default function GoogleTagManager(props) {
  const {
    auth,
    dataLayer,
    dataLayerName = "dataLayer",
    gtmIds,
    includeInDevelopment = false,
    nsIncludedGTMId,
    preview,
  } = props;
  if (currentDataLayerName === undefined) {
    currentDataLayerName = dataLayerName;
  }
  const gtmLayer = dataLayerName !== "dataLayer" ? `&l=${dataLayerName}` : "";
  const gtmAuth = auth ? `&gtm_auth=${auth}` : "";
  const gtmPreview = preview ? `&gtm_preview=${preview}&gtm_cookies_win=x` : "";

  if (
    (process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION") ||
    includeInDevelopment
  ) {
    return (
      <>
        {gtmIds.map((gtmId, index) => (
          <Script
            key={`gtm-script-${index}`}
            // type="text/partytown"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}${gtmLayer}${gtmAuth}${gtmPreview}`}
          />
        ))}

        {nsIncludedGTMId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${nsIncludedGTMId}`}
              height="0"
              width="0"
              style={{display: "none", visibility: "hidden"}}
            />
          </noscript>
        )}

        <Script
          id="_next-gtm-init"
          // type="text/partytown"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,l){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              ${dataLayer ? `w[l].push(${JSON.stringify(dataLayer)})` : ""}
            })(window,'${dataLayerName}');`,
          }}
        />

        <script
          id="plugin-google-tagmanager"
          dangerouslySetInnerHTML={{
            __html: `
                window.${dataLayerName} = window.${dataLayerName} || [];
                function gtag(){dataLayer.push(arguments);}

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
                  window.fcWidgetMessengerConfig = {
                    cf_userid: res.data.userId,
                    firstName:userName,
                    tags: ["public", "cf_web_dev"], 

                    meta: {
                      cf_userid: res.data.userId,
                    },
                  }

                  gtag(
                    'config',
                    "G-XWKD9DJ015", {
                      "transport_url" : "https://p.easyinsights.in/ga4/MELZbvDkdcy7s0yP1zhp9YoLBnaAIMux",
                      "eiuid" : res.data.userId
                    }
                  );
                })

                gtag('js', new Date());
                [${gtmIds.map(
                  id => "'" + id + "'",
                )}].forEach((id) => gtag("config", id))
            `,
          }}
        />
      </>
    );
  } else {
    return null;
  }
}
