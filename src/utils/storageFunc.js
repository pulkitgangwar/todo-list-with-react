export const setItem = (storageName, data) => {
  localStorage.setItem(storageName, JSON.stringify(data));
};
