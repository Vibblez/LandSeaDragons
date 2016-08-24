// ==UserScript==
// @name         Land Sea Dragons - Chat Channels
// @namespace    https://github.com/Vibblez/LandSeaDragons
// @version      0.1.0
// @description  Chat Channel Drop Down
// @updateURL    https://raw.githubusercontent.com/Vibblez/LandSeaDragons/master/LandSeaDragons.ChatChannels.user.js
// @author       Vibblez
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js
// @include      https://www.lsdrpg.com/game.php
// @include      https://lsdrpg.com/game.php
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    $("#chat_form > tbody > tr").html('<tr><td><select id="chat_channel"><option value="">Main</option><option value="/f ">Fleet</option></select><input id="chat_input" type="text" maxlength="200" autocomplete="off"></td><td style="text-align:right;"><input id="chat_submit" type="submit" value="Chat"></td></tr>');
    
    var origGetChat = getChat;
    getChat = function (n) {
        var chatBuilder = $('#chat_channel').val() + $('#chat_input').val();
        var input = 'null';
        switch(n) {
            case 1:
                input = chatBuilder;
                if (input == "/ignored") {
                    showIgnored();
                    $("#chat_input").val("");
                    return;
                }
                var cmd_check = input.split(" ");
                if (cmd_check[0] == '/view') {
                    var player = input.substr(5).trim();
                    viewProfile(player);
                    $("#chat_input").val("");
                    return;
                }
                break;
        }
        $.post( "chat.php", { action:n,input:input }, function(data) {
            switch(n) {
                case 0: //Initial
                    if (data.chat != 0) {
                        renderChat(data.chat,data.fleet,0);
                    }
                    setInterval(function(){ getChat(2); }, 3000);
                    break;
                case 1:
                    if (typeof data.type !== "undefined") {
                        switch(data.type) {
                            case 0:
                                ignored.push(data.player);
                                break;
                            case 1:
                                var pos = ignored.indexOf(data.player);
                                ignored.splice(pos,1);
                                break;
                        }
                    }
                    $("#chat_input").val('');
                    $("#chat_input").focus();
                    break;
                case 2:
                    if (data.chat != 0) {
                        renderChat(data.chat,data.fleet,1);
                    }
                    break;
            }
        },"json");
    }
        
    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    }

    addGlobalStyle('#chat_input { width: 790px !important; }');

})();