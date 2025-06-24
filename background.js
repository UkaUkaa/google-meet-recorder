let recordingStartTime = null;
let timerInterval = null;

// Listen to messages from content.js
chrome.runtime.onMessage.addListener((message) => {
  console.log("📩 Message received:", message.type);

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

// Set extension icon depending on recording state
function setRecordingIcon(isRecording) {
  const iconPath = isRecording
    ? "icons/icons-record.png"
    : "icons/icons-no-record.png";

  chrome.action.setIcon({ path: { "128": iconPath } }, () => {
    if (chrome.runtime.lastError) {
      console.error("❌ Failed to set icon:", chrome.runtime.lastError.message);
    } else {
      console.log("✅ Icon set to:", iconPath);
    }
  });
}

// Start badge timer
function startTimerBadge() {
  updateBadge(); // immediately show 00:00
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

// Stop timer and clear badge
function stopTimerBadge() {
  clearInterval(timerInterval);
  chrome.action.setBadgeText({ text: "" });
}
