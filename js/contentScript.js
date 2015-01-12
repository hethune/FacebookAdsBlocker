var CleanAdsIntervalID;
var AD_INTERVAL_MSEC = 200;
var ADS_SELECTOR = "#pagelet_ego_pane_w, #pagelet_side_ads, #pagelet_ego_pane, .-cx-PRIVATE-snowliftAds__root, .ego_column";


// Initiate cleaning functionality if on facebook.com domain
var currentURL = "" + window.location;
if (currentURL.indexOf("facebook.com") > 0) {
    // check extension status on init
    clean();
}

function clean() {
    CleanAdsIntervalID = setInterval(function () {
        $(ADS_SELECTOR).hide();
		  $("a.uiStreamSponsoredLink").closest("._6ns, ._8ru, .uiStreamStory, .userContentWrapper").hide();
    }, AD_INTERVAL_MSEC);
}
