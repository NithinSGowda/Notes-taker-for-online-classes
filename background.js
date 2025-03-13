const notifOptionsStart = {
    type: "basic",
    iconUrl: "icon.png",
    title: "Notes bot is active",
    message: "The notes bot is now active and will be taking your notes",
    contextMessage: "Use stop button to end the recording and email you the notes"
};

// Service worker installation and activation
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
});

let notifOptionsStop;
// Initialize notification options
chrome.storage.sync.get(['nithinSummaryBot'], function(result) {
    if (result.nithinSummaryBot && result.nithinSummaryBot.email) {
        const betaEmail = result.nithinSummaryBot.email;
        notifOptionsStop = {
            type: "basic",
            iconUrl: "icon.png",
            title: "Your notes have been sent over email",
            message: "Notes have been successfully sent over to " + betaEmail
        };
    } else {
        notifOptionsStop = {
            type: "basic",
            iconUrl: "icon.png",
            title: "Your notes have been sent over email",
            message: "Notes have been successfully sent"
        };
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request == "noteBotStart"){
        sendResponse("recieved");
        chrome.notifications.create("recStartNotif", notifOptionsStart, ()=>{
            console.log("Recording started");
        })
    }else if (request == "noteBotStop"){
        sendResponse("recieved");
        chrome.notifications.create("recStartNotif", notifOptionsStop, ()=>{
            console.log("Recording stopped");
        })
    }
    });
