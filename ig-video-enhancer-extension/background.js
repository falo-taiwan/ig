// Background service worker for Instagram Video Enhancer
chrome.runtime.onInstalled.addListener(() => {
  const defaultSettings = {
    showProgressBar: true,
    showRemoteControl: true,
    enableShortcuts: true,
    defaultSpeed: 1.0,
    defaultVolume: 0.8,
    muted: false
  };

  chrome.storage.sync.set(defaultSettings, () => {
    console.log("Instagram Video Enhancer: Default settings initialized.", defaultSettings);
  });
});
