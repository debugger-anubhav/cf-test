import React, {useEffect, useState} from "react";

const Script = () => {
  const [pathname, setPathname] = useState(false);

  useEffect(() => {
    const currentHostname = window?.location?.hostname;
    const isCityFurnish = currentHostname === "cityfurnish.com/";
    setPathname(isCityFurnish);
    console.log(isCityFurnish, "isCityFurnish");
  }, []);

  const PROD_ENV = pathname;

  // Check if PROD_ENV is true
  if (PROD_ENV) {
    // If PROD_ENV is true, render production environment scripts
    return (
      <>
        <script>
          {`(function(){var r;(e=r=r||{}).A="identify",e.B="trackPageView",e.C="fireEmailCaptureEvent",e.D="fireCustomGoal",e.E="firePurchaseEvent";var e="//j.northbeam.io/ota-sp/00488aed-b518-497e-8667-4954d2545f82.js";function t(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];a.push({fnName:e,args:n})}var a=[],n=((n={_q:a})[r.A]=function(e,n){return t(r.A,e,n)},n[r.B]=function(){return t(r.B)},n[r.C]=function(e,n){return t(r.C,e,n)},n[r.D]=function(e,n){return t(r.D,e,n)},n[r.E]=function(e){return t(r.E,e)},window.Northbeam=n,document.createElement("script"));n.async=!0,n.src=e,document.head.appendChild(n);})()`}
        </script>
        <script>
          {`
        !function (f, b, e, v, n, t, s)
        {
            if (f.fbq)
                return;
            n = f.fbq = function () {
                n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq)
                f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '713012115962029');
        fbq('track', 'PageView');
        `}{" "}
        </script>
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=713012115962029&ev=PageView&noscript=1"
          />
        </noscript>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-05PLBRM6KD"></script>
        <script>
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        <?php
        $login = $this->session->userdata('fc_session_user_id');
        if ($login != '') {
            ?>
                gtag('config', 'G-05PLBRM6KD', {
                    'user_id': <?php echo $login ;?>
                });
            <?php
        }else{
            ?>
        gtag('config', 'G-05PLBRM6KD');
            <?php    
        }
        ?>`}
        </script>
        <script type="text/javascript">
          {" "}
          {`
    
    _linkedin_partner_id = "4895321";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);</script><script type="text/javascript"> (function (l) {
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
            })(window.lintrk);`}
        </script>{" "}
        <noscript>
          {" "}
          <img
            height="1"
            width="1"
            style="display:none;"
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=4895321&fmt=gif"
          />{" "}
        </noscript>
        <script>{`(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({'gtm.start':
                        new Date().getTime(), event: 'gtm.js'});
            var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PF4G2HJ')`}</script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PF4G2HJ"
            height="0"
            width="0"
            style="display:none;visibility:hidden"></iframe>
        </noscript>
        <script type="text/javascript">
          {`
        !function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:{}};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var r=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,n){return function(r){e._q.push({name:t,args:Array.prototype.slice.call(n,0),resolve:r})}},o=function(e,t,n){e[t]=function(){if(n)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var n=0;n<g.length;n++)o(e,g[n],!0)};n.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-x0ik2D45ZDEEEpYpEuDpmj05fY91P7EOZkgdKmq4dKL/ZAVcufJ+nULFtGn0HIZE",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-2.0.0-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(u,a);for(var c=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)r(c,p[l]);n.Identify=c;for(var d=function(){return this._q=[],this},f=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],v=0;v<f.length;v++)r(d,f[v]);n.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(n),n.createInstance=function(e){return n._iq[e]={_q:[]},i(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();

        amplitude.init("<?php echo AMPLITUDE_ID; ?>");`}
        </script>
        <script>
          {`
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    twq('config','ofz28');`}
        </script>
        {/* Add more production environment scripts here */}
        {`
        if ($this->config->item('google_verification')) {
        echo stripslashes($this->config->item('google_verification'));
    }
    $query_string = explode('/', $_SERVER['REQUEST_URI']);
    if (in_array($query_string[1], array("choose-products", "ajxapi"))) {
        ?>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <meta name="googlebot" content="noindex">
        <meta name="robots" content="noindex,nofollow" />
        <?php
    }`}
      </>
    );
  } else {
    // If PROD_ENV is false, render testing environment scripts
    return (
      <>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex,nofollow" />
      </>
    );
  }
};

export default Script;
