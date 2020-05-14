const get = (key, storage = localStorage) => JSON.parse(storage.getItem(key));
const set = (key, val, storage = localStorage) => storage.setItem(key, JSON.stringify(val));
const remove = (key, storage = localStorage) => storage.removeItem(key);
const clear = (storage = localStorage) => storage.clear();
export default {
    get,
    set,
    remove,
    clear
}
