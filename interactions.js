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

})();
