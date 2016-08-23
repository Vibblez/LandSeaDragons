// ==UserScript==
// @name         Land Sea Dragons - UI Alterations
// @namespace    https://github.com/Vibblez/LandSeaDragons
// @version      0.1.1
// @description  MidenQuest Chat Extender
// @updateURL    https://raw.githubusercontent.com/Vibblez/LandSeaDragons/master/LandSeaDragons.UI-Alterations.user.js
// @author       Vibblez
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js
// @include      https://www.lsdrpg.com/game.php
// @include      https://lsdrpg.com/game.php
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    $("#content_right > tbody > tr > td > div").html('<a href="javascript:rightSelector(\'0\');">Equipped</a> | <a href="javascript:rightSelector(\'1\');">Inventory</a>');
    $("#content_left > tbody > tr > td > div").html('<a href="javascript:leftSelector(\'0\');">Challenges</a> | <a href="javascript:leftSelector(\'1\');">Skills</a>  | <a href="javascript:leftSelector(\'2\');">Stats</a>');
    $("#panel_2_1").css('display','table');    
    $("#panel_2_2").css('display','none');
    $("#panel_2_3").css('display','none');
    $("#panel_2_1 > tbody > tr > td").first().css('text-align', 'center').html('<a href="javascript:topStatPanelToggle(\'1\');">Hunting</a> | <a href="javascript:topStatPanelToggle(\'2\');">Gathering</a> | <a href="javascript:topStatPanelToggle(\'3\');">Crafting</a>');
    $("#panel_2_2 > tbody > tr > td").first().css('text-align', 'center').html('<a href="javascript:topStatPanelToggle(\'1\');">Hunting</a> | <a href="javascript:topStatPanelToggle(\'2\');">Gathering</a> | <a href="javascript:topStatPanelToggle(\'3\');">Crafting</a>');
    $("#panel_2_3 > tbody > tr > td").first().css('text-align', 'center').html('<a href="javascript:topStatPanelToggle(\'1\');">Hunting</a> | <a href="javascript:topStatPanelToggle(\'2\');">Gathering</a> | <a href="javascript:topStatPanelToggle(\'3\');">Crafting</a>');
    
    $("#panel_3_1").css('display','table');    
    $("#panel_3_2").css('display','none');
    
    $("#panel_3_1 > tbody > tr > td").first().css('text-align', 'center').html('Resources: <a href="javascript:topResPanelToggle(\'1\');">Raw</a> | <a href="javascript:topResPanelToggle(\'2\');">Crafted</a>');
    $("#panel_3_2 > tbody > tr > td").first().css('text-align', 'center').html('Resources: <a href="javascript:topResPanelToggle(\'1\');">Raw</a> | <a href="javascript:topResPanelToggle(\'2\');">Crafted</a>');
    
    unsafeWindow.topStatPanelToggle = function(i){
        console.log(i);
        if(i == 1){ $("#panel_2_1").css('display','table'); $("#panel_2_2, #panel_2_3").css('display','none'); }
        if(i == 2){ $("#panel_2_2").css('display','table'); $("#panel_2_1, #panel_2_3").css('display','none'); }
        if(i == 3){ $("#panel_2_3").css('display','table'); $("#panel_2_1, #panel_2_2").css('display','none'); }
    };
    
    unsafeWindow.topResPanelToggle = function(i){
        console.log(i);
        if(i == 1){ $("#panel_3_1").css('display','table'); $("#panel_3_2").css('display','none'); }
        if(i == 2){ $("#panel_3_2").css('display','table'); $("#panel_3_1").css('display','none'); }
    };
    
     function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }

        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('#ActionCD { margin-top: 5px !important; }'); 
    
})();