export default class Event {
  constructor(data) {
    this.id = data[`id`];
    this.eventType = data[`type`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.eventStart = data[`date_from`];
    this.eventEnd = data[`date_to`];
    this.cost = data[`base_price`];
    this.destination = data[`destination`];
    this.city = data[`destination`][`name`];
    this.description = data[`destination`][`description`] || ``;
    this.options = data[`offers`] || [];
    this.photos = new Array(data[`pictures`] || []);
  }


  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }
}
