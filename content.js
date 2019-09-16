// content.js
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.message === "clicked_browser_action") {

//             alert("dddddd");
//             var firstHref = $("a[href^='http']").eq(0).attr("href");
//             console.log(firstHref);
//             // This line is new!
//             chrome.runtime.sendMessage({ "message": "open_new_tab", "url": firstHref });
//         }
//     }
// );

//---------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------

// chrome.tabs.executeScript({
//     code: "document.getElementsByClassName('state')[0].innerText.includes('정상 출석')"
// }, function(result) {
//     if (result = undefined) {
//         //alert("로그인을 해주세요 / 출석 먼저 체크 해주세요 / 현재 사이트에서는 사용할 수 없는 기능입니다");
//         alert("not ssafy");
//     } else {
//         if (result[0] == true)
//             alert("yes ssafy");
//     }
// });



// var curTimeCheck;

// function timeCheck() {
//     var currentDate = new Date(); // 현재시간
//     var curHour = currentDate.getHours();
//     var curMin = currentDate.getMinutes();
//     var curSec = currentDate.getSeconds();


// }

// var isUserLoggedIn = false; //로그인 된 상태인지



// document.addEventListener('DOMContentLoaded', function() {
//     // document.createElement('script');
//     // jQueryScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js');
//     // document.head.appendChild(jQueryScript);
//     clock = document.getElementById("clock"); // 출력할 장소 선택
//     document.querySelector('#startBtn').addEventListener('click', function() {
//         curTimeCheck = setInterval(function() {
//             chechLoggedIn();
//             timeCheck();

//             autoLogout();

//             //if (!isUserLoggedIn)
//             //	alert("로그인을 해주세요! / 출석먼저 해주세요!");
//         }, 1000);

//     })

// })

// function autoLogout() {
//     if (curHour == 13 && curMin == 15 && curSec == 30) {
//         chrome.tabs.executeScript({
//             code: 'document.querySelector("#checkOut").click()'
//         }, function(result) {
//             clearInterval(curTimeCheck);
//             alert("정상적으로 자동 퇴실 되었습니다.");
//         });
//     }
// }

// function addZeros(num, digit) { // 자릿수 맞춰주기
//     var zero = '';
//     num = num.toString();
//     if (num.length < digit) {
//         for (var i = 0; i < digit - num.length; i++) {
//             zero += '0';
//         }
//     }
//     return zero + num;
// }