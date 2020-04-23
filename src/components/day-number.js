import AbstractComponent from "./abstract-component.js";

const createCardTemplate = (day, index) => {

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index || ``}</span>
        <time class="day__date" datetime="${day && new Date(day).toLocaleDateString() || ``}">${day && new Date(day).toLocaleString(`default`, {month: `long`}) || ``} ${day && new Date(day).getDate() || ``}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class DayNumber extends AbstractComponent {
  constructor(day, index) {
    super();

    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createCardTemplate(this._day, this._index);
  }
}
