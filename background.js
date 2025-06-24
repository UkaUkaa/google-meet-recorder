let recordingStartTime = null;
let timerInterval = null;

// Handle messages from content script
chrome.runtime.onMessage.addListener((message) => {
  console.log("📩 [Recorder] Message received:", message.type);

  if (message.type === "START_RECORDING") {
    recordingStartTime = Date.now();
    setRecordingIcon(true);
    startTimerBadge();
  }

  if (message.type === "STOP_RECORDING") {
    stopTimerBadge();
    setRecordingIcon(false);
  }
});

// When extension icon is clicked, inject all scripts manually
chrome.action.onClicked.addListener(async (tab) => {
  console.log("[Recorder] Extension icon clicked, injecting modules...");

  const files = [
    "content/recorder.js",
    "content/overlay.js",
    "content/modal.js",
    "content/content.js"
  ];

  for (const file of files) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [file]
      });
      console.log(`[Recorder] ✅ Injected: ${file}`);
    } catch (err) {
      console.error(`[Recorder] ❌ Failed to inject ${file}:`, err);
    }
  }
});

// Set dynamic icon depending on recording status
function setRecordingIcon(isRecording) {
  const iconPath = isRecording
    ? "icons/icon-record.png"
    : "icons/icon-no-record.png";

  chrome.action.setIcon({ path: { "128": iconPath } }, () => {
    if (chrome.runtime.lastError) {
      console.error("[Recorder] ❌ Failed to set icon:", chrome.runtime.lastError.message);
    } else {
      console.log("[Recorder] 🔄 Icon set to:", iconPath);
    }
  });
}

// Start badge timer
function startTimerBadge() {
  updateBadge();
  timerInterval = setInterval(updateBadge, 1000);
}

// Update badge with elapsed time
function updateBadge() {
  const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  chrome.action.setBadgeText({ text: `${minutes}:${seconds}` });
  chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
}

// Stop badge and clear interval
function stopTimerBadge() {
  clearInterval(timerInterval);
  timerInterval = null;
  chrome.action.setBadgeText({ text: "" });
}
