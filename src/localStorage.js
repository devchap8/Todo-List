const storageAvailable = () => {
  let storage;
  try {
    storage = window["localStorage"];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const storeList = (listName, listToStore) => {
    if(storageAvailable) localStorage.setItem(listName, JSON.stringify(listToStore));
}

const getList = (listName) => {
    if(storageAvailable) return JSON.parse(localStorage.getItem(listName));
}



const TasksLocalStorage = {storeList, getList};
export {TasksLocalStorage};