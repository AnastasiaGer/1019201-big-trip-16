import {renderElement, RenderPosition, replace} from "../utils/render.js";
import Sorting from "../components/trip-sort.js";
import DaysList from "../components/trip-list.js";
import DayNumber from "../components/day-number.js";
import EventItem from "../components/event-item.js";
import EditEvent from "../components/edit-event.js";
import NoEvents from "../components/no-events.js";
import {SORT_OPTIONS} from "../mock/sort.js";

const renderTripEvents = (cards) => {
  const datesList = [
    ...new Set(cards.map((elem) => new Date(elem.start).toDateString()))
  ];

  const tripDaysList = document.querySelector(`.trip-days`);

  datesList.forEach((date, dateIndex) => {

    renderElement(tripDaysList, new DayNumber(date, dateIndex + 1), RenderPosition.BEFOREEND);
    const dayCurrent = tripDaysList.querySelector(`.trip-days__item:last-of-type`);

    cards
      .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {
        const onEscKeyDown = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

          if (isEscKey) {
            replaceEditToTask();
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        const eventsList = dayCurrent.querySelector(`.trip-events__list`);

        const replaceTaskToEdit = () => {
          replace(editEventItem, newEvent);
        };

        const replaceEditToTask = () => {
          replace(newEvent, editEventItem);
        };

        const newEvent = new EventItem(card);
        newEvent.setClickHandler(() => {
          replaceTaskToEdit();
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        const editEventItem = new EditEvent(card);
        editEventItem.setSubmitHandler(replaceEditToTask);
        editEventItem.setCloseHandler(replaceEditToTask);

        renderElement(eventsList, newEvent, RenderPosition.BEFOREEND);
      });
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoEvents();
    this._daysList = new DaysList();
    this._sortComponent = new Sorting(SORT_OPTIONS);
  }

  render(cards) {
    const container = this._container;

    if (cards.length === 0) {
      renderElement(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    } else {
      renderElement(container, this._sortComponent, RenderPosition.AFTERBEGIN);
      renderElement(container, this._daysList, RenderPosition.BEFOREEND);
      renderTripEvents(cards);
    }
  }
}
