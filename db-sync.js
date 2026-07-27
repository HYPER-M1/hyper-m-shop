// ===== PROFESSIONAL DATABASE SYNCHRONIZATION SYSTEM =====
(function() {
  const sharedKeys = [
    'products', 'users', 'orders', 'keys', 'paymentSettings',
    'resellers', 'withdrawalRequests', 'coupons', 'announcements', 'adminLogs',
    'categories'
  ];

  // 1. Synchronously fetch database files from the server during initial page load
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

  // 3. Asynchronous background polling to check for updates every 4 seconds
  setInterval(() => {
    let changed = false;
    let pendingCount = sharedKeys.length;
    
    sharedKeys.forEach(key => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/${key}`, true); // Asynchronous GET to prevent main thread blocking/stuttering
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.responseText && xhr.responseText.trim() !== "") {
              const oldVal = localStorage.getItem(key);
              if (oldVal !== xhr.responseText) {
                // Update local storage without triggering the interceptor hook
                originalSetItem.call(localStorage, key, xhr.responseText);
                changed = true;
              }
            }
            pendingCount--;
            // Once all keys are checked, if any database state changed, dispatch event
            if (pendingCount === 0 && changed) {
              window.dispatchEvent(new Event('db-updated'));
            }
          }
        };
        xhr.send();
      } catch (e) {
        pendingCount--;
      }
    });
  }, 4000);
})();
