// Chrome Extension popup settings manager
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const toggleProgress = document.getElementById('toggle-progress');
  const toggleRemote = document.getElementById('toggle-remote');
  const toggleShortcuts = document.getElementById('toggle-shortcuts');
  const selectSpeed = document.getElementById('select-speed');
  const sliderVolume = document.getElementById('slider-volume');
  const volumeVal = document.getElementById('volume-val');

  // Load saved settings
  chrome.storage.sync.get({
    showProgressBar: true,
    showRemoteControl: true,
    enableShortcuts: true,
    defaultSpeed: 1.0,
    defaultVolume: 0.8
  }, (items) => {
    toggleProgress.checked = items.showProgressBar;
    toggleRemote.checked = items.showRemoteControl;
    toggleShortcuts.checked = items.enableShortcuts;
    selectSpeed.value = items.defaultSpeed.toFixed(1) === '1.0' ? '1.0' : items.defaultSpeed.toString();
    sliderVolume.value = items.defaultVolume;
    volumeVal.textContent = `${Math.round(items.defaultVolume * 100)}%`;
  });

  // Event Listeners to save changes
  toggleProgress.addEventListener('change', () => {
    chrome.storage.sync.set({ showProgressBar: toggleProgress.checked });
  });

  toggleRemote.addEventListener('change', () => {
    chrome.storage.sync.set({ showRemoteControl: toggleRemote.checked });
  });

  toggleShortcuts.addEventListener('change', () => {
    chrome.storage.sync.set({ enableShortcuts: toggleShortcuts.checked });
  });

  selectSpeed.addEventListener('change', () => {
    chrome.storage.sync.set({ defaultSpeed: parseFloat(selectSpeed.value) });
  });

  sliderVolume.addEventListener('input', () => {
    const vol = parseFloat(sliderVolume.value);
    volumeVal.textContent = `${Math.round(vol * 100)}%`;
    chrome.storage.sync.set({ defaultVolume: vol });
  });
});
