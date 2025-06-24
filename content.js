let isStarted = false;
let mediaRecorder = null;
let recordedChunks = [];
let timerInterval = null;
let startTime = null;

// Create floating timer overlay with Stop button
function createOverlay() {
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

  stopButton.onclick = stopRecording;

  overlay.appendChild(timeSpan);
  overlay.appendChild(stopButton);
  document.body.appendChild(overlay);
}

// Remove overlay
function removeOverlay() {
  const el = document.getElementById("rec-timer-overlay");
  if (el) el.remove();
}

// Start overlay timer
function startOverlayTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const ss = String(elapsed % 60).padStart(2, "0");
    const display = document.getElementById("rec-time-display");
    if (display) display.textContent = `${mm}:${ss}`;
  }, 1000);
}

// Stop overlay timer
function stopOverlayTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Stop recording and save file
function stopRecording() {
  if (!mediaRecorder || !isStarted) return;

  mediaRecorder.stop();
  chrome.runtime.sendMessage({ type: "STOP_RECORDING" });
  isStarted = false;

  // Restore buttons
  const toggle = document.getElementById("toggleButton");
  const settings = document.getElementById("settingsButton");
  if (toggle) {
    toggle.textContent = "Start";
    toggle.style.display = "block";
  }
  if (settings) {
    settings.style.display = "block";
  }

  stopOverlayTimer();
  removeOverlay();
}

// Insert UI controls into Google Meet
window.addEventListener("load", () => {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "80px";
  container.style.right = "20px";
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  container.style.padding = "10px";
  container.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  container.style.borderRadius = "8px";

  const toggleButton = document.createElement("button");
  toggleButton.id = "toggleButton";
  toggleButton.textContent = "Start";
  styleButton(toggleButton, "#1a73e8");

  const settingsButton = document.createElement("button");
  settingsButton.id = "settingsButton";
  settingsButton.textContent = "Settings";
  styleButton(settingsButton, "#5f6368");

  toggleButton.addEventListener("click", async () => {
    if (isStarted) {
      stopRecording();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      recordedChunks = [];
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9"
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `meet-recording-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
          a.remove();
        }, 100);
      };

      mediaRecorder.start();
      isStarted = true;
      toggleButton.textContent = "Stop";
      chrome.runtime.sendMessage({ type: "START_RECORDING" });

      createOverlay();
      startOverlayTimer();

      // Hide control buttons
      toggleButton.style.display = "none";
      settingsButton.style.display = "none";

    } catch (err) {
      console.error("Screen record error:", err);
      alert("Could not start screen recording.");
    }
  });

  settingsButton.addEventListener("click", () => {
    alert("Settings not implemented yet.");
  });

  container.appendChild(toggleButton);
  container.appendChild(settingsButton);
  document.body.appendChild(container);
});

// Button styling
function styleButton(btn, bgColor) {
  btn.style.padding = "10px";
  btn.style.fontSize = "14px";
  btn.style.cursor = "pointer";
  btn.style.color = "white";
  btn.style.backgroundColor = bgColor;
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
}
