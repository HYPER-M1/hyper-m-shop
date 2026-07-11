// ===== DEFAULT DATA =====
const defaultProducts = {
  android: [
    { name: "HYPER X PHONE", price: 140, stock: "DIGITAL LICENSE", features: "Auto Eliminate Football Hit • Silent Aim • Headshot Hack • Aimbot Legit • Aim Fov 360° • Aim", emoji: "📱", gradient: "linear-gradient(135deg,#ff0033,#660000)", badge: "digital", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "DRIP CLIENT MOD MENU", price: 80, stock: "180 IN STOCK", features: "Function: Silent Aimbot • Aimbot Rage • Legit • Aim Magnet • Speed Timer • Teleport 8M • Up Players • Fly Car", emoji: "🟣", gradient: "linear-gradient(135deg,#6a0dad,#1a0033)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "DRIP CLIENT PROXY", price: 80, stock: "88 IN STOCK", features: "Function: Aimbot Head • Aimbot Neck • Aimbot Body • Aim Visible • Aimfox 180 • Fast Speed Mode • High Jump", emoji: "💚", gradient: "linear-gradient(135deg,#006400,#001a00)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "HG CHEAT MOD MENU / INJECTOR", price: 90, stock: "145 IN STOCK", features: "Function: Aim Silent • Auto Headshot • Aimbot Full • Aim Visible • Aimfov 180 • Fast Speed Mode • Esp Line", emoji: "🔴", gradient: "linear-gradient(135deg,#cc0000,#330000)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "PRIME MOD MENU", price: 80, stock: "26 IN STOCK", features: "Function: Aim Silent • Auto Headshot • Aimbot Full • Aim Visible • Aimfox 180 • Fast Speed Mode • Esp Lite", emoji: "🔵", gradient: "linear-gradient(135deg,#0044cc,#000033)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "BR MOD INJECTOR", price: 80, stock: "356 IN STOCK", features: "Function: Silent Aimbot • Auto Headshot • Magnet Player • Fast Speed Up Player • TeleAll • Ghost Mode • Esp", emoji: "🌊", gradient: "linear-gradient(135deg,#00aacc,#001a33)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "OMEGA HACK SUITE", price: 120, stock: "44 IN STOCK", features: "Function: Wall Hack • Speed Hack • No Recoil • Auto Aim • Radar Hack • Anti-Ban Shield • Fly Mode", emoji: "⚡", gradient: "linear-gradient(135deg,#ff6600,#330011)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "SHADOW MOD PRO", price: 95, stock: "DIGITAL LICENSE", features: "Auto-Aim Precision • Ghost Mode • Instant Kill • Speed Boost • No Recoil • ESP Full • Anti-Detection", emoji: "🌑", gradient: "linear-gradient(135deg,#111111,#440033)", badge: "digital", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" }
  ],
  pc: [
    { name: "HYPER X PC HACK", price: 250, stock: "15 IN STOCK", features: "Undetected Aimbot • Wall ESP • Radar • No Recoil • Trigger Bot • Bone Aimbot • Smooth Aim", emoji: "💻", gradient: "linear-gradient(135deg,#ff0033,#1a0000)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "HYPER X PC INJECTOR", price: 180, stock: "32 IN STOCK", features: "DLL Injector • Anti-Cheat Bypass • Auto-Inject • Multiple Game Support • Secure Shell • Log Cleaner", emoji: "👻", gradient: "linear-gradient(135deg,#555588,#111133)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "HYPER X PC PANEL", price: 300, stock: "DIGITAL LICENSE", features: "Premium Aimbot • Full ESP • Item ESP • Player Tracker • Speed Hack • Super Jump • Anti-Ban Pro", emoji: "🔮", gradient: "linear-gradient(135deg,#6600cc,#110022)", badge: "digital", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "HYPER X MOD MENU PC", price: 220, stock: "8 IN STOCK", features: "Auto Headshot • Wallhack Full • Aimbot 360 • Esp Full • Speed Mode • Fly Car • Anti-Detection AI", emoji: "⚙️", gradient: "linear-gradient(135deg,#cc6600,#331100)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" }
  ],
  ff: [
    { name: "DIAMOND ELITE ID", price: 499, stock: "3 IN STOCK", features: "Level 80 • 50,000+ Diamonds • All Elite Bundles • Rare Skins • Ranked Heroic • Clean History", emoji: "💎", gradient: "linear-gradient(135deg,#00ccff,#001133)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "GRANDMASTER ACCOUNT", price: 799, stock: "2 IN STOCK", features: "Grandmaster Rank • Exclusive Emotes • All Weapons Max • Pet Collection • Custom Lobby • Full Access", emoji: "👑", gradient: "linear-gradient(135deg,#ffcc00,#332200)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "STARTER PRO ID", price: 199, stock: "12 IN STOCK", features: "Level 50 • 5000 Diamonds • Premium Bundles • All Vehicles • Clean Account • Instant Delivery", emoji: "🎮", gradient: "linear-gradient(135deg,#ff6600,#220011)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "LEGEND VIP ACCOUNT", price: 1299, stock: "1 IN STOCK", features: "Top 100 Global • All Bundles • 100K+ Diamonds • Exclusive Collab Skins • Full Support • Lifetime Warranty", emoji: "🏆", gradient: "linear-gradient(135deg,#ff0066,#330011)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" }
  ],
  mystery: [
    { name: "MYSTERY BOX – SILVER", price: 99, stock: "UNLIMITED", features: "Random Android Panel • Random PC Tool • Bonus Surprise Item • Min Value ₹150 Guaranteed", emoji: "📦", gradient: "linear-gradient(135deg,#888888,#222222)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "MYSTERY BOX – GOLD", price: 199, stock: "UNLIMITED", features: "Premium Android Panel • PC Panel Item • Free Fire Diamonds • Bonus Hack Tool • Min Value ₹350", emoji: "🎁", gradient: "linear-gradient(135deg,#ffcc00,#332200)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "MYSTERY BOX – DIAMOND", price: 399, stock: "UNLIMITED", features: "Top-Tier Panel • Free Fire ID + Diamonds • PC Panel Full • Exclusive Tool • Min Value ₹800", emoji: "💠", gradient: "linear-gradient(135deg,#00ccff,#003366)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" }
  ],
  ios: [
    { name: "IOS MOD PANEL BASIC", price: 90, stock: "60 IN STOCK", features: "Aimbot • Auto Headshot • Esp Wall • Speed Hack • No Recoil • iOS Compatible • No Jailbreak Needed", emoji: "🍎", gradient: "linear-gradient(135deg,#ff9900,#331100)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "IOS SUPREME HACK", price: 140, stock: "25 IN STOCK", features: "Full Aimbot • Silent Shot • ESP Full • Ghost Mode • Speed Mode • Fly Mode • Anti-Ban Guard Pro", emoji: "📲", gradient: "linear-gradient(135deg,#ff0055,#110022)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "IOS INJECTOR PRO", price: 120, stock: "DIGITAL LICENSE", features: "App Injector • No Jailbreak • Anti-Detection • Multiple Games • Auto-Update • 24/7 Support", emoji: "🔐", gradient: "linear-gradient(135deg,#0066ff,#000033)", badge: "digital", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "MEGUIL PRO", price: 160, stock: "20 IN STOCK", features: "Auto Headshot • Silent Aim • Aimbot Full • ESP Wall • Speed Mode • Ghost Mode • Anti-Ban Shield • No Jailbreak", emoji: "🟠", gradient: "linear-gradient(135deg,#ff6600,#1a0500)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" }
  ],
  pcgame: [
    { name: "BGMI PC PANEL", price: 200, stock: "18 IN STOCK", features: "Aimbot Full • Wall ESP • Item ESP • Radar Hack • Speed Boost • No Recoil • Trigger Bot • Anti-Ban", emoji: "🎯", gradient: "linear-gradient(135deg,#ff6600,#220011)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "FREE FIRE PC PANEL", price: 175, stock: "30 IN STOCK", features: "Auto Aim • Headshot Hack • Speed Car • Fly Mode • Wall Hack • Ghost Mode • ESP • Anti-Detection", emoji: "🔥", gradient: "linear-gradient(135deg,#ff0033,#1a0000)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "COD MOBILE PC HACK", price: 280, stock: "9 IN STOCK", features: "Aimbot Pro • Silent Aim • Radar • No Recoil • Speed Hack • Unlock All • Anti-Cheat Bypass Pro", emoji: "🪖", gradient: "linear-gradient(135deg,#005500,#001100)", badge: "instock", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" },
    { name: "VALORANT CHEAT PRO", price: 350, stock: "DIGITAL LICENSE", features: "Aimbot Legit • Wallhack Silent • Trigger Bot • No Spread • Bhop • Skin Changer • Anti-Cheat Safe", emoji: "💥", gradient: "linear-gradient(135deg,#ff4466,#110011)", badge: "digital", videoUrl: "https://www.youtube.com/embed/H9RnlKjjg88?autoplay=1" }
  ]
};

// Check if products exist in localStorage, if not save defaults
let products;
try {
  const stored = localStorage.getItem('products');
  if (stored) {
    products = JSON.parse(stored);
  }
} catch (e) {
  console.error("Failed to parse products from localStorage", e);
}

if (!products || typeof products !== 'object' || !products.android) {
  products = defaultProducts;
  localStorage.setItem('products', JSON.stringify(defaultProducts));
}

// Check if paymentSettings exist in localStorage, if not save defaults
const defaultPaymentSettings = {
  upiId: 'hyper-m-shop@ybl',
  cryptoAddress: 'TYuG8Jp99XhsaEw1R4aN5bS3mK9q8wRt4z'
};
if (!localStorage.getItem('paymentSettings')) {
  localStorage.setItem('paymentSettings', JSON.stringify(defaultPaymentSettings));
}

// ===== RENDER CARDS =====
// ===== RENDER CARDS =====
function makeCard(p) {
  const badgeClass = p.badge === 'instock' ? 'instock' : 'digital';
  const badgeText = p.badge === 'instock' ? p.stock : 'DIGITAL LICENSE';
  
  // Extract primary theme color from gradient
  const colorMatch = (p.gradient || '').match(/#(?:[0-9a-fA-F]{3,4}){1,2}/);
  const themeColor = colorMatch ? colorMatch[0] : '#ff0033';
  
  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="card-img-inner" style="display:none; background:${p.gradient || 'linear-gradient(135deg,#ff0033,#1a0000)'}"><span>${p.emoji || '&#9889;'}</span></div>`
    : `<div class="card-img-inner" style="background:${p.gradient || 'linear-gradient(135deg,#ff0033,#1a0000)'}"><span>${p.emoji || '&#9889;'}</span></div>`;
    
  // Use product durations if >= 1, else fall back to defaults
  const durList = (p.durations && p.durations.length >= 1) ? p.durations : ['1 Day', '7 Days', '30 Days', 'Lifetime'];
  const durEncoded = encodeURIComponent(JSON.stringify(durList));
  const pEncoded   = encodeURIComponent(JSON.stringify(p));
  
  return `
    <div class="card" style="border: 1px solid ${themeColor}; box-shadow: 0 0 10px ${themeColor}44;">
      <div class="card-img">
        ${imgContent}
        <div class="package-label">&#128230; PACKAGE</div>
        <div class="stock-badge ${badgeClass}">${badgeText}</div>
        <!-- VIEW DETAILS hover overlay -->
        <div class="card-hover-overlay">
          <button class="view-details-btn" onclick="viewDetails(decodeURIComponent('${pEncoded}'))">VIEW DETAILS</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-features">📄 ${p.features}</div>
        <div class="card-footer">
          <div class="card-price"><span>&#8377;</span>${p.price}.00</div>
          <button class="buy-btn" onclick="buyNow('${p.name}',${p.price},'${durEncoded}')">BUY NOW</button>
        </div>
      </div>
    </div>
  `;
}


function renderGrid(id, items) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = (items || []).map(makeCard).join('');
}

renderGrid('android-grid', products.android);
renderGrid('pc-grid', products.pc);
renderGrid('ff-grid', products.ff);
renderGrid('mystery-grid', products.mystery);
renderGrid('ios-grid', products.ios);
renderGrid('pcgame-grid', products.pcgame);

// ===== SEARCH FILTER =====
function filterStorefrontProducts(query) {
  const q = (query || '').toLowerCase().trim();
  let allProds = {};
  try {
    allProds = JSON.parse(localStorage.getItem('products')) || defaultProducts;
  } catch (e) {
    allProds = defaultProducts;
  }

  const categorySectionIds = {
    android: 'android',
    pc: 'pc',
    ff: 'freefireid',
    mystery: 'mystery',
    ios: 'ios',
    pcgame: 'pcgame'
  };
  
  Object.keys(categorySectionIds).forEach(cat => {
    const grid = document.getElementById(cat + '-grid');
    const sec = document.getElementById(categorySectionIds[cat]);
    if (!grid) return;
    const items = allProds[cat] || [];
    
    let filtered = items;
    if (q) {
      filtered = items.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.features || '').toLowerCase().includes(q)
      );
    }
    
    renderGrid(cat + '-grid', filtered);
    
    if (sec) {
      if (filtered.length === 0) {
        sec.style.display = 'none';
      } else {
        sec.style.display = 'block';
      }
    }
  });
}

// ===== VIEW DETAILS MODAL =====
let detailProduct = null;
let detailSelectedDuration = null;
let detailSelectedQty = 1;

function viewDetails(pJson) {
  try {
    detailProduct = JSON.parse(pJson);
  } catch(e) { return; }
  const p = detailProduct;
  const durList = (p.durations && p.durations.length >= 1) ? p.durations : ['1 Day', '7 Days', '30 Days', 'Lifetime'];
  
  // Parse durations name and price
  const parsedDurations = durList.map((item, i) => {
    if (item.includes('=')) {
      const parts = item.split('=');
      const name = parts[0].trim();
      const price = parseFloat(parts[1].trim()) || 0;
      return { raw: item, name, price };
    } else if (item.includes(':')) {
      const parts = item.split(':');
      const name = parts[0].trim();
      const price = parseFloat(parts[1].trim()) || 0;
      return { raw: item, name, price };
    } else {
      const name = item.trim();
      const price = p.price + i * Math.round(p.price * 0.45);
      return { raw: item, name, price };
    }
  });

  detailSelectedDuration = parsedDurations[0].raw;
  detailSelectedQty = 1;

  // Set image / gradient
  const imgEl = document.getElementById('detail-img');
  if (imgEl) {
    if (p.image) {
      imgEl.innerHTML = `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" onerror="this.parentElement.style.background='${p.gradient}'; this.remove();"/>`;
      imgEl.style.background = 'transparent';
    } else {
      imgEl.innerHTML = `<span style="font-size:4rem;">${p.emoji || '⚡'}</span>`;
      imgEl.style.background = p.gradient || 'linear-gradient(135deg,#ff0033,#1a0000)';
    }
  }

  // Update thumbnail emoji
  const thumbEmoji = document.getElementById('thumb-emoji');
  if (thumbEmoji) thumbEmoji.textContent = p.emoji || '⚡';

  // Load video source but don't show yet
  const iframe = document.getElementById('detail-iframe');
  if (iframe) {
    iframe.src = (p.videoUrl || "https://www.youtube.com/embed/H9RnlKjjg88") + "?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1";
  }
  switchDetailMedia('image'); // default view is image

  // Load dynamic wallet balance
  const walletBtn = document.querySelector('.detail-wallet-btn');
  if (walletBtn) {
    let balVal = 0;
    const currentUserName = localStorage.getItem('currentUser');
    if (currentUserName) {
      const usersList = JSON.parse(localStorage.getItem('users') || '[]');
      const targetUserObj = usersList.find(u => u.username === currentUserName);
      if (targetUserObj) balVal = targetUserObj.balance || 0;
    }
    walletBtn.innerHTML = `<div>WITH WALLET</div><div style="font-size:0.75rem; color:#f5a623; font-weight:700; margin-top:2px;">₹${balVal.toFixed(0)}</div>`;
  }

  // Badge
  const badgeEl = document.getElementById('detail-badge');
  if (badgeEl) badgeEl.textContent = p.badge === 'instock' ? p.stock : 'DIGITAL LICENSE';

  // Name & base price
  document.getElementById('detail-name').textContent = p.name;
  document.getElementById('detail-base-price').textContent = `₹${parsedDurations[0].price}.00`;

  // Duration tiers
  const tiersEl = document.getElementById('detail-duration-tiers');
  if (tiersEl) {
    tiersEl.innerHTML = parsedDurations.map((d, i) => {
      return `
        <div class="detail-dur-card ${i === 0 ? 'active' : ''}" data-dur="${d.raw}" data-price="${d.price}" onclick="selectDetailDuration(this,'${d.raw}',${d.price})">
          <div class="detail-dur-label">${d.name}</div>
          <div class="detail-dur-tag">&#9900; UNLIMITED</div>
          <div class="detail-dur-price">&#8377;${d.price}</div>
        </div>`;
    }).join('');
  }

  // Features
  const featEl = document.getElementById('detail-features-list');
  if (featEl) {
    const feats = (p.features || '').split('•').map(f => f.trim()).filter(Boolean);
    featEl.innerHTML = feats.map(f => `<li>&#9679; ${f}</li>`).join('');
  }

  // QTY
  document.getElementById('detail-qty').textContent = 1;
  detailSelectedQty = 1;

  // Show/hide owner edit button
  const ownerEditBtn = document.getElementById('detail-owner-edit-btn');
  if (ownerEditBtn) {
    const currentUser = localStorage.getItem('currentUser') || '';
    ownerEditBtn.style.display = (currentUser.toLowerCase() === 'hyperm') ? 'inline-flex' : 'none';
  }

  // Reset quick edit panel
  const qep = document.getElementById('quick-edit-panel');
  if (qep) qep.style.display = 'none';

  openModal('detail-modal');
}

// Media Switcher & Video Control Functions
let detailIframeIsPlaying = true;

function switchDetailMedia(type) {
  const imgWrap = document.getElementById('detail-media-img');
  const videoWrap = document.getElementById('detail-media-video');
  const thumbImg = document.getElementById('thumb-img');
  const thumbVideo = document.getElementById('thumb-video');
  const iframe = document.getElementById('detail-iframe');

  if (type === 'image') {
    if (imgWrap) imgWrap.style.display = 'flex';
    if (videoWrap) videoWrap.style.display = 'none';
    if (thumbImg) {
      thumbImg.style.borderColor = '#f5a623';
      thumbImg.style.boxShadow = '0 0 10px rgba(245, 166, 35, 0.4)';
    }
    if (thumbVideo) {
      thumbVideo.style.borderColor = 'rgba(255,255,255,0.1)';
      thumbVideo.style.boxShadow = 'none';
    }
    // Pause video
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  } else {
    if (imgWrap) imgWrap.style.display = 'none';
    if (videoWrap) videoWrap.style.display = 'block';
    if (thumbImg) {
      thumbImg.style.borderColor = 'rgba(255,255,255,0.1)';
      thumbImg.style.boxShadow = 'none';
    }
    if (thumbVideo) {
      thumbVideo.style.borderColor = '#f5a623';
      thumbVideo.style.boxShadow = '0 0 10px rgba(245, 166, 35, 0.4)';
    }
    // Play video
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }
}

function toggleDetailIframePlay() {
  const playIcon = document.getElementById('vid-play-icon');
  const iframe = document.getElementById('detail-iframe');
  if (!iframe || !iframe.contentWindow) return;

  if (detailIframeIsPlaying) {
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    if (playIcon) playIcon.textContent = '▶';
    detailIframeIsPlaying = false;
  } else {
    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    if (playIcon) playIcon.textContent = '⏸';
    detailIframeIsPlaying = true;
  }
}

function setDetailIframeVolume(vol) {
  const volPct = document.getElementById('vid-vol-pct');
  const iframe = document.getElementById('detail-iframe');
  if (volPct) volPct.textContent = vol + '%';
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(JSON.stringify({
    event: 'command',
    func: 'setVolume',
    args: [parseInt(vol)]
  }), '*');
}

window.switchDetailMedia = switchDetailMedia;
window.toggleDetailIframePlay = toggleDetailIframePlay;
window.setDetailIframeVolume = setDetailIframeVolume;

function toggleQuickEdit() {
  const panel = document.getElementById('quick-edit-panel');
  if (!panel || !detailProduct) return;

  // Security: only owner can use this
  const currentUser = localStorage.getItem('currentUser') || '';
  if (currentUser.toLowerCase() !== 'hyperm') return;

  const p = detailProduct;
  const isHidden = panel.style.display === 'none' || panel.style.display === '';

  if (isHidden) {
    // Populate basic fields
    document.getElementById('qe-name').value = p.name || '';
    document.getElementById('qe-price').value = p.price || '';
    document.getElementById('qe-features').value = p.features || '';
    document.getElementById('qe-video').value = p.videoUrl || '';

    // Build individual duration+price slot inputs
    const durList = (p.durations && p.durations.length >= 1) ? p.durations : ['1 Day', '7 Days', '30 Days', 'Lifetime'];
    const parsedSlots = durList.map((item, i) => {
      if (item.includes('=')) {
        const parts = item.split('=');
        return { name: parts[0].trim(), price: parts[1].trim() };
      } else if (item.includes(':')) {
        const parts = item.split(':');
        return { name: parts[0].trim(), price: parts[1].trim() };
      } else {
        const autoPrice = p.price + i * Math.round(p.price * 0.45);
        return { name: item.trim(), price: String(autoPrice) };
      }
    });

    // Render slot rows
    const slotsContainer = document.getElementById('qe-slot-rows');
    if (slotsContainer) {
      slotsContainer.innerHTML = parsedSlots.map((s, i) => `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; margin-bottom:0.5rem;">
          <div>
            <label style="font-size:0.6rem; color:var(--gray); font-family:var(--font-sub); font-weight:700; display:block; margin-bottom:0.15rem;">SLOT ${i+1} NAME</label>
            <input class="qe-slot-name" data-idx="${i}" type="text" value="${s.name}"
              style="width:100%; background:var(--bg3); border:1px solid var(--border); color:var(--white); padding:0.35rem 0.5rem; border-radius:6px; font-size:0.8rem; font-family:var(--font-sub); outline:none;">
          </div>
          <div>
            <label style="font-size:0.6rem; color:var(--gray); font-family:var(--font-sub); font-weight:700; display:block; margin-bottom:0.15rem;">SLOT ${i+1} PRICE (₹)</label>
            <input class="qe-slot-price" data-idx="${i}" type="number" value="${s.price}"
              style="width:100%; background:var(--bg3); border:1px solid var(--border); color:var(--red); padding:0.35rem 0.5rem; border-radius:6px; font-size:0.8rem; font-family:var(--font-sub); font-weight:700; outline:none;">
          </div>
        </div>`).join('');
    }
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
}

function saveQuickEdit() {
  if (!detailProduct) return;
  const p = detailProduct;

  // Security check: only hyperm can save
  const currentUser = localStorage.getItem('currentUser') || '';
  if (currentUser.toLowerCase() !== 'hyperm') {
    alert('Unauthorized action!');
    return;
  }

  const newName = document.getElementById('qe-name').value.trim();
  const newPrice = parseFloat(document.getElementById('qe-price').value) || p.price;
  const newFeatures = document.getElementById('qe-features').value.trim();
  const newVideoUrl = document.getElementById('qe-video').value.trim();

  // Parse from dynamically rendered slot fields
  const slotNames = document.querySelectorAll('.qe-slot-name');
  const slotPrices = document.querySelectorAll('.qe-slot-price');
  
  let newDurations = [];
  for (let i = 0; i < slotNames.length; i++) {
    const sName = slotNames[i].value.trim();
    const sPrice = parseFloat(slotPrices[i].value) || 0;
    if (sName) {
      newDurations.push(`${sName}=${sPrice}`);
    }
  }

  if (newDurations.length === 0) {
    newDurations = p.durations;
  }

  // Update the product in localStorage
  const products = JSON.parse(localStorage.getItem('products') || '{}');
  let updated = false;
  ['android','pc','ff','mystery','ios','pcgame'].forEach(cat => {
    if (products[cat]) {
      products[cat] = products[cat].map(prod => {
        if (prod.name === p.name && prod.price === p.price) {
          updated = true;
          return { ...prod, name: newName || prod.name, price: newPrice, durations: newDurations, features: newFeatures || prod.features, videoUrl: newVideoUrl };
        }
        return prod;
      });
    }
  });

  if (updated) {
    localStorage.setItem('products', JSON.stringify(products));
    // Update the displayed detail product reference and refresh modal
    detailProduct = { ...p, name: newName || p.name, price: newPrice, durations: newDurations, features: newFeatures || p.features, videoUrl: newVideoUrl };

    // Reload the iframe dynamically with the new URL
    const iframe = document.getElementById('detail-iframe');
    if (iframe) {
      iframe.src = (newVideoUrl || "https://www.youtube.com/embed/H9RnlKjjg88") + "?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1";
    }

    // Refresh the modal display
    document.getElementById('detail-name').textContent = detailProduct.name;
    const qep = document.getElementById('quick-edit-panel');
    if (qep) qep.style.display = 'none';

    // Re-render duration tiers with updated data
    const durList = (detailProduct.durations && detailProduct.durations.length >= 1) ? detailProduct.durations : ['1 Day', '7 Days', '30 Days', 'Lifetime'];
    const parsedDurations = durList.map((item, i) => {
      if (item.includes('=')) {
        const parts = item.split('=');
        return { raw: item, name: parts[0].trim(), price: parseFloat(parts[1].trim()) || 0 };
      } else if (item.includes(':')) {
        const parts = item.split(':');
        return { raw: item, name: parts[0].trim(), price: parseFloat(parts[1].trim()) || 0 };
      } else {
        return { raw: item, name: item.trim(), price: detailProduct.price + i * Math.round(detailProduct.price * 0.45) };
      }
    });

    document.getElementById('detail-base-price').textContent = `₹${parsedDurations[0].price}.00`;

    const tiersEl = document.getElementById('detail-duration-tiers');
    if (tiersEl) {
      tiersEl.innerHTML = parsedDurations.map((d, i) => `
        <div class="detail-dur-card ${i === 0 ? 'active' : ''}" data-dur="${d.raw}" data-price="${d.price}" onclick="selectDetailDuration(this,'${d.raw}',${d.price})">
          <div class="detail-dur-label">${d.name}</div>
          <div class="detail-dur-tag">&#9900; UNLIMITED</div>
          <div class="detail-dur-price">&#8377;${d.price}</div>
        </div>`).join('');
    }

    const featEl = document.getElementById('detail-features-list');
    if (featEl) {
      const feats = (detailProduct.features || '').split('•').map(f => f.trim()).filter(Boolean);
      featEl.innerHTML = feats.map(f => `<li>&#9679; ${f}</li>`).join('');
    }

    // Re-render all grids to reflect changes
    const allProds = JSON.parse(localStorage.getItem('products') || '{}');
    renderGrid('android-grid', allProds.android);
    renderGrid('pc-grid', allProds.pc);
    renderGrid('ff-grid', allProds.ff);
    renderGrid('mystery-grid', allProds.mystery);
    renderGrid('ios-grid', allProds.ios);
    renderGrid('pcgame-grid', allProds.pcgame);

    // Flash success
    const btn = document.querySelector('[onclick="saveQuickEdit()"]');
    if (btn) { const orig = btn.textContent; btn.textContent = '✓ SAVED!'; setTimeout(() => btn.textContent = orig, 1500); }
  } else {
    alert('Product not found to update. Please try again.');
  }
}

function selectDetailDuration(el, dur, price) {
  detailSelectedDuration = dur;
  document.querySelectorAll('.detail-dur-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('detail-base-price').textContent = `₹${price}.00`;
}

function detailQty(delta) {
  detailSelectedQty = Math.max(1, detailSelectedQty + delta);
  document.getElementById('detail-qty').textContent = detailSelectedQty;
}

function detailBuyNow() {
  if (!detailProduct) return;
  const p = detailProduct;
  closeModal('detail-modal');
  const durList = (p.durations && p.durations.length >= 1) ? p.durations : ['1 Day', '7 Days', '30 Days', 'Lifetime'];
  const durEncoded = encodeURIComponent(JSON.stringify(durList));
  // Pre-select the chosen duration in checkout
  buyNow(p.name, p.price, durEncoded);
  // Then set the already-chosen duration
  setTimeout(() => selectDuration(detailSelectedDuration), 100);
}

function withWallet() {
  if (!detailProduct) return;
  
  const currentUser = localStorage.getItem('currentUser') || 'Guest';
  if (currentUser === 'Guest') {
    window.location.href = 'auth.html?mode=signin';
    return;
  }

  // Get active duration
  const p = detailProduct;
  const durList = (p.durations && p.durations.length >= 1) ? p.durations : ['1 Day', '7 Days', '30 Days', 'Lifetime'];
  
  const parsedDurations = durList.map((item, i) => {
    if (item.includes('=')) {
      const parts = item.split('=');
      return { raw: item, name: parts[0].trim(), price: parseFloat(parts[1].trim()) || 0 };
    } else if (item.includes(':')) {
      const parts = item.split(':');
      return { raw: item, name: parts[0].trim(), price: parseFloat(parts[1].trim()) || 0 };
    } else {
      return { raw: item, name: item.trim(), price: p.price + i * Math.round(p.price * 0.45) };
    }
  });

  const selectedObj = parsedDurations.find(d => d.raw === detailSelectedDuration) || parsedDurations[0];
  const totalPrice = selectedObj.price * detailSelectedQty;

  // Get user details
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const uIdx = users.findIndex(u => u.username === currentUser);
  if (uIdx === -1) {
    alert('User not found. Please log in again.');
    return;
  }

  const userBalance = users[uIdx].balance || 0;
  if (userBalance < totalPrice) {
    alert(`❌ Insufficient Wallet Balance!\nRequired: ₹${totalPrice}.00\nYour Balance: ₹${userBalance.toFixed(2)}\n\nPlease add funds to your wallet from the Dashboard.`);
    window.location.href = 'dashboard.html';
    return;
  }

  // Deduct balance and approve
  if (confirm(`Confirm purchase of "${p.name} - ${selectedObj.name}" (Qty: ${detailSelectedQty}) for ₹${totalPrice}.00 using your wallet balance?`)) {
    // Deduct
    users[uIdx].balance = userBalance - totalPrice;
    users[uIdx].keysClaimed = (users[uIdx].keysClaimed || 0) + detailSelectedQty;
    localStorage.setItem('users', JSON.stringify(users));

    // Generate keys helper
    function generateRandomKey() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let r = '';
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) r += chars[Math.floor(Math.random() * chars.length)];
        if (i < 3) r += '-';
      }
      return 'HYPER-' + r;
    }

    let keys = JSON.parse(localStorage.getItem('keys') || '[]');
    let allocatedKeys = [];
    const orderId = 'WL-' + Math.floor(100000 + Math.random() * 900000);

    for (let q = 0; q < detailSelectedQty; q++) {
      const keyIdx = keys.findIndex(k => k.product === p.name && k.status === 'Unused');
      let allocatedKey = '';
      if (keyIdx !== -1) {
        keys[keyIdx].status = 'Used';
        keys[keyIdx].assignedTo = currentUser;
        keys[keyIdx].orderId = orderId;
        keys[keyIdx].useDate = new Date().toLocaleDateString();
        allocatedKey = keys[keyIdx].key;
      } else {
        allocatedKey = generateRandomKey();
        keys.push({
          key: allocatedKey,
          product: p.name,
          duration: selectedObj.name,
          date: new Date().toLocaleDateString(),
          status: 'Used',
          assignedTo: currentUser,
          orderId: orderId,
          useDate: new Date().toLocaleDateString()
        });
      }
      allocatedKeys.push(allocatedKey);
    }
    localStorage.setItem('keys', JSON.stringify(keys));

    // Save transaction order
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
      id: orderId,
      username: currentUser,
      contact: users[uIdx].email || 'N/A',
      product: p.name,
      duration: selectedObj.name,
      price: `₹${totalPrice}`,
      method: 'WALLET',
      utr: 'WALLET_BAL',
      date: new Date().toLocaleString(),
      status: 'Approved'
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Close detail modal
    closeModal('detail-modal');

    // Notify user with keys
    alert(`🎉 Purchase Successful!\n\nKeys Issued:\n${allocatedKeys.join('\n')}\n\nBalance deducted: ₹${totalPrice}.00\nRemaining Balance: ₹${(userBalance - totalPrice).toFixed(2)}\n\nThese keys have been saved to your Purchased Keys list in your Dashboard.`);
    window.location.href = 'dashboard.html';
  }
}


// ===== MODAL =====
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
  if (id === 'detail-modal') {
    const iframe = document.getElementById('detail-iframe');
    if (iframe) iframe.src = '';
  }
}
function closeIfOverlay(e, id) {
  if (e.target.classList.contains('modal-overlay')) closeModal(id);
}
function switchModal(closeId, openId) {
  closeModal(closeId);
  setTimeout(() => openModal(openId), 150);
}

// ===== VIDEO MODAL =====
function openVideoModal(url) {
  const overlay = document.getElementById('video-modal');
  const frame   = document.getElementById('video-modal-frame');
  if (!overlay || !frame) return;
  frame.src = url;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeVideoModal() {
  const overlay = document.getElementById('video-modal');
  const frame   = document.getElementById('video-modal-frame');
  if (overlay) overlay.classList.remove('active');
  if (frame)   frame.src = '';   // stop video
  document.body.style.overflow = '';
}

// ===== AUTH / LOGIN / SIGNUP =====
// ===== AUTH / LOGIN / SIGNUP =====
function updateAuthUI() {
  const container = document.getElementById('nav-auth-container');
  if (!container) return;
  
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const isOwner = (currentUser.toLowerCase() === 'hyperm');
    const panelLink = isOwner ? 'admin.html' : 'dashboard.html';
    const panelText = isOwner ? 'OWNER PANEL' : 'DASHBOARD';
    container.innerHTML = `
      <!-- Desktop Auth UI -->
      <div class="user-profile-nav desktop-auth-ui" style="display:flex; align-items:center; gap:0.5rem;">
        <span class="user-name" style="margin-right:0.3rem; font-weight: 600;">${currentUser}</span>
        <a href="${panelLink}" class="nav-btn" style="margin-right:0.5rem; background:rgba(255,0,51,0.1); border:1px solid var(--red); padding:0.35rem 0.85rem; font-size:0.75rem; border-radius:40px; font-weight:700; font-family:var(--font-sub); cursor:pointer; text-decoration:none; color:white; box-shadow:0 0 10px rgba(255,0,51,0.25);">${panelText}</a>
        <button class="logout-btn" onclick="logout()">LOGOUT</button>
      </div>

      <!-- Mobile Auth UI (Dropdown trigger icon) -->
      <div class="mobile-auth-ui" style="position: relative; display: flex; align-items: center;">
        <button class="mobile-profile-toggle" onclick="toggleProfileDropdown(event)" style="background:none; border:none; color:var(--white); cursor:pointer; display:flex; align-items:center; padding:5px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <div id="mobile-profile-menu" class="mobile-profile-dropdown">
          <div class="dropdown-header">Hi, ${currentUser}</div>
          <a href="${panelLink}" class="dropdown-item">
            ${isOwner ? '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>' : '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}
            ${panelText}
          </a>
          <button onclick="logout()" class="dropdown-item logout-item">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            LOGOUT
          </button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <!-- Desktop Auth UI -->
      <div class="desktop-auth-ui">
        <a href="auth.html?mode=signin" class="nav-link">Sign In</a>
        <a href="auth.html" class="nav-btn" style="margin-left: 0.5rem;">SIGN UP</a>
      </div>

      <!-- Mobile Auth UI -->
      <div class="mobile-auth-ui" style="position: relative; display: flex; align-items: center;">
        <button class="mobile-profile-toggle" onclick="toggleProfileDropdown(event)" style="background:none; border:none; color:var(--white); cursor:pointer; display:flex; align-items:center; padding:5px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <div id="mobile-profile-menu" class="mobile-profile-dropdown">
          <a href="auth.html?mode=signin" class="dropdown-item">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            SIGN IN
          </a>
          <a href="auth.html" class="dropdown-item">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            SIGN UP
          </a>
        </div>
      </div>
    `;
  }
}

// Mobile profile dropdown toggle helper
function toggleProfileDropdown(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('mobile-profile-menu');
  if (menu) {
    menu.classList.toggle('open');
  }
}
document.addEventListener('click', function() {
  const menu = document.getElementById('mobile-profile-menu');
  if (menu) {
    menu.classList.remove('open');
  }
});

function openMyKeysModal() {
  const container = document.getElementById('my-keys-list-container');
  if (!container) return;
  
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;
  
  const keys = JSON.parse(localStorage.getItem('keys') || '[]');
  const myKeys = keys.filter(k => k.assignedTo === currentUser);
  
  if (myKeys.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--gray); font-family:var(--font-sub); font-size:0.95rem; margin:1rem 0; line-height:1.6;">No keys purchased yet.<br><span style="font-size:0.8rem; color:#888;">Once the owner approves your order, your key will show up here.</span></p>`;
  } else {
    container.innerHTML = myKeys.map(k => `
      <div style="background:var(--bg3); border:1px solid var(--border); padding:0.9rem; border-radius:8px; margin-bottom:0.8rem; display:flex; flex-direction:column; gap:0.4rem; position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color:var(--white); font-family:var(--font-sub); font-size:1.05rem; letter-spacing:0.5px;">${k.product}</strong>
          <span style="font-size:0.75rem; background:rgba(255,0,51,0.15); color:var(--red); padding:2px 8px; border-radius:4px; font-weight:700; font-family:var(--font-sub);">${k.duration}</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.3rem;">
          <code style="background:var(--bg); border:1px solid rgba(255,255,255,0.05); padding:0.4rem 0.6rem; border-radius:4px; font-size:0.9rem; color:#5fff8e; font-family:monospace; flex-grow:1; letter-spacing:1px; word-break:break-all;">${k.key}</code>
          <button style="background:var(--red); border:none; color:white; padding:0.4rem 0.8rem; border-radius:4px; font-family:var(--font-sub); font-weight:700; font-size:0.8rem; cursor:pointer;" onclick="copyToClipboard('${k.key}')">COPY</button>
        </div>
        <div style="font-size:0.7rem; color:var(--gray); display:flex; justify-content:space-between; margin-top:0.2rem;">
          <span>Unlocked on: ${k.useDate || k.date}</span>
          <span>Status: ACTIVE</span>
        </div>
      </div>
    `).join('');
  }
  
  openModal('mykeys-modal');
}

function logout() {
  localStorage.removeItem('currentUser');
  updateAuthUI();
  alert("Successfully logged out!");
}

// Run instantly to guarantee execution on bottom-loaded script
updateAuthUI();

// ===== NAVBAR =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  if (navLinks) navLinks.classList.remove('open');
});

// Active nav link
const links = document.querySelectorAll('.nav-link, .sub-nav-link, .desktop-nav-link, .mobile-nav-link');
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const target = document.querySelector(`.nav-link[href="#${e.target.id}"], .sub-nav-link[href="#${e.target.id}"], .desktop-nav-link[href="#${e.target.id}"], .mobile-nav-link[href="#${e.target.id}"]`);
      if (target) target.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ===== CHECKOUT & PAYMENT =====
function buyNow(name, price, durEncoded) {
  const currentUser = localStorage.getItem('currentUser') || 'Guest';
  if (currentUser === 'Guest') {
    window.location.href = 'auth.html?mode=signin';
    return;
  }
  window.location.href = `payment.html?product=${encodeURIComponent(name)}&price=${price}&durations=${durEncoded}`;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    // Fallback
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Copied to clipboard!");
  });
}

// Payment Submit Handler
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productName = document.getElementById('checkout-product-name').innerText;
    const productPrice = document.getElementById('checkout-product-price').innerText;
    const contact = document.getElementById('payment-contact').value.trim();
    const utr = document.getElementById('payment-utr').value.trim();
    const duration = currentSelectedDuration;
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const currentUser = localStorage.getItem('currentUser') || 'Guest';
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      product: productName,
      price: productPrice,
      method: currentSelectedMethod,
      contact: contact,
      utr: utr,
      duration: duration,
      status: 'Pending',
      date: new Date().toLocaleString(),
      username: currentUser
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    const whatsappNumber = "919204797593";
    const message = `\u26a1 *PRITAM 999 - NEW ORDER* \u26a1\n\n\ud83d\udce6 *Product:* ${productName}\n\u23f0 *Duration:* ${duration}\n\ud83d\udcb0 *Price:* ${productPrice}\n\ud83d\udcb3 *Method:* ${currentSelectedMethod}\n\ud83d\udc64 *Contact:* ${contact}\n\ud83d\udd22 *UTR/Ref:* ${utr}\n\n_Please verify my payment and send my access key._`;
    
    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
    
    alert("Payment details saved! Redirecting to WhatsApp for verification & activation...");
    closeModal('payment-modal');
    window.open(waUrl, '_blank');
  });
}

// ===== KEYBOARD CLOSE MODAL =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal('signin-modal');
    closeModal('signup-modal');
    closeModal('payment-modal');
    closeModal('mykeys-modal');
    closeModal('detail-modal');
    closeVideoModal();
  }
});

