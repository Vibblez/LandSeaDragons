// ==UserScript==
// @name         Land Sea Dragons - Boss Alert
// @namespace    https://github.com/Vibblez/LandSeaDragons
// @version      0.1.0
// @description  Sound alert on boss
// @updateURL    https://raw.githubusercontent.com/Vibblez/LandSeaDragons/master/LandSeaDragons.Alert.Boss.user.js
// @author       Nullmega
// @include      https://www.lsdrpg.com/game.php
// @include      https://lsdrpg.com/game.php
// ==/UserScript==

(function() {
    'use strict';

var bossCheck = setInterval(function(){ var pt = document.title; if(pt.indexOf('BOSS') !== -1){ var audio = new Audio('http://soundbible.com/mp3/foghorn-daniel_simon.mp3'); audio.play(); }}, 5000);

})();