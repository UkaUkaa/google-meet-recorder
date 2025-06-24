// overlay.js

let overlayTimerInterval = null;
let overlayStartTime = null;

window.createOverlay = function(onStopCallback) {
  const overlay = document.createElement("div");
  overlay.id = "rec-timer-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "20px";
  overlay.style.left = "20px";
  overlay.style.zIndex = "999999";
  overlay.style.background = "rgba(0,0,0,0.75)";
  overlay.style.color = "white";
  overlay.style.padding = "12px 16px";
  overlay.style.borderRadius = "8px";
  overlay.style.fontSize = "16px";
  overlay.style.fontFamily = "monospace";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.gap = "12px";
  overlay.style.boxShadow = "0 0 8px rgba(0,0,0,0.5)";

  const timeSpan = document.createElement("span");
  timeSpan.id = "rec-time-display";
  timeSpan.textContent = "00:00";

  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
  stopButton.style.background = "#e53935";
  stopButton.style.border = "none";
  stopButton.style.padding = "6px 12px";
  stopButton.style.color = "white";
  stopButton.style.fontSize = "14px";
  stopButton.style.borderRadius = "4px";
  stopButton.style.cursor = "pointer";
  stopButton.onclick = onStopCallback;

  overlay.appendChild(timeSpan);
  overlay.appendChild(stopButton);
  document.body.appendChild(overlay);

  overlayStartTime = Date.now();
  overlayTimerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - overlayStartTime) / 1000);
    const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const ss = String(elapsed % 60).padStart(2, "0");
    const display = document.getElementById("rec-time-display");
    if (display) display.textContent = `${mm}:${ss}`;
  }, 1000);
};

window.removeOverlay = function() {
  const el = document.getElementById("rec-timer-overlay");
  if (el) el.remove();
  clearInterval(overlayTimerInterval);
  overlayTimerInterval = null;
};
