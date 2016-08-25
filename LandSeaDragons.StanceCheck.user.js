// ==UserScript==
// @name         Land Sea Dragons - Stance Not Mixed
// @namespace    https://github.com/Vibblez/LandSeaDragons
// @version      0.1.2
// @description  Checks stance, displays red if not in mixed.
// @updateURL    https://raw.githubusercontent.com/Vibblez/LandSeaDragons/master/LandSeaDragons.Stance-Check.user.js
// @author       Vibblez
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js
// @include      https://www.lsdrpg.com/game.php
// @include      https://lsdrpg.com/game.php
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
	console.log('Loaded Stance Checker...');
    if($("#curr_stance").html() != "Mixed"){ $("#curr_stance").css('color', 'red'); }else{ $("#curr_stance").css('color', ''); }
    var origParseFloat = stanceToggle;
    stanceToggle =  function (n) {
        if (dual_wield == 1) { return; }
        var curr_stance = stances.indexOf($("#curr_stance").html());
        switch(n) {
            case 0:
                var stance = (curr_stance+2) % 3;
                break;
            case 1:
                var stance = (curr_stance+1) % 3;
                break;
        }
        $.post( "stance.php", { stance:stance }, function() {
            if(stances[stance] != "Mixed"){ $("#curr_stance").css('color', 'red'); }else{ $("#curr_stance").css('color', ''); }
            $("#curr_stance").html(stances[stance]);
        });
    };
    
})();