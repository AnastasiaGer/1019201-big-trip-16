import {getUpperCaseFirstLetter} from '../utils/common.js';
import {TRAVEL_TRANSPORT, Placeholder} from '../const.js';
import AbstractComponent from "./abstract-component.js";
import moment from "moment";

const getOffers = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  }).join(``);
};

const createEventTemplate = (event) => {

  const {type, city, price, offers, startDate, endDate} = event;

  const isArrive = !!offers;

  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const startDateTime = moment(startDate).format(`YYYY-MM-DDThh:mm`);
  const endDateTime = moment(endDate).format(`YYYY-MM-DDThh:mm`);
  let days = duration.days();
  let hours = duration.hours();
  let minutes = duration.minutes();
  const servicesList = getOffers(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getUpperCaseFirstLetter(type)}  ${TRAVEL_TRANSPORT.includes(type) ? Placeholder.TRANSPORT : Placeholder.ACTION} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateTime}">${moment(startDateTime).format(`hh:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateTime}">${moment(endDateTime).format(`hh:mm`)}</time>
          </p>
          <p class="event__duration">${days ? days + `D` : ``} ${hours ? hours + `H` : ``} ${minutes ? minutes + `M` : ``}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${isArrive ?
      `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
            ${servicesList}
            </ul>`
      : ``
    }
          <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventItem extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
