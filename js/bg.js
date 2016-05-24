chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.context == "setLocal") {
        var settings = {};
        settings['username'] = message.userName;
        settings['stepdelay'] = message.stepDelay;
        settings['topretweets'] = message.topRetweets;
        chrome.storage.local.set(settings, function(){console.log("saved");});
        chrome.runtime.sendMessage({"action":"reload"});
    } else if (message.context == "getData") {
        var uname = "";
        var sdelay = undefined;
        var tretweets = 0;
        chrome.storage.local.get(["username", "stepdelay", "topretweets"], function(result){
            var objToSend = {
                "username": result.username,
                "stepdelay": result.stepdelay,
                "topretweets": result.topretweets,
                "context": "setpopup"
            };
            chrome.runtime.sendMessage(objToSend);
        });
    }
});

