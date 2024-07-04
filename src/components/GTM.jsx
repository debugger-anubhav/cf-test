"use client";

import React from "react";
import Script from "next/script";

let currentDataLayerName;

export default function GoogleTagManager(props) {
  const {
    gtmIds,
    dataLayerName = "dataLayer",
    auth,
    preview,
    dataLayer,
    includeInDevelopment = false,
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

        <Script
          id="plugin-google-tagmanager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.${dataLayerName} = window.${dataLayerName} || [];
                function gtag(){dataLayer.push(arguments);}

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
