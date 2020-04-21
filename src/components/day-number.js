import AbstractComponent from "./abstract-component.js";

const createDayNumberTemplate = (date, dayNumber) => {

  const currentDate = new Date(date);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  return (`<li class="trip-days__item  day">
           <div class="day__info">
            <span class="day__counter">${dayNumber}</span>
            <time class="day__date" datetime="${currentYear}-${currentMonth + 1}-${currentDay}">${date.slice(4, 7).toUpperCase()}&nbsp;${currentDay}</time>
          </div>
          <ul class="trip-events__list"></ul>
        </li>`);
};

export default class DayNumber extends AbstractComponent {
  constructor(date, dayNumber) {
    super();

    this._date = date;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return createDayNumberTemplate(this._date, this._dayNumber);
  }
}

