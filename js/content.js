var username = "";
var stepdelay = undefined;
var app_state = undefined;
var topretweets = 0;
var index = 0;

function retweetThis() {
    setTimeout(function () {
        var like_links = document.querySelectorAll('i.icon.icon-search');
        like_links[0].click();
        var searchtext = document.querySelectorAll('input.js-app-search-input.search-input.is-focused');
        searchtext[0].value = username;
        var search = document.querySelectorAll('a.js-perform-search.txt-base-medium.search-input-perform-search');
        var en = search[1];
        en.click();
        var button = document.querySelectorAll('button.js-toggle-button.btn.js-toggle-users');
        var eo = button[0];
        eo.click();
        setTimeout(function () {
            document.querySelector('.padding-t--7 > div:nth-child(2) > a:nth-child(2) > b:nth-child(1)').click();
            var likes = document.querySelectorAll('i.icon.icon-favorite');
            var eq = likes[likes.length - 1];
            eq.click();
            setTimeout(function () {
                var retweetclass = document.querySelector('div.js-modal-panel.mdl.s-tall-fixed.is-inverted-dark');
                var retweet = retweetclass.querySelectorAll('i.icon.icon-retweet.icon-retweet-toggle.txt-right');
                if (retweet[index]) {
                    retweet[index].click();
                    retweet[index].click();
                }
                setTimeout(function () {
                    var selectall = document.querySelectorAll('li.acc-twitter.js-account-item.js-show-tip');
                    if(selectall.length > 1) {
                        for (var i = 1; i < selectall.length; i++) {
                            if (selectall[i].className != "acc-twitter js-account-item js-show-tip acc-selected")
                                try {
                                    selectall[i].click();
                                } catch (error) {
                                    console.log(error);
                                }
                        }
                    }
                    var retweet_done = document.querySelectorAll('button.js-action-button.js-retweet-button.btn.btn-positive');
                    retweet_done[0].click();
                    index++;
                    if(index >= topretweets){
                        index = 0
                    }
                    setTimeout(function(){retweetThis();}, stepdelay*60*1000);
                }, 3000);
            }, 3000);
        }, 4000);
    }, 5000);
}

chrome.storage.local.get(["username", "stepdelay", "topretweets", "app_state"], function (result) {
    username = result.username;
    stepdelay = result.stepdelay;
    topretweets = result.topretweets;
    app_state = result.app_state;
    if (username && stepdelay && topretweets && app_state) {
        retweetThis(username);
    }
});
