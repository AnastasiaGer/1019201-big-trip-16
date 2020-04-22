import {renderElement, RenderPosition, replace} from "../utils/render.js";
import Sorting, {SortType} from "../components/trip-sort.js";
import DaysList from "../components/trip-list.js";
import DayNumber from "../components/day-number.js";
import EventItem from "../components/event-item.js";
import EditEvent from "../components/edit-event.js";
import NoEvents from "../components/no-events.js";
import {SORT_OPTIONS} from "../mock/sort.js";
import {getDuration} from "../utils/common.js";

const renderTripEvents = (cards, container, isDefaultSorting = true) => {
  const dates = isDefaultSorting
    ? [...new Set(cards.map((elem) => new Date(elem.start).toDateString()))]
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting
      ? new DayNumber(date, dateIndex + 1)
      : new DayNumber();

    const dayElement = day.getElement();

    cards.filter((_card) => {
      return isDefaultSorting ? new Date(_card.start).toDateString() === date : _card;
    }).forEach((_card) => {
      const newEvent = new EventItem(_card);
      const editEvent = new EditEvent(_card);
      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          replaceEditToTask();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      const eventsList = dayElement.querySelector(`.trip-events__list`);
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

    renderElement(container.getElement(), day, RenderPosition.BEFOREEND);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoEvents();
    this._sortComponent = new Sorting(SORT_OPTIONS);
    this._daysContainer = new DaysList();
  }

  render(cards) {
    const container = this._container;

    if (cards.length === 0) {
      renderElement(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    } else {
      renderElement(container, this._sortComponent, RenderPosition.AFTERBEGIN);
      renderElement(container, this._daysContainer, RenderPosition.BEFOREEND);
      renderTripEvents(cards, this._daysContainer);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedTasks = [];

        switch (sortType) {
          case SortType.EVENT:
            sortedTasks = cards.slice();
            break;
          case SortType.PRICE:
            sortedTasks = cards.slice().sort((a, b) => b.price - a.price);
            break;
          case SortType.TIME:
            sortedTasks = cards.slice().sort((a, b) => getDuration(b.end - b.start) - getDuration(a.end - a.start));
            break;
        }

        this._daysContainer.getElement().innerHTML = ``;
        renderTripEvents(sortedTasks, this._daysContainer);
      });
    }
  }
}

