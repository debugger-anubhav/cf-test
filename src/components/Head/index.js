import React from "react";
import {strToBoolean} from "@/constants/utils";
import GTM from "./GTM";
import Clarity from "./Clarity";
import Links from "./Links";
import Metas from "./Metas";
import FWCDN from "./FWCDN";
import FWConfig from "./FWConfig";
import Info from "./Info";
import FBQ from "./FBQ";
import LintRk from "./LintRk";
import TwitterAds from "./TwitterAds";
import Razorpay from "./Razorpay";

const Head = () => {
  const gtmIds = [
    process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID,
    process.env.NEXT_PUBLIC_NS_GTM_ID,
  ].filter(Boolean);
  const nsIncludedGTMId = process.env.NEXT_PUBLIC_NS_GTM_ID;
  const includeInDevelopment = strToBoolean(
    process.env.NEXT_PUBLIC_INCLUDE_SCRIPTS_IN_DEV,
  );

  return (
    <head>
      <Links />
      <Metas />
      <GTM
        gtmIds={gtmIds}
        nsIncludedGTMId={nsIncludedGTMId}
        includeInDevelopment={includeInDevelopment}
      />
      <Clarity includeInDevelopment={includeInDevelopment} />

      {((process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION") ||
        includeInDevelopment) && (
        <>
          {/* <FWCDN />
          <FWConfig /> */}
          <Info />
          <FBQ />
          <LintRk />
          <TwitterAds />
          <Razorpay />
        </>
      )}

      {/* {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
    <script
      async
      defer
      dangerouslySetInnerHTML={{
        __html: `
       (function(){
         var r;
         (e=r=r||{}).A="identify";
         e.B="trackPageView";
         e.C="fireEmailCaptureEvent";
         e.D="fireCustomGoal";
         e.E="firePurchaseEvent";
         var e="//j.northbeam.io/ota-sp/00488aed-b518-497e-8667-4954d2545f82.js";
         function t(e){
           for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];
           a.push({fnName:e,args:n})
         }
         var a=[],n=((n={_q:a})[r.A]=function(e,n){return t(r.A,e,n)},n[r.B]=function(){return t(r.B)},n[r.C]=function(e,n){return t(r.C,e,n)},n[r.D]=function(e,n){return t(r.D,e,n)},n[r.E]=function(e){return t(r.E,e)},window?.Northbeam,document?.createElement("script"));
         n.async=!0;
         n.src=e;
         document?.head.appendChild(n);
       })();
     `,
      }}
    />
  )} */}

      {/* {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
    <script
      defer
      async
      src="https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit&hl=en"
    />
  )}

  {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
    <script
      defer
      async
      dangerouslySetInnerHTML={{
        __html: `
var CaptchaCallback = function(){        
$('#g-recaptcha').each(function(){
grecaptcha.render(this,{'sitekey' : ${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}});
})
$('#g-recaptcha-footer').each(function(){
grecaptcha.render(this,{'sitekey' : ${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}});
})
};`,
      }}
    />
  )} */}

      {/*
  if (typeof gtag === 'function' && '${login}' !== '') {
    gtag('set', 'user_id', '${login}');
  } */}

      {/* {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
    <script
      defer
      async
      dangerouslySetInnerHTML={{
        __html: `
!function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:{}};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var r=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,n){return function(r){e._q.push({name:t,args:Array.prototype.slice.call(n,0),resolve:r})}},o=function(e,t,n){e[t]=function(){if(n)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var n=0;n<g.length;n++)o(e,g[n],!0)};n.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-x0ik2D45ZDEEEpYpEuDpmj05fY91P7EOZkgdKmq4dKL/ZAVcufJ+nULFtGn0HIZE",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-2.0.0-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(u,a);for(var c=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)r(c,p[l]);n.Identify=c;for(var d=function(){return this._q=[],this},f=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],v=0;v<f.length;v++)r(d,f[v]);n.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(n),n.createInstance=function(e){return n._iq[e]={_q:[]},i(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();

amplitude.init("${AMPLITUDE_ID}");`,
      }}
    />
  )} */}
    </head>
  );
};

export default Head;
