const saveToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { saveToStorage, getFromStorage, removeFromStorage };
