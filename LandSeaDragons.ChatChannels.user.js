// ==UserScript==
// @name         Land Sea Dragons - Chat Channels
// @namespace    https://github.com/Vibblez/LandSeaDragons
// @version      0.1.5
// @description  Chat Channel Drop Down
// @updateURL    https://raw.githubusercontent.com/Vibblez/LandSeaDragons/master/LandSeaDragons.ChatChannels.user.js
// @author       Vibblez, euloghtos
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js
// @include      https://www.lsdrpg.com/game.php
// @include      https://lsdrpg.com/game.php
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    $("#chat_form > tbody > tr").html('<tr><td><select id="chat_channel"><option value="">Public</option><option value="/f ">Fleet</option></select><input id="chat_input" type="text" maxlength="200" autocomplete="off"></td><td style="text-align:right;"><input id="chat_submit" type="submit" value="Chat"> Filter: <select id="chatSelect" style="margin-right: 5px"><option value="">All</option><option value="msgMain">Main</option><option value="msgPM">PM</option><option value="msgFleet">Fleet</option><option value="msgGlobal">Global</option></select></td></tr>');
    
	/////////////////
	/// Filter started by: euloghtos, completed by Vibblez
	/////////////////
    $('#chatSelect').change(function(){
		if($('#chatSelect').val() !== ""){
			$('#chat_main tr').not('.'+$(this).val()).hide();
			$('#chat_main tr.'+$(this).val()).show();
		}else{
			$('#chat_main tr').show();
		}
    });

    $('#chat_main').on('DOMNodeInserted', 'tr', function(e) {
        if ($('span.chat_5', e.target).length > 0) $(e.target).addClass('msgFleet');
        if ($('span.chat_4', e.target).length > 0) $(e.target).addClass('msgGlobal');
        if ($('span.chat_3', e.target).length > 0) $(e.target).addClass('msgGlobal');
		if ($('span.chat_1', e.target).length > 0) $(e.target).addClass('msgPM');
		if ($('span.chat_2', e.target).length > 0) $(e.target).addClass('msgPM');
		if ($('span.chat_0_0_0', e.target).length > 0) $(e.target).addClass('msgMain');
		if ($('span.chat_0_1_0', e.target).length > 0) $(e.target).addClass('msgMain');
		if ($('span.chat_0_2_0', e.target).length > 0) $(e.target).addClass('msgMain');
		if($('#chatSelect').val() != "")
        if (!$(e.target).hasClass($('#chatSelect').val())) $(e.target).hide();
    });
	//////////////
	/// Filter End
	//////////////
    var chatTimer;
    var origGetChat = getChat;
    getChat = function (n) {
        var chatInput = $('#chat_input').val();
        if(!chatInput.length && n === 1) return;
        if(n === 1) $("#chat_send").prop( "disabled", true );
		var chatBuilder = "";
		var chatChannel = $('#chat_channel').val();
		var chat_cmd_check = chatInput.split(" ");
		switch(chat_cmd_check[0]) {
            case "/m":
            case "/view":
                if(chatChannel == "/f "){
                    chatBuilder = chatInput;
                }else{
                    chatBuilder = chatChannel + chatInput;
                }
                break;
            case "/p":
                if(chatChannel == "/f "){
                    chatInput = chatInput.replace("/p ", "");
                    chatBuilder = chatInput;
                }else{
                    chatBuilder = chatInput;
                }
                break;
            default:
                chatBuilder = chatChannel + chatInput;
		}
		var input = chatBuilder;
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
                    if (data.chat !== 0) {
                        renderChat(data.chat,data.fleet,0);
                    }
                    chatTimer = setInterval(function(){ getChat(2); }, 2000);
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
                    break;
                case 2:
                    if (data.chat !== 0) {
                        renderChat(data.chat,data.fleet,1);
                    }
                    break;
            }
            $("#chat_send").prop( "disabled", false );
        },"json");
        if(n != 2){            
            $("#chat_input").val('');
            $("#chat_input").focus();
        }
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

    addGlobalStyle('#chat_input { width: 670px !important; } #layer_2 { z-index: 3 !important; }');

})();