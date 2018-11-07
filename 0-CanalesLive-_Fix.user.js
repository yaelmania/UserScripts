// ==UserScript==
// @name        ici TV
// @namespace   Fix Somthing
// @description Fix some Shit
// @copyright   2017+, Yaelmania Ilutions Graphics (Yaelmania)
// @run-at      document-end
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @include     https://ici.radio-canada.ca/tele?openconsole=true
// @version     1
// @grant       unsafeWindow
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceURL
// @grant       GM_getResourceURL
// @grant       GM_getValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// ==/UserScript==

var $ic = jQuery.noConflict();

function GoNext() {
  $ic('.m-video-show-info, .rc-lightbox-shadow, .hidden-tag, .clickzone, .adSection, .videoadcontainer.hideAds, #react-src-container, .g-alert-cookie, noscript').each(function() {
    $ic(this).remove();
  });
}

setTimeout(GoNext, 6000);
