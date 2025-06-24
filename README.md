# 📹 Google Meet Screen Recorder (Chrome Extension)

A Chrome Extension that allows you to **record your screen during Google Meet**, shows a timer overlay with a Stop button, and saves the recording locally. The interface is embedded directly into the page with Start/Stop and Settings buttons.

---

## 🚀 Features

- 🟢 Start / Settings buttons embedded in the Google Meet page
- 🔴 Floating overlay with a live timer and Stop button
- 📥 Saves recordings as `.webm` files
- ⏱️ Recording timer shown in the extension icon badge
- 🔁 Extension icon changes dynamically (recording / idle)

---

## 📁 Project Structure

```
google-meet-recorder/
├── manifest.json               # Extension configuration
├── background.js               # Handles badge timer and icon switching
├── content.js                  # Injects UI and handles recording logic
└── icons/
    ├── icon-no-record.png     # Default icon (idle)
    └── icon-record.png        # Icon during active recording
```

---

## 🛠 Manual Installation (Developer Mode)

1. Download or clone the repository:
   ```bash
   git clone https://github.com/ukaukaa/google-meet-recorder.git
   ```

2. Open Chrome and go to:
   `chrome://extensions/`

3. Enable **Developer Mode** (top right)

4. Click **“Load unpacked”** and select the `google-meet-recorder/` folder

5. Navigate to `https://meet.google.com` and start using the extension

---

## 📂 Usage

- **Start**: Begins screen recording and hides the buttons
- **Stop**: Ends the recording, shows the buttons again, and downloads the video
- **Settings**: Placeholder for future options
- Recordings are saved as `.webm` files to your Downloads folder

---

## ⚙️ Requirements

- Google Chrome or any Chromium-based browser
- Screen capture permissions (prompted by Chrome)

---

## 🖼️ Icons

- `icons/icon-no-record.png` — shown when idle
- `icons/icon-record.png` — shown during recording
- Recommended size: 128×128 pixels

---

## 💡 Ideas for Improvement

- Convert `.webm` to `.mp4` using `ffmpeg.wasm`
- Upload to Google Drive / Dropbox
- Auto-start recording when joining a meeting
- Recording quality settings
- Notification and recording history

---

## ⚠️ License

This project is licensed under a **custom license**:

- ✅ Free to use by anyone (individuals, organizations, companies)
- ❌ **Commercial resale is prohibited**
- 📛 All code and materials are the **exclusive intellectual property** of the original author
- 📄 See [`LICENSE`](./LICENSE) for full terms

---

## 📜 Contribution

All contributions are welcome! By submitting a pull request, you agree that your code becomes part of the project and may be modified or relicensed by the project owner. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for details.