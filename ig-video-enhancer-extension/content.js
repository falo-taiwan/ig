// Content script for FALO Instagram Video Enhancer
// Developed by: Falo x Force Cheng 2026/6/8
(function() {
  'use strict';

  // Invisible Memory Watermark Stamp
  const _watermark = "Falo x Force Cheng 2026/6/8";

  // Standalone storage adapter for local testing compatibility
  const storage = {
    get: (defaults, callback) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get(defaults, callback);
      } else {
        const res = {};
        for (let key in defaults) {
          const saved = localStorage.getItem('ive_' + key);
          res[key] = saved !== null ? JSON.parse(saved) : defaults[key];
        }
        callback(res);
      }
    },
    set: (data) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set(data);
      } else {
        for (let key in data) {
          localStorage.setItem('ive_' + key, JSON.stringify(data[key]));
        }
      }
    },
    onChanged: {
      addListener: (callback) => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
          chrome.storage.onChanged.addListener(callback);
        } else {
          window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('ive_')) {
              const key = e.key.substring(4);
              let val;
              try { val = JSON.parse(e.newValue); } catch(err) { val = e.newValue; }
              callback({ [key]: { newValue: val } });
            }
          });
        }
      }
    }
  };

  // Configuration State
  const Settings = {
    showProgressBar: true,
    showRemoteControl: true,
    enableShortcuts: true,
    defaultSpeed: 1.0,
    defaultVolume: 0.8,
    muted: false
  };

  // SVG Paths for Remote Control Buttons
  const SVGs = {
    volumeUp: `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
    volumeDown: `<svg viewBox="0 0 24 24"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>`,
    mute: `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
    play: `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
    pause: `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
    seekBack: `<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>`,
    seekForward: `<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>`,
    speed: `<svg viewBox="0 0 24 24"><path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6l1.85-1.23A10 10 0 0 0 3.35 15a10 10 0 0 0 17.03 3.57 10 10 0 0 0 .15-10m-8.38 2.43a2 2 0 1 0 2 2 2 2 0 0 0-2-2m4.83-3.65l-3.75 5.62a2 2 0 0 0-1 .08l2.67-5.75a1 1 0 0 1 2.08.05z"/></svg>`
  };

  // Load Initial Settings
  storage.get({
    showProgressBar: true,
    showRemoteControl: true,
    enableShortcuts: true,
    defaultSpeed: 1.0,
    defaultVolume: 0.8,
    muted: false
  }, (items) => {
    Object.assign(Settings, items);
    initObserver();
  });

  // Watch for Setting changes (Synchronizes state across tabs and setting popup panel)
  storage.onChanged.addListener((changes) => {
    for (let key in changes) {
      if (changes[key] && 'newValue' in changes[key]) {
        Settings[key] = changes[key].newValue;
      }
    }
    // Sync bottom timelines display state
    document.querySelectorAll('.ive-progress-container').forEach(el => {
      el.style.display = Settings.showProgressBar ? 'flex' : 'none';
    });
    // Sync remote control display state
    const remote = document.querySelector('.ive-remote-control');
    if (remote) {
      remote.style.display = Settings.showRemoteControl ? 'flex' : 'none';
    } else if (Settings.showRemoteControl) {
      createRemoteControl();
    }
  });

  // Helper: format time (e.g. 74 -> 1:14)
  function formatTime(sec) {
    if (isNaN(sec) || !isFinite(sec)) return '0:00';
    sec = Math.floor(sec);
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Find target video overlay container
  function getOverlayContainer(video) {
    const parent = video.parentElement;
    if (!parent) return null;
    const instanceKey = parent.querySelector('[data-instancekey]');
    if (instanceKey) return instanceKey;

    const closestInstance = video.closest('*:has(> [data-instancekey])');
    if (closestInstance) {
      return closestInstance.querySelector('[data-instancekey]');
    }
    return parent;
  }

  // Viewport calculation to find the most visible active video
  function getActiveVideo() {
    const videos = document.querySelectorAll('video');
    let activeVideo = null;
    let maxVisibleArea = 0;

    for (const video of videos) {
      const rect = video.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const viewWidth = window.innerWidth;
      
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewHeight, rect.bottom);
      const visibleLeft = Math.max(0, rect.left);
      const visibleRight = Math.min(viewWidth, rect.right);

      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibleWidth = Math.max(0, visibleRight - visibleLeft);
      const visibleArea = visibleHeight * visibleWidth;

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        activeVideo = video;
      }
    }
    return activeVideo;
  }

  // Central on-screen HUD
  function showHUD(container, contentHtml) {
    let hud = container.querySelector('.ive-hud');
    if (!hud) {
      hud = document.createElement('div');
      hud.className = 'ive-hud';
      container.appendChild(hud);
    }
    hud.innerHTML = contentHtml;
    hud.classList.remove('show');
    void hud.offsetWidth; // Force reflow
    hud.classList.add('show');

    if (hud.__timeout) clearTimeout(hud.__timeout);
    hud.__timeout = setTimeout(() => {
      hud.classList.remove('show');
    }, 850);
  }

  // Update volume
  function setVideoVolume(video, vol, isMuted) {
    const volume = Math.max(0, Math.min(vol, 1));
    const muted = !!isMuted;

    video.volume = volume;
    video.muted = muted;

    storage.set({ defaultVolume: volume, muted: muted });

    const overlay = getOverlayContainer(video);
    if (overlay) {
      const fill = overlay.querySelector('.ive-volume-slider-fill');
      if (fill) {
        fill.style.height = `${(muted ? 0 : volume) * 100}%`;
      }
    }
  }

  // Injects bottom timeline progress bar
  function initPlayer(video) {
    if (video.__ive_initialized) return;
    video.__ive_initialized = true;

    // Apply invisible memory watermark to the video element
    video.__ive_watermark = _watermark;

    const overlay = getOverlayContainer(video);
    if (!overlay) return;

    overlay.style.position = 'relative';
    overlay.style.pointerEvents = 'auto';

    // Clean previous timeline injections if any
    overlay.querySelectorAll('.ive-progress-container, .ive-volume-container').forEach(el => el.remove());

    // Apply saved default states to this newly loaded video
    video.volume = Settings.defaultVolume;
    video.muted = Settings.muted;
    video.playbackRate = Settings.defaultSpeed;

    // 1. Inject Progress Timeline Bar
    const progContainer = document.createElement('div');
    progContainer.className = 'ive-progress-container';
    progContainer.style.display = Settings.showProgressBar ? 'flex' : 'none';
    
    const track = document.createElement('div');
    track.className = 'ive-progress-track';
    
    const fill = document.createElement('div');
    fill.className = 'ive-progress-fill';
    
    const handle = document.createElement('div');
    handle.className = 'ive-progress-handle';
    
    const tooltip = document.createElement('div');
    tooltip.className = 'ive-time-tooltip';
    tooltip.textContent = '0:00 / 0:00';

    fill.appendChild(handle);
    track.appendChild(fill);
    progContainer.appendChild(track);
    progContainer.appendChild(tooltip);
    overlay.appendChild(progContainer);

    let isDragging = false;
    let wasPlayingBeforeDrag = false;

    function updateSeek(e) {
      const rect = track.getBoundingClientRect();
      const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
      const newTime = pos * video.duration;
      if (isFinite(newTime)) {
        video.currentTime = newTime;
        fill.style.width = `${pos * 100}%`;
        tooltip.textContent = `${formatTime(newTime)} / ${formatTime(video.duration)}`;
      }
    }

    progContainer.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      isDragging = true;
      progContainer.classList.add('dragging');
      wasPlayingBeforeDrag = !video.paused;
      video.pause();
      updateSeek(e);

      function onPointerMove(moveEvent) {
        updateSeek(moveEvent);
      }

      function onPointerUp(upEvent) {
        isDragging = false;
        progContainer.classList.remove('dragging');
        updateSeek(upEvent);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        if (wasPlayingBeforeDrag) {
          video.play().catch(() => {});
        }
      }

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });

    progContainer.addEventListener('pointermove', (e) => {
      if (isDragging) return;
      const rect = track.getBoundingClientRect();
      const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
      const hoverTime = pos * video.duration;
      tooltip.textContent = `${formatTime(hoverTime)} / ${formatTime(video.duration)}`;
      tooltip.style.left = `${(e.clientX - rect.left)}px`;
    });

    video.addEventListener('timeupdate', () => {
      if (isDragging) return;
      const duration = video.duration || 0;
      const current = video.currentTime || 0;
      const percent = duration > 0 ? (current / duration) * 100 : 0;
      fill.style.width = `${percent}%`;
    });

    // 2. Inject hover volume bar into the native mute button (if native button exists)
    setTimeout(() => {
      const nativeMuteBtn = overlay.closest('div.x78zum5')?.querySelector('[aria-label^="Audio is "]');
      if (nativeMuteBtn && nativeMuteBtn.parentElement) {
        const parentBtn = nativeMuteBtn.parentElement;
        if (!parentBtn.querySelector('.ive-volume-container')) {
          parentBtn.style.position = 'relative';
          
          const volContainer = document.createElement('div');
          volContainer.className = 'ive-volume-container';
          
          const volTrack = document.createElement('div');
          volTrack.className = 'ive-volume-slider-track';
          
          const volFill = document.createElement('div');
          volFill.className = 'ive-volume-slider-fill';
          volFill.style.height = `${(video.muted ? 0 : video.volume) * 100}%`;
          
          volTrack.appendChild(volFill);
          volContainer.appendChild(volTrack);
          parentBtn.appendChild(volContainer);

          let isVolDragging = false;
          function updateVolumeDrag(e) {
            const rect = volTrack.getBoundingClientRect();
            const percentage = 1 - Math.max(0, Math.min((e.clientY - rect.top) / rect.height, 1));
            setVideoVolume(video, percentage, percentage === 0);
          }

          volContainer.addEventListener('pointerdown', (e) => {
            e.stopPropagation();
            e.preventDefault();
            isVolDragging = true;
            updateVolumeDrag(e);

            function onVolMove(moveEvent) {
              updateVolumeDrag(moveEvent);
            }

            function onVolUp() {
              isVolDragging = false;
              document.removeEventListener('pointermove', onVolMove);
              document.removeEventListener('pointerup', onVolUp);
            }

            document.addEventListener('pointermove', onVolMove);
            document.addEventListener('pointerup', onVolUp);
          });
        }
      }
    }, 1200);
  }

  // ----------------------------------------------------
  // Virtual Remote Control Widget
  // ----------------------------------------------------
  function createRemoteControl() {
    let remote = document.querySelector('.ive-remote-control');
    if (remote) {
      remote.style.display = Settings.showRemoteControl ? 'flex' : 'none';
      return remote;
    }

    remote = document.createElement('div');
    remote.className = 'ive-remote-control';
    remote.style.display = Settings.showRemoteControl ? 'flex' : 'none';

    // Apply invisible DOM watermark (with date)
    remote.setAttribute('data-watermark', _watermark);

    // Load saved Theme class (default black)
    const savedTheme = localStorage.getItem('ive_remote_theme') || 'black';
    remote.classList.add('theme-' + savedTheme);

    // Drag Handle
    const dragHandle = document.createElement('div');
    dragHandle.className = 'ive-remote-drag';
    remote.appendChild(dragHandle);

    // OLED Screen
    const screen = document.createElement('div');
    screen.className = 'ive-remote-screen';
    
    const screenSpeed = document.createElement('div');
    screenSpeed.className = 'ive-screen-speed';
    screenSpeed.textContent = 'SPEED: 1.00x';
    
    const screenTime = document.createElement('div');
    screenTime.className = 'ive-screen-time';
    screenTime.textContent = '0:00 / 0:00';
    
    screen.appendChild(screenSpeed);
    screen.appendChild(screenTime);
    remote.appendChild(screen);

    // Draggable Timeline Progress Bar directly on the Remote
    const remoteProg = document.createElement('div');
    remoteProg.className = 'ive-remote-progress-container';
    
    const remoteTrack = document.createElement('div');
    remoteTrack.className = 'ive-remote-progress-track';
    
    const remoteFill = document.createElement('div');
    remoteFill.className = 'ive-remote-progress-fill';
    
    const remoteHandle = document.createElement('div');
    remoteHandle.className = 'ive-remote-progress-handle';
    
    remoteFill.appendChild(remoteHandle);
    remoteTrack.appendChild(remoteFill);
    remoteProg.appendChild(remoteTrack);
    remote.appendChild(remoteProg);

    let isRemoteSeeking = false;
    let remoteWasPlaying = false;

    function updateRemoteSeek(e) {
      const activeVideo = getActiveVideo();
      if (!activeVideo) return;
      const rect = remoteTrack.getBoundingClientRect();
      const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
      const newTime = pos * activeVideo.duration;
      if (isFinite(newTime)) {
        activeVideo.currentTime = newTime;
        remoteFill.style.width = `${pos * 100}%`;
        screenTime.textContent = `${formatTime(newTime)} / ${formatTime(activeVideo.duration)}`;
      }
    }

    remoteProg.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const activeVideo = getActiveVideo();
      if (!activeVideo) return;

      isRemoteSeeking = true;
      remoteProg.classList.add('dragging');
      remoteWasPlaying = !activeVideo.paused;
      activeVideo.pause();
      updateRemoteSeek(e);

      function onPointerMove(moveEvent) {
        updateRemoteSeek(moveEvent);
      }

      function onPointerUp(upEvent) {
        isRemoteSeeking = false;
        remoteProg.classList.remove('dragging');
        updateRemoteSeek(upEvent);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        if (remoteWasPlaying) {
          activeVideo.play().catch(() => {});
        }
      }

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });

    // Helper to generate a remote control button
    function makeButton(iconSvgOrHtml, title, onClick, extraClass = '', keyLabel = '') {
      const btn = document.createElement('div');
      btn.className = `ive-remote-btn ${extraClass}`;
      btn.title = keyLabel ? `${title} (熱鍵: ${keyLabel})` : title;
      btn.innerHTML = iconSvgOrHtml;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const activeVideo = getActiveVideo();
        if (activeVideo) {
          onClick(activeVideo);
        }
      });
      return btn;
    }

    // Row 1: Seek & Play/Pause controls
    const row1 = document.createElement('div');
    row1.className = 'ive-remote-row';
    
    const btnSeekBack = makeButton(SVGs.seekBack, '倒帶 5 秒', (video) => {
      video.currentTime = Math.max(0, video.currentTime - 5);
      const overlay = getOverlayContainer(video);
      if (overlay) showHUD(overlay, `<span class="ive-hud-text">-5s</span>`);
    }, '', '←');

    const btnPlayPause = makeButton(SVGs.play, '播放 / 暫停', (video) => {
      const overlay = getOverlayContainer(video);
      if (video.paused) {
        video.play().catch(() => {});
        btnPlayPause.innerHTML = SVGs.pause;
        if (overlay) showHUD(overlay, `${SVGs.play}<span class="ive-hud-text">播放</span>`);
      } else {
        video.pause();
        btnPlayPause.innerHTML = SVGs.play;
        if (overlay) showHUD(overlay, `${SVGs.pause}<span class="ive-hud-text">暫停</span>`);
      }
    }, 'ive-remote-btn-play', '1');

    const btnSeekForward = makeButton(SVGs.seekForward, '快進 5 秒', (video) => {
      video.currentTime = Math.min(video.duration || 9999, video.currentTime + 5);
      const overlay = getOverlayContainer(video);
      if (overlay) showHUD(overlay, `<span class="ive-hud-text">+5s</span>`);
    }, '', '→');

    row1.appendChild(btnSeekBack);
    row1.appendChild(btnPlayPause);
    row1.appendChild(btnSeekForward);
    remote.appendChild(row1);

    // Label: Volume
    const volLabel = document.createElement('div');
    volLabel.className = 'ive-remote-row-label';
    volLabel.textContent = 'Volume';
    remote.appendChild(volLabel);

    // Row 2: Volume controls
    const row2 = document.createElement('div');
    row2.className = 'ive-remote-row';

    const btnVolDown = makeButton(SVGs.volumeDown, '降低音量', (video) => {
      const newVol = Math.max(0, video.volume - 0.05);
      setVideoVolume(video, newVol, newVol === 0);
      const overlay = getOverlayContainer(video);
      if (overlay) showHUD(overlay, `${SVGs.volumeUp}<span class="ive-hud-text">音量 ${Math.round(newVol * 100)}%</span>`);
    }, '', '2');

    const btnMute = makeButton(SVGs.mute, '靜音 / 取消靜音', (video) => {
      const newMute = !video.muted;
      setVideoVolume(video, video.volume, newMute);
      const overlay = getOverlayContainer(video);
      if (overlay) {
        if (newMute) {
          showHUD(overlay, `${SVGs.mute}<span class="ive-hud-text">靜音</span>`);
        } else {
          showHUD(overlay, `${SVGs.volumeUp}<span class="ive-hud-text">音量 ${Math.round(video.volume * 100)}%</span>`);
        }
      }
    }, '', '4');

    const btnVolUp = makeButton(SVGs.volumeUp, '提高音量', (video) => {
      const newVol = Math.min(1.0, video.volume + 0.05);
      setVideoVolume(video, newVol, false);
      const overlay = getOverlayContainer(video);
      if (overlay) showHUD(overlay, `${SVGs.volumeUp}<span class="ive-hud-text">音量 ${Math.round(newVol * 100)}%</span>`);
    }, '', '3');

    row2.appendChild(btnVolDown);
    row2.appendChild(btnMute);
    row2.appendChild(btnVolUp);
    remote.appendChild(row2);

    // Label: Speed
    const speedLabel = document.createElement('div');
    speedLabel.className = 'ive-remote-row-label';
    speedLabel.textContent = 'Speed';
    remote.appendChild(speedLabel);

    // Row 3: Speed adjust
    const row3 = document.createElement('div');
    row3.className = 'ive-remote-row';

    const btnSpeedDown = makeButton('<span class="ive-remote-btn-text">−</span>', '降低倍速', (video) => {
      adjustSpeed(video, -0.25);
    }, '', '5');

    const btnSpeedUp = makeButton('<span class="ive-remote-btn-text">+</span>', '提高倍速', (video) => {
      adjustSpeed(video, 0.25);
    }, '', '6');

    row3.appendChild(btnSpeedDown);
    row3.appendChild(btnSpeedUp);
    remote.appendChild(row3);

    // Theme selector row
    const themeRow = document.createElement('div');
    themeRow.className = 'ive-remote-theme-row';
    const themes = ['black', 'white', 'pink', 'cream', 'dream'];
    const themeNames = {
      black: '一班遙控器黑',
      white: '一班遙控器白',
      pink: '少女櫻花粉',
      cream: '少女奶油白',
      dream: '馬卡龍綠'
    };
    themes.forEach(t => {
      const dot = document.createElement('span');
      dot.className = `ive-theme-dot theme-dot-${t}`;
      dot.title = `切換為 ${themeNames[t] || t} 配色`;
      if (t === savedTheme) dot.classList.add('active');
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        themes.forEach(old => remote.classList.remove(`theme-${old}`));
        remote.classList.add(`theme-${t}`);
        
        themeRow.querySelectorAll('.ive-theme-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        localStorage.setItem('ive_remote_theme', t);
      });
      themeRow.appendChild(dot);
    });
    remote.appendChild(themeRow);

    // [New] Footer Signature Stamp (at the very bottom, exactly Falo Force Cheng 2026!)
    const footer = document.createElement('div');
    footer.className = 'ive-remote-footer';
    footer.textContent = 'Falo Force Cheng 2026';
    footer.title = '點擊前往課程教學專案網頁';
    footer.style.cursor = 'pointer';
    footer.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open('https://falo-taiwan.github.io/ig/', '_blank');
    });
    remote.appendChild(footer);

    document.body.appendChild(remote);

    // Restore saved coordinate positions
    const savedPos = localStorage.getItem('ive_remote_pos');
    if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        remote.style.left = pos.left;
        remote.style.top = pos.top;
      } catch (e) {
        remote.style.top = '100px';
        remote.style.right = '20px';
      }
    } else {
      remote.style.top = '100px';
      remote.style.right = '20px';
    }

    // Drag-and-drop listener
    let offsetX = 0, offsetY = 0;
    dragHandle.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      offsetX = e.clientX - remote.getBoundingClientRect().left;
      offsetY = e.clientY - remote.getBoundingClientRect().top;

      function onMove(moveEvent) {
        moveEvent.preventDefault();
        const x = moveEvent.clientX - offsetX;
        const y = moveEvent.clientY - offsetY;
        const maxX = window.innerWidth - remote.offsetWidth - 10;
        const maxY = window.innerHeight - remote.offsetHeight - 10;
        const cx = Math.max(10, Math.min(x, maxX));
        const cy = Math.max(10, Math.min(y, maxY));
        remote.style.left = cx + 'px';
        remote.style.top = cy + 'px';
        remote.style.right = 'auto';
      }

      function onUp() {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        localStorage.setItem('ive_remote_pos', JSON.stringify({
          left: remote.style.left,
          top: remote.style.top
        }));
      }

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    });

    // OLED real-time syncing loop
    setInterval(() => {
      if (remote.style.display === 'none') return;
      const video = getActiveVideo();
      if (video) {
        screenSpeed.textContent = `SPEED: ${video.playbackRate.toFixed(2)}x`;
        screenTime.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        btnPlayPause.innerHTML = video.paused ? SVGs.play : SVGs.pause;
        btnMute.innerHTML = video.muted ? SVGs.mute : SVGs.volumeUp;
        
        if (!isRemoteSeeking) {
          const pct = video.duration > 0 ? (video.currentTime / video.duration) * 100 : 0;
          remoteFill.style.width = pct + '%';
        }
      } else {
        screenSpeed.textContent = 'SPEED: ---';
        screenTime.textContent = 'NO VIDEO';
        btnPlayPause.innerHTML = SVGs.play;
        if (!isRemoteSeeking) {
          remoteFill.style.width = '0%';
        }
      }
    }, 250);
  }

  // Keyboard Shortcuts Listener (with case-insensitive M)
  window.addEventListener('keydown', (e) => {
    if (!Settings.enableShortcuts) return;

    // Bypass when editing input fields
    const activeEl = document.activeElement;
    if (activeEl && (
      activeEl.tagName === 'INPUT' || 
      activeEl.tagName === 'TEXTAREA' || 
      activeEl.isContentEditable
    )) {
      return;
    }

    const activeVideo = getActiveVideo();
    if (!activeVideo) return;
    const overlay = getOverlayContainer(activeVideo);
    if (!overlay) return;

    switch (e.key) {
      case '1': // 1: play/pause
        e.preventDefault();
        if (activeVideo.paused) {
          activeVideo.play().catch(() => {});
          showHUD(overlay, `${SVGs.play}<span class="ive-hud-text">播放</span>`);
        } else {
          activeVideo.pause();
          showHUD(overlay, `${SVGs.pause}<span class="ive-hud-text">暫停</span>`);
        }
        break;

      case 'ArrowLeft': // Left Arrow: skip back 5s
        e.preventDefault();
        activeVideo.currentTime = Math.max(0, activeVideo.currentTime - 5);
        showHUD(overlay, `<span class="ive-hud-text">-5s</span>`);
        break;

      case 'ArrowRight': // Right Arrow: skip forward 5s
        e.preventDefault();
        activeVideo.currentTime = Math.min(activeVideo.duration || 9999, activeVideo.currentTime + 5);
        showHUD(overlay, `<span class="ive-hud-text">+5s</span>`);
        break;

      case '3': // 3: increase volume
        e.preventDefault();
        const newVolUp = Math.min(1.0, activeVideo.volume + 0.05);
        setVideoVolume(activeVideo, newVolUp, false);
        showHUD(overlay, `${SVGs.volumeUp}<span class="ive-hud-text">音量 ${Math.round(newVolUp * 100)}%</span>`);
        break;

      case '2': // 2: decrease volume
        e.preventDefault();
        const newVolDown = Math.max(0.0, activeVideo.volume - 0.05);
        setVideoVolume(activeVideo, newVolDown, newVolDown === 0);
        showHUD(overlay, `${SVGs.volumeUp}<span class="ive-hud-text">音量 ${Math.round(newVolDown * 100)}%</span>`);
        break;

      case '4': // 4: toggle mute
        e.preventDefault();
        const newMute = !activeVideo.muted;
        setVideoVolume(activeVideo, activeVideo.volume, newMute);
        if (newMute) {
          showHUD(overlay, `${SVGs.mute}<span class="ive-hud-text">靜音</span>`);
        } else {
          showHUD(overlay, `${SVGs.volumeUp}<span class="ive-hud-text">音量 ${Math.round(activeVideo.volume * 100)}%</span>`);
        }
        break;

      case '6': // 6: Speed up
        e.preventDefault();
        adjustSpeed(activeVideo, 0.25);
        break;

      case '5': // 5: Slow down
        e.preventDefault();
        adjustSpeed(activeVideo, -0.25);
        break;
    }
  }, { capture: true });

  // Adjust video speed and sync display
  function adjustSpeed(video, step) {
    const overlay = getOverlayContainer(video);
    if (!overlay) return;
    const currentSpeed = video.playbackRate;
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
    let currentIndex = speeds.indexOf(currentSpeed);
    
    if (currentIndex === -1) {
      let minDiff = Infinity;
      speeds.forEach((s, idx) => {
        const diff = Math.abs(s - currentSpeed);
        if (diff < minDiff) {
          minDiff = diff;
          currentIndex = idx;
        }
      });
    }
    
    let newIndex = currentIndex + (step > 0 ? 1 : -1);
    newIndex = Math.max(0, Math.min(newIndex, speeds.length - 1));
    const newSpeed = speeds[newIndex];
    
    video.playbackRate = newSpeed;
    storage.set({ defaultSpeed: newSpeed });

    const screenSpeedEl = document.querySelector('.ive-screen-speed');
    if (screenSpeedEl) {
      screenSpeedEl.textContent = `SPEED: ${newSpeed.toFixed(2)}x`;
    }

    showHUD(overlay, `${SVGs.speed}<span class="ive-hud-text">速度 ${newSpeed}x</span>`);
  }

  // Dynamic Observation Setup
  function initObserver() {
    document.querySelectorAll('video').forEach(video => {
      initPlayer(video);
    });

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName === 'VIDEO') {
                initPlayer(node);
              } else {
                node.querySelectorAll('video').forEach(v => initPlayer(v));
              }
            }
          });
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    setInterval(() => {
      document.querySelectorAll('video').forEach(v => {
        if (!v.__ive_initialized) {
          initPlayer(v);
        }
      });
    }, 1000);

    // Initialize the Virtual Remote Control
    createRemoteControl();
  }

})();
