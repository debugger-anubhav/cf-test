import React from "react";
import Script from "next/script";

export default function Clarity(props) {
  const {includeInDevelopment = false} = props;

  if (
    (process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION") ||
    includeInDevelopment
  ) {
    return (
      <Script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "mcs8re888u");`,
        }}
      />
    );
  } else {
    return null;
  }
}
