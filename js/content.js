var username = "";
var stepdelay = undefined;
var app_state = undefined;
var topretweets = 0;
var index = 0;

function retweetThis() {
    setTimeout(function () {
        var divs = document.querySelectorAll('div.js-column-holder.column-holder');
        var divToAct = divs[0].getElementsByTagName('div')[0];
        divToAct.innerHTML = getClicker(username) + divToAct.innerHTML;
        divToAct.getElementsByTagName('a')[0].click();
        setTimeout(function () {
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
                    if (selectall.length > 1) {
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
                    if (index >= topretweets) {
                        index = 0
                    }
                    try {
                        var elemToDel = document.getElementById('the-parker-elem-1111');
                        elemToDel.parentNode.removeChild(elemToDel);
                    } catch(e) {
                        console.log("unable to delete sample user");
                    }
                    setTimeout(function () {
                        retweetThis();
                    }, stepdelay * 60 * 1000);
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

function getClicker(uname) {
    return '<a id="the-parker-elem-1111" class="account-link link-complex block" href="https://twitter.com/julietsnider941" data-user-name="' +
        uname +
        '" rel="user" target="_blank"> <span class="account-inline  txt-ellipsis "> <b class="fullname inline-block link-complex-target    position-rel">Sample User </b>  <span class="username txt-mute">@' +
        uname + '</span>   </span>   </a>';
}
