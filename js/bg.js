chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.context == "setLocal") {
        var settings = {};
        settings['username'] = message.userName;
        settings['stepdelay'] = message.stepDelay;
        settings['topretweets'] = message.topRetweets;
        settings['app_state'] = message.app_state;
        chrome.storage.local.set(settings, function () {
            console.log(settings);
        });
        if (settings.app_state)
            chrome.tabs.create({url: "https://tweetdeck.twitter.com/"});
    } else if (message.context == "getData") {
        var uname = "";
        var sdelay = undefined;
        var tretweets = 0;
        chrome.storage.local.get(["username", "stepdelay", "topretweets", "app_state"], function (result) {
            var objToSend = {
                "username": result.username,
                "stepdelay": result.stepdelay,
                "topretweets": result.topretweets,
                "app_state": result.app_state,
                "context": "setpopup"
            };
            chrome.runtime.sendMessage(objToSend);
        });
    }
});

