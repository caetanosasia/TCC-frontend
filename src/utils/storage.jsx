const storage = {};

// Setup simple local storage wrapper
storage.set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
storage.get = (key) => {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
};
storage.remove = (key) => localStorage.removeItem(key);

// Safari in incognito has local storage, but size 0
// should fall back to cookies in this situation... to be done

export default storage;
