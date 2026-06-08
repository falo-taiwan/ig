// ==UserScript==
// @name         Instagram Video Enhancer (Progress Bar, Speed & Hotkeys)
// @namespace    https://github.com/force/ig-video-enhancer
// @version      1.0.0
// @description  Adds a beautiful gradient progress bar, custom playback speed controls, volume slider, and keyboard hotkeys (arrows, Space, M) to Instagram Reels and Stories.
// @author       Antigravity (force.chinese)
// @match        https://*.instagram.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 1. Premium Styles Injection
    const css = `
        /* Main progress bar container at the very bottom */
        .ive-progress-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 16px;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: flex-end;
            background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
            transition: height 0.2s ease, background 0.2s ease;
        }

        .ive-progress-container:hover {
            height: 20px;
            background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
        }

        /* Progress track */
        .ive-progress-track {
            position: relative;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            transition: height 0.2s ease;
        }

        .ive-progress-container:hover .ive-progress-track,
        .ive-progress-container.dragging .ive-progress-track {
            height: 8px;
        }

        /* Progress fill with Instagram theme gradient */
        .ive-progress-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #f99f1b 0%, #e1306c 50%, #833ab4 100%);
            position: relative;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            box-shadow: 0 0 8px rgba(225, 48, 108, 0.8);
        }

        /* Seek handle/knob */
        .ive-progress-handle {
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%) scale(0);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            transition: transform 0.1s ease;
            pointer-events: none;
        }

        .ive-progress-container:hover .ive-progress-handle,
        .ive-progress-container.dragging .ive-progress-handle {
            transform: translateY(-50%) scale(1);
        }

        /* Time Tooltip */
        .ive-time-tooltip {
            position: absolute;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%) scale(0.8);
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #fff;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            pointer-events: none;
            opacity: 0;
            transition: transform 0.15s ease, opacity 0.15s ease;
            z-index: 10001;
            white-space: nowrap;
        }

        .ive-progress-container:hover .ive-time-tooltip,
        .ive-progress-container.dragging .ive-time-tooltip {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }

        /* Playback Speed selector (floating pill) */
        .ive-speed-pill {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            cursor: pointer;
            z-index: 10000;
            user-select: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            opacity: 0; /* Hidden by default, fades in on parent container hover */
        }

        /* Fade speed pill in when video container is hovered */
        *:hover > .ive-speed-pill,
        .ive-speed-pill.active {
            opacity: 1;
        }

        .ive-speed-pill:hover {
            background: rgba(0, 0, 0, 0.75);
            border-color: rgba(255, 255, 255, 0.4);
            transform: scale(1.05);
        }

        /* Speed dropdown menu */
        .ive-speed-menu {
            position: absolute;
            top: 45px;
            right: 15px;
            background: rgba(18, 18, 18, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 6px 0;
            display: flex;
            flex-direction: column;
            width: 70px;
            z-index: 10001;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            transform: translateY(-10px);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .ive-speed-menu.show {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        .ive-speed-item {
            padding: 6px 12px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .ive-speed-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }

        .ive-speed-item.selected {
            color: #e1306c;
            font-weight: 700;
        }

        /* HUD style for on-screen notification display */
        .ive-hud {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            padding: 16px 24px;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            pointer-events: none;
            opacity: 0;
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease;
            z-index: 10005;
        }

        .ive-hud.show {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }

        .ive-hud-icon {
            width: 32px;
            height: 32px;
            fill: #fff;
        }

        .ive-hud-text {
            font-size: 14px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
        }

        /* Volume Bar container attached to the original IG volume button */
        .ive-volume-container {
            position: absolute;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 80px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            padding: 8px 0;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            z-index: 10000;
        }

        /* Show volume slider when hovering original button parent */
        *:has(> [aria-label^="Audio is "]):hover .ive-volume-container,
        .ive-volume-container:hover {
            opacity: 1;
            pointer-events: auto;
        }

        .ive-volume-slider-track {
            position: relative;
            width: 4px;
            height: 64px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            cursor: pointer;
        }

        .ive-volume-slider-fill {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // 2. State & Settings
    const State = {
        volume: parseFloat(localStorage.getItem('ive_volume') || '0.8'),
        playbackSpeed: parseFloat(localStorage.getItem('ive_speed') || '1.0'),
        muted: localStorage.getItem('ive_muted') === 'true'
    };

    // Helper: format time (e.g. 74 -> 1:14)
    function formatTime(sec) {
        if (isNaN(sec) || !isFinite(sec)) return '0:00';
        sec = Math.floor(sec);
        const mins = Math.floor(sec / 60);
        const secs = sec % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Helper: Find target video overlay container
    function getOverlayContainer(video) {
        const parent = video.parentElement;
        if (!parent) return null;
        // Instagram uses [data-instancekey] on overlay wrappers for Reels/Stories
        const instanceKey = parent.querySelector('[data-instancekey]');
        if (instanceKey) return instanceKey;

        const closestInstance = video.closest('*:has(> [data-instancekey])');
        if (closestInstance) {
            return closestInstance.querySelector('[data-instancekey]');
        }
        return parent;
    }

    // SVG Icons
    const SVGs = {
        volume: `<svg class="ive-hud-icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
        mute: `<svg class="ive-hud-icon" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
        speed: `<svg class="ive-hud-icon" viewBox="0 0 24 24"><path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 12 6a7.92 7.92 0 0 1 4.9 1.69l1.26-1.26A9.92 9.92 0 0 0 12 4a10 10 0 1 0 10 10c0-2.02-.6-3.9-1.62-5.43zM10 10h4v4h-4z"/></svg>`,
        play: `<svg class="ive-hud-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
        pause: `<svg class="ive-hud-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
    };

    // On-screen notification HUD display
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

    // Update video volume & sync local storage
    function setVideoVolume(video, vol, isMuted) {
        State.volume = Math.max(0, Math.min(vol, 1));
        State.muted = !!isMuted;
        
        localStorage.setItem('ive_volume', State.volume);
        localStorage.setItem('ive_muted', State.muted);

        video.volume = State.volume;
        video.muted = State.muted;

        // Sync visual volume slider if it exists in the tree
        const overlay = getOverlayContainer(video);
        if (overlay) {
            const fill = overlay.querySelector('.ive-volume-slider-fill');
            if (fill) {
                fill.style.height = `${(State.muted ? 0 : State.volume) * 100}%`;
            }
        }
    }

    // Injects Controls Overlay into a Video Container
    function initPlayer(video) {
        if (video.__ive_initialized) return;
        video.__ive_initialized = true;

        const overlay = getOverlayContainer(video);
        if (!overlay) return;

        // Clean previous injections if any
        overlay.querySelectorAll('.ive-progress-container, .ive-speed-pill, .ive-speed-menu, .ive-volume-container').forEach(el => el.remove());

        // Apply global states to this newly loaded video
        video.volume = State.volume;
        video.muted = State.muted;
        video.playbackRate = State.playbackSpeed;

        // 1. Inject Progress Timeline Bar
        const progContainer = document.createElement('div');
        progContainer.className = 'ive-progress-container';
        
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

        // Progress bar interaction logic
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

        // Hover seeking tooltip
        progContainer.addEventListener('pointermove', (e) => {
            if (isDragging) return;
            const rect = track.getBoundingClientRect();
            const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
            const hoverTime = pos * video.duration;
            tooltip.textContent = `${formatTime(hoverTime)} / ${formatTime(video.duration)}`;
            tooltip.style.left = `${(e.clientX - rect.left)}px`;
        });

        // Sync progress bar timeline with playing video
        video.addEventListener('timeupdate', () => {
            if (isDragging) return;
            const duration = video.duration || 0;
            const current = video.currentTime || 0;
            const percent = duration > 0 ? (current / duration) * 100 : 0;
            fill.style.width = `${percent}%`;
        });

        // 2. Inject Playback Speed Controls
        const speedPill = document.createElement('div');
        speedPill.className = 'ive-speed-pill';
        speedPill.textContent = `${State.playbackSpeed}x`;

        const speedMenu = document.createElement('div');
        speedMenu.className = 'ive-speed-menu';

        const speeds = [0.5, 1.0, 1.25, 1.5, 2.0];
        speeds.forEach(speed => {
            const item = document.createElement('div');
            item.className = 'ive-speed-item';
            if (speed === State.playbackSpeed) item.classList.add('selected');
            item.textContent = `${speed}x`;
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                video.playbackRate = speed;
                State.playbackSpeed = speed;
                localStorage.setItem('ive_speed', speed);
                speedPill.textContent = `${speed}x`;
                
                speedMenu.querySelectorAll('.ive-speed-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                
                speedMenu.classList.remove('show');
                speedPill.classList.remove('active');

                showHUD(overlay, `${SVGs.speed}<span class="ive-hud-text">速度 ${speed}x</span>`);
            });
            speedMenu.appendChild(item);
        });

        speedPill.addEventListener('click', (e) => {
            e.stopPropagation();
            const isShown = speedMenu.classList.contains('show');
            document.querySelectorAll('.ive-speed-menu').forEach(m => m.classList.remove('show'));
            document.querySelectorAll('.ive-speed-pill').forEach(p => p.classList.remove('active'));
            
            if (!isShown) {
                speedMenu.classList.add('show');
                speedPill.classList.add('active');
            }
        });

        // Close dropdown when clicking elsewhere
        document.addEventListener('click', () => {
            speedMenu.classList.remove('show');
            speedPill.classList.remove('active');
        });

        overlay.appendChild(speedPill);
        overlay.appendChild(speedMenu);

        // 3. Inject hover volume bar into the native mute button (if native button exists)
        // Instagram audio control container: typically has aria-label="Audio is..."
        setTimeout(() => {
            const nativeMuteBtn = overlay.closest('div.x78zum5')?.querySelector('[aria-label^="Audio is "]');
            if (nativeMuteBtn && nativeMuteBtn.parentElement) {
                const parentBtn = nativeMuteBtn.parentElement;
                
                // Ensure no double injection
                if (!parentBtn.querySelector('.ive-volume-container')) {
                    parentBtn.style.position = 'relative'; // Ensure vertical container alignment
                    
                    const volContainer = document.createElement('div');
                    volContainer.className = 'ive-volume-container';
                    
                    const volTrack = document.createElement('div');
                    volTrack.className = 'ive-volume-slider-track';
                    
                    const volFill = document.createElement('div');
                    volFill.className = 'ive-volume-slider-fill';
                    volFill.style.height = `${(State.muted ? 0 : State.volume) * 100}%`;
                    
                    volTrack.appendChild(volFill);
                    volContainer.appendChild(volTrack);
                    parentBtn.appendChild(volContainer);

                    // Volume slider dragging logic
                    let isVolDragging = false;
                    
                    function updateVolumeDrag(e) {
                        const rect = volTrack.getBoundingClientRect();
                        // vertical slider: 1 is bottom, 0 is top
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
        }, 1000);
    }

    // 3. Keyboard Shortcuts Listener
    window.addEventListener('keydown', (e) => {
        // Bypass when editing input fields
        const activeEl = document.activeElement;
        if (activeEl && (
            activeEl.tagName === 'INPUT' || 
            activeEl.tagName === 'TEXTAREA' || 
            activeEl.isContentEditable
        )) {
            return;
        }

        // Find active video in viewport
        let activeVideo = null;
        const videos = document.querySelectorAll('video');
        for (const video of videos) {
            const rect = video.getBoundingClientRect();
            // Checking if video is visible inside the viewport
            if (rect.top >= -100 && rect.bottom <= window.innerHeight + 100) {
                activeVideo = video;
                break;
            }
        }

        if (!activeVideo) return;
        const overlay = getOverlayContainer(activeVideo);
        if (!overlay) return;

        switch (e.key) {
            case ' ': // Space: play/pause
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

            case 'ArrowUp': // Up Arrow: increase volume
                e.preventDefault();
                const newVolUp = Math.min(1.0, State.volume + 0.05);
                setVideoVolume(activeVideo, newVolUp, false);
                showHUD(overlay, `${SVGs.volume}<span class="ive-hud-text">音量 ${Math.round(newVolUp * 100)}%</span>`);
                break;

            case 'ArrowDown': // Down Arrow: decrease volume
                e.preventDefault();
                const newVolDown = Math.max(0.0, State.volume - 0.05);
                setVideoVolume(activeVideo, newVolDown, newVolDown === 0);
                showHUD(overlay, `${SVGs.volume}<span class="ive-hud-text">音量 ${Math.round(newVolDown * 100)}%</span>`);
                break;

            case 'm':
            case 'M': // M: toggle mute
                e.preventDefault();
                const newMute = !activeVideo.muted;
                setVideoVolume(activeVideo, State.volume, newMute);
                if (newMute) {
                    showHUD(overlay, `${SVGs.mute}<span class="ive-hud-text">靜音</span>`);
                } else {
                    showHUD(overlay, `${SVGs.volume}<span class="ive-hud-text">音量 ${Math.round(State.volume * 100)}%</span>`);
                }
                break;

            case '>':
            case '.': // >: Speed up
                e.preventDefault();
                adjustSpeed(activeVideo, 0.25);
                break;

            case '<':
            case ',': // <: Slow down
                e.preventDefault();
                adjustSpeed(activeVideo, -0.25);
                break;
        }
    }, { capture: true });

    // Adjust video speed and show HUD
    function adjustSpeed(video, step) {
        const overlay = getOverlayContainer(video);
        if (!overlay) return;
        const currentSpeed = video.playbackRate;
        const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
        let currentIndex = speeds.indexOf(currentSpeed);
        
        if (currentIndex === -1) {
            // Find closest speed
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
        State.playbackSpeed = newSpeed;
        localStorage.setItem('ive_speed', newSpeed);

        const pill = overlay.querySelector('.ive-speed-pill');
        if (pill) pill.textContent = `${newSpeed}x`;

        const menu = overlay.querySelector('.ive-speed-menu');
        if (menu) {
            menu.querySelectorAll('.ive-speed-item').forEach(item => {
                if (parseFloat(item.textContent) === newSpeed) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
        }

        showHUD(overlay, `${SVGs.speed}<span class="ive-hud-text">速度 ${newSpeed}x</span>`);
    }

    // 4. Dynamic Observation
    function initObserver() {
        // Clean and run initialization
        document.querySelectorAll('video').forEach(video => {
            initPlayer(video);
        });

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                // If elements were added, look for video tags
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
        
        // Polling safeguard to catch dynamically swapped videos without DOM insert
        setInterval(() => {
            document.querySelectorAll('video').forEach(v => {
                if (!v.__ive_initialized) {
                    initPlayer(v);
                }
            });
        }, 1000);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initObserver);
    } else {
        initObserver();
    }

})();
