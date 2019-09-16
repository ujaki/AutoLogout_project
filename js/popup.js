'use strict';
var curTimeCheck;
var cnt = 0; //check var for debugging

function timeCheck() {
    var currentDate = new Date(); // 현재시간
    var calendar = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() // 현재 날짜
    var amPm = 'AM'; // 초기값 AM
    curHour = currentDate.getHours();
    curMin = currentDate.getMinutes();
    curSec = currentDate.getSeconds();
    var currentHours = addZeros(curHour, 2);
    var currentMinute = addZeros(curMin, 2);
    var currentSeconds = addZeros(curSec, 2);

    if (currentHours >= 12) { // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
        amPm = 'PM';
        currentHours = addZeros(currentHours - 12, 2);
    }

    if (currentSeconds >= 50) { // 50초 이상일 때 색을 변환해 준다.
        currentSeconds = '<span style="color:#de1951;">' + currentSeconds + '</span>'
    }
    clock.innerHTML = currentHours + ":" + currentMinute + ":" + currentSeconds + " <span style='font-size:50px;'>" + amPm + "</span>"; //날짜를 출력해 줌

    // setTimeout("printClock()",1000);         // 1초마다 printClock() 함수 호출

    // line.append(msg);
}


var clock; //clock
var curHour;
var curMin;
var curSec;
var jQueryScript;





document.addEventListener('DOMContentLoaded', function() {
    // document.createElement('script');
    // jQueryScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    // document.head.appendChild(jQueryScript);
    clock = document.getElementById("clock"); // 출력할 장소 선택
    document.querySelector('#startBtn').addEventListener('click', function() {
        curTimeCheck = setInterval(function() {
            chechLoggedIn();
            timeCheck();

            autoLogout();

            //if (!isUserLoggedIn)
            //	alert("로그인을 해주세요! / 출석먼저 해주세요!");
        }, 1000);

    })

})

function autoLogout() {
    if (curHour == 13 && curMin == 15 && curSec == 30) {
        chrome.tabs.executeScript({
            code: 'document.querySelector("#checkOut").click()'
        }, function(result) {
            clearInterval(curTimeCheck);
            alert("정상적으로 자동 퇴실 되었습니다.");
        });
    }
}

function addZeros(num, digit) { // 자릿수 맞춰주기
    var zero = '';
    num = num.toString();
    if (num.length < digit) {
        for (var i = 0; i < digit - num.length; i++) {
            zero += '0';
        }
    }
    return zero + num;
}

// var curDate = new Date();
// var curHour = curDate.getHours();
// var curMin = curDate.getMinutes();
// var curSec = curDate.getSeconds();

// var line = document.getElementById("test");


// var msg = "현재 시간:"+ curHour +"시" + curMin + "분" + 
// 		curSec + "초";

// line.append(msg);



//this function acts for logging out
// fnAjaxJsonParam(_URL_MAIN_CHECKOUT, {'param' : {}}, function(data) {
//                if (data.message) {
//                    fnMessage(data.message, function () {
//                    	location.href = _URL_MAIN;
//                    });
//                } else {
//                    fnAlert(data.result.message);
//                }
//            });