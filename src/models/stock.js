export default class Stock {
  constructor() {
    this._destinations = [];
    this._offers = [];
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
