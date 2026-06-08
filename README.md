# Instagram Video Enhancer (IG 影片控制助手)

這是一個高質感的 Instagram 網頁版影片控制工具，支援 **自動進度條**、**倍速播放**、**音量拖曳** 與 **鍵盤快捷鍵**，適用於 Reels（連續短片）與 Stories（限時動態）。

此專案專為不想進行繁瑣的 Chrome 開發者模式安裝、或等待 Chrome 商店審核的使用者設計，提供了兩種**極簡部署方式**：

---

## 🚀 部署安裝方式

### 方式一：書籤小工具 (Bookmarklet) — ⚡ 免安裝、最快速！
適合完全不想安裝任何外掛的使用者。

1. 打開瀏覽器的**書籤列**（快速鍵：Chrome `Ctrl+Shift+B` 或 Mac `Cmd+Shift+B`）。
2. 在您的書籤列上**點擊右鍵 -> 新增網頁**（或新增書籤）。
3. 輸入以下資訊：
   - **名稱**：`IG 進度條助手`
   - **網址/URL**：將下方代碼複製並貼上：
     ```javascript
     javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/force/ig-video-enhancer/instagram-video-enhancer.user.js';document.body.appendChild(s);})();
     ```
4. **如何使用**：當您在電腦瀏覽器打開 Instagram 並看影片時，**點一下書籤列上的「IG 進度條助手」**，功能便會立刻啟用！
   *(註：因為 IG 是單頁式應用，只要您不按 F5 重新整理網頁，切換不同的 Reels 或 Stories 功能都會一直維持啟用。)*

---

### 方式二：Tampermonkey 腳本 (UserScript) — 🤖 一次安裝，永久自動運行！
適合希望每次打開 IG 都能自動生效、不需要點擊書籤的使用者。

1. 前往瀏覽器線上商店安裝 [Tampermonkey 擴充功能](https://www.tampermonkey.net/) (或任何相容的腳本管理器)。
2. 安裝完成後，點擊以下連結（如果您將此檔案推送至 GitHub，可以使用 raw 連結）：
   - `https://raw.githubusercontent.com/force/ig-video-enhancer/main/instagram-video-enhancer.user.js`
3. 畫面上會自動彈出 Tampermonkey 的安裝介面，點選**「安裝 / Install」**。
4. **如何使用**：安裝後，只要打開 Instagram，進度條與鍵盤控制功能便會自動加載！

---

## ⌨️ 鍵盤快捷鍵功能

在 IG 影片畫面中，你可以直接使用鍵盤控制影片：

| 快捷鍵 | 功能描述 |
| :--- | :--- |
| <kbd>Space (空白鍵)</kbd> | 播放 / 暫停影片 (自動防止網頁滾動) |
| <kbd>← (左方向鍵)</kbd> | 影片後退 5 秒 |
| <kbd>→ (右方向鍵)</kbd> | 影片前進 5 秒 |
| <kbd>↑ (上方向鍵)</kbd> | 提高音量 5% |
| <kbd>↓ (下方向鍵)</kbd> | 降低音量 5% |
| <kbd>M</kbd> | 切換 靜音 / 恢復音量 |
| <kbd>&gt;</kbd> 或 <kbd>.</kbd> | 加快播放速度 (最高 2.0x) |
| <kbd>&lt;</kbd> 或 <kbd>,</kbd> | 減慢播放速度 (最低 0.5x) |

---

## 🎨 視覺亮點
- **Instagram 漸層進度條**：使用 IG 品牌橘-粉-紫漸層，滑鼠懸停時自動放大，支援點擊與拖曳定位。
- **懸浮倍速藥丸**：滑鼠移入影片時，右上角會顯示一個精緻的半透明磨砂玻璃 (Glassmorphism) 藥丸按鈕，點擊可直接選擇 `0.5x`, `1.0x`, `1.25x`, `1.5x`, `2.0x` 播放速度。
- **音量滑桿**：懸停在 IG 原生靜音按鈕上，會自動滑出直立式音量調整桿。
- **MacOS 風格 HUD 提示**：使用快捷鍵調整播放/暫停、快進退、音量與速度時，畫面中央會跳出細緻的磨砂玻璃 HUD 提示卡片。

---

## 🧪 本地測試
想要在不開啟 IG 的情況下測試功能？
1. 下載本專案並在瀏覽器中打開 `mock_instagram.html`。
2. 點擊頁面上的 **「🔥 注入進度條腳本」** 按鈕。
3. 開始體驗流暢的控制功能！
