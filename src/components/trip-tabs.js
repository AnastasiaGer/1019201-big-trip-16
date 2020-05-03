import AbstractComponent from "./abstract-component.js";

export const TablItem = {
  TABS: `control__table`,
  STATS: `control__stats`,
};

const createMenuTemplate = (names) => {
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

export default class TripTabs extends AbstractComponent {
  constructor(names) {
    super();

    this._names = names;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._names);
  }

  setActiveItem(tablItem) {
    const item = this.getElement().querySelector(`.${tablItem}`);

    if (item) {
      item.checked = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const tablItem = evt.target.id;

      handler(tablItem);
    });
  }
}
