
function updateMenuText() {

    if (localStorage.enabled == "false")
        $("#enable_block img").fadeTo(100, 0);
    else
        $("#enable_block img").fadeTo(100, 1);
    
}


function onClick(jsonParam) {
    console.log(jsonParam);
    if(jsonParam && jsonParam.state && jsonParam.state === "on"){
            $('body').css('width', 480);
            $('body').css('height', 580);
    } else {
            $('body').css('width', 300);
            $('body').css('height', 200);
    }
}


$(function () {

    // Update menu text according to status
    updateMenuText();

    $("#enable_block").click(function () {

        // flip current state
        localStorage.enabled = (localStorage.enabled == "true") ? "false" : "true";

        // Update menu text
        updateMenuText();

        var queryInfo = { "url": "*://*.facebook.com/*" };

        chrome.tabs.query(queryInfo, function (arr) {

            if (!arr || arr.length == 0)
                return;

            var imagePath = "img/icon38.png";
            if (localStorage.enabled == "false")
                imagePath = "img/icon38-disabled.png";

            for (var i = 0; i < arr.length; ++i) {
                var details = new Object();
                details.tabId = arr[i].id;
                details.path = imagePath;

                chrome.pageAction.setIcon(details);

                // notify content script on change
                chrome.tabs.sendMessage(details.tabId, { "enabled": localStorage.enabled == "true" });
            }
        });
    });
});