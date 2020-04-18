/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/day-number.js":
/*!**************************************!*\
  !*** ./src/components/day-number.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DayNumber; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


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

class DayNumber {
  constructor(date, dayNumber) {
    this._date = date;
    this._dayNumber = dayNumber;
    this._element = null;
  }

  getTemplate() {
    return createDayNumberTemplate(this._date, this._dayNumber);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/edit-event.js":
/*!**************************************!*\
  !*** ./src/components/edit-event.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditEvent; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _mock_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/event.js */ "./src/mock/event.js");



const getTypeTransport = (typesTransport) => {
  return typesTransport.map((typeTransport) => {
    return (`
      <div class="event__type-item">
         <input id="event-type-${typeTransport.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeTransport.toLowerCase()}">
         <label class="event__type-label  event__type-label--${typeTransport.toLowerCase()}" for="event-type-${typeTransport.toLowerCase()}-1">${typeTransport}</label>
      </div>
    `);
  }).join(``);
};

const getTypeActivity = (activities) => {
  return activities.map((activity) => {
    return (`
      <div class="event__type-item">
        <input id="event-type-${activity.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activity.toLowerCase()}">
        <label class="event__type-label  event__type-label--${activity.toLowerCase()}" for="event-type-${activity.toLowerCase()}-1">${activity}</label>
      </div>
    `);
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
      </div>
    `);
  }).join(``);
};

const getPhotosList = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
  });
};

const getCities = (citiesName) => {
  return citiesName.map((cityName) => {
    return (`<option value="${cityName}"></option>`);
  }).join(``);
};

const createEditEventTemplate = (cardData) => {

  const {type, city, photos, description, services, start, end, price} = cardData;
  const startDate = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(new Date(start), false);
  const endDate = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(new Date(end), false);

  const startTime = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(new Date(start).getHours(), new Date(start).getMinutes());
  const endTime = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(new Date(end).getHours(), new Date(end).getMinutes());
  const typeTransport = getTypeTransport(_mock_event_js__WEBPACK_IMPORTED_MODULE_1__["TYPES"][0]);
  const typeActivity = getTypeActivity(_mock_event_js__WEBPACK_IMPORTED_MODULE_1__["TYPES"][1]);
  const servicesList = getServices(services);
  const photosList = getPhotosList(photos);
  const citiesList = getCities(_mock_event_js__WEBPACK_IMPORTED_MODULE_1__["CITIES"]);

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
          ${type} to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${citiesList}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate} ${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate} ${endTime}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
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

class EditEvent {
  constructor(cardData) {
    this._cardData = cardData;
    this._element = null;
  }

  getTemplate() {
    return createEditEventTemplate(this._cardData);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/event-item.js":
/*!**************************************!*\
  !*** ./src/components/event-item.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventItem; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const getServices = (services) => {
  return services.map((service) => {
    return (`
        <li class="event__offer">
          <span class="event__offer-title">${service.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${service.price}</span>
        </li>
        `);
  }).join(``);
};

const createEventItemTemplate = (cardData) => {

  const {type, price, city, start, end, services} = cardData;
  const startDate = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(new Date(start), true);
  const endDate = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(new Date(end), true);
  const startTime = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(new Date(start).getHours(), new Date(start).getMinutes());
  const endTime = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(new Date(end).getHours(), new Date(end).getMinutes());
  const difTime = new Date(end - start);
  const durationTime = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getDuration"])(difTime);
  const servicesList = getServices(services);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
          <time class="event__start-time" datetime="${startDate}T${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDate}T${endTime}">${endTime}</time>
          </p>
          <p class="event__duration">${durationTime}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${servicesList}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

class EventItem {
  constructor(cardData) {
    this._cardData = cardData;
    this._element = null;
  }

  getTemplate() {
    return createEventItemTemplate(this._cardData);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/trip-cost.js":
/*!*************************************!*\
  !*** ./src/components/trip-cost.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TripCost; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createTripCostTemplate = (cards) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cards.map((card) => card.price).reduce((sum, current) => sum + current, 0)}</span>
    </p>`
  );
};

class TripCost {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/trip-filter.js":
/*!***************************************!*\
  !*** ./src/components/trip-filter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createFilterTemplate = (names) => {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${names.map((name) => {
      return (`
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" checked>
          <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
        </div>
      `);
    }).join(``)
    }
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/trip-info.js":
/*!*************************************!*\
  !*** ./src/components/trip-info.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TripInfo; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    </section>`
  );
};

class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/trip-list.js":
/*!*************************************!*\
  !*** ./src/components/trip-list.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DaysList; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");



const createDaysListTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};

class DaysList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/trip-menu.js":
/*!*************************************!*\
  !*** ./src/components/trip-menu.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SiteMenu; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


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

class SiteMenu {
  constructor(names) {
    this._names = names;
    this._element = null;
  }

  getTemplate() {
    return createTripMenuTemplate(this._names);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/trip-route.js":
/*!**************************************!*\
  !*** ./src/components/trip-route.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TripRoute; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");

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


class TripRoute {
  constructor(cities, dates) {
    this._cities = cities;
    this._dates = dates;
    this._element = null;
  }

  getTemplate() {
    return createTripRouteTemplate(this._cities, this._dates);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/trip-sort.js":
/*!*************************************!*\
  !*** ./src/components/trip-sort.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sorting; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createTripSortTemplate = (options) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day"></span>
    ${options.map(({name, isChecked}) => {
      return (`
        <div class="trip-sort__item  trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-${name}">${name}</label>
        </div>
      `);
    }).join(``)}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

class Sorting {
  constructor(options) {
    this._options = options;
    this._element = null;
  }

  getTemplate() {
    return createTripSortTemplate(this._options);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _components_edit_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/edit-event.js */ "./src/components/edit-event.js");
/* harmony import */ var _components_trip_route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/trip-route.js */ "./src/components/trip-route.js");
/* harmony import */ var _components_trip_cost_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/trip-cost.js */ "./src/components/trip-cost.js");
/* harmony import */ var _components_event_item_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/event-item.js */ "./src/components/event-item.js");
/* harmony import */ var _components_trip_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/trip-filter.js */ "./src/components/trip-filter.js");
/* harmony import */ var _components_trip_info_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/trip-info.js */ "./src/components/trip-info.js");
/* harmony import */ var _components_trip_menu_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/trip-menu.js */ "./src/components/trip-menu.js");
/* harmony import */ var _components_trip_sort_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/trip-sort.js */ "./src/components/trip-sort.js");
/* harmony import */ var _components_trip_list_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/trip-list.js */ "./src/components/trip-list.js");
/* harmony import */ var _components_day_number_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/day-number.js */ "./src/components/day-number.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mock/filter.js */ "./src/mock/filter.js");
/* harmony import */ var _mock_event_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mock/event.js */ "./src/mock/event.js");
/* harmony import */ var _mock_sort_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mock/sort.js */ "./src/mock/sort.js");
/* harmony import */ var _mock_menu_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mock/menu.js */ "./src/mock/menu.js");
















const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const renderTripDays = () => {
  const tripDaysList = document.querySelector(`.trip-days`);

  _mock_event_js__WEBPACK_IMPORTED_MODULE_12__["datesList"].forEach((date, dateIndex) => {
    const day = new _components_day_number_js__WEBPACK_IMPORTED_MODULE_10__["default"](date, dateIndex + 1).getElement();

    _mock_event_js__WEBPACK_IMPORTED_MODULE_12__["cardsList"]
    .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {
        const newEvent = new _components_event_item_js__WEBPACK_IMPORTED_MODULE_4__["default"](card).getElement();
        const eventList = day.querySelector(`.trip-events__list`);

        Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(eventList, newEvent, _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);

        const editButton = newEvent.querySelector(`.event__rollup-btn`);
        const editEventItem = new _components_edit_event_js__WEBPACK_IMPORTED_MODULE_1__["default"](card).getElement();
        const closeButton = editEventItem.querySelector(`.event__rollup-btn`);

        const onEditButtonClick = () => {
          eventList.replaceChild(editEventItem, newEvent);
        };

        const onCloseEditButtonClick = () => {
          eventList.replaceChild(newEvent, editEventItem);
        };

        editButton.addEventListener(`click`, onEditButtonClick);
        closeButton.addEventListener(`click`, onCloseEditButtonClick);
      });

    Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripDaysList, day, _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
  });
};

const init = () => {
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripControls, new _components_trip_menu_js__WEBPACK_IMPORTED_MODULE_7__["default"](_mock_menu_js__WEBPACK_IMPORTED_MODULE_14__["MENU_NAMES"]).getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].AFTERBEGIN);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripControls, new _components_trip_filter_js__WEBPACK_IMPORTED_MODULE_5__["default"](_mock_filter_js__WEBPACK_IMPORTED_MODULE_11__["filters"]).getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripEvents, new _components_trip_sort_js__WEBPACK_IMPORTED_MODULE_8__["default"](_mock_sort_js__WEBPACK_IMPORTED_MODULE_13__["SORT_OPTIONS"]).getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripEvents, new _components_trip_list_js__WEBPACK_IMPORTED_MODULE_9__["default"]().getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
  renderTripDays();
  const citiesList = [
    ...new Set(_mock_event_js__WEBPACK_IMPORTED_MODULE_12__["cardsList"].map((elem) => elem.city))
  ];

  const tripInfoBlock = document.querySelector(`.trip-main`);

  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripInfoBlock, new _components_trip_info_js__WEBPACK_IMPORTED_MODULE_6__["default"]().getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].AFTERBEGIN);

  const tripInfoRoute = tripInfoBlock.querySelector(`.trip-main__trip-info`);

  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripInfoRoute, new _components_trip_route_js__WEBPACK_IMPORTED_MODULE_2__["default"](citiesList, _mock_event_js__WEBPACK_IMPORTED_MODULE_12__["datesList"]).getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(tripInfoRoute, new _components_trip_cost_js__WEBPACK_IMPORTED_MODULE_3__["default"](_mock_event_js__WEBPACK_IMPORTED_MODULE_12__["cardsList"]).getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);

};

init();



/***/ }),

/***/ "./src/mock/event.js":
/*!***************************!*\
  !*** ./src/mock/event.js ***!
  \***************************/
/*! exports provided: TYPES, CITIES, cardsList, datesList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CITIES", function() { return CITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cardsList", function() { return cardsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datesList", function() { return datesList; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
// Создаст пустые моки для events. Передаст event на вход функции генерации разметки точек



const EVENTS_AMOUNT = 20;
const NUMBER_WEEK_DAYS = 7;
const NUMBER_HOURS = 24;
const TIME_FORMAT = 1000;
const NUMBER_MINETS = 60;

const TYPES = [
  [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`
  ],
  [
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ]
];

const CITIES = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Berlin`,
  `Moscow`,
];

const SERVICES = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 30
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5
  }
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getRandomPhotos = () => {
  const photos = [];

  for (let i = 0; i < Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(1, 5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

const getRandomDescription = () => {
  return DESCRIPTIONS
    .filter(() => Math.random() > 0.5)
    .slice(0, Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(1, 3))
    .join(` `)
    .trim();
};

const getRandomServices = () => {
  const currentServices = [];

  for (let i = 0; i < Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(0, 4); i++) {
    currentServices.push(SERVICES[i]);
  }

  return currentServices;
};

const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * NUMBER_WEEK_DAYS) * NUMBER_HOURS * Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(0, NUMBER_MINETS) * NUMBER_MINETS * TIME_FORMAT
  );
};

const getRouteTypesArray = () => {
  const routeTransportsArray = TYPES[0];
  const routeActivitiesArray = TYPES[1];
  const routeTypesArray = routeTransportsArray.concat(routeActivitiesArray);

  return routeTypesArray;
};

// Генерирует моки для event
const generateEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  // Сформирует поля моков event
  return {
    type: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(getRouteTypesArray()),
    city: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(CITIES),
    photos: getRandomPhotos(),
    description: getRandomDescription(),
    services: getRandomServices(),
    start: Math.min(startDate, endDate),
    end: Math.max(startDate, endDate),
    price: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(10, 100)
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateEvent())
    .sort(
        (current, next) => current.start - next.start
    );
};

const cardsList = generateEvents(EVENTS_AMOUNT);

const datesList = [
  ...new Set(cardsList.map((elem) => new Date(elem.start).toDateString()))
];


/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: filters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filters", function() { return filters; });
const filters = [
  `everything`,
  `future`,
  `past`
];


/***/ }),

/***/ "./src/mock/menu.js":
/*!**************************!*\
  !*** ./src/mock/menu.js ***!
  \**************************/
/*! exports provided: MENU_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_NAMES", function() { return MENU_NAMES; });
const MENU_NAMES = [`Table`, `Stats`];


/***/ }),

/***/ "./src/mock/sort.js":
/*!**************************!*\
  !*** ./src/mock/sort.js ***!
  \**************************/
/*! exports provided: SORT_OPTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SORT_OPTIONS", function() { return SORT_OPTIONS; });
const SORT_OPTIONS = [
  {
    name: `event`,
    isChecked: true
  },
  {
    name: `time`,
    isChecked: false
  },
  {
    name: `price`,
    isChecked: false
  }
];


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: RenderPosition, getRandomArrayItem, getRandomIntegerNumber, createElement, renderElement, formatDate, formatTime, getDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArrayItem", function() { return getRandomArrayItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomIntegerNumber", function() { return getRandomIntegerNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElement", function() { return renderElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDuration", function() { return getDuration; });
const NUMBER_MINUTES = 60;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const formatDate = (date, isLong) => {
  const dateYear = date.getFullYear();
  const dateMonth = (`0` + date.getMonth()).slice(-2);
  const dateDay = (`0` + date.getDate()).slice(-2);

  return isLong ? `${dateYear}-${dateMonth}-${dateDay}` : `${dateDay}/${dateMonth}/${dateYear.toString().slice(-2)}`;
};

const formatTime = (hours, minutes) => {
  return `${hours}:${(`0` + minutes).slice(-2)}`;
};

const getDuration = (time) => {
  return time.getHours() * NUMBER_MINUTES + time.getMinutes();
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map