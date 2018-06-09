const savedViewOptions = 'savedViewOptions';
const savedFilterOptions = 'savedFilterOptions';

class CustomerStorage {
  static init(key) {
    switch (key) {
      case savedViewOptions:
        localStorage
          .setItem(savedViewOptions, JSON.stringify({}
          ));
        break;
      default:
    }
  }

  static update(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get(key) {
    const data = localStorage.getItem(key);
    if (!data) {
      CustomerStorage.init(key);
      return JSON.parse(localStorage.getItem(key));
    }
    return JSON.parse(data);
  }

  static updateSavedViewOptions(data) {
    CustomerStorage.update(savedViewOptions, data);
  }

  static getSavedViewOptions() {
    return CustomerStorage.get(savedViewOptions);
  }

  static updateSavedFilterOptions(data) {
    CustomerStorage.update(savedFilterOptions, data);
  }

  static getSavedFilterOptions() {
    return CustomerStorage.get(savedFilterOptions);
  }
}

export default CustomerStorage;
