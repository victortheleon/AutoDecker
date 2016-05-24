$('.btn.btn-default').click(function(e){
	$('#step_delay').val(e.toElement.id.replace('time_preset_', ''));
});

$('#start').click(function(){
    var userName = $('#user_name').val().trim();
    var stepDelay = parseInt($('#step_delay').val().trim());
    var topRetweets = parseInt($('#top_retweets').val().trim());
    var objToSend = {};
    if(!userName) {
        return;
    } else if(isNaN(stepDelay) || stepDelay < 5) {
        return;
    } else if(isNaN(topRetweets) || topRetweets > 20) {
        return;
    } else {
        objToSend["context"] = "setLocal";
        objToSend["userName"] = userName;
        objToSend["stepDelay"] = stepDelay;
        objToSend["topRetweets"] = topRetweets;
        chrome.runtime.sendMessage(objToSend);
    }
});

chrome.runtime.sendMessage( { 'context': 'getData' });

chrome.runtime.onMessage.addListener(function (data, sender, response) {
    if(data.context == "setpopup"){
        $('#step_delay').val(data.stepdelay);
        $('#user_name').val(data.username);
        $('#top_retweets').val(data.topretweets);
    }
});