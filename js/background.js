// Is Ad-Blocking enabled?
if (!localStorage.enabled)
    localStorage.enabled = true;

// welcome page - Removed temporarily
// if (!localStorage.welcomePageShown) {
//     localStorage.welcomePageShown = 1;
//     chrome.tabs.create({
//         "url": "http://cdn.chrome.cubiez.com/webapps/welcome/index.html?app_id=lfpacabphcagfehdgnigmfnbjdampbaa"
//     });
// }

// initiate installation time if not exists
if (!localStorage.installDate) {
	localStorage.installDate = new Date();
}
	
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if(!tab || !tab.url) 
		return;
	
	// Create href element from URL to easily get the domain	
	var a = document.createElement('a');
    a.href = tab.url;
	
	// Check if we're on Facebook
    var result = a.hostname.search("facebook.com");
	if(result == -1)
		return;

	chrome.pageAction.show(tabId);
	
	// If adblocking is disabled - show the b&w icon
	if(localStorage.enabled == "false"){
		var details = new Object();				
		details.tabId = tab.id;
		details.path = "img/icon38-disabled.png";
		
		chrome.pageAction.setIcon(details);
	}
});

// register to events from content script
chrome.extension.onMessage.addListener(function(message, sender, callback) {
    if (message && message.getStatus) {
		callback({"enabled": localStorage.enabled != "false"});
	}
});
