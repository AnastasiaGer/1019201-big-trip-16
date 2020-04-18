import {renderElement, RenderPosition} from "./utils.js";
import EditEvent from "./components/edit-event.js";
import TripRoute from "./components/trip-route.js";
import TripCost from "./components/trip-cost.js";
import EventItem from "./components/event-item.js";
import Filter from "./components/trip-filter.js";
import TripInfo from "./components/trip-info.js";
import SiteMenu from "./components/trip-menu.js";
import Sorting from "./components/trip-sort.js";
import DaysList from "./components/trip-list.js";
import DayNumber from "./components/day-number.js";
import {filters} from "./mock/filter.js";
import {cardsList, datesList} from "./mock/event.js";
import {SORT_OPTIONS} from "./mock/sort.js";
import {MENU_NAMES} from "./mock/menu.js";

const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const renderTripDays = () => {
  const tripDaysList = document.querySelector(`.trip-days`);

  datesList.forEach((date, dateIndex) => {
    const day = new DayNumber(date, dateIndex + 1).getElement();

    cardsList
    .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {
        const newEvent = new EventItem(card).getElement();
        const eventList = day.querySelector(`.trip-events__list`);

        renderElement(eventList, newEvent, RenderPosition.BEFOREEND);

        const editButton = newEvent.querySelector(`.event__rollup-btn`);
        const editEventItem = new EditEvent(card).getElement();
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

    renderElement(tripDaysList, day, RenderPosition.BEFOREEND);
  });
};

const init = () => {
  renderElement(tripControls, new SiteMenu(MENU_NAMES).getElement(), RenderPosition.AFTERBEGIN);
  renderElement(tripControls, new Filter(filters).getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEvents, new Sorting(SORT_OPTIONS).getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEvents, new DaysList().getElement(), RenderPosition.BEFOREEND);
  renderTripDays();
  const citiesList = [
    ...new Set(cardsList.map((elem) => elem.city))
  ];

  const tripInfoBlock = document.querySelector(`.trip-main`);

  renderElement(tripInfoBlock, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);

  const tripInfoRoute = tripInfoBlock.querySelector(`.trip-main__trip-info`);

  renderElement(tripInfoRoute, new TripRoute(citiesList, datesList).getElement(), RenderPosition.BEFOREEND);
  renderElement(tripInfoRoute, new TripCost(cardsList).getElement(), RenderPosition.BEFOREEND);

};

init();

