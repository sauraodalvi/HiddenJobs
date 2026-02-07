// background.js

// Action Constants
const ACTIONS = {
  SCAN_FORM: 'SCAN_FORM',
  FILL_FORM: 'FILL_FORM',
  OPEN_PANEL: 'OPEN_PANEL'
};

// Allow the user to open the side panel by clicking the action icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Optional: Context Menu to open it explicitly
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open HiddenApply Ghost',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === ACTIONS.OPEN_PANEL && sender.tab) {
    // Try opening side panel
    chrome.sidePanel.open({ tabId: sender.tab.id })
      .then(() => {
        console.log("Side panel opened successfully.");
        sendResponse({ status: 'ok' });
      })
      .catch((err) => {
        console.error("Failed to open side panel:", err);
        // Fallback to windowId
        chrome.sidePanel.open({ windowId: sender.tab.windowId })
          .then(() => sendResponse({ status: 'ok' }))
          .catch((err2) => {
            console.error("Fallback failed:", err2);
            sendResponse({ error: err2.message });
          });
      });

    return true; // Keep channel open for async response
  }
});
