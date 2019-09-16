// background.js

setInterval(chechLoggedIn, 1000);

function excuteAutoLogout(id) {
    chrome.tabs.executeScript(id, {
        code: 'document.querySelector("#checkOut").click()'
    }, function(result) {
        chrome.storage.sync.set({ 'isStarted': false });
        // alert('heeeeeeeeeeeey');
        //work successfully
        //show well done page
        //popupwindow('break_time_alert.html', 'Break Time', 800, 300);
    });
}


//로그인 된 상태인지
function chechLoggedIn() {

    chrome.storage.sync.get(['isStarted', 'id', 'hour', 'minute', 'second'], function(data) {
        if (data.isStarted) {
            if (timeCheck(data.hour, data.minute, data.second)) {
                //실행중인지 체크
                //시간 체크
                chrome.tabs.executeScript(data.id, {
                    code: "document.getElementsByClassName('state')[0].innerText.includes('정상 출석')"
                }, function(result) {
                    if (result == undefined) {
                        //this is for notification when the user is not logged in state
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'img/logout_48.png',
                            title: '로그인을 해주세요 / 출석 먼저 체크 해주세요 / 현재 사이트에서는 사용할 수 없는 기능입니다',
                            message: '로그인 상태를 유지해라~~~~'
                        };
                        chrome.notifications.create('nonLogInNotif', notifOptions);
                        return false;
                    } else {
                        if (result[0] == true) {
                            // alert("entered");
                            excuteAutoLogout(data.id);
                            return true;
                        }
                    }
                });
            } else {
                return
            }
        } else {
            return;
        }
    });

}

var curHour;
var curMin;
var curSec;

function timeCheck(hour, min, sec) {
    var currentDate = new Date(); // 현재시간
    curHour = currentDate.getHours();
    curMin = currentDate.getMinutes();
    curSec = currentDate.getSeconds();
    if (hour == curHour && min == curMin && sec == curSec)
        return true;
    else
        return false;
}


// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//     alert("cleckeckcekcke");
//     // Send a message to the active tab
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         alert("you clicked extension app");
//         chrome.tabs.sendMessage(tabs[0].id, { "message": "clicked_browser_action" });
//     });
// });

// // This block is new!
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.message === "open_new_tab") {
//             chrome.tabs.create({ "url": request.url });
//         }
//     }
// );




//Called when this extension is installed
chrome.runtime.onInstalled.addListener(function() {
    //welcome message for users who installed this extension
    alert("Thank you for installing this extension.\n Hope you get a job soon!!!");
    //save nessary default values
    chrome.storage.sync.set({ 'isStarted': false });
    chrome.storage.sync.set({ 'hour': 0 });
    chrome.storage.sync.set({ 'minute': 0 });
    chrome.storage.sync.set({ 'second': 0 });
    //test 
    // popupwindow('break_time_alert.html', 'Break Time', 800, 300);
});

function popupwindow(url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}