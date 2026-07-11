// ===== HYPER M SHOP - YOUTUBE BACKGROUND ENGINE (MOBILE OPTIMIZED) =====
// Gaming gameplay video used as blurred background - Disabled on mobile for 100% lag-free performance
var player;
var isMobile = (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));

if (!isMobile) {
  // 1. Load YouTube IFrame API asynchronously only on Desktop
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
} else {
  // Mobile performance safeguard: remove player DOM container completely
  document.addEventListener('DOMContentLoaded', function() {
    var bgContainer = document.querySelector('.video-bg-container');
    if (bgContainer) {
      bgContainer.style.display = 'none';
      bgContainer.innerHTML = '';
    }
  });
}

// 2. Create player after API loads (Desktop only)
function onYouTubeIframeAPIReady() {
  if (isMobile) return;
  player = new YT.Player('yt-player', {
    videoId: 'H9RnlKjjg88',   // User requested background video
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'showinfo': 0,
      'rel': 0,
      'loop': 1,
      'playlist': 'H9RnlKjjg88',
      'mute': 1,
      'playsinline': 1,
      'iv_load_policy': 3,
      'disablekb': 1,
      'fs': 0,
      'modestbranding': 1,
      'start': 5,
      'wmode': 'opaque'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  if (isMobile) return;
  event.target.mute();
  event.target.playVideo();
  
  if (typeof event.target.setPlaybackQuality === 'function') {
    event.target.setPlaybackQuality('hd1080');
  }
}

function onPlayerStateChange(event) {
  if (isMobile) return;
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo();
  }
  if (event.data === YT.PlayerState.PAUSED) {
    player.playVideo();
  }
}
