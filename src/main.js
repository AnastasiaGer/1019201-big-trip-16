
import {createEditEventTemplate} from "./components/edit-event.js";
import {createTripRouteTemplate} from "./components/trip-route.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createTripDaysTemplate} from "./components/day-item.js";
import {createTripFilterTemplate} from "./components/trip-filter.js";
import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripMenuTemplate} from "./components/trip-menu.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
import {createDaysListTemplate} from "./components/trip-list.js";
import {createDayInfoTemplate} from "./components/day-info.js";
import {createElement, render, renderElement} from "./utils.js";
import {generateFilters} from "./mock/filter.js";
import {cardsList, datesList} from "./mock/event.js";
import {sortOptions} from "./mock/sort.js";
import {menuNames} from "./mock/menu.js";

const siteHeaderControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.trip-events`);

const filters = generateFilters();

const init = () => {

  render(siteHeaderControlsElement, createTripMenuTemplate(menuNames), `afterbegin`);
  render(siteHeaderControlsElement, createTripFilterTemplate(filters), `afterbegin`);
  render(siteMainElement, createTripSortTemplate(sortOptions), `afterbegin`);
  render(siteMainElement, createDaysListTemplate());

  const tripDaysList = document.querySelector(`.trip-days`);

  datesList.forEach((date, dateIndex) => {
    const day = createElement(createDayInfoTemplate(date, dateIndex + 1));

    cardsList
      .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {
        render(day.querySelector(`.trip-events__list`), createTripDaysTemplate(card));
      });

    renderElement(tripDaysList, day, `beforeend`);
  });

  const firstEvent = document.querySelector(`.trip-events__item`);

  render(firstEvent, createEditEventTemplate(cardsList[0]), `beforeend`);

  const citiesList = [
    ...new Set(cardsList.map((elem) => elem.city))
  ];

  const siteHeaderElement = document.querySelector(`.trip-main`);

  render(siteHeaderElement, createTripInfoTemplate(), `afterbegin`);
  const tripInfoRoute = siteHeaderElement.querySelector(`.trip-main__trip-info`);

  render(tripInfoRoute, createTripRouteTemplate(citiesList, datesList), `afterbegin`);
  render(siteHeaderElement, createTripCostTemplate(), `afterbegin`);
};

init();
