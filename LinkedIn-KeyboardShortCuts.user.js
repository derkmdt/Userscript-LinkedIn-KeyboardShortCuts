// ==UserScript==
// @name         LinkedIn KeysBoardShortCuts
// @version      0.1
// @description  You can use J and K keys to skip through the LinkedIn feed
// @author       Derk Braakman
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// @match        http*://www.linkedin.com/*feed*
// @updateURL    https://github.com/derkmdt/Userscript-LinkedIn-KeyboardShortCuts/raw/master/LinkedIn-KeyboardShortCuts.user.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    (() => {
        let x=0;
        window.onkeyup = function(ev) {
            if (!ev)
                ev = window.event;
            const key = ev.keyCode ? ev.keyCode : ev.which;
            const elTarget = ev.target ? ev.target : ev.srcElement;
            const elType = elTarget.tagName;
            const elRole = jQuery(elTarget).filter("[role=textbox]").length;

            if (elType === 'TEXTAREA' || elType === 'INPUT' || elRole) return;

            if(key === 74) {
                if(x >= 0) {
                    x++;
                    scrollToItem(x);
                }
            } else if(key === 75) {
                if(x > 0) {
                    x--;
                    scrollToItem(x);
                }
            }
        };

        function scrollToItem() {
            if(jQuery(jQuery('div[data-id^="urn:li:activity:"]'))[x]) {
                const offsetItem = jQuery(jQuery('div[data-id^="urn:li:activity:"]'))[x].offsetTop;
                window.scrollTo(0, offsetItem);
            }
        }
    })();

    /* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
