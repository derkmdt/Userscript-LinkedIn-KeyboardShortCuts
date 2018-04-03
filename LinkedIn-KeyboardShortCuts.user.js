// ==UserScript==
// @name         LinkedIn KeysBoardShortCuts
// @version      0.1
// @description  You can use J and K keys to skip through the LinkedIn feed items
// @author       Derk Braakman
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// @include      https://www.linkedin.com/*
// @updateURL    https://github.com/derkmdt/Userscript-LinkedIn-KeyboardShortCuts/raw/master/LinkedIn-KeyboardShortCuts.user.js
// @noframes
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: false */
/* jshint esversion: 6 */
((oldHistoryPushState, jQuery) => {
  let x=0;

  // LinkedIn uses JS (pushState) to navigate with menuitems, so checking usage with this function
  window.history.pushState = function () {
    oldHistoryPushState.apply(window.history, arguments);
    if(!window.location.href.match(/www.linkedin.com\/+(feed)\//i)) { // |in\/[\w\d]+\/detail\/recent-activity
      return;
    }
    x=0;
  };

  // check if on the correct href and pushState not called
  if(!window.location.href.match(/www.linkedin.com\/+(feed)\//i) && !window.history.pushState) {
    return;
  }

  window.onkeyup = function(ev) {
    if (!ev) {
      ev = window.event;
    }

    const key = ev.keyCode ? ev.keyCode : ev.which;
    const elTarget = ev.target ? ev.target : ev.srcElement;
    const elType = elTarget.tagName;
    const elRole = jQuery(elTarget).filter('[role=textbox]').length;

    // when type textinput/box/area don't use the J/K functionlity
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
})(window.history.pushState, jQuery);

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, {presets: ['es2015', 'es2016']});
eval(c.code);
/* jshint ignore:end */
