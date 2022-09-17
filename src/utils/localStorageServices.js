const get = (key) => JSON.parse(localStorage.getItem(key));
const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const remove = (key) => localStorage.removeItem(key);
const clear = () => localStorage.clear();

const localStorageServices = { get, set, remove, clear };

export default localStorageServices;
