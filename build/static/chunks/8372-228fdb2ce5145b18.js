"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8372],{30007:function(e,t,n){n.d(t,{Z:function(){return g}});var r=n(40431),o=n(46750),i=n(86006),a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=function e(t){var n,r,o="";if("string"==typeof t||"number"==typeof t)o+=t;else if("object"==typeof t){if(Array.isArray(t))for(n=0;n<t.length;n++)t[n]&&(r=e(t[n]))&&(o&&(o+=" "),o+=r);else for(n in t)t[n]&&(o&&(o+=" "),o+=n)}return o}(e))&&(r&&(r+=" "),r+=t);return r},s=n(4323),f=n(51579),p=n(86601),c=n(95887),l=n(9268);let u=["className","component"];var d=n(47327),m=n(5287),h=n(86356);let v=(0,m.Z)(),y=function(e={}){let{themeId:t,defaultTheme:n,defaultClassName:d="MuiBox-root",generateClassName:m}=e,h=(0,s.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(f.Z),v=i.forwardRef(function(e,i){let s=(0,c.Z)(n),f=(0,p.Z)(e),{className:v,component:y="div"}=f,g=(0,o.Z)(f,u);return(0,l.jsx)(h,(0,r.Z)({as:y,ref:i,className:a(v,m?m(d):d),theme:t&&s[t]||s},g))});return v}({themeId:h.Z,defaultTheme:v,defaultClassName:"MuiBox-root",generateClassName:d.Z.generate});var g=y},6559:function(e,t,n){n.d(t,{Z:function(){return eC}});var r,o,i,a,s,f=n(40431),p=n(46750),c=n(86006),l=n(99179),u=n(11059),d=n(47375);function m(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function h(e){var t=m(e).Element;return e instanceof t||e instanceof Element}function v(e){var t=m(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function y(e){if("undefined"==typeof ShadowRoot)return!1;var t=m(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}var g=Math.max,b=Math.min,x=Math.round;function w(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function O(){return!/^((?!chrome|android).)*safari/i.test(w())}function P(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&v(e)&&(o=e.offsetWidth>0&&x(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&x(r.height)/e.offsetHeight||1);var a=(h(e)?m(e):window).visualViewport,s=!O()&&n,f=(r.left+(s&&a?a.offsetLeft:0))/o,p=(r.top+(s&&a?a.offsetTop:0))/i,c=r.width/o,l=r.height/i;return{width:c,height:l,top:p,right:f+c,bottom:p+l,left:f,x:f,y:p}}function j(e){var t=m(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function E(e){return e?(e.nodeName||"").toLowerCase():null}function Z(e){return((h(e)?e.ownerDocument:e.document)||window.document).documentElement}function A(e){return P(Z(e)).left+j(e).scrollLeft}function D(e){return m(e).getComputedStyle(e)}function R(e){var t=D(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function k(e){var t=P(e),n=e.offsetWidth,r=e.offsetHeight;return 1>=Math.abs(t.width-n)&&(n=t.width),1>=Math.abs(t.height-r)&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function M(e){return"html"===E(e)?e:e.assignedSlot||e.parentNode||(y(e)?e.host:null)||Z(e)}function B(e,t){void 0===t&&(t=[]);var n,r=function e(t){return["html","body","#document"].indexOf(E(t))>=0?t.ownerDocument.body:v(t)&&R(t)?t:e(M(t))}(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=m(r),a=o?[i].concat(i.visualViewport||[],R(r)?r:[]):r,s=t.concat(a);return o?s:s.concat(B(M(a)))}function L(e){return v(e)&&"fixed"!==D(e).position?e.offsetParent:null}function W(e){for(var t=m(e),n=L(e);n&&["table","td","th"].indexOf(E(n))>=0&&"static"===D(n).position;)n=L(n);return n&&("html"===E(n)||"body"===E(n)&&"static"===D(n).position)?t:n||function(e){var t=/firefox/i.test(w());if(/Trident/i.test(w())&&v(e)&&"fixed"===D(e).position)return null;var n=M(e);for(y(n)&&(n=n.host);v(n)&&0>["html","body"].indexOf(E(n));){var r=D(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}var T="bottom",C="right",H="left",S="auto",N=["top",T,C,H],V="start",q="viewport",_="popper",I=N.reduce(function(e,t){return e.concat([t+"-"+V,t+"-end"])},[]),F=[].concat(N,[S]).reduce(function(e,t){return e.concat([t,t+"-"+V,t+"-end"])},[]),U=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"],z={placement:"bottom",modifiers:[],strategy:"absolute"};function X(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(e){return!(e&&"function"==typeof e.getBoundingClientRect)})}var Y={passive:!0};function G(e){return e.split("-")[0]}function J(e){return e.split("-")[1]}function K(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Q(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?G(o):null,a=o?J(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case"top":t={x:s,y:n.y-r.height};break;case T:t={x:s,y:n.y+n.height};break;case C:t={x:n.x+n.width,y:f};break;case H:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var p=i?K(i):null;if(null!=p){var c="y"===p?"height":"width";switch(a){case V:t[p]=t[p]-(n[c]/2-r[c]/2);break;case"end":t[p]=t[p]+(n[c]/2-r[c]/2)}}return t}var $={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ee(e){var t,n,r,o,i,a,s,f=e.popper,p=e.popperRect,c=e.placement,l=e.variation,u=e.offsets,d=e.position,h=e.gpuAcceleration,v=e.adaptive,y=e.roundOffsets,g=e.isFixed,b=u.x,w=void 0===b?0:b,O=u.y,P=void 0===O?0:O,j="function"==typeof y?y({x:w,y:P}):{x:w,y:P};w=j.x,P=j.y;var E=u.hasOwnProperty("x"),A=u.hasOwnProperty("y"),R=H,k="top",M=window;if(v){var B=W(f),L="clientHeight",S="clientWidth";B===m(f)&&"static"!==D(B=Z(f)).position&&"absolute"===d&&(L="scrollHeight",S="scrollWidth"),("top"===c||(c===H||c===C)&&"end"===l)&&(k=T,P-=(g&&B===M&&M.visualViewport?M.visualViewport.height:B[L])-p.height,P*=h?1:-1),(c===H||("top"===c||c===T)&&"end"===l)&&(R=C,w-=(g&&B===M&&M.visualViewport?M.visualViewport.width:B[S])-p.width,w*=h?1:-1)}var N=Object.assign({position:d},v&&$),V=!0===y?(t={x:w,y:P},n=m(f),r=t.x,o=t.y,{x:x(r*(i=n.devicePixelRatio||1))/i||0,y:x(o*i)/i||0}):{x:w,y:P};return(w=V.x,P=V.y,h)?Object.assign({},N,((s={})[k]=A?"0":"",s[R]=E?"0":"",s.transform=1>=(M.devicePixelRatio||1)?"translate("+w+"px, "+P+"px)":"translate3d("+w+"px, "+P+"px, 0)",s)):Object.assign({},N,((a={})[k]=A?P+"px":"",a[R]=E?w+"px":"",a.transform="",a))}var et={left:"right",right:"left",bottom:"top",top:"bottom"};function en(e){return e.replace(/left|right|bottom|top/g,function(e){return et[e]})}var er={start:"end",end:"start"};function eo(e){return e.replace(/start|end/g,function(e){return er[e]})}function ei(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&y(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ea(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function es(e,t,n){var r,o,i,a,s,f,p,c,l,u;return t===q?ea(function(e,t){var n=m(e),r=Z(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,s=0,f=0;if(o){i=o.width,a=o.height;var p=O();(p||!p&&"fixed"===t)&&(s=o.offsetLeft,f=o.offsetTop)}return{width:i,height:a,x:s+A(e),y:f}}(e,n)):h(t)?((r=P(t,!1,"fixed"===n)).top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r):ea((o=Z(e),a=Z(o),s=j(o),f=null==(i=o.ownerDocument)?void 0:i.body,p=g(a.scrollWidth,a.clientWidth,f?f.scrollWidth:0,f?f.clientWidth:0),c=g(a.scrollHeight,a.clientHeight,f?f.scrollHeight:0,f?f.clientHeight:0),l=-s.scrollLeft+A(o),u=-s.scrollTop,"rtl"===D(f||a).direction&&(l+=g(a.clientWidth,f?f.clientWidth:0)-p),{width:p,height:c,x:l,y:u}))}function ef(){return{top:0,right:0,bottom:0,left:0}}function ep(e){return Object.assign({},ef(),e)}function ec(e,t){return t.reduce(function(t,n){return t[n]=e,t},{})}function el(e,t){void 0===t&&(t={});var n,r,o,i,a,s,f,p=t,c=p.placement,l=void 0===c?e.placement:c,u=p.strategy,d=void 0===u?e.strategy:u,m=p.boundary,y=p.rootBoundary,x=p.elementContext,w=void 0===x?_:x,O=p.altBoundary,j=p.padding,A=void 0===j?0:j,R=ep("number"!=typeof A?A:ec(A,N)),k=e.rects.popper,L=e.elements[void 0!==O&&O?w===_?"reference":_:w],H=(n=h(L)?L:L.contextElement||Z(e.elements.popper),s=(a=[].concat("clippingParents"===(r=void 0===m?"clippingParents":m)?(o=B(M(n)),h(i=["absolute","fixed"].indexOf(D(n).position)>=0&&v(n)?W(n):n)?o.filter(function(e){return h(e)&&ei(e,i)&&"body"!==E(e)}):[]):[].concat(r),[void 0===y?q:y]))[0],(f=a.reduce(function(e,t){var r=es(n,t,d);return e.top=g(r.top,e.top),e.right=b(r.right,e.right),e.bottom=b(r.bottom,e.bottom),e.left=g(r.left,e.left),e},es(n,s,d))).width=f.right-f.left,f.height=f.bottom-f.top,f.x=f.left,f.y=f.top,f),S=P(e.elements.reference),V=Q({reference:S,element:k,strategy:"absolute",placement:l}),I=ea(Object.assign({},k,V)),F=w===_?I:S,U={top:H.top-F.top+R.top,bottom:F.bottom-H.bottom+R.bottom,left:H.left-F.left+R.left,right:F.right-H.right+R.right},z=e.modifiersData.offset;if(w===_&&z){var X=z[l];Object.keys(U).forEach(function(e){var t=[C,T].indexOf(e)>=0?1:-1,n=["top",T].indexOf(e)>=0?"y":"x";U[e]+=X[n]*t})}return U}function eu(e,t,n){return g(e,b(t,n))}function ed(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function em(e){return["top",C,T,H].some(function(t){return e[t]>=0})}var eh=(i=void 0===(o=(r={defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,s=void 0===a||a,f=m(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&p.forEach(function(e){e.addEventListener("scroll",n.update,Y)}),s&&f.addEventListener("resize",n.update,Y),function(){i&&p.forEach(function(e){e.removeEventListener("scroll",n.update,Y)}),s&&f.removeEventListener("resize",n.update,Y)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=Q({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=n.adaptive,i=n.roundOffsets,a=void 0===i||i,s={placement:G(t.placement),variation:J(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:void 0===r||r,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,ee(Object.assign({},s,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:void 0===o||o,roundOffsets:a})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,ee(Object.assign({},s,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:a})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];v(o)&&E(o)&&(Object.assign(o.style,n),Object.keys(r).forEach(function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)}))})},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce(function(e,t){return e[t]="",e},{});v(r)&&E(r)&&(Object.assign(r.style,i),Object.keys(o).forEach(function(e){r.removeAttribute(e)}))})}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=F.reduce(function(e,n){var r,o,a,s,f,p;return e[n]=(r=t.rects,a=[H,"top"].indexOf(o=G(n))>=0?-1:1,f=(s="function"==typeof i?i(Object.assign({},r,{placement:n})):i)[0],p=s[1],f=f||0,p=(p||0)*a,[H,C].indexOf(o)>=0?{x:p,y:f}:{x:f,y:p}),e},{}),s=a[t.placement],f=s.x,p=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=a}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,p=n.padding,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,y=G(v)===v,g=f||(y||!m?[en(v)]:function(e){if(G(e)===S)return[];var t=en(e);return[eo(e),t,eo(t)]}(v)),b=[v].concat(g).reduce(function(e,n){var r,o,i,a,s,f,u,d,v,y,g,b;return e.concat(G(n)===S?(o=(r={placement:n,boundary:c,rootBoundary:l,padding:p,flipVariations:m,allowedAutoPlacements:h}).placement,i=r.boundary,a=r.rootBoundary,s=r.padding,f=r.flipVariations,d=void 0===(u=r.allowedAutoPlacements)?F:u,0===(g=(y=(v=J(o))?f?I:I.filter(function(e){return J(e)===v}):N).filter(function(e){return d.indexOf(e)>=0})).length&&(g=y),Object.keys(b=g.reduce(function(e,n){return e[n]=el(t,{placement:n,boundary:i,rootBoundary:a,padding:s})[G(n)],e},{})).sort(function(e,t){return b[e]-b[t]})):n)},[]),x=t.rects.reference,w=t.rects.popper,O=new Map,P=!0,j=b[0],E=0;E<b.length;E++){var Z=b[E],A=G(Z),D=J(Z)===V,R=["top",T].indexOf(A)>=0,k=R?"width":"height",M=el(t,{placement:Z,boundary:c,rootBoundary:l,altBoundary:u,padding:p}),B=R?D?C:H:D?T:"top";x[k]>w[k]&&(B=en(B));var L=en(B),W=[];if(i&&W.push(M[A]<=0),s&&W.push(M[B]<=0,M[L]<=0),W.every(function(e){return e})){j=Z,P=!1;break}O.set(Z,W)}if(P)for(var q=m?3:1,_=function(e){var t=b.find(function(t){var n=O.get(t);if(n)return n.slice(0,e).every(function(e){return e})});if(t)return j=t,"break"},U=q;U>0&&"break"!==_(U);U--);t.placement!==j&&(t.modifiersData[r]._skip=!0,t.placement=j,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=n.altAxis,a=n.boundary,s=n.rootBoundary,f=n.altBoundary,p=n.padding,c=n.tether,l=void 0===c||c,u=n.tetherOffset,d=void 0===u?0:u,m=el(t,{boundary:a,rootBoundary:s,padding:p,altBoundary:f}),h=G(t.placement),v=J(t.placement),y=!v,x=K(h),w="x"===x?"y":"x",O=t.modifiersData.popperOffsets,P=t.rects.reference,j=t.rects.popper,E="function"==typeof d?d(Object.assign({},t.rects,{placement:t.placement})):d,Z="number"==typeof E?{mainAxis:E,altAxis:E}:Object.assign({mainAxis:0,altAxis:0},E),A=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0};if(O){if(void 0===o||o){var R,M="y"===x?"top":H,B="y"===x?T:C,L="y"===x?"height":"width",S=O[x],N=S+m[M],q=S-m[B],_=l?-j[L]/2:0,I=v===V?P[L]:j[L],F=v===V?-j[L]:-P[L],U=t.elements.arrow,z=l&&U?k(U):{width:0,height:0},X=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ef(),Y=X[M],Q=X[B],$=eu(0,P[L],z[L]),ee=y?P[L]/2-_-$-Y-Z.mainAxis:I-$-Y-Z.mainAxis,et=y?-P[L]/2+_+$+Q+Z.mainAxis:F+$+Q+Z.mainAxis,en=t.elements.arrow&&W(t.elements.arrow),er=en?"y"===x?en.clientTop||0:en.clientLeft||0:0,eo=null!=(R=null==A?void 0:A[x])?R:0,ei=S+ee-eo-er,ea=S+et-eo,es=eu(l?b(N,ei):N,S,l?g(q,ea):q);O[x]=es,D[x]=es-S}if(void 0!==i&&i){var ep,ec,ed="x"===x?"top":H,em="x"===x?T:C,eh=O[w],ev="y"===w?"height":"width",ey=eh+m[ed],eg=eh-m[em],eb=-1!==["top",H].indexOf(h),ex=null!=(ec=null==A?void 0:A[w])?ec:0,ew=eb?ey:eh-P[ev]-j[ev]-ex+Z.altAxis,eO=eb?eh+P[ev]+j[ev]-ex-Z.altAxis:eg,eP=l&&eb?(ep=eu(ew,eh,eO))>eO?eO:ep:eu(l?ew:ey,eh,l?eO:eg);O[w]=eP,D[w]=eP-eh}t.modifiersData[r]=D}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n,r=e.state,o=e.name,i=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,f=G(r.placement),p=K(f),c=[H,C].indexOf(f)>=0?"height":"width";if(a&&s){var l=ep("number"!=typeof(t="function"==typeof(t=i.padding)?t(Object.assign({},r.rects,{placement:r.placement})):t)?t:ec(t,N)),u=k(a),d="y"===p?"top":H,m="y"===p?T:C,h=r.rects.reference[c]+r.rects.reference[p]-s[p]-r.rects.popper[c],v=s[p]-r.rects.reference[p],y=W(a),g=y?"y"===p?y.clientHeight||0:y.clientWidth||0:0,b=l[d],x=g-u[c]-l[m],w=g/2-u[c]/2+(h/2-v/2),O=eu(b,w,x);r.modifiersData[o]=((n={})[p]=O,n.centerOffset=O-w,n)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&ei(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=el(t,{elementContext:"reference"}),s=el(t,{altBoundary:!0}),f=ed(a,r),p=ed(s,o,i),c=em(f),l=em(p);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:p,isReferenceHidden:c,hasPopperEscaped:l},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":l})}}]}).defaultModifiers)?[]:o,s=void 0===(a=r.defaultOptions)?z:a,function(e,t,n){void 0===n&&(n=s);var r,o={placement:"bottom",orderedModifiers:[],options:Object.assign({},z,s),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],f=!1,p={state:o,setOptions:function(n){var r,f,l,u,d,m="function"==typeof n?n(o.options):n;c(),o.options=Object.assign({},s,o.options,m),o.scrollParents={reference:h(e)?B(e):e.contextElement?B(e.contextElement):[],popper:B(t)};var v=(f=Object.keys(r=[].concat(i,o.options.modifiers).reduce(function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e},{})).map(function(e){return r[e]}),l=new Map,u=new Set,d=[],f.forEach(function(e){l.set(e.name,e)}),f.forEach(function(e){u.has(e.name)||function e(t){u.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach(function(t){if(!u.has(t)){var n=l.get(t);n&&e(n)}}),d.push(t)}(e)}),U.reduce(function(e,t){return e.concat(d.filter(function(e){return e.phase===t}))},[]));return o.orderedModifiers=v.filter(function(e){return e.enabled}),o.orderedModifiers.forEach(function(e){var t=e.name,n=e.options,r=e.effect;if("function"==typeof r){var i=r({state:o,name:t,instance:p,options:void 0===n?{}:n});a.push(i||function(){})}}),p.update()},forceUpdate:function(){if(!f){var e,t,n,r,i,a,s,c,l,u,d,h,y=o.elements,g=y.reference,b=y.popper;if(X(g,b)){o.rects={reference:(t=W(b),n="fixed"===o.options.strategy,r=v(t),c=v(t)&&(a=x((i=t.getBoundingClientRect()).width)/t.offsetWidth||1,s=x(i.height)/t.offsetHeight||1,1!==a||1!==s),l=Z(t),u=P(g,c,n),d={scrollLeft:0,scrollTop:0},h={x:0,y:0},(r||!r&&!n)&&(("body"!==E(t)||R(l))&&(d=(e=t)!==m(e)&&v(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:j(e)),v(t)?(h=P(t,!0),h.x+=t.clientLeft,h.y+=t.clientTop):l&&(h.x=A(l))),{x:u.left+d.scrollLeft-h.x,y:u.top+d.scrollTop-h.y,width:u.width,height:u.height}),popper:k(b)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach(function(e){return o.modifiersData[e.name]=Object.assign({},e.data)});for(var w=0;w<o.orderedModifiers.length;w++){if(!0===o.reset){o.reset=!1,w=-1;continue}var O=o.orderedModifiers[w],D=O.fn,M=O.options,B=void 0===M?{}:M,L=O.name;"function"==typeof D&&(o=D({state:o,options:B,name:L,instance:p})||o)}}}},update:function(){return r||(r=new Promise(function(e){Promise.resolve().then(function(){r=void 0,e(new Promise(function(e){p.forceUpdate(),e(o)}))})})),r},destroy:function(){c(),f=!0}};if(!X(e,t))return p;function c(){a.forEach(function(e){return e()}),a=[]}return p.setOptions(n).then(function(e){!f&&n.onFirstUpdate&&n.onFirstUpdate(e)}),p}),ev=n(47562),ey=n(75387),eg=n(13809);function eb(e){return(0,eg.Z)("MuiPopper",e)}(0,n(88539).Z)("MuiPopper",["root"]);var ex=n(7877),ew=n(9268);let eO=c.createContext({disableDefaultClasses:!1}),eP=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],ej=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function eE(e){return"function"==typeof e?e():e}let eZ=()=>(0,ev.Z)({root:["root"]},function(e){let{disableDefaultClasses:t}=c.useContext(eO);return n=>t?"":e(n)}(eb)),eA={},eD=c.forwardRef(function(e,t){var n;let{anchorEl:r,children:o,direction:i,disablePortal:a,modifiers:s,open:d,placement:m,popperOptions:h,popperRef:v,slotProps:y={},slots:g={},TransitionProps:b}=e,x=(0,p.Z)(e,eP),w=c.useRef(null),O=(0,l.Z)(w,t),P=c.useRef(null),j=(0,l.Z)(P,v),E=c.useRef(j);(0,u.Z)(()=>{E.current=j},[j]),c.useImperativeHandle(v,()=>P.current,[]);let Z=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(m,i),[A,D]=c.useState(Z),[R,k]=c.useState(eE(r));c.useEffect(()=>{P.current&&P.current.forceUpdate()}),c.useEffect(()=>{r&&k(eE(r))},[r]),(0,u.Z)(()=>{if(!R||!d)return;let e=e=>{D(e.placement)},t=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:t})=>{e(t)}}];null!=s&&(t=t.concat(s)),h&&null!=h.modifiers&&(t=t.concat(h.modifiers));let n=eh(R,w.current,(0,f.Z)({placement:Z},h,{modifiers:t}));return E.current(n),()=>{n.destroy(),E.current(null)}},[R,a,s,d,h,Z]);let M={placement:A};null!==b&&(M.TransitionProps=b);let B=eZ(),L=null!=(n=g.root)?n:"div",W=(0,ex.y)({elementType:L,externalSlotProps:y.root,externalForwardedProps:x,additionalProps:{role:"tooltip",ref:O},ownerState:e,className:B.root});return(0,ew.jsx)(L,(0,f.Z)({},W,{children:"function"==typeof o?o(M):o}))}),eR=c.forwardRef(function(e,t){let n;let{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:s=!1,keepMounted:l=!1,modifiers:u,open:m,placement:h="bottom",popperOptions:v=eA,popperRef:y,style:g,transition:b=!1,slotProps:x={},slots:w={}}=e,O=(0,p.Z)(e,ej),[P,j]=c.useState(!0);if(!l&&!m&&(!b||P))return null;if(i)n=i;else if(r){let e=eE(r);n=e&&void 0!==e.nodeType?(0,d.Z)(e).body:(0,d.Z)(null).body}let E=!m&&l&&(!b||P)?"none":void 0;return(0,ew.jsx)(ey.h,{disablePortal:s,container:n,children:(0,ew.jsx)(eD,(0,f.Z)({anchorEl:r,direction:a,disablePortal:s,modifiers:u,ref:t,open:b?!P:m,placement:h,popperOptions:v,popperRef:y,slotProps:x,slots:w},O,{style:(0,f.Z)({position:"fixed",top:0,left:0,display:E},g),TransitionProps:b?{in:m,onEnter:()=>{j(!1)},onExited:()=>{j(!0)}}:void 0,children:o}))})});var ek=n(65396),eM=n(76487),eB=n(18006);let eL=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],eW=(0,eM.ZP)(eR,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),eT=c.forwardRef(function(e,t){var n;let r=(0,ek.Z)(),o=(0,eB.Z)({props:e,name:"MuiPopper"}),{anchorEl:i,component:a,components:s,componentsProps:c,container:l,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:g,transition:b,slots:x,slotProps:w}=o,O=(0,p.Z)(o,eL),P=null!=(n=null==x?void 0:x.root)?n:null==s?void 0:s.Root,j=(0,f.Z)({anchorEl:i,container:l,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:g,transition:b},O);return(0,ew.jsx)(eW,(0,f.Z)({as:a,direction:null==r?void 0:r.direction,slots:{root:P},slotProps:null!=w?w:c},j,{ref:t}))});var eC=eT},86601:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(40431),o=n(46750),i=n(95135),a=n(2272);let s=["sx"],f=e=>{var t,n;let r={systemProps:{},otherProps:{}},o=null!=(t=null==e||null==(n=e.theme)?void 0:n.unstable_sxConfig)?t:a.Z;return Object.keys(e).forEach(t=>{o[t]?r.systemProps[t]=e[t]:r.otherProps[t]=e[t]}),r};function p(e){let t;let{sx:n}=e,a=(0,o.Z)(e,s),{systemProps:p,otherProps:c}=f(a);return t=Array.isArray(n)?[p,...n]:"function"==typeof n?(...e)=>{let t=n(...e);return(0,i.P)(t)?(0,r.Z)({},p,t):p}:(0,r.Z)({},p,n),(0,r.Z)({},c,{sx:t})}}}]);