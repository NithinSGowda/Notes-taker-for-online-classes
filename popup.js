var nithinSummaryBot = {};

document.querySelector('.update').addEventListener("click",()=>{
    var email = document.querySelector('.betaEmail').value;
    console.log(email);

    if(email!=""){
        document.querySelector('.first').style.display='none';
        document.querySelector('.success').style.display='block';

        nithinSummaryBot["email"]=email;

        chrome.storage.sync.set({
            nithinSummaryBot
        }, function() {
            console.log(nithinSummaryBot);
        });
    }

    // var data = new FormData();
    // data.append("email", email);

    // var xhr = new XMLHttpRequest();

    // xhr.addEventListener("readystatechange", function() {
    // if(this.readyState === 4) {
    //     console.log(this.responseText);
    // }
    // });

    // xhr.open("POST", "https://nithins.me/nbot/nalert.php");

    // xhr.send(data);
})