function getItem(key) {
  const value = sessionStorage.getItem(key);

  if (key === "data") {
    return value === null ? null : JSON.parse(sessionStorage.getItem(key));
  } else {
    return value === null ? [] : JSON.parse(sessionStorage.getItem(key));
  }
}

function setItem(key, data) {
  const toJson = JSON.stringify(data);
  sessionStorage.setItem(key, toJson);
}

export { getItem, setItem };
