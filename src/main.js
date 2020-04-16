
import {createEditEventTemplate} from "./components/edit-event.js";
import {createTripRouteTemplate} from "./components/trip-route.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createTripEventTemplate} from "./components/trip-event.js";
import {createTripFilterTemplate} from "./components/trip-filter.js";
import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripMenuTemplate} from "./components/trip-menu.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
import {createDaysListTemplate} from "./components/trip-list.js";
import {createDayNumberTemplate} from "./components/day-number.js";
import {createElement, render, renderElement} from "./utils.js";
import {generateFilters} from "./mock/filter.js";
import {cardsList, datesList} from "./mock/event.js";
import {SORT_OPTIONS} from "./mock/sort.js";
import {MENU_NAMES} from "./mock/menu.js";

const siteHeaderControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.trip-events`);

const renderTripDays = () => {
  datesList.forEach((date, dateIndex) => {
    const day = createElement(createDayNumberTemplate(date, dateIndex + 1));
    const tripDaysList = document.querySelector(`.trip-days`);
    cardsList
      .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {
        render(day.querySelector(`.trip-events__list`), createTripEventTemplate(card));
      });

    renderElement(tripDaysList, day, `beforeend`);
  });
};

const init = () => {
  render(siteHeaderControlsElement, createTripMenuTemplate(MENU_NAMES), `afterbegin`);
  const filters = generateFilters();
  render(siteHeaderControlsElement, createTripFilterTemplate(filters));
  render(siteMainElement, createTripSortTemplate(SORT_OPTIONS));
  render(siteMainElement, createDaysListTemplate());

  renderTripDays();

  const firstEvent = document.querySelector(`.trip-events__item`);

  render(firstEvent, createEditEventTemplate(cardsList[0]), `afterend`);

  const citiesList = [
    ...new Set(cardsList.map((elem) => elem.city))
  ];

  const siteHeaderElement = document.querySelector(`.trip-main`);

  render(siteHeaderElement, createTripInfoTemplate(), `afterbegin`);
  const tripInfoRoute = siteHeaderElement.querySelector(`.trip-main__trip-info`);

  render(tripInfoRoute, createTripRouteTemplate(citiesList, datesList), `afterbegin`);
  render(tripInfoRoute, createTripCostTemplate(cardsList));
};

init();
