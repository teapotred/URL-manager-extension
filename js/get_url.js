document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save');
    const loadButton = document.getElementById('load');
    const clearHistoryButton = document.getElementById('clear-history');
    const demoElement = document.getElementById('demo');


    saveButton.addEventListener('click', function SaveUrl() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const current_url = tabs[0].url;

            chrome.storage.sync.get(['savedUrls'], function (result) {
                let urls = result.savedUrls || []; 

                urls.push(current_url);

                chrome.storage.sync.set({ savedUrls: urls }, function () {
                    console.log(`Saved URL: ${current_url}`);
                });

                demoElement.textContent = `Saved URL: ${current_url}`;
                setTimeout(() => {
                    demoElement.textContent = '';
                }, 3000);
            });
        });
    });

    // Load all saved URLs
    loadButton.addEventListener('click', function loadUrls() {
        chrome.storage.sync.get(['savedUrls'], function (result) {
            const urls = result.savedUrls || []; // If no URLs exist, initialize an empty array

            if (urls.length > 0) {

                demoElement.innerHTML = '';
                
                const list = document.createElement('ul');
                list.style.padding = '0';
                list.style.margin = '0';

                urls.forEach((url) => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = url;
                    link.textContent = url;
                    link.target = '_blank'; // Open in a new tab
                    link.style.textDecoration = 'none';
                    link.style.color = 'blue';

                    listItem.appendChild(link);
                    listItem.style.marginBottom = '10px';
                    list.appendChild(listItem);
                });

                demoElement.appendChild(list);
            } else {
                demoElement.textContent = 'No saved URLs found.';
            }
        });
    });

    // Clear all saved URLs
    clearHistoryButton.addEventListener('click', function clearUrls() {
        chrome.storage.sync.remove(['savedUrls'], function () {
            console.log('All saved URLs have been cleared.');
            demoElement.textContent = 'All saved URLs have been cleared.';

            // Clear the displayed list after a few seconds
            setTimeout(() => {
                demoElement.textContent = '';
            }, 3000);
        });
    });
});
