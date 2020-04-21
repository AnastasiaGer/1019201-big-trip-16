import AbstractComponent from "./abstract-component.js";

const createTripMenuTemplate = (names) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <h2 class="visually-hidden">Switch trip view</h2>
    ${names.map((name) => {
      return (`
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${name}</a>
    `);
    }).join(``)}
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(names) {
    super();

    this._names = names;
  }

  getTemplate() {
    return createTripMenuTemplate(this._names);
  }
}
