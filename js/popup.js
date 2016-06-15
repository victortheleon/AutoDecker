$(document).ready(function () {
    chrome.runtime.sendMessage({'context': 'getData'});
});
$('#app_state').checkboxpicker({
    offLabel: "OFF",
    onLabel: "ON"
});


$('.btn.btn-default.timer').click(function (e) {
    $('#step_delay').val(e.toElement.id.replace('time_preset_', ''));
});

$('#start').click(function () {
    var userName = $('#user_name').val().trim();
    var stepDelay = parseInt($('#step_delay').val().trim());
    var topRetweets = parseInt($('#top_retweets').val().trim());
    var app_state = $('#app_state').prop("checked");
    var objToSend = {};
    if (!userName) {
        return;
    } else if (isNaN(stepDelay) || stepDelay < 5) {
        return;
    } else if (isNaN(topRetweets) || topRetweets > 20) {
        return;
    } else {
        objToSend["context"] = "setLocal";
        objToSend["userName"] = userName;
        objToSend["stepDelay"] = stepDelay;
        objToSend["topRetweets"] = topRetweets;
        objToSend["app_state"] = app_state;
        chrome.runtime.sendMessage(objToSend);
    }
});



chrome.runtime.onMessage.addListener(function (data, sender, response) {
    if (data.context == "setpopup") {
        console.log(data);
        $('#step_delay').val(data.stepdelay);
        $('#user_name').val(data.username);
        $('#top_retweets').val(data.topretweets);
        $('#app_state').prop("checked", data.app_state);
    }
});