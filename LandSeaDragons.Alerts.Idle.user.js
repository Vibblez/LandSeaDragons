// ==UserScript==
// @name         Land Sea Dragons - Idle Alert
// @namespace    https://github.com/Vibblez/LandSeaDragons
// @version      0.1.1
// @description  Sound alert on idle
// @updateURL    https://raw.githubusercontent.com/Vibblez/LandSeaDragons/master/LandSeaDragons.Alert.Idle.user.js
// @author       Nullmega
// @include      https://www.lsdrpg.com/game.php
// @include      https://lsdrpg.com/game.php
// ==/UserScript==

(function() {
    'use strict';
	console.log('Loaded Idle Alerter...');
	var idleCheck = setInterval(
		function(){ 
			var pt = document.title;
			if(pt.indexOf('Idle') !== -1 || pt.indexOf('(0)') !== -1){
				var audio = new Audio('http://soundbible.com/mp3/chinese-gong-daniel_simon.mp3'); 
				audio.play(); 
			}
		}
	, 5000);

})();