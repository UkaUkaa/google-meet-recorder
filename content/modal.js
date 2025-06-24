// modal.js

window.showPreviewModal = function(blob) {
  const url = URL.createObjectURL(blob);

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  modal.style.zIndex = "999999999";
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.gap = "20px";

  const video = document.createElement("video");
  video.src = url;
  video.controls = true;
  video.autoplay = true;
  video.style.maxWidth = "90vw";
  video.style.maxHeight = "70vh";
  video.style.border = "4px solid white";
  video.style.borderRadius = "12px";
  modal.appendChild(video);

  const btnSave = document.createElement("button");
  btnSave.textContent = "💾 Save";
  btnSave.style.padding = "10px 20px";
  btnSave.style.fontSize = "18px";
  btnSave.style.cursor = "pointer";
  btnSave.onclick = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `recording-${Date.now()}.webm`;
    a.click();
    document.body.removeChild(modal);
    URL.revokeObjectURL(url);
  };

  const btnDiscard = document.createElement("button");
  btnDiscard.textContent = "🗑️ Discard";
  btnDiscard.style.padding = "10px 20px";
  btnDiscard.style.fontSize = "18px";
  btnDiscard.style.cursor = "pointer";
  btnDiscard.onclick = () => {
    document.body.removeChild(modal);
    URL.revokeObjectURL(url);
  };

  const buttons = document.createElement("div");
  buttons.style.display = "flex";
  buttons.style.gap = "20px";
  buttons.appendChild(btnSave);
  buttons.appendChild(btnDiscard);
  modal.appendChild(buttons);

  document.body.appendChild(modal);
};
