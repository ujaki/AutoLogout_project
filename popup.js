function swapButtons() {
    $('#start,#stop').toggle();
}


$(function() {
    // $colors = $('#colors');
    // var ext = chrome.extension.getBackgroundPage();


    chrome.storage.sync.get(['isStarted', 'hour', 'minute', 'second'], function(data) {
        if (!data.isStarted) {
            $('#hours').val(data.hour);
            $('#minutes').val(data.minute);
            $('#seconds').val(data.second);
        } else {
            $('#hours').val(data.hour);
            $('#minutes').val(data.minute);
            $('#seconds').val(data.second);
            swapButtons();
        }
    });

    $('#start').on('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var tab_id = tabs[0].id;
            var tab_url = tabs[0].url;
            // alert(tab_id);
            // alert(tab_url);
            if (tab_url.includes('http://edu.ssafy.com/edu/main/index.do')) {
                var hour = parseInt($('#hours').val());
                var minute = parseInt($('#minutes').val());
                var second = parseInt($('#seconds').val());
                chrome.storage.sync.set({ 'id': tab_id });
                chrome.storage.sync.set({ 'hour': hour });
                chrome.storage.sync.set({ 'minute': minute });
                chrome.storage.sync.set({ 'second': second });
                chrome.storage.sync.set({ 'isStarted': true });
                swapButtons();
            } else {
                alert('can not use this site');
            }
        });
    });

    $('#stop').on('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.storage.sync.set({ 'isStarted': false });
        });
        swapButtons();
    });
});