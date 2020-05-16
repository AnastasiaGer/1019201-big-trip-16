const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api) {
    this._api = api;
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
      return this._api.getPoints();
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
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
