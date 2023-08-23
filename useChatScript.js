import {useEffect} from "react";

export const useChatScript = (url, widgetCode) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");

    const code = `(function (d, w, c) {
        if (!d.getElementById("spd-busns-spt")) {
            var n = d.getElementsByTagName('script')[0], s = d.createElement('script');
            var loaded = false;
            s.id = "spd-busns-spt";
            s.async = "async";
            s.setAttribute("data-self-init", "false");
            s.setAttribute("data-init-type", "opt");
            s.src = 'https://cdn.in-freshbots.ai/assets/share/js/freshbots.min.js';
            s.setAttribute("data-client", "a0a74570bc75b77f684ecde76471e0a4c23dbf42");
            s.setAttribute("data-bot-hash", "28a4699ed8b3990b71edf9c380e428efeb2f0cd7");
            s.setAttribute("data-env", "prod");
            s.setAttribute("data-region", "in");
            if (c) {
                s.onreadystatechange = s.onload = function () {
                    if (!loaded) {
                        c();
                    }
                    loaded = true;
                };
            }
            n.parentNode.insertBefore(s, n);
        }
    })(document, window, function () {
        Freshbots.initiateWidget({autoInitChat: false, getClientParams: function () {
                return {"cstmr::xtrInfrmtn:userID": ""};
            }}, function (successResponse) { }, function (errorResponse) { });
    });`;

    script.appendChild(document.createTextNode(code));
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
