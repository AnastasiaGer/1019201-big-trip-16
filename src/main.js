
import EditEvent from "./components/edit-event.js";
import TripRoute from "./components/trip-route.js";
import Cost from "./components/trip-cost.js";
import EventItem from "./components/event-item.js";
import Filter from "./components/trip-filter.js";
import TripInfo from "./components/trip-info.js";
import Menu from "./components/trip-menu.js";
import Sort from "./components/trip-sort.js";
import DaysList from "./components/trip-list.js";
import DayNumber from "./components/day-number.js";
import {createElement, render, renderElement} from "./utils.js";
import {generateFilters} from "./mock/filter.js";
import {cardsList, datesList} from "./mock/event.js";
import {SORT_OPTIONS} from "./mock/sort.js";
import {MENU_NAMES} from "./mock/menu.js";

const siteHeaderControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.trip-events`);

const renderTripDays = () => {
  datesList.forEach((date, dateIndex) => {
    const day = createElement(new DayNumber(date, dateIndex + 1).getTemplate());
    const tripDaysList = document.querySelector(`.trip-days`);
    cardsList
      .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {
        render(day.querySelector(`.trip-events__list`), new EventItem(card).getTemplate());
      });

    renderElement(tripDaysList, day, `beforeend`);
  });
};

const init = () => {
  render(siteHeaderControlsElement, new Menu(MENU_NAMES).getTemplate(), `afterbegin`);
  const filters = generateFilters();
  render(siteHeaderControlsElement, new Filter(filters).getTemplate());
  render(siteMainElement, new Sort(SORT_OPTIONS).getTemplate());
  render(siteMainElement, new DaysList().getTemplate());

  renderTripDays();

  const firstEvent = document.querySelector(`.trip-events__item`);

  render(firstEvent, new EditEvent(cardsList[0]).getTemplate(), `afterend`);

  const citiesList = [
    ...new Set(cardsList.map((elem) => elem.city))
  ];

  const siteHeaderElement = document.querySelector(`.trip-main`);

  render(siteHeaderElement, new TripInfo().getTemplate(), `afterbegin`);
  const tripInfoRoute = siteHeaderElement.querySelector(`.trip-main__trip-info`);

  render(tripInfoRoute, new TripRoute(citiesList, datesList).getTemplate(), `afterbegin`);
  render(tripInfoRoute, new Cost(cardsList).getTemplate());
};

init();
