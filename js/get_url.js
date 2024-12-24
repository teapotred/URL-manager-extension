document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save');
    const demoElement = document.getElementById('demo');

    saveButton.addEventListener('click', function SaveUrl() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const current_url = tabs[0].url;

            chrome.storage.sync.set({ savedUrl: current_url }, function () {
                console.log(`Saved URL: ${current_url}`);
            });

            demoElement.textContent = `Saved URL: ${current_url}`;

            setTimeout(()=>{
                demoElement.textContent='';
            }, 3000);
        });
    });
});


document.addEventListener('DOMContentLoaded', function(){
    const loadButton = document.getElementById('load');
    const demoElement = document.getElementById('demo');


    loadButton.addEventListener('click', function loadUrl(){
        chrome.storage.sync.get(['savedUrl'], function(result){
            if(result.savedUrl){
                demoElement.textContent = `Urls are: ${result.savedUrl}`;
            }
            else{
                demoElement.textContent='No saved urls found';
            }
        });

    });

});
