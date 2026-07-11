// ===== SEAMLESS GAPLESS DUAL-VIDEO CROSSFADE ENGINE WITH CONTROLS =====
document.addEventListener('DOMContentLoaded', () => {
  const v1 = document.getElementById('bg-video-1');
  const v2 = document.getElementById('bg-video-2');
  const playToggleBtn = document.getElementById('video-toggle-play');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  
  if (!v1 || !v2) return;

  let activeVideo = v1;
  let inactiveVideo = v2;
  let isVideoPlaying = true;

  // Initialize both video elements (Default: Muted 0% volume)
  v1.volume = 0;
  v2.volume = 0;
  v1.muted = true;
  v2.muted = true;

  // Autoplay handler with robust mobile fallback
  const startAutoplay = () => {
    activeVideo.play()
      .then(() => {
        isVideoPlaying = true;
        if (iconPlay && iconPause) {
          iconPlay.style.display = 'none';
          iconPause.style.display = 'block';
        }
      })
      .catch(err => {
        console.warn("Autoplay blocked by mobile browser:", err);
        // Autoplay prevented (e.g. power saving mode / interaction rule)
        isVideoPlaying = false;
        if (iconPlay && iconPause) {
          iconPlay.style.display = 'block';
          iconPause.style.display = 'none';
        }

        // Add one-time click/touch gesture listeners to force playback on user interaction
        const forcePlayOnInteraction = () => {
          if (!isVideoPlaying) {
            activeVideo.play()
              .then(() => {
                isVideoPlaying = true;
                if (iconPlay && iconPause) {
                  iconPlay.style.display = 'none';
                  iconPause.style.display = 'block';
                }
              })
              .catch(() => {});
          }
          // Remove listeners immediately
          document.removeEventListener('touchstart', forcePlayOnInteraction);
          document.removeEventListener('click', forcePlayOnInteraction);
          document.removeEventListener('scroll', forcePlayOnInteraction);
        };

        document.addEventListener('touchstart', forcePlayOnInteraction, { passive: true });
        document.addEventListener('click', forcePlayOnInteraction, { passive: true });
        document.addEventListener('scroll', forcePlayOnInteraction, { passive: true });
      });
  };

  startAutoplay();

  // Zero-latency crossfade loop using requestAnimationFrame
  function checkCrossfade() {
    if (activeVideo.duration > 0) {
      const timeLeft = activeVideo.duration - activeVideo.currentTime;
      
      // When there is less than 0.45 seconds remaining:
      if (timeLeft <= 0.45 && !inactiveVideo.isTransitioning) {
        inactiveVideo.isTransitioning = true;
        inactiveVideo.currentTime = 0;

        // Keep volume/muted status synchronized across transitions
        inactiveVideo.volume = activeVideo.volume;
        inactiveVideo.muted = activeVideo.muted;

        // Play the background video first so it is fully decoded and drawing frames
        inactiveVideo.play().then(() => {
          // Swap styling classes to trigger CSS opacity crossfade
          activeVideo.classList.remove('active');
          inactiveVideo.classList.add('active');

          const fadingOutVideo = activeVideo;
          const fadingInVideo = inactiveVideo;

          // Wait for CSS transition (0.35s) to complete, then pause and reset the old video
          setTimeout(() => {
            fadingOutVideo.pause();
            fadingOutVideo.currentTime = 0;
            fadingInVideo.isTransitioning = false;
          }, 380);

          // Swap references
          activeVideo = fadingInVideo;
          inactiveVideo = fadingOutVideo;
        }).catch(err => {
          console.warn("Transition play failed:", err);
          inactiveVideo.isTransitioning = false;
        });
      }
    }
    requestAnimationFrame(checkCrossfade);
  }

  // Start checking loop frames
  requestAnimationFrame(checkCrossfade);

  // Play / Pause toggle handler
  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', () => {
      if (isVideoPlaying) {
        activeVideo.pause();
        isVideoPlaying = false;
        if (iconPlay && iconPause) {
          iconPlay.style.display = 'block';
          iconPause.style.display = 'none';
        }
      } else {
        activeVideo.play().then(() => {
          isVideoPlaying = true;
          if (iconPlay && iconPause) {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
          }
        }).catch(() => {});
      }
    });
  }

  // Tab Visibility optimization to save system resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      v1.pause();
      v2.pause();
    } else {
      if (isVideoPlaying && activeVideo.readyState >= 2) {
        activeVideo.play().catch(() => {});
      }
    }
  });
});
