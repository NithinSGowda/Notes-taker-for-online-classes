notifOptionsStart = {
    type: "basic",
    iconUrl: "icon.png",
    title: "Notes bot is active",
    message: "The notes bot is now active and will be taking your notes",
    contextMessage: "Use stop button to end the recording and email you the notes"
}
notifOptionsStop = {
    type: "basic",
    iconUrl: "icon.png",
    title: "Your notes have been sent over email",
    message: "Notes have been successfully sent over to your email"
}
chrome.storage.sync.get(['nithinSummaryBot'], function(result){
    if(result && result['nithinSummaryBot']){
        betaEmail = result['nithinSummaryBot']['email'];
        notifOptionsStop = {
            type: "basic",
            iconUrl: "icon.png",
            title: "Your notes have been sent over email",
            message: "Notes have been successfully sent over to "+betaEmail
        }
    }
})

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
            console.log("Recording started");
        })
    }
    });