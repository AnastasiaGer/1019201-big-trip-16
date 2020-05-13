import Event from "./models/event.js";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/events`, {headers})
    .then(checkStatus)
    .then((response) => response.json())
    .then(Event.parseEvents);
  }

  updateEvent(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/events/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvents);
  }
};

export default API;
