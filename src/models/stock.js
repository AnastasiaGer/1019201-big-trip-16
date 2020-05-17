export default class Stock {
  constructor() {
    this._destinations = null;
    this._offers = null;
  }

  static setDestinations(destinations) {
    Stock._destinations = destinations;
  }

  static getDestinations() {
    return Stock._destinations;
  }

  static setOffers(offers) {
    Stock._offers = offers;
  }

  static getOffers() {
    return Stock._offers;
  }
}
