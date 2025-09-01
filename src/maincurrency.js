// currency.js
class CurrencyManager {
  constructor(dbName = 'CardClashCurrency') {
    this.dbName = dbName;
    this.db = null;
    this.initDB();
  }

  initDB() {
    const request = indexedDB.open(this.dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('wallet')) {
        db.createObjectStore('wallet', { keyPath: 'id' });
      }
    };
    request.onsuccess = (event) => {
      this.db = event.target.result;
      this.getBalance((amount) => {
        if (amount === null) this.setBalance(30); // New user gets $30
        else updateCurrencyDisplay(amount);
      });
    };
    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.errorCode);
    };
  }

  getBalance(callback) {
    if (!this.db) return;
    const tx = this.db.transaction('wallet', 'readonly');
    const store = tx.objectStore('wallet');
    const getReq = store.get('player');
    getReq.onsuccess = () => {
      callback(getReq.result ? getReq.result.amount : null);
    };
  }

  setBalance(amount) {
    if (!this.db) return;
    const tx = this.db.transaction('wallet', 'readwrite');
    const store = tx.objectStore('wallet');
    store.put({ id: 'player', amount });
    updateCurrencyDisplay(amount);
  }

  changeBalance(delta, callback) {
    this.getBalance((amount) => {
      if (amount === null) amount = 0;
      const newAmount = amount + delta;
      this.setBalance(newAmount);
      if (callback) callback(newAmount);
    });
  }
}

// Helper function to update the display
function updateCurrencyDisplay(amount) {
  const el = document.getElementById('currencyDisplay');
  if (el) el.textContent = '$' + amount;
}

// Usage example:
const currency = new CurrencyManager();