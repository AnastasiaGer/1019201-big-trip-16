const API = class {
  getEvents() {
    return fetch(`https://11.ecmascript.pages.academy/big-trip/events`);
  }
};

export default API;
