// content.js

let isStarted = false;
let mediaRecorder = null;

console.log("[Recorder] content.js loaded");

window.addEventListener("load", () => {
  console.log("[Recorder] window loaded");

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
      console.log("[Recorder] Stopping recording...");
      mediaRecorder.stop();
      return;
    }

    try {
      console.log("[Recorder] Starting recording...");
      const result = await window.startRecording((blob) => {
        console.log("[Recorder] onStopCallback triggered");
        window.showPreviewModal(blob);
        isStarted = false;
        toggleButton.textContent = "Start";
        toggleButton.style.display = "block";
        settingsButton.style.display = "block";
        window.removeOverlay();
      });

      console.log("[Recorder] MediaRecorder ready");

      mediaRecorder = result.recorder;
      isStarted = true;

      toggleButton.textContent = "Stop";
      toggleButton.style.display = "none";
      settingsButton.style.display = "none";

      console.log("[Recorder] Creating overlay");
      window.createOverlay(() => {
        console.log("[Recorder] Overlay stop clicked");
        mediaRecorder.stop();
      });
    } catch (err) {
      console.error("[Recorder] Error starting screen recording:", err);
      alert("Could not start screen recording.");
    }
  });

  settingsButton.addEventListener("click", () => {
    alert("Settings not implemented yet.");
  });

  container.appendChild(toggleButton);
  container.appendChild(settingsButton);
  document.body.appendChild(container);
  console.log("[Recorder] Control panel added");
});

function styleButton(btn, bgColor) {
  btn.style.padding = "10px";
  btn.style.fontSize = "14px";
  btn.style.cursor = "pointer";
  btn.style.color = "white";
  btn.style.backgroundColor = bgColor;
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
}
