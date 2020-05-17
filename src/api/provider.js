import Point from "../models/point.js";

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations();
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers();
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
         .then((points) => {
           points.forEach((point) => this._store.setItem(point.id, point.toRAW()));

           return points;
         });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(Point.parseTasks(storePoints));
  }

  createPoint(point) {
    if (isOnline()) {
      return this._api.createPoint(point);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  updatePoint(id, data) {
    if (isOnline()) {
      return this._api.updatePoint(id, data);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  deletePoint(id) {
    if (isOnline()) {
      return this._api.deletePoint(id);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }
}