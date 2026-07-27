// ===== PREMIUM BACKGROUND VIDEO CONTROLLER FOR SINGLE VIDEO =====
document.addEventListener('DOMContentLoaded', () => {
  const v = document.getElementById('neural-bg-video');
  const playToggleBtn = document.getElementById('video-toggle-play');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  
  if (!v) return;

  let isVideoPlaying = true;
  v.volume = 0;
  v.muted = true;

  // Autoplay handler with robust mobile fallback
  const startAutoplay = () => {
    v.play()
      .then(() => {
        isVideoPlaying = true;
        if (iconPlay && iconPause) {
          iconPlay.style.display = 'none';
          iconPause.style.display = 'block';
        }
      })
      .catch(err => {
        console.warn("Autoplay blocked by mobile browser:", err);
        isVideoPlaying = false;
        if (iconPlay && iconPause) {
          iconPlay.style.display = 'block';
          iconPause.style.display = 'none';
        }

        const forcePlayOnInteraction = () => {
          if (!isVideoPlaying) {
            v.play()
              .then(() => {
                isVideoPlaying = true;
                if (iconPlay && iconPause) {
                  iconPlay.style.display = 'none';
                  iconPause.style.display = 'block';
                }
              })
              .catch(() => {});
          }
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

  // Play / Pause toggle handler
  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', () => {
      if (isVideoPlaying) {
        v.pause();
        isVideoPlaying = false;
        if (iconPlay && iconPause) {
          iconPlay.style.display = 'block';
          iconPause.style.display = 'none';
        }
      } else {
        v.play().then(() => {
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
      v.pause();
    } else {
      if (isVideoPlaying && v.readyState >= 2) {
        v.play().catch(() => {});
      }
    }
  });
});
