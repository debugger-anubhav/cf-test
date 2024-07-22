import Script from "next/script";
import React from "react";

const TwitterAds = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        defer
        // async
        id="ads-twitter"
        dangerouslySetInnerHTML={{
          __html: `!function(e,t,n,s,u,a)
      {e.twq ||
        ((s = e.twq =
          function () {
            s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
          }),
        (s.version = "1.1"),
        (s.queue = []),
        (u = t.createElement(n)),
        (u.async = !0),
        (u.src = "https://static.ads-twitter.com/uwt.js"),
        (a = t.getElementsByTagName(n)[0]),
        a.parentNode.insertBefore(u, a))}
      (window,document,'script'); twq('config','ofz28');`,
        }}
      />
    </>
  );
};

export default TwitterAds;
