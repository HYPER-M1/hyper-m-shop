// ===== PROFESSIONAL DATABASE SYNCHRONIZATION SYSTEM =====
(function() {
  const sharedKeys = [
    'products', 'users', 'orders', 'keys', 'paymentSettings',
    'resellers', 'withdrawalRequests', 'coupons', 'announcements', 'adminLogs'
  ];

  // 1. Synchronously fetch database files from the server during page load
  sharedKeys.forEach(key => {
    try {
      const xhr = new XMLHttpRequest();
      // Synchronous GET to guarantee data availability before subsequent page scripts execute
      xhr.open('GET', `/api/${key}`, false); 
      xhr.send();
      if (xhr.status === 200 && xhr.responseText && xhr.responseText.trim() !== "") {
        localStorage.setItem(key, xhr.responseText);
      }
    } catch (e) {
      console.warn(`[Sync] Failed to fetch shared key "${key}" from server:`, e);
    }
  });

  // 2. Intercept localStorage.setItem to auto-propagate local writes to the server database
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (sharedKeys.includes(key)) {
      try {
        const xhr = new XMLHttpRequest();
        // Asynchronous POST to write changes to the server database without blocking UI
        xhr.open('POST', `/api/${key}`, true); 
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(value);
      } catch (e) {
        console.warn(`[Sync] Failed to save shared key "${key}" to server:`, e);
      }
    }
  };
})();
