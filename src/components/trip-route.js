import AbstractComponent from "./abstract-component.js";
const DAYS_COUNT = 3;

const getCitiesRout = (cities) => {
  if (cities.length <= DAYS_COUNT) {
    return cities.map((city) => city).join(` &mdash; `);
  } else {
    return (cities[0] + ` &mdash;` + ` &hellip; ` + `&mdash; ` + cities[cities.length - 1]).toString();
  }
};

const getTripDates = (dates) => {
  return (dates[0].slice(4, 10) + `&nbsp;&mdash;&nbsp;` + dates[dates.length - 1].slice(8, 10)).toString();
};

const createTripRouteTemplate = (cities, dates) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getCitiesRout(cities)}</h1>
      <p class="trip-info__dates">${getTripDates(dates)}</p>
    </div>`
  );
};

export default class TripRoute extends AbstractComponent {
  constructor(cities, dates) {
    super();

    this._cities = cities;
    this._dates = dates;
  }

  getTemplate() {
    return createTripRouteTemplate(this._cities, this._dates);
  }
}
