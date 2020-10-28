var totalSummary;
var fd,td;
var endState=false;
const recStart = new Event('recStart');
const recEnd = new Event('recEnd');

chrome.storage.sync.get(['nithinSummaryBot'], function(result){
    betaEmail = result['nithinSummaryBot']['email'];
})

var nithinSummaryBotCS={}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('result', e => {
    var transcript=Array.from(e.results)
    .map(result=>result[0])
    .map(result=>result.transcript)
    .join('')
    if(e.results[0].isFinal){
        totalSummary+= transcript + ". ";
        console.log(totalSummary);
        transcript='';
    }
});

recognition.addEventListener('end',()=>{
    if(!endState){
        recognition.start()
    }
});

recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error)
}

document.addEventListener("recStart",()=>{
    fd = new Date();
    recognition.start();
    endState=false;
})
document.addEventListener("recEnd",()=>{
    if(totalSummary){
        console.log(totalSummary.substr(0,9))
        if(totalSummary.substr(0,9)=="undefined"){
            totalSummary = totalSummary.substr(9)
        }
        td = new Date();
        console.log("Email sent")
        var data = new FormData();
        data.append("email", betaEmail);
        data.append("summary", totalSummary);
        data.append("sub", window.location.href);
        data.append("ftime", fd);
        data.append("ttime", td);
    
        var xhr = new XMLHttpRequest();
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            endState=true;
            recognition.stop()
            totalSummary="";
        }
        });
    
        xhr.open("POST", "https://nithins.me/nbot/summaryBot/mail.php");
    
        xhr.send(data);
    }
})

var buttonn = document.createElement('div')
buttonn.setAttribute("class","startstop")
buttonn.style.cssText = "z-index: 8000000000; position: fixed; bottom: 2%; right: 2%; background-color: #007bff; padding: 7px 15px; border-radius:7px; color: white; font-size: 30px"
buttonn.innerHTML = "Start"
document.body.appendChild(buttonn);

document.querySelector(".startstop").addEventListener("click",()=>{
    if(buttonn.innerHTML == "Start"){
        document.dispatchEvent(recStart)
        buttonn.innerHTML = "Stop"
        buttonn.style.backgroundColor = "#f92f2f"
    }
    else{
        document.dispatchEvent(recEnd)
        buttonn.innerHTML = "Start"
        buttonn.style.backgroundColor = "#007bff"
    }
})