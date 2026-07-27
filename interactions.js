// ===== PROFESSIONAL AUDIO & VISUAL INTERACTIONS SYSTEM =====

(function() {
  // 1. Inject Ripple CSS Styles
  const style = document.createElement('style');
  style.textContent = `
    .click-ripple {
      position: fixed;
      width: 10px;
      height: 10px;
      background: rgba(255, 0, 51, 0.45);
      border: 1px solid rgba(255, 0, 51, 0.85);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      animation: click-ripple-anim 0.35s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
      z-index: 999999;
    }

    @keyframes click-ripple-anim {
      0% {
        width: 0px;
        height: 0px;
        opacity: 1;
        box-shadow: 0 0 10px rgba(255, 0, 51, 0.8);
      }
      100% {
        width: 50px;
        height: 50px;
        opacity: 0;
        box-shadow: 0 0 20px rgba(255, 0, 51, 0);
      }
    }

    /* Subtle hover scale for buttons and inputs */
    a, button, .card, .dur-btn, .detail-dur-card, .pay-method-btn, .logout-btn, .hamburger, .app-icon-btn, .sidebar-tab {
      transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease, filter 0.2s ease !important;
    }
    
    a:hover, button:hover, .dur-btn:hover, .detail-dur-card:hover, .pay-method-btn:hover, .logout-btn:hover, .app-icon-btn:hover, .sidebar-tab:hover {
      transform: translateY(-1.5px) scale(1.02);
      filter: brightness(1.1);
    }
    
    a:active, button:active, .dur-btn:active, .detail-dur-card:active, .pay-method-btn:active, .logout-btn:active, .app-icon-btn:active, .sidebar-tab:active {
      transform: translateY(0) scale(0.98);
    }

    /* Premium Custom Alert Box styles */
    .custom-alert-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999999;
      opacity: 0;
      transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1);
      pointer-events: none;
    }
    .custom-alert-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .custom-alert-box {
      background: #111111;
      border: 1px solid rgba(229, 9, 20, 0.25);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(229, 9, 20, 0.12);
      border-radius: 20px;
      width: 92%;
      max-width: 420px;
      padding: 2.2rem 1.8rem;
      box-sizing: border-box;
      transform: scale(0.85) translateY(30px);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-align: center;
    }
    .custom-alert-overlay.active .custom-alert-box {
      transform: scale(1) translateY(0);
    }
    .custom-alert-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.85rem;
      margin-bottom: 1.2rem;
    }
    .custom-alert-icon {
      font-size: 3rem;
      animation: pulseIconAlert 2s infinite alternate;
      line-height: 1;
    }
    .custom-alert-title {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      font-size: 1.15rem;
      letter-spacing: 1.2px;
      color: #ffffff;
      text-transform: uppercase;
    }
    .custom-alert-body {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 0.95rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 2rem;
      word-break: break-word;
    }
    .custom-alert-btn {
      background: linear-gradient(135deg, #E50914 0%, #B20710 100%);
      border: none;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 0.92rem;
      padding: 0.75rem 3.5rem;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(229, 9, 20, 0.35);
      transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease;
      letter-spacing: 0.5px;
    }
    .custom-alert-btn:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 25px rgba(229, 9, 20, 0.6);
    }
    .custom-alert-btn:active {
      transform: translateY(0) scale(0.96);
    }
    @keyframes pulseIconAlert {
      0% { transform: scale(1); }
      100% { transform: scale(1.08); }
    }
  `;
  document.head.appendChild(style);

  // 2. Synthesized Web Audio API Sound Generation
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Cyber Tick Click Sound (1200Hz -> 600Hz decaying in 35ms)
  function playClickSound() {
    try {
      initAudio();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.035);
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime); // Faint/premium click
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.035);
    } catch (e) {
      // Browsers restrict audio context before user gestures
    }
  }

  // Faint Hover tick (2200Hz decaying in 10ms)
  function playHoverSound() {
    try {
      initAudio();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.004, audioCtx.currentTime); // Faint beep
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.012);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.012);
    } catch (e) {}
  }

  // 3. Visual Cursor Click Ripple
  function createVisualClick(e) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 350);
  }

  // 4. Global Event Handlers
  document.addEventListener('click', function(e) {
    // Generate visual ripple for all clicks
    createVisualClick(e);

    // Play click sound if the click target is interactive
    const target = e.target;
    const isInteractive = target.closest('a') || 
                          target.closest('button') || 
                          target.closest('input[type="submit"]') ||
                          target.closest('input[type="button"]') ||
                          target.closest('input[type="checkbox"]') ||
                          target.closest('input[type="radio"]') ||
                          target.closest('.dur-btn') ||
                          target.closest('.detail-dur-card') ||
                          target.closest('.app-icon-btn') ||
                          target.closest('.sidebar-tab') ||
                          target.closest('.card-hover-overlay') ||
                          target.closest('.pay-method-btn');

    if (isInteractive) {
      playClickSound();
    }
  }, { passive: true });

  // Hover sound triggering for interactive targets
  document.addEventListener('mouseover', function(e) {
    const target = e.target;
    if (!target) return;
    
    const isInteractive = target.tagName === 'A' || 
                          target.tagName === 'BUTTON' || 
                          target.classList.contains('dur-btn') || 
                          target.classList.contains('detail-dur-card') ||
                          target.classList.contains('app-icon-btn') ||
                          target.classList.contains('sidebar-tab') ||
                          target.classList.contains('pay-method-btn');
                          
    if (isInteractive) {
      playHoverSound();
    }
  }, { passive: true });

  // 5. Override window.alert globally with a premium custom alert modal
  window.alert = function(message) {
    let overlay = document.getElementById('custom-alert-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'custom-alert-overlay';
      overlay.className = 'custom-alert-overlay';
      overlay.innerHTML = `
        <div class="custom-alert-box">
          <div class="custom-alert-header">
            <span class="custom-alert-icon" id="custom-alert-icon-el">⚡</span>
            <span class="custom-alert-title" id="custom-alert-title-el">SYSTEM NOTICE</span>
          </div>
          <div class="custom-alert-body" id="custom-alert-body-el"></div>
          <div class="custom-alert-footer">
            <button class="custom-alert-btn" id="custom-alert-close-btn">OK</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      const closeBtn = document.getElementById('custom-alert-close-btn');
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    }

    const iconEl = document.getElementById('custom-alert-icon-el');
    const titleEl = document.getElementById('custom-alert-title-el');
    const bodyEl = document.getElementById('custom-alert-body-el');

    let displayMsg = message || '';
    let icon = '⚡';
    let title = 'SYSTEM NOTICE';
    let iconColor = 'rgba(229, 9, 20, 0.5)'; // red

    // Check for success markers
    if (displayMsg.includes('✅') || displayMsg.toLowerCase().includes('success') || displayMsg.toLowerCase().includes('welcome') || displayMsg.toLowerCase().includes('approved')) {
      icon = '✔️';
      title = 'SUCCESS';
      iconColor = 'rgba(52, 211, 153, 0.5)'; // green
      displayMsg = displayMsg.replace('✅', '').trim();
    }
    // Check for error markers
    else if (displayMsg.includes('❌') || displayMsg.toLowerCase().includes('out of stock') || displayMsg.toLowerCase().includes('error') || displayMsg.toLowerCase().includes('failed') || displayMsg.toLowerCase().includes('invalid')) {
      icon = '🛑';
      title = 'ACTION REQUIRED';
      iconColor = 'rgba(239, 68, 68, 0.5)'; // red/warning
      displayMsg = displayMsg.replace('❌', '').trim();
    }
    // Check for warning markers
    else if (displayMsg.includes('⚠️') || displayMsg.toLowerCase().includes('warning') || displayMsg.toLowerCase().includes('caution')) {
      icon = '⚠️';
      title = 'WARNING';
      iconColor = 'rgba(245, 158, 11, 0.5)'; // amber
      displayMsg = displayMsg.replace('⚠️', '').trim();
    }

    iconEl.innerText = icon;
    iconEl.style.filter = `drop-shadow(0 0 10px ${iconColor})`;
    titleEl.innerText = title;
    bodyEl.innerHTML = displayMsg.replace(/\n/g, '<br>');

    // Play tick trigger audio
    playClickSound();

    // Show overlay
    setTimeout(() => {
      overlay.classList.add('active');
    }, 50);
  };

})();
