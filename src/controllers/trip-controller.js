import {renderElement, RenderPosition, replace, remove} from "../utils/render.js";
import Sorting, {SortType} from "../components/trip-sort.js";
import DaysList from "../components/trip-list.js";
import DayNumber from "../components/day-number.js";
import EventItem from "../components/event-item.js";
import EditEvent from "../components/edit-event.js";
import NoEvents from "../components/no-events.js";
import {SORT_OPTIONS} from "../mock/sort.js";
import {EVENTS_AMOUNT} from "../mock/event.js";

const getSortedEvents = (events, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => b.time - a.time);
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents.slice(from, to);
};

const renderTripDay = (container, events, date, index) => {
  const tripDay = new DayNumber(date, index + 1);
  const tripDayElement = tripDay.getElement();

  events.forEach((_card) => {
    const newEvent = new EventItem(_card);
    const editEvent = new EditEvent(_card);
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const eventsList = tripDayElement.querySelector(`.trip-events__list`);
    const replaceTaskToEdit = () => {
      replace(editEvent, newEvent);
    };

    const replaceEditToTask = () => {
      replace(newEvent, editEvent);
    };

    newEvent.setClickHandler(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editEvent.setSubmitHandler(replaceEditToTask);
    editEvent.setCloseHandler(replaceEditToTask);

    renderElement(eventsList, newEvent, RenderPosition.BEFOREEND);
  });
  renderElement(container, tripDay, RenderPosition.BEFOREEND);
};


const renderEventsList = (container, events, eventsDates) => {
  eventsDates.forEach((item, index) => {
    const dayEvents = events.filter((event) => {
      return item === new Date(event.startDate).toDateString();
    });
    renderTripDay(container, dayEvents, item, index);
  });
};

export default class TripController {
  constructor() {

    this._sortComponent = new Sorting(SORT_OPTIONS);
    this._noEventsComponent = new NoEvents();
    this._daysContainer = new DaysList();
  }

  render(events) {
    const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))].sort((a, b) => {
      return new Date(a).getDate() - new Date(b).getDate();
    });

    const tripEventsElement = document.querySelector(`.trip-events`);
    renderElement(tripEventsElement, this._sortComponent, RenderPosition.BEFOREEND);
    renderElement(tripEventsElement, this._daysContainer, RenderPosition.BEFOREEND);

    const dayList = tripEventsElement.querySelector(`.trip-days`);

    if (events.length === 0) {
      remove(this._sortComponent);
      renderElement(dayList, this._noEventsComponent, RenderPosition.BEFOREEND);

      return;
    }

    renderEventsList(dayList, events, dates);


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const showingEventsCount = EVENTS_AMOUNT;

      const sortedEvents = getSortedEvents(events, sortType, 0, showingEventsCount);

      dayList.innerHTML = ``;

      renderTripDay(dayList, sortedEvents);
    });
  }
}
