import moment from "moment";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

import {EmptyEvent} from '../controllers/point-controller.js';
import {clearString} from "../utils/common.js";
import {actionByType} from "../const.js";
import {CITIES, TYPESS, getRandomDescription, getRandomPhotos, getRandomServices} from "../mock/event.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const getTypeTransport = (typesTransport) => {
  return typesTransport.map((typeTransport) => {
    return (
      `<div class="event__type-item">
         <input id="event-type-${typeTransport.toLowerCase().slice(0, -3)}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeTransport.toLowerCase().slice(0, -3)}">
         <label class="event__type-label  event__type-label--${typeTransport.toLowerCase().slice(0, -3)}" for="event-type-${typeTransport.toLowerCase().slice(0, -3)}-1">${typeTransport.slice(0, -3)}</label>
      </div>`
    );
  }).join(``);
};

const getTypeActivity = (activities) => {
  return activities.map((activity) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${activity.toLowerCase().slice(0, -3)}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activity.toLowerCase().slice(0, -3)}">
        <label class="event__type-label  event__type-label--${activity.toLowerCase().slice(0, -3)}" for="event-type-${activity.toLowerCase().slice(0, -3)}-1">${activity.slice(0, -3)}</label>
      </div>`
    );
  }).join(``);
};

const getServices = (services) => {
  return services.map((service) => {
    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${service.type}-1" type="checkbox" name="event-offer-${service.type}" checked>
        <label class="event__offer-label" for="event-offer-${service.type}-1">
        <span class="event__offer-title">${service.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${service.price}</span>
        </label>
      </div>`
    );
  }).join(``);
};

const getPhotosList = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
  }).join(``);
};

const getCities = (citiesName, elem) => {
  return citiesName.map((cityName) => {
    return (`<option value=${cityName} ${cityName === elem ? `selected` : ``}>${cityName}</option>`);
  }).join(``);
};

const createEditEventTemplate = (cardData, option) => {

  let creatingPoint = false;

  if (cardData === EmptyEvent) {
    creatingPoint = true;
  }
  const {start, end, price, isFavorite, index} = cardData;
  const {type, city, description, photos, services} = option;
  const isMove = [`Check-in`, `Sightseeing`, `Restaurant`].some((item) => item === type) ? `in` : `to`;
  const startDate = moment(start).format(`DD/MM/YY HH:mm`);
  const endDate = moment(end).format(`DD/MM/YY HH:mm`);
  const typeTransport = getTypeTransport(TYPESS[0]);
  const typeActivity = getTypeActivity(TYPESS[1]);
  const servicesList = getServices(services);
  const photosList = getPhotosList(photos);
  const citiesList = getCities(CITIES, city);
  const isFavourite = isFavorite ? `checked` : ``;

  return (
    `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
               ${typeTransport}
            </fieldset>
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${typeActivity}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type} ${isMove}
      </label>
          <select class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${citiesList}
          </datalist>
          </select>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}"  type="text" name="event-price" maxlength="5" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${creatingPoint ? `Cancel` : `Delete`}</button>
        <input id="event-favorite-${index}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavourite}>
        <label class="event__favorite-btn ${creatingPoint ? `visually-hidden` : ``}" for="event-favorite-${index}">
          <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
        ${creatingPoint ? `` : `
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${servicesList}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${photosList}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class EditEvent extends AbstractSmartComponent {
  constructor(cardData) {
    super();

    this._cardData = cardData;
    this._type = cardData.type;
    this._city = cardData.city;
    this._description = cardData.description;
    this._photos = cardData.photos;
    this._services = cardData.services;

    this._element = null;
    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;

    this._favoritesClickHandler = null;
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditEventTemplate(this._cardData, {
      type: this._type,
      city: this._city,
      description: this._description,
      services: this._services,
      photos: this._photos
    });
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  removeElement() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
      this._clickHandler = null;
    }

    super.removeElement();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritesButtonClickHandler(this._favoritesClickHandler);
    this.setClickHandler(this._clickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  reset() {
    const cardData = this._cardData;

    this._type = cardData.type;
    this._city = cardData.city;
    this._description = cardData.description;
    this._photos = cardData.photos;
    this._services = cardData.services;

    this.rerender();
  }

  setClickHandler(handler) {
    const element = this.getElement().querySelector(`.event__rollup-btn`);
    if (element) {
      element.addEventListener(`click`, handler);
      this._clickHandler = handler;
    }
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }


  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoritesClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {

      this._type = actionByType.get(evt.target.value);

      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      this._city = evt.target.value;
      this._description = getRandomDescription();
      this._photos = getRandomPhotos();
      this._services = getRandomServices();

      this.rerender();
    });

    element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      evt.target.value = clearString(evt.target.value);
    });
  }

  _applyFlatpickr() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }

    const element = this.getElement();
    const options = {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      minDate: this._cardData.start,
      enableTime: true
    };

    this._flatpickrStartDate = flatpickr(element.querySelector(`#event-start-time-1`), Object.assign({}, options, {defaultDate: this._cardData.start}));

    this._flatpickrEndDate = flatpickr(element.querySelector(`#event-end-time-1`), Object.assign({}, options, {defaultDate: this._cardData.end}));
  }
}
