var CleanAdsIntervalID;
var AD_INTERVAL_MSEC = 200;
var ADS_SELECTOR = "#pagelet_ego_pane_w, #pagelet_side_ads, #pagelet_ego_pane, .-cx-PRIVATE-snowliftAds__root, .ego_column";


// Initiate cleaning functionality if on facebook.com domain
var currentURL = "" + window.location;
if (currentURL.indexOf("facebook.com") > 0) {

    // check extension status on init
    chrome.extension.sendMessage({ getStatus: 1 }, function (response) {
        if (response && response.enabled) {
            startCleaning();
        }
    });

    // register to extension enabled/disabled by user
    chrome.extension.onMessage.addListener(function (message, sender, callback) {
        if (message && message.enabled)
            startCleaning();
        else
            restoreAds();
    });
}

function startCleaning() {
    CleanAdsIntervalID = setInterval(function () {
        $(ADS_SELECTOR).hide();
		  $("a.uiStreamSponsoredLink").closest("._6ns, ._8ru, .uiStreamStory, .userContentWrapper").hide();
    }, AD_INTERVAL_MSEC);
}

function restoreAds() {
    clearInterval(CleanAdsIntervalID);
    $(ADS_SELECTOR).css("display", "");
	 $("a.uiStreamSponsoredLink").closest("._6ns, ._8ru, .uiStreamStory, .userContentWrapper").css("display", "");
}
