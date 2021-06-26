export default function useLocalStoraage(key, defaultValue?): [any, Function] {
  //  let value:any;
  if (!key) key = "";
  let value = localStorage.getItem(key.toString());
  value = JSON.parse(value);
  if (!value) value = defaultValue || null;
  function storeItem(key, value) {
    localStorage.setItem(key.toString(), JSON.stringify(value));
  }
  return [value, storeItem];
}
