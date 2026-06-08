# FALO Instagram Video Enhancer (v1.0.1)

> **Falo x Force Cheng 2026/6/8**

這是一個高質感的 Instagram 網頁版影片控制 Chrome 外掛程式 (Chrome Extension, Manifest V3)，支援 **自動漸層進度條**、**懸浮式虛擬遙控器**、**OLED 狀態顯示螢幕**、**倍速播放**、**音量拖曳** 與 **1-6 數字快捷鍵**，適用於 Reels（連續短片）與 Stories（限時動態）。

本專案同時包含一個精心設計的**雙主題教學網頁**，方便使用者與學生練習如何在 Chrome 開發者模式下部署、載入並測試未封裝的擴充功能。

---

## 📂 專案結構

此專案僅包含 Instagram 影片控制擴充功能及其教學資源：
- `ig-video-enhancer-extension/` - Chrome 外掛程式的完整原始碼目錄（包含 `manifest.json`, `content.js`, `content.css`, `popup.html` 等）。
- `FALO_Instagram_Video_Enhancer.zip` - 供學員直接下載練習載入的擴充功能壓縮包。
- `index.html` (及 `falo_extension_tutorial.html`) - 清新/現代雙主題的擴充功能載入與部署教學頁面。
- `README.md` - 專案說明文件。

---

## 🛠️ Chrome 擴充功能安裝步驟

1. **下載原始碼**：下載本專案中的 `FALO_Instagram_Video_Enhancer.zip` 並解壓縮。
2. **進入管理頁面**：開啟 Chrome 瀏覽器，在網址列輸入 `chrome://extensions/` 並按下 Enter。
3. **啟用開發人員模式**：將頁面右上角的「**開發人員模式**」開關切換為啟用狀態。
4. **載入未封裝項目**：點選左上角「**載入未封裝項目**」按鈕，並選取解壓縮出來的 `ig-video-enhancer-extension` 資料夾。
5. **開始使用**：開啟 Instagram 網頁版，點擊任何 Reels 或 Stories 影片，即可在畫面上使用懸浮遙控器與功能。

---

## 🎮 懸浮遙控器與 5 種主題切換

本外掛包含一個可隨意拖曳的精緻虛擬遙控器：
1. **一班遙控器黑 (預設)**
2. **一班遙控器白**
3. **少女櫻花粉**
4. **少女奶油白**
5. **高科技夢幻風**

點擊遙控器下方的 **`Falo Force Cheng 2026`** 浮水印，即可直接跳轉至本專案的教學網站：`https://falo-taiwan.github.io/ig/`。

---

## ⌨️ 預設鍵盤快捷鍵

點擊播放中的影片後，即可使用鍵盤快捷鍵進行控制（調整時畫面中央將彈出 macOS 風格的磨砂玻璃 HUD 提示卡）：

| 按鍵 | 功能描述 |
| :--- | :--- |
| <kbd>1</kbd> | 切換播放 / 暫停狀態 |
| <kbd>2</kbd> / <kbd>3</kbd> | 降低音量 5% / 增加音量 5% |
| <kbd>4</kbd> | 快速切換 靜音 / 取消靜音 |
| <kbd>5</kbd> / <kbd>6</kbd> | 減慢播放速度 / 加快播放速度 (以 0.25x 為一級，範圍 0.5x - 2.0x) |
| <kbd>←</kbd> / <kbd>→</kbd> | 影片倒帶 5 秒 / 快進 5 秒 |

---

## 🧪 本地測試

想要在不安裝外掛的情況下直接體驗遙控器、快捷鍵與主題切換？
請在瀏覽器中直接開啟 `ig-video-enhancer-extension/mock_instagram.html`，該模擬網頁已直接引入 `content.js` 與 `content.css`，方便您進行免安裝的本地功能測試。
