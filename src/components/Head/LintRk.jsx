import Script from "next/script";
import React from "react";

const LintRk = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        defer
        // async
        id="linkedin"
        dangerouslySetInnerHTML={{
          __html: `
          _linkedin_partner_id = "4895321";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `,
        }}
      />
      <Script
        strategy="afterInteractive"
        defer
        // async
        id="lms-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          (function (l) {
            if (!l) {
              window.lintrk = function (a, b) {
                window.lintrk.q.push([a, b])
              };
              window.lintrk.q = []
            }
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `,
        }}
      />

      <noscript>
        <img
          loading="lazy"
          height="1"
          width="1"
          style={{display: "none"}}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=4895321&fmt=gif"
        />
      </noscript>
    </>
  );
};

export default LintRk;
