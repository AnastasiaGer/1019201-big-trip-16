
import {createEditEventTemplate} from "./components/edit-event.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createTripFilterTemplate} from "./components/trip-filter.js";
import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripMenuTemplate} from "./components/trip-menu.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
const DAYS_COUNT = 3;

const siteHeaderControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.trip-events`);
const siteHeaderElement = document.querySelector(`.trip-main`);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const init = () => {

  render(siteHeaderElement, createTripInfoTemplate(), `afterbegin`);
  render(siteHeaderElement, createTripCostTemplate(), `afterbegin`);

  render(siteHeaderControlsElement, createTripMenuTemplate(), `afterbegin`);
  render(siteHeaderControlsElement, createTripFilterTemplate(), `afterbegin`);

  render(siteMainElement, createTripSortTemplate(), `afterbegin`);
  render(siteMainElement, createEditEventTemplate(), `beforeend`);

  for (let i = 0; i < DAYS_COUNT; i++) {
    render(siteMainElement, createTripDaysTemplate(), `beforeend`);
  }
};

init();
