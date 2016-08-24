// ==UserScript==
// @name         Land Sea Dragons - Chat Extender & Recolor
// @namespace    https://github.com/Vibblez/LandSeaDragons
// @version      0.1.3
// @description  Chat Extender
// @updateURL    https://raw.githubusercontent.com/Vibblez/LandSeaDragons/master/LandSeaDragons.ChatExtender-Recolor.user.js
// @author       Vibblez
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js
// @include      https://www.lsdrpg.com/game.php
// @include      https://lsdrpg.com/game.php
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    }

    addGlobalStyle('#chat_main_border { height: 400px; } #chat_main_border > tbody > tr > td > div { height: 480px !important; } .chat_1, .chat_2 { color: #f148e2; } .chat_5 { color: #25ff00; }');

})();